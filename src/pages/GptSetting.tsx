import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "./LoadingButton";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import useGetSettingInfo from "@/hooks/useGetSettingInfo";
import useUpdateSettingMutation from "@/hooks/useUpdateSettingMutation";
import { Switch } from "@/components/ui/switch";
import PDFViewer from "@/components/PdfViewer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useUpdateSettingGptMutation from "@/hooks/useUpdateSettingGptMutation";

export const editPromptSchema = z.object({
 gptModel: z.string(),
 prompt: z.string(),
});

const GptSetting = () => {
 const { data, isLoading } = useGetSettingInfo();

 const [pageNumber, setPageNumber] = useState(1);
 const formSchema = editPromptSchema;

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
 });

 // Update the form values when the data is fetched

 const { setValue } = form;

 // Set form values directly from the data
 if (data && !isLoading) {
  setValue("gptModel", data.gptModel);
  setValue("prompt", data.prompt);
 }

 const { mutate } = useUpdateSettingMutation();
 const { mutate: mutateGpt, isPending } = useUpdateSettingGptMutation();
 const stopAiResponseSetting = (value: boolean) => {
  mutate(value);
 };

 function onSubmit(values: z.infer<typeof formSchema>) {
  mutateGpt(values);
 }

 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
   <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 order-2 md:order-1">
    <Card className="overflow-hidden">
     <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5">
       <CardTitle className="group flex items-center gap-2 text-lg">
        Prompt Settings
       </CardTitle>
       <CardDescription>
        Do your own risk, if you change the default prompt it will effect ai
        chat response, so be carefull. if you want ai answer with context from
        pdf put {`"{{context}}"`} in your prompt
       </CardDescription>
      </div>
     </CardHeader>
     <CardContent className="p-2 text-sm">
      {!isLoading && (
       <div className="grid gap-4">
        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
           <div className="grid gap-1 text-start">
            <FormField
             control={form.control}
             name="prompt"
             render={({ field }) => (
              <FormItem>
               <FormControl>
                <Textarea
                 placeholder="shadcn"
                 {...field}
                 className="h-[600px]"
                />
               </FormControl>

               <FormMessage />
              </FormItem>
             )}
            />

            <div className="flex gap-2 mb-2">
             <FormField
              control={form.control}
              name="gptModel"
              render={({ field }) => (
               <FormItem className="mt-2">
                <FormControl>
                 <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                 >
                  <SelectTrigger className="w-[280px]">
                   <SelectValue placeholder="Select gpt ai model" />
                  </SelectTrigger>
                  <SelectContent>
                   <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                   <SelectItem value="chatgpt-4o-latest">
                    chatgpt-4o-latest
                   </SelectItem>
                  </SelectContent>
                 </Select>
                </FormControl>

                <FormMessage />
               </FormItem>
              )}
             />
             <LoadingButton loading={isPending} className="mt-2" type="submit">
              Update Prompt
             </LoadingButton>
            </div>
           </div>
          </div>
         </form>
        </Form>
       </div>
      )}
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
        Stop Ai All Ai Response
       </CardTitle>
       <CardDescription>
        this switch will stop all ai chat response
       </CardDescription>
      </div>
      <div className="ml-auto flex items-center gap-1">
       <Switch
        checked={data?.stopAiResponse}
        onCheckedChange={stopAiResponseSetting}
       />
      </div>
     </CardHeader>
     <CardContent className="p-4">
      <PDFViewer
       pageNumber={pageNumber}
       fileName={
        data?.pdf?.split("uploads/")[1] ? data?.pdf?.split("uploads/")[1] : ""
       }
      />
     </CardContent>

     <CardFooter className="flex flex-row justify-between items-center border-t bg-muted/50 px-6 py-3">
      <Button
       variant="outline"
       onClick={() => setPageNumber(pageNumber - 1)}
       disabled={pageNumber === 1}
      >
       Previous
      </Button>
      <Button variant="outline" onClick={() => setPageNumber(pageNumber + 1)}>
       Next
      </Button>
     </CardFooter>
    </Card>
   </div>
  </main>
 );
};

export default GptSetting;
