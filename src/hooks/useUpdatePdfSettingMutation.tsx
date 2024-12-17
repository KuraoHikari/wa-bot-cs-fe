import kyInstance, { isHTTPError } from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export default function useUpdatePdfSettingMutation() {
 const { toast } = useToast();
 const queryClient = useQueryClient();

 return useMutation<void, unknown, File>({
  mutationFn: async (file: File): Promise<void> => {
   const formData = new FormData();
   formData.append("pdf", file);

   try {
    const response = await kyInstance.post("setting/upload-pdf", {
     body: formData,
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    });

    if (!response.ok) {
     throw new Error("Failed to upload PDF");
    }

    toast({
     description: "Success to upload PDF",
    });

    //refresh the page
    window.location.reload();
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse;
    } else {
     toast({
      description: "Failed to upload PDF",
     });
    }
    throw error;
   }
  },
  onMutate: async (file: File) => {
   await queryClient.cancelQueries({ queryKey: ["pdf-setting"] });

   const previousState = queryClient.getQueryData(["pdf-setting"]);

   return { previousState };
  },
  onError: (error, variables, context) => {
   console.log("🚀 ~ onError ~ variables:", variables);
   console.log("🚀 ~ onError ~ error:", error);
   queryClient.setQueryData(["pdf-setting"], (context as any)?.previousState);
   toast({
    description: "Failed to upload PDF",
   });
  },
  onSettled: () => {
   queryClient.invalidateQueries({ queryKey: ["pdf-setting"] });
  },
 });
}
