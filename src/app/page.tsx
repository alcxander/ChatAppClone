"use client"

import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [open , setOpen] = useCreateWorkspaceModal();// this is now global state in the app as opposed to local useState and behaves largely in similar fashion
  
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id , [data])

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log("Redirect to workspace with id:" + workspaceId);
      router.replace(`/workspace/${workspaceId}`); //replace overwrites the current place in browser history essentially stopping user from going back a page
      console.log("post router replace now");
    } else if (!open){
      console.log("Open creation modal");
      setOpen(true);
    }


  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
      <div>
        <UserButton />
      </div>
  );
}
