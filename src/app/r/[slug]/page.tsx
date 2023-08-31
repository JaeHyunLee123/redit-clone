import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const session = await getAuthSession();
  const subnexus = await db.subnexus.findUnique({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subnexus: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  if (!subnexus) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">r/{subnexus.name}</h1>
      <MiniCreatePost session={session} />
      {/* TODO: Show posts in user feed */}
    </>
  );
};

export default Page;
