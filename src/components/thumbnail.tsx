/* eslint-disable @next/next/no-img-element */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ThumbnailProps {
  url: string | null | undefined;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
          <img
            src={url}
            alt="message image"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none"
      style={{ maxWidth: "60vw", maxHeight: "60vh" }}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <img
          src={url}
          alt="message image"
          className="rounded-md object-contain max-h-[80vh] w-full"
        />
      </DialogContent>
    </Dialog>
  );
};
