import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { EditContactForm } from "@/components/custom-form/edit-contact-form";

interface EditContactDialogProps {
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
 open: boolean;
 onClose: () => void;
}
export type Variant = "LOGIN" | "REGISTER";

export default function EditContactDialog({
 contact,
 open,
 page,
 onClose,
}: EditContactDialogProps) {
 function handleOpenChange(open: boolean) {
  if (!open) {
   onClose();
  }
 }

 return (
  <Dialog open={open} onOpenChange={handleOpenChange}>
   <DialogContent>
    <DialogHeader>
     <DialogTitle>Edit Contact Detail</DialogTitle>
     <DialogDescription>
      This form allows users to update contact details, ensuring that all the
      information remains accurate and up to date
     </DialogDescription>
     <EditContactForm contact={contact} onClose={onClose} page={page} />
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
