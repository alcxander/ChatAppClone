import dynamic from "next/dynamic";
import Quill from "quill";
import { ChangeEvent, useRef } from "react";
import { MdEditRoad } from "react-icons/md";

const Editor = dynamic(() => import("@/components/editor"), {ssr: false}); // what a handy tidbit to know about

interface ChatInputProps {
    placeholder: string;
};

export const ChatInput = ({ placeholder}: ChatInputProps) => {
const editorRef = useRef<Quill | null>(null);

  return (
    <div className="px-5 w-full">
        <Editor
        placeHolder={placeholder}
        onSubmit={() =>{}}
        disabled={false}
        innerRef={editorRef}

        />
    </div>
  );
};
