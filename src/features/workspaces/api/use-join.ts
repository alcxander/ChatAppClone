"use client"

import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { v } from "convex/values";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { stat } from "fs";

type RequestType = {workspaceId: Id<"workspaces">, joinCode: string};
type ResponseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;  // regardless of error or success do this aka finally in a try catch  
    throwError?: boolean;
};

export const useJoin = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "pending" | "settled" | null>(null);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.workspaces.join);

    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try{
            setData(null);
            setError(null);

            setStatus("pending");

            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        }catch(error){
            setStatus("error");
            options?.onError?.(error as Error);

            if (options?.throwError){ //gives choice on whether or not to throw error so upstream they have more control on how to handle errors and not just throw them when i feel like it
                throw error;
            }
        }finally{
            setStatus("settled");
            options?.onSettled?.();
        }
    }, [mutation]); /* this was a little complicated to follow. to paraphrase
    needed to be supported in case i want t ouse this outside somewhere in useeffect somewhere. 
    want this to be memoized so can safely put it in the dependency array*/

    return {
        mutate,
        data, 
        error,
        isPending,
        isSuccess,
        isError,
        isSettled,
    };
}