import kyInstance, { isHTTPError } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { editContactSchema } from "@/components/custom-form/edit-contact-form";

import { z } from "zod";
import { UseGetContactResponse } from "./useGetContacts";

export interface UseUpdateContactResponse {
 id: number;
 number: string;
 notifyName: string;
 nameByUser: string;
 note: string;
 createdAt: Date;
 userId: number;
}

// Definisikan tipe respons login

export default function useUpdateContactDetailMutation(
 phoneNumber: string,
 page: number
) {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<
  UseUpdateContactResponse,
  unknown,
  z.infer<typeof editContactSchema>
 >({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editContactSchema>
  ): Promise<UseUpdateContactResponse> => {
   try {
    const response = await kyInstance.put(`contact/${phoneNumber}`, {
     json: {
      nameByUser: data.nameByUser,
      note: data.note,
     },
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    });
    const responseData: UseUpdateContactResponse = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to update contact detail",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to update contact detail",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onMutate: async (data: z.infer<typeof editContactSchema>) => {
   await queryClient.cancelQueries({ queryKey: ["user-contact", page] });

   const previousState = queryClient.getQueryData<UseGetContactResponse>([
    "user-contact",
    page,
   ]);
   //replace previousState.data dengan data hasil dari mutationFn
   if (previousState) {
    queryClient.setQueryData<UseGetContactResponse>(["user-contact", page], {
     ...previousState,
     data: previousState.data.map((contact) =>
      contact.number === phoneNumber
       ? {
          ...contact,
          nameByUser: data.nameByUser,
          note: data.note,
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
    description: "Failed to update contact",
   });
  },
 });
}
