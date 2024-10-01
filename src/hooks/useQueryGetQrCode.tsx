"use client";

import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";

export interface QrCode {
 qr: string;
}

const useQueryGetQrCode = () => {
 return useQuery({
  queryKey: ["qr-code"],
  queryFn: () =>
   kyInstance
    .get("whatsapp/qr-code", {
     headers: {
      token: `${localStorage.getItem("token")}`,
     },
    })
    .json<QrCode>(),
  refetchInterval: 60 * 1000 * 5,
 });
};

export default useQueryGetQrCode;
