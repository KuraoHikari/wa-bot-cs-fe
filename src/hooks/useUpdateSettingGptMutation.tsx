import kyInstance, { isHTTPError } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

import { SettingsInfo } from "./useGetSettingInfo";
import { editPromptSchema } from "@/pages/GptSetting";
import { z } from "zod";

// Definisikan tipe respons login

export default function useUpdateSettingGptMutation() {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<SettingsInfo, unknown, z.infer<typeof editPromptSchema>>({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof editPromptSchema>
  ): Promise<SettingsInfo> => {
   try {
    const response = await kyInstance.put("setting/gpt", {
     json: {
      gptModel: data.gptModel,
      prompt: data.prompt,
     },
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    });
    const responseData: SettingsInfo = await response.json();
    // Parsing respons yang diketik
    toast({
     description: "Success to update setting",
    });
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to update setting",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onMutate: async (value: z.infer<typeof editPromptSchema>) => {
   await queryClient.cancelQueries({ queryKey: ["user-setting"] });

   const previousState = queryClient.getQueryData<SettingsInfo>([
    "user-setting",
   ]);

   if (previousState) {
    queryClient.setQueryData<SettingsInfo>(["user-setting"], () => ({
     ...previousState,
     gptModel: value?.gptModel,
     prompt: value?.prompt,
    }));
   }

   return { previousState };
  },
  onError(error, variables, context) {
   console.log("🚀 ~ onError ~ variables:", variables);
   console.log("🚀 ~ onError ~ error:", error);
   queryClient.setQueryData(["user-setting"], (context as any)?.previousState);
   toast({
    description: "Failed to update setting",
   });
  },
 });
}
