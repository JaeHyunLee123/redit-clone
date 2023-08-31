"use client";

import { FC, startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToSubnexusPayload } from "@/lib/validators/subnexus";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface SubscribeLeaveToggleProps {
  subnexusId: string;
  subnexusName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  subnexusId,
  subnexusName,
  isSubscribed,
}) => {
  const router = useRouter();
  const { loginToast, unknownerrorToast } = useCustomToast();
  const { mutate: subscribe, isLoading: isSubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubnexusPayload = {
        subnexusId,
      };

      const { data } = await axios.post("/api/subnexus/subscribe", payload);
      return data as string;
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Subscribed",
        description: `You are now subscribed to r/${subnexusName}`,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }
      return unknownerrorToast();
    },
  });
  const { mutate: unsubscribe, isLoading: isUnsubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubnexusPayload = {
        subnexusId,
      };

      const { data } = await axios.post("/api/subnexus/unsubscribe", payload);
      return data as string;
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Unsubscribed",
        description: `You leaved from r/${subnexusName}`,
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }
      return unknownerrorToast();
    },
  });

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => unsubscribe()}
      isLoading={isUnsubscribing}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubscribing}
      onClick={() => {
        subscribe();
      }}
    >
      Join community
    </Button>
  );
};

export default SubscribeLeaveToggle;
