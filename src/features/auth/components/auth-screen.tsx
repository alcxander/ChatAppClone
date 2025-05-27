"use client";

import { SignInFlow } from "../types";
import { useState } from "react";
import { SignUpCard } from "./signupcard";
import { SignInCard } from "./signincard";

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");

    return (
        <div className="h-full flex items-center justify-center bg-[#5C3B58]">
            <div className="md:h-auto md:w-[420px]">
                {state === 'signIn' ? <SignInCard setState={setState}/> : <SignUpCard setState={setState}/>}
            </div>
        </div>
    )
}