import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"

import { AlertTriangle, Loader, PiSquare } from "lucide-react";

import { WorkspaceHeader } from "./workspace-header";

export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();

    const { data:member, isLoading: memberLoading } = useCurrentMember({ workspaceId }); /* interesting note on names here, getting a current user is different from a current member.*/
    const { data: workspace, isLoading: workspaceLoading} = useGetWorkspace({ id: workspaceId});

    if (workspaceLoading || memberLoading) {
        return(
            <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
                <Loader className="sixe-5 animate-spin text-white"/>
            </div>
        );
    }

    if ( !workspace || !member) {
        return(
            <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
                <AlertTriangle className="sixe-5 text-white"/>
                <p className="text-white text-sm"> Workspace not found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-[#5E2C5F] h-full">
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"}/> {/**what happened here exactly, changing quesry from collect to unique allowed the ability to get role from the member data item. why wouldnt we get it before? does collect bring back an object or multiple entries or something? */}
        </div>
    )
}