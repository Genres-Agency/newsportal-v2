import { z } from "zod";

import {
   createTRPCRouter,
   protectedProcedure,
   publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
   hello: publicProcedure
      .input(z.object({ text: z.string() }))
      .query(({ input }) => {
         return {
            greeting: `Hello ${input.text}`,
         };
      }),

   create: protectedProcedure
      .input(z.object({ title: z.string().min(1), content: z.string().min(1), slug: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
         await ctx.db.news.create({
            data: {
               title: input.title,
               content: input.content,
               authorId: ctx.session.user.id,
               slug: input.slug,  //unique slug
            }
         })
      }),

   getLatest: protectedProcedure.query(async ({ ctx }) => {
      const post = await ctx.db.news.findFirst({
         orderBy: {
            createdAt: "desc",
         },
      });
      return post;
   }),

   getSecretMessage: protectedProcedure.query(() => {
      return "you can now see this secret message!";
   }),
});
