import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export interface UseGetContactProps {
 page: number;
}

export interface UseGetContactResponse {
 data: {
  id: number;
  number: string;
  notifyName: string;
  nameByUser: string;
  note: string;
  createdAt: Date;
  userId: number;
  contactLimits: {
   limitAiResponse: boolean;
   limitationCount: number;
   stopAiResponse: boolean;
   userId: number;
   contactId: number;
  }[];
 }[];
 total?: number | undefined;
 page?: number | undefined;
 totalPages?: number | undefined;
}
export default function useGetContact({ page }: UseGetContactProps) {
 return useQuery({
  queryKey: ["user-contact", page],
  queryFn: () =>
   kyInstance
    .get(`contact?page=${page}`, {
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    })
    .json<UseGetContactResponse>(),
  staleTime: Infinity,
 });
}
