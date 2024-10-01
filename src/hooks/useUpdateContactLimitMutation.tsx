import kyInstance, { isHTTPError } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { z } from "zod";
import { UseGetContactResponse } from "./useGetContacts";
import { editContactLimitSchema } from "@/components/custom-form/edit-contact-limit-form";

export interface UseUpdateContactLimitResponse {
 limitAiResponse: boolean;
 limitationCount: number;
 stopAiResponse: boolean;
 userId: number;
 contactId: number;
}

// Definisikan tipe respons login

export default function useUpdateContactLimitMutation(
 contactId: number,
 page: number
) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseUpdateContactLimitResponse,
  unknown,
  z.infer<typeof editContactLimitSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editContactLimitSchema>
  ): Promise<UseUpdateContactLimitResponse> => {
   try {
    const response = await kyInstance.put(`contact/${contactId}/limit`, {
     json: {
      limitAiResponse: data.limitAiResponse,
      limitationCount: +data.limitationCount,
      stopAiResponse: data.stopAiResponse,
     },
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseUpdateContactLimitResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to update contact limit",
    });
    return responseData;
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse;
    } else {
     toast({
      description: "Failed to update contact limit",
     });
    }
    throw error;
   }
  },
  onMutate: async (data: z.infer<typeof editContactLimitSchema>) => {
   await queryClient.cancelQueries({ queryKey: ["user-contact", page] });

   const previousState = queryClient.getQueryData<UseGetContactResponse>([
    "user-contact",
    page,
   ]);

   if (previousState) {
    queryClient.setQueryData<UseGetContactResponse>(["user-contact", page], {
     ...previousState,
     data: previousState.data.map((contact) =>
      contact.id === contactId
       ? {
          ...contact,
          contactLimits: contact.contactLimits.map((cl, index) =>
           index === 0
            ? {
               ...cl,
               limitAiResponse: data.limitAiResponse,
               limitationCount: +data.limitationCount,
               stopAiResponse: data.stopAiResponse,
              }
            : cl
          ),
         }
       : contact
     ),
    });
   }

   return { previousState };
  },
  onError(error, variables, context) {
   console.log("🚀 ~ onError ~ variables:", variables);
   console.log("🚀 ~ onError ~ error:", error);
   queryClient.setQueryData(
    ["user-contact", page],
    (context as any)?.previousState
   );
   toast({
    description: "Failed to update setting",
   });
  },
 });
}
