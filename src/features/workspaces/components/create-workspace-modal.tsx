import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";

export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();

    const { mutate } = useCreateWorkspace();

    const handleClose = () => {
        setOpen(false);
        // TODO: clear form
    };

    const handleSubmit = async () => {
        try{
        const data = await mutate({
            name: "Workspace 1",
        }, {
            onSuccess(data){

            },
            onError(error){

            },
        })
            } catch(error){
                
            }
        };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input 
                        value=""
                        disabled={false}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                    />
                    <div className="flex justify-end">
                        <Button disabled={false}>Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )

};