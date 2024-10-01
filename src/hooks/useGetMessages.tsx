import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export interface UseGetMessagesProps {
 page: number;
}

export interface UseGetMessagesResponse {
 data: {
  id: number;
  from: string;
  to: string;
  aiMessage: boolean;
  content: string;
  createdAt: Date;
  userId: number;
 }[];
 total: number;
 page: number;
 totalPages: number;
}
export default function useGetMessages({ page }: UseGetMessagesProps) {
 return useQuery({
  queryKey: ["user-message", page],
  queryFn: () =>
   kyInstance
    .get(`message?page=${page}`, {
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetMessagesResponse>(),
  staleTime: Infinity,
 });
}
