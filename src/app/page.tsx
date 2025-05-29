"use client"

import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";

export default function Home() {
  const [open , setOpen] = useCreateWorkspaceModal();// this is now global state in the app as opposed to local useState and behaves largely in similar fashion
  
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id , [data])

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log("Redirect to workspace");
    } else if (!open){
      console.log("Open creation modal");
      setOpen(true);
    }


  }, [workspaceId, isLoading, open, setOpen]);

  return (
      <div>
        <UserButton />
      </div>
  );
}
