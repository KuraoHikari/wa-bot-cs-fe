import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";

import { EditContactLimitForm } from "@/components/custom-form/edit-contact-limit-form";

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

export default function EditContactLimitDialog({
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
     <DialogTitle>Edit Contact Limit</DialogTitle>
     <DialogDescription>
      This form allows users to update contact limit, for set ai response for
      this contact
     </DialogDescription>
     <EditContactLimitForm contact={contact} onClose={onClose} page={page} />
    </DialogHeader>
   </DialogContent>
  </Dialog>
 );
}
