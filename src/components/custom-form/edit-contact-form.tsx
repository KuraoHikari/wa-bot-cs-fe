import * as React from "react";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import useLoginMutation from "@/hooks/useLoginMutation";
import { Textarea } from "../ui/textarea";
import useUpdateContactDetailMutation from "@/hooks/useUpdateContactMutation";
import LoadingButton from "@/pages/LoadingButton";

interface EditContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
 contact: {
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
 };
 page: number;
 onClose: () => void;
}

export const editContactSchema = z.object({
 nameByUser: z.string(),
 note: z.string(),
});

export function EditContactForm({
 contact,
 page,
 onClose,
}: EditContactFormProps) {
 const formSchema = editContactSchema;

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   nameByUser: contact?.nameByUser ? contact?.nameByUser : "",
   note: contact?.note ? contact?.note : "",
  },
 });

 const { isPending, mutate } = useUpdateContactDetailMutation(
  contact?.number,
  page
 );
 // 2. Define a submit handler.
 function onSubmit(values: z.infer<typeof formSchema>) {
  mutate(values, { onSuccess: onClose });
 }

 return (
  <div className={cn("grid gap-6")}>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <div className="grid gap-2">
      <div className="grid gap-1 text-start">
       <FormField
        control={form.control}
        name="nameByUser"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Name By User</FormLabel>

          <FormControl>
           <Input type="text" placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>Name for this contact</FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Note for this contact</FormLabel>
          <FormControl>
           <Textarea placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
           {" "}
           Give note for this user, it can help you some where
          </FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />

       <LoadingButton loading={isPending} className="mt-4" type="submit">
        Submit
       </LoadingButton>
      </div>
     </div>
    </form>
   </Form>
  </div>
 );
}
