import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { v } from "convex/values";
import { useCallback, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = {name: string};
type ResponseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;  // regardless of error or success do this aka finally in a try catch  
    throwError?: boolean;
};

export const useCreateWorkspace = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);

    const [isPending, setisPending] = useState(false);
    const [isSuccess, setisSuccess] = useState(false);
    const [isError, setisError] = useState(false);
    const [isSettled, setisSettled] = useState(false);

    const mutation = useMutation(api.workspaces.create);

    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try{
            setData(null);
            setError(null);

            setisPending(true);

            setisError(false);
            setisSettled(false);
            setisSuccess(false);

            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        }catch(error){
            options?.onError?.(error as Error);

            if (options?.throwError){ //gives choice on whether or not to throw error so upstream they have more control on how to handle errors and not just throw them when i feel like it
                throw error;
            }
        }finally{
            setisPending(false);
            setisSettled(true);
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