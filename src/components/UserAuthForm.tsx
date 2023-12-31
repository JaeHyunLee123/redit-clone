"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import React, { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      //toast notification
      toast({
        title: "There was a problem",
        description: "There was an error loggin in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        size="sm"
        className="w-full max-w-[350px]"
        onClick={loginWithGoogle}
        isLoading={isLoading}
      >
        {isLoading ? null : (
          <>
            <Icons.google className="aspect-square h-5 mr-2" />
            Google
          </>
        )}
      </Button>
    </div>
  );
};

export default UserAuthForm;
