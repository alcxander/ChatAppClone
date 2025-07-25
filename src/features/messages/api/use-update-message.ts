"use client"

import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { v } from "convex/values";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { stat } from "fs";

type RequestType = {
    body: string, 
    id: Id<"messages">,
};
type ResponseType = Id<"messages"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;  // regardless of error or success do this aka finally in a try catch  
    throwError?: boolean;
};

export const useUpdateMessage = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "pending" | "settled" | null>(null);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.messages.update);

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

            if (options?.throwError){ 
                throw error;
            }
        }finally{
            setStatus("settled");
            options?.onSettled?.();
        }
    }, [mutation]); 
    
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