import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetMessages from "@/hooks/useGetMessages";
import useGetSettingInfo from "@/hooks/useGetSettingInfo";
import useGetUserStatInfo from "@/hooks/useGetUserStatistic";
import useUpdateSettingMutation from "@/hooks/useUpdateSettingMutation";
import { formatRelativeDate } from "@/lib/utils";
import {
 HoverCard,
 HoverCardContent,
 HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
 ChevronLeft,
 ChevronRight,
 Edit2Icon,
 Eye,
 MoreHorizontal,
 StopCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
 Pagination,
 PaginationContent,
 PaginationItem,
} from "@/components/ui/pagination";
import useGetContact from "@/hooks/useGetContacts";
import EditContactDialog from "./EditContactDetailDialog";

import EditContactLimitDialog from "./EditContactLimitDialog";

const StatisticPage = () => {
 const [showEditContactLimitDialog, setShowEditContactLimitDialog] =
  useState<boolean>(false);
 const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
 const [pageMessage, setPageMessage] = useState<number>(1);
 const [pageContact, setPageContact] = useState<number>(1);
 //ignore

 const { data: settingData } = useGetSettingInfo();
 const { data: userStatData } = useGetUserStatInfo();
 const { data: dataMessage } = useGetMessages({ page: pageMessage });
 const { data: dataContact } = useGetContact({ page: pageContact });

 const previousPageMessage = () => {
  setPageMessage(pageMessage - 1);
 };

 const nextPageMessage = () => {
  setPageMessage(pageMessage + 1);
 };

 const previousPageContact = () => {
  setPageContact(pageContact - 1);
 };

 const nextPageContact = () => {
  setPageContact(pageContact + 1);
 };
 const { mutate } = useUpdateSettingMutation();
 const stopAiResponseSetting = (value: boolean) => {
  mutate(value);
 };

 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
   <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
    <Tabs defaultValue="messages">
     <div className="flex items-center">
      <TabsList>
       <TabsTrigger value="messages">Messages</TabsTrigger>
       <TabsTrigger value="contacts">Contacts</TabsTrigger>
      </TabsList>
     </div>
     <TabsContent value="messages">
      <Card x-chunk="dashboard-05-chunk-3">
       <CardHeader className="px-7">
        <CardTitle>Messages</CardTitle>
        <CardDescription>Recent message from your wa-bot.</CardDescription>
       </CardHeader>
       <CardContent>
        <Separator />
        <Table>
         <TableHeader>
          <TableRow>
           <TableHead className="table-cell">From</TableHead>
           <TableHead className="hidden md:table-cell">To</TableHead>
           <TableHead className="table-cell">Ai Message</TableHead>
           <TableHead className="table-cell">Content</TableHead>
           <TableHead className="hidden sm:table-cell">Date</TableHead>
          </TableRow>
         </TableHeader>
         <TableBody>
          {dataMessage?.data?.map((message) => {
           return (
            <TableRow key={message.id}>
             <TableCell>
              <div className="font-medium">
               {message?.from.split("@c.us")[0]}
              </div>
             </TableCell>
             <TableCell className="hidden md:table-cell">
              {message?.to.split("@c.us")[0]}
             </TableCell>
             <TableCell className="">
              {message?.aiMessage ? (
               <Badge className="text-xs" variant="outline">
                Yes
               </Badge>
              ) : (
               <Badge className="text-xs" variant="secondary">
                No
               </Badge>
              )}
             </TableCell>
             <TableCell className="table-cell">
              <HoverCard>
               <HoverCardTrigger asChild>
                <div>
                 <Button variant="ghost" size="sm" className="md:hidden">
                  <Eye size={20} />
                 </Button>
                 <div className="shadow-md hidden md:table-cell">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                   {message?.content.split(" ").length > 10
                    ? message?.content.split(" ").slice(0, 10).join(" ") + "..."
                    : message?.content}
                  </pre>
                 </div>
                </div>
               </HoverCardTrigger>
               <HoverCardContent className="w-[350px]">
                <ScrollArea className="h-[200px] rounded-md border p-4">
                 <div className="whitespace-pre-wrap">
                  {message.content.split("\n").map((line, index) => (
                   <p key={index} className="mb-2">
                    {line.includes("**") ? (
                     <strong>{line.replace(/\*\*/g, "")}</strong>
                    ) : (
                     line
                    )}
                    {index === 0 && <br />}
                   </p>
                  ))}
                 </div>
                </ScrollArea>
               </HoverCardContent>
              </HoverCard>
             </TableCell>
             <TableCell className="hidden sm:table-cell">
              {formatRelativeDate(message.createdAt)}
             </TableCell>
            </TableRow>
           );
          })}
         </TableBody>
        </Table>
        <Separator />
       </CardContent>
       <CardFooter>
        <Pagination>
         <PaginationContent>
          <PaginationItem>
           <Button
            variant="ghost"
            onClick={previousPageMessage}
            disabled={pageMessage <= 1}
           >
            <ChevronLeft className="h-4 w-4" />
           </Button>
          </PaginationItem>

          <PaginationItem>
           <Button
            variant="ghost"
            onClick={nextPageMessage}
            disabled={
             dataMessage?.totalPages
              ? pageMessage >= dataMessage?.totalPages
              : true
            }
           >
            <ChevronRight className="h-4 w-4" />
           </Button>
          </PaginationItem>
         </PaginationContent>
        </Pagination>
       </CardFooter>
      </Card>
     </TabsContent>
     <TabsContent value="contacts">
      <Card x-chunk="dashboard-05-chunk-3">
       <CardHeader className="px-7">
        <CardTitle>Contacts</CardTitle>
        <CardDescription>Recent contact from your wa-bot.</CardDescription>
       </CardHeader>
       <CardContent>
        <Separator />
        <Table>
         <TableHeader>
          <TableRow>
           <TableHead className="table-cell">Number</TableHead>
           <TableHead className="hidden md:table-cell">Notify Name</TableHead>
           <TableHead className="table-cell">Name by User</TableHead>
           <TableHead className="table-cell">note</TableHead>
           <TableHead className="hidden sm:table-cell">Date</TableHead>
           <TableHead className="hidden sm:table-cell">Date</TableHead>
          </TableRow>
         </TableHeader>
         <TableBody>
          {dataContact?.data?.map((contact) => {
           return (
            <TableRow key={contact.id}>
             <TableCell>
              <div className="font-medium">
               {contact?.number.split("@c.us")[0]}
              </div>
             </TableCell>
             <TableCell className="hidden md:table-cell">
              {contact.notifyName}
             </TableCell>
             <TableCell className="">
              {contact?.nameByUser ? contact?.nameByUser : ""}
             </TableCell>
             <TableCell className="table-cell">
              <HoverCard>
               <HoverCardTrigger asChild>
                <div>
                 <Button variant="ghost" size="sm" className="md:hidden">
                  <Eye size={20} />
                 </Button>
                 <div className="shadow-md hidden md:table-cell">
                  <pre className="whitespace-pre-wrap leading-relaxed">
                   {contact?.note
                    ? contact.note.split(" ").length > 10
                      ? contact.note.split(" ").slice(0, 10).join(" ") + "..."
                      : contact.note
                    : ""}
                  </pre>
                 </div>
                </div>
               </HoverCardTrigger>
               <HoverCardContent className="w-[350px]">
                <ScrollArea className="h-[200px] rounded-md border p-4">
                 <div className="whitespace-pre-wrap">
                  {contact?.note
                   ? contact.note.split("\n").map((line, index) => (
                      <p key={index} className="mb-2">
                       {line.includes("**") ? (
                        <strong>{line.replace(/\*\*/g, "")}</strong>
                       ) : (
                        line
                       )}
                       {index === 0 && <br />}
                      </p>
                     ))
                   : ""}
                 </div>
                </ScrollArea>
               </HoverCardContent>
              </HoverCard>
             </TableCell>
             <TableCell className="hidden sm:table-cell">
              {formatRelativeDate(contact.createdAt)}
             </TableCell>
             <TableCell className="table-cell">
              <DropdownMenu>
               <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                 <MoreHorizontal className="size-5 text-muted-foreground" />
                </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                 <span className="flex items-center gap-3">
                  <Edit2Icon className="size-4" />
                  Edit Detail
                 </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                 onClick={() => setShowEditContactLimitDialog(true)}
                >
                 <span className="flex items-center gap-3">
                  <StopCircleIcon className="size-4" />
                  Edit Contact Limit
                 </span>
                </DropdownMenuItem>
               </DropdownMenuContent>
              </DropdownMenu>
              <EditContactDialog
               page={pageContact}
               contact={contact}
               open={showEditDialog}
               onClose={() => setShowEditDialog(false)}
              />
              <EditContactLimitDialog
               page={pageContact}
               contact={contact}
               open={showEditContactLimitDialog}
               onClose={() => setShowEditContactLimitDialog(false)}
              />
              {/* <DeletePostDialog
               post={post}
               open={showDeleteDialog}
               onClose={() => setShowDeleteDialog(false)}
              /> */}
             </TableCell>
            </TableRow>
           );
          })}
         </TableBody>
        </Table>
        <Separator />
       </CardContent>
       <CardFooter>
        <Pagination>
         <PaginationContent>
          <PaginationItem>
           <Button
            variant="ghost"
            onClick={previousPageContact}
            disabled={pageContact <= 1}
           >
            <ChevronLeft className="h-4 w-4" />
           </Button>
          </PaginationItem>

          <PaginationItem>
           <Button
            variant="ghost"
            onClick={nextPageContact}
            disabled={
             dataContact?.totalPages
              ? pageContact >= dataContact?.totalPages
              : true
            }
           >
            <ChevronRight className="h-4 w-4" />
           </Button>
          </PaginationItem>
         </PaginationContent>
        </Pagination>
       </CardFooter>
      </Card>
     </TabsContent>
    </Tabs>
   </div>
   <div>
    <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
     <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
       <CardTitle className="group flex items-center gap-2 text-lg">
        Stop Ai All Ai Response
       </CardTitle>
       <CardDescription>
        this switch will stop all ai chat response
       </CardDescription>
      </div>
      <div className="ml-auto flex items-center gap-1">
       <Switch
        checked={settingData?.stopAiResponse}
        onCheckedChange={stopAiResponseSetting}
       />
      </div>
     </CardHeader>
     <CardContent className="p-6 text-sm">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 ">
       <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
         <CardTitle>Total Ai Response This Month</CardTitle>
         <CardTitle className="text-4xl">
          {userStatData?.countAiMessagesThisMonth}
         </CardTitle>
         <CardDescription className="max-w-lg text-balance leading-relaxed">
          Number of AI messages sent this month.
         </CardDescription>
        </CardHeader>
        <CardFooter></CardFooter>
       </Card>
       <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
         <CardTitle>Total Messages Received</CardTitle>

         <CardTitle className="text-4xl">
          {userStatData?.countMessagesFromUserThisWeek}
         </CardTitle>
        </CardHeader>
        <CardContent>
         <div className="text-xs text-muted-foreground">
          Number of messages received from users this week.
         </div>
        </CardContent>
       </Card>
       <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
         <CardDescription>Total Ai Response This Week</CardDescription>
         <CardTitle className="text-4xl">
          {userStatData?.countAiMessagesThisWeek}
         </CardTitle>
        </CardHeader>
        <CardContent>
         <div className="text-xs text-muted-foreground">
          Number of messages received from users this week
         </div>
        </CardContent>
       </Card>
      </div>
     </CardContent>

     <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div className="text-xs text-muted-foreground">powered by Prisma</div>
     </CardFooter>
    </Card>
   </div>
  </main>
 );
};

export default StatisticPage;
