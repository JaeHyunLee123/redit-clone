import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubnexusSubscriptionValidator } from "@/lib/validators/subnexus";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) return new Response("Unauthorize", { status: 401 });

    const body = await req.json();

    const { subnexusId } = SubnexusSubscriptionValidator.parse(body);

    const isSubscriptionExists = Boolean(
      await db.subscription.findFirst({
        where: {
          userId: session.user.id,
          subnexusId,
        },
      })
    );

    if (isSubscriptionExists)
      return new Response("You are already subscribed", { status: 400 });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subnexusId,
      },
    });

    return new Response(subnexusId, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not subscribe", { status: 500 });
  }
}
