"use client";

import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/Button";

export const useCustomToast = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login requiered.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Link
          href="/sign-in"
          className={buttonVariants({ variant: "outline" })}
          onClick={() => dismiss()}
        >
          Login
        </Link>
      ),
    });
  };

  const unknownerrorToast = () => {
    toast({
      title: "There was an error.",
      description: "Please refresh a page and try again",
      variant: "destructive",
    });
  };

  return { loginToast, unknownerrorToast };
};
