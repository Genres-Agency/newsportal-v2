import { createTRPCRouter, publicProcedure } from "../trpc";

export const settingsRouter = createTRPCRouter({
   getSettings: publicProcedure.query(async ({ ctx }) => {
      const settings = await ctx.db.settings.findFirst();
      return settings;
   }),
});