import { useParentMessageId } from "@/features/messages/store/use-parent-message-id";

export const usePanel = () => {
    const [parentMessageId, setParentMessageId] = useParentMessageId(); 
    // so nuqs controls when useparentmessageid updates and that in turn updates here as a state change update. I wonder does that create more
    // state changes than necessary to get the communication to work

    const onOpenMessage = (messageId: string) => {
        setParentMessageId(messageId);
    }

    const onClose = () => {
        setParentMessageId(null);
    };

    return {
        parentMessageId,
        onOpenMessage,
        onClose,
    }
}