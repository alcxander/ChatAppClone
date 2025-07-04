import { useParams, usePathname } from "next/navigation";

import { Id } from "../../convex/_generated/dataModel";
import { userAgent } from "next/server";

export const useMemberId = () => {
    const params = useParams();
    const memberId = params.memberId;
    //console.log("use member id ts: " + params.memberId)
    //console.dir("use params ts: " + JSON.stringify(params, null, 2))
    return memberId as Id<"members">;
};