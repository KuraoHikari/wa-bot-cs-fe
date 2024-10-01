import kyInstance, { isHTTPError } from "@/lib/ky";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { loginSchema } from "@/components/custom-form/user-auth-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Definisikan tipe respons login
interface LoginResponse {
 token: string;
}

export default function useLoginMutation() {
 const { toast } = useToast();
 const navigate = useNavigate();

 return useMutation<LoginResponse, unknown, z.infer<typeof loginSchema>>({
  // Tipe yang diharapkan dari mutationFn: LoginResponse
  mutationFn: async (
   data: z.infer<typeof loginSchema>
  ): Promise<LoginResponse> => {
   try {
    const response = await kyInstance.post("auth/login", { json: data });
    const responseData: LoginResponse = await response.json(); // Parsing respons yang diketik
    return responseData; // Mengembalikan tipe yang sesuai dengan LoginResponse
   } catch (error: unknown) {
    if (isHTTPError(error)) {
     const errorResponse = await error.response.json();
     throw errorResponse; // Lempar error untuk di-handle oleh onError
    } else {
     toast({
      description: "Failed to Register",
     });
    }
    throw error; // Pastikan error dilempar jika terjadi selain HTTPError
   }
  },
  onSuccess: (data) => {
   const token = data.token;

   if (token) {
    localStorage.setItem("token", token);
   }
   navigate("/");
  },
  onError() {
   toast({
    description: "Failed to Login",
   });
  },
 });
}
