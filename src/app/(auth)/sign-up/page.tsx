import SignUp from "@/components/SignUp";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="gap-20 h-full max-w-2xl mx-auto flex flex-col justify-center items-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft /> Home
        </Link>

        <SignUp />
      </div>
    </div>
  );
};

export default Page;
