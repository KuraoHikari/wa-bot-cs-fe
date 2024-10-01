import * as React from "react";

import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

import LoadingButton from "@/pages/LoadingButton";
import { Switch } from "../ui/switch";
import useUpdateContactLimitMutation from "@/hooks/useUpdateContactLimitMutation";

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

export const editContactLimitSchema = z.object({
 limitAiResponse: z.boolean(),
 limitationCount: z.coerce.number(),
 stopAiResponse: z.boolean(),
});

export function EditContactLimitForm({
 contact,
 page,
 onClose,
}: EditContactFormProps) {
 const formSchema = editContactLimitSchema;

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   limitAiResponse: contact?.contactLimits[0].limitAiResponse,
   limitationCount: contact?.contactLimits[0].limitationCount,
   stopAiResponse: contact?.contactLimits[0].stopAiResponse,
  },
 });

 const { isPending, mutate } = useUpdateContactLimitMutation(contact?.id, page);
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
        name="limitAiResponse"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Limit Ai Response</FormLabel>

          <FormControl>
           <Switch
            className="ms-3"
            checked={field.value}
            onCheckedChange={field.onChange}
           />
          </FormControl>
          <FormDescription>
           Limit Ai Response for thi contact it will be calculate from
           limitation count
          </FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="limitationCount"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Limitation count</FormLabel>
          <FormControl>
           <Input type="number" placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>
           {" "}
           Limitation Ai Response for this contact
          </FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="stopAiResponse"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Stop Ai Response</FormLabel>
          <FormControl>
           <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            className="ms-3"
           />
          </FormControl>
          <FormDescription> Stop Ai Response for this contact.</FormDescription>
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
