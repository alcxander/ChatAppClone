import { useParams, usePathname } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";

export const useChannelId = () => {
    const params = useParams();
    //console.log("use workspace id ts: " + params.workspaceId)
    return params.channelId as Id<"channels">;
};