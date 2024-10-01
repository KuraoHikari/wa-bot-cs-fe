import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export interface SettingsInfo {
 stopAiResponse: boolean;
 gptModel: string;
 prompt: string;
 pdf?: string;
}

export default function useGetSettingInfo() {
 return useQuery({
  queryKey: ["user-setting"],
  queryFn: () =>
   kyInstance
    .get(`setting`, {
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    })
    .json<SettingsInfo>(),
 });
}
