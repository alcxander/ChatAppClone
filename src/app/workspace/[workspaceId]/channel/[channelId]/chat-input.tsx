import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { ChangeEvent, useRef, useState } from "react";
import { MdEditRoad } from "react-icons/md";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false }); // what a handy tidbit to know about

interface ChatInputProps {
  placeholder: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [pending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = async ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    try {
      setIsPending(true);
      await createMessage(
        {
          workspaceId,
          channelId,
          body,
        },
        { throwError: true }
      );

      setEditorKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error("Failed to send message ):");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey} //cute trick, reset the state with a small value change to reset the state every time it fires
        placeHolder={placeholder}
        onSubmit={handleSubmit}
        disabled={pending}
        innerRef={editorRef}
      />
    </div>
  );
};
