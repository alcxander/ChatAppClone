"use client";

import { Provider } from "jotai";
import { Chicle } from "next/font/google";

interface JotaiProviderProps{
    children: React.ReactNode;
};

export const JotaiProvider = ({ children }: JotaiProviderProps) =>{
    return(
        <Provider>
            {children}
        </Provider>
    );
};