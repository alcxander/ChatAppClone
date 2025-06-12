import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useNewJoinCodeWorkspace } from "@/features/workspaces/api/use-new-join-code-workspace";
import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will deactivate the current invite code and make a new one."
  );

  const { mutate, isPending } = useNewJoinCodeWorkspace();

  const handleNewCode = async () => {
    const ok = await confirm();

    if (!ok) return;
    
    mutate({ workspaceId }, {
        onSuccess: () => {
          toast.success("Invite code regenerated");
        },
        onError: () =>{
            toast.error("Failed to regenerate invite code");
        }
      }
    );
  };

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() =>
        toast.success(
          "Invite link copied to clipboard. 'Funny enough I don't like toast design but this seems to be the convention - Dexter'"
        )
      );
  };

  return (
    <>
    <ConfirmDialog />
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
          <DialogDescription>
            Use the code below to invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-center py-10 blur-sm hover:blur-none">
          <p className="text-4xl uppercase font-bold tracking-widest">
            {joinCode}
          </p>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            Copy link
            <CopyIcon className="sixe-4 ml-2" />
          </Button>
        </div>
        <div className="flex items-center justify-between w-full">
          <Button onClick={handleNewCode} variant="outline">
            New code
            <RefreshCcw className="size-4 ml-2" />
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
