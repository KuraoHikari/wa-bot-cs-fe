import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import useQueryGetQrCode from "@/hooks/useQueryGetQrCode";

const HomePage = () => {
 const { data } = useQueryGetQrCode();

 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
   <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 order-2 md:order-1">
    <Card className="overflow-hidden">
     <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
       <CardTitle className="group flex items-center gap-2 text-lg">
        How To Connect your WhatsApp with Our App
       </CardTitle>
       <CardDescription>follow the intruction bellow</CardDescription>
      </div>
     </CardHeader>
     <CardContent className=" text-sm">
      <Separator className="my-2" />
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
       <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
         <CardDescription>
          1. Click the three dots in the top right corner and select Link to an
          existing account
         </CardDescription>
        </CardHeader>
        <CardContent>
         <img
          src="/Linked-Devices-on-WhatsApp.jpg"
          alt="QR Code"
          className="h-full w-full"
         />
        </CardContent>
       </Card>
       <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
         <CardDescription>
          2. Unlock your main phone and scan the QR code on the other device
         </CardDescription>
        </CardHeader>
        <CardContent>
         <img
          src="/Link-a-Device-on-WhatsApp.jpg"
          alt="QR Code"
          className="h-full w-full"
         />
        </CardContent>
       </Card>
      </div>
     </CardContent>
     <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div className="text-xs text-muted-foreground">Step by step</div>
     </CardFooter>
    </Card>
   </div>
   <div className="order-1 md:order-2">
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
     <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
       <CardTitle className="group flex items-center gap-2 text-lg">
        Scan your QR Here
       </CardTitle>
       <CardDescription>it will be refresh every 3 minute</CardDescription>
      </div>
     </CardHeader>
     <CardContent className="p-6 text-sm">
      <Separator className="my-4" />
      {data ? (
       <img src={data?.qr} alt="QR Code" className="h-full w-full" />
      ) : (
       <Card>
        <CardHeader className="pb-2">
         <CardTitle>Your WhatsApp Already Connected</CardTitle>
         <CardDescription className=" text-sm">enjow the app</CardDescription>
        </CardHeader>
        <CardContent className="p-1 text-sm"></CardContent>
       </Card>
      )}
      <Separator className="my-4" />
     </CardContent>
     <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div className="text-xs text-muted-foreground">Powered with WAweb.js</div>
     </CardFooter>
    </Card>
   </div>
  </main>
 );
};

export default HomePage;
