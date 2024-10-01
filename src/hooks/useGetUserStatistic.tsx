import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export interface UserStatInfo {
 countAiMessagesThisMonth: number;
 countAiMessagesThisWeek: number;
 countMessagesFromUserThisWeek: number;
}

export default function useGetUserStatInfo() {
 return useQuery({
  queryKey: ["user-stat"],
  queryFn: () =>
   kyInstance
    .get(`user/stat`, {
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    })
    .json<UserStatInfo>(),
 });
}
