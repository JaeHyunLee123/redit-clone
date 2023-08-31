import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubnexusValidator } from "@/lib/validators/subnexus";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = SubnexusValidator.parse(body);

    const isSubnexusExists = Boolean(
      await db.subnexus.findUnique({
        where: {
          name,
        },
        select: { id: true },
      })
    );

    if (isSubnexusExists)
      return new Response("Subnexus already exists", { status: 409 });

    const newSubNexus = await db.subnexus.create({
      data: {
        name,
        creator: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subnexusId: newSubNexus.id,
      },
    });

    return new Response(newSubNexus.name, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create subnexus", { status: 500 });
  }
}
