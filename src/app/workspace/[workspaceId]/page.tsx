"use client";

import { Loader, TriangleAlert } from "lucide-react";
import { useEffect, useMemo } from "react";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { useRouter } from "next/navigation";
import { useCurrentMember } from "@/features/members/api/use-current-member";

//looking at t his we may need a hook that gives us the workspace ID wherever we need it
// below with useParams we get far enough to notice that it may not always be correct or available
// hence a hook would be useful here

const WorkpaceIdPage = () => {
    console.log("workspace [page] initialising")

const workspaceId = useWorkspaceId();
  const router = useRouter();

  const [open, setOpen] = useCreateChannelModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});
  const channelId = useMemo(() => channels?.[0]?._id, [channels]);

  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (workspaceLoading || channelsLoading || memberLoading || !member || !workspace) return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    channelsLoading,
    workspaceLoading,
    workspace,
    open,
    setOpen,
    router,
    workspaceId,
    member,
    memberLoading,
    isAdmin,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading)
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );

  if (!workspace || !member)
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );

    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          No channel found
        </span>
      </div>
    );
};

export default WorkpaceIdPage;