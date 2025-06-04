import { useParams } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";


export const useWorkspaceId = () => {
    const params = useParams();
    console.log("use workspace id ts: " + params.workspaceId)
    return params.workspaceId as Id<"workspaces">;
};