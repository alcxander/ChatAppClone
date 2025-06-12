"use client"; /** the nomenclature indicates that this would be a 'client component' but really
the correct terminology would infer that using this syntax would create a BOUNDARY between  the server and the client

this syntax means this component and all children components are not rendered on the server side. not that they're not 
server components they are just not server side rendered.
*/

import { useEffect, useState } from "react";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { CreateChannelModal } from "@/features/channels/components/create-channel-modal";

export const Modals = () => {
    const [mounted, setMounted] = useState(false); // fix a potential hydration error here in case modals only show when client side rendering is done

    useEffect(() => {
        setMounted(true); // use effect can only b ecalled when we do client side rendering
    }, []);

    if (!mounted) return null; // this part prevents the hydration errors we just render nothing when not mounted

    return (
        <>
            <CreateChannelModal />
            <CreateWorkspaceModal />
        </>
    );
};