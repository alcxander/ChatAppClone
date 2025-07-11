"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { AuthScreen } from "./auth-screen";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
    const{ signOut} = useAuthActions();
    const {data, isLoading} = useCurrentUser();

    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground"/>
    }

    if (!data) {
        return null;
    }

    //now we have data from the hook we can destructure it to use in the UI

    const { name, image, email } = data;

    const avatarFallback = name!.charAt(0).toUpperCase()
  
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="rounded-md size-10 hover:opacity-75 transition">
                    <AvatarImage className="rounded-md" alt={name} src={image}/>
                    <AvatarFallback className="rounded-md bg-green-800 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem onClick={() => signOut()} className="h-10">
                    <LogOut className="size-4 mr-2" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}