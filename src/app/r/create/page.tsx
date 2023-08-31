"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubnexusPayload } from "@/lib/validators/subnexus";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

const Page = ({}) => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const { loginToast, unknownerrorToast } = useCustomToast();
  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubnexusPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/subnexus", payload);

      return data as string;
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          return toast({
            title: "This name of subnexus already exists.",
            description: "Please write a different subnexus name.",
            variant: "destructive",
          });
        }

        if (error.response?.status === 422) {
          return toast({
            title: "Invalid subnexus name.",
            description:
              "The name of subnexus should longer than 3 and shorter than 21 characters.",
            variant: "destructive",
          });
        }

        if (error.response?.status === 401) {
          return loginToast();
        }
      }

      unknownerrorToast();
    },
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div className="containter flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a community</h1>
        </div>
        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">Commnunity names cannot be changed.</p>
        </div>

        <div className="relative">
          <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
            r/
          </p>
          <Input value={input} onChange={onChange} className="pl-6" />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="subtle" onClick={router.back}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length < 3 || input.length > 21}
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
