import {query } from "./_generated/server";
import {auth} from "./auth"

export const current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        //TODO get off deprecated version

        if (userId === null){
            return null;
        }

        return await ctx.db.get(userId);
    }
});