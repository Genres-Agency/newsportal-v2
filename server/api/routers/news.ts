import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const newsFormSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(10),
  slug: z.string().min(2),
  categories: z.array(z.string()).min(1),
  mediaId: z.string().optional(),
  status: z.enum(["PUBLISHED", "PRIVATE", "SCHEDULED"]),
  scheduledAt: z.date().optional(),
  authorId: z.string(),
});

const mediaFormSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  type: z.enum(["IMAGE", "VIDEO"]),
  description: z.string(),
  size: z.number(),
  mimeType: z.string(),
});

export const newsRouter = createTRPCRouter({
  createNews: protectedProcedure
    .input(newsFormSchema)
    .mutation(async ({ ctx, input }) => {
      const news = await ctx.db.news.create({
        data: {
          title: input.title,
          content: input.content,
          slug: input.slug,
          status: input.status,
          scheduledAt: input.scheduledAt,
          author: {
            connect: {
              id: input.authorId,
            },
          },
          ...(input.mediaId && {
            media: {
              connect: {
                id: input.mediaId,
              },
            },
          }),
          categories: {
            create: input.categories.map((categoryName) => ({
              category: {
                connect: {
                  name: categoryName,
                },
              },
            })),
          },
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          media: true,
          author: true,
        },
      });
      return news;
    }),

  createMedia: protectedProcedure
    .input(mediaFormSchema)
    .mutation(async ({ ctx, input }) => {
      const media = await ctx.db.media.create({
        data: {
          title: input.title,
          url: input.url,
          type: input.type,
          description: input.description,
          size: input.size,
          mimeType: input.mimeType,
        },
      });
      return media;
    }),
   getLatestNewsToNoticeMarquee: publicProcedure.query(async ({ ctx }) => {
      const news = await ctx.db.news.findMany({
         orderBy: { createdAt: "desc" },
         where: {
            status: "PUBLISHED",
         },
         select: {
            id: true,
            title: true,
            slug: true,
            status: true,
         },
         take: 30,
      });
      return news;
   }),

   getLatestHeroNews: publicProcedure.query(async ({ ctx }) => {
      const news = await ctx.db.news.findMany({
         orderBy: { createdAt: "desc" },
         take: 15,
         where: {
            status: "PUBLISHED",
         },
         include: {
            media: true,
         }
      });
      return news;
   }),
   getEnabledCategories: protectedProcedure.query(async ({ ctx }) => {
      const categories = await ctx.db.category.findMany({
         where: {
            status: "PUBLISHED",
         },
         orderBy:{
            createdAt: "desc",
         }
      });
      return categories;
   }),

   getNews: protectedProcedure.input(z.object({
      take: z.number().optional(),
      skip: z.number().optional(),
      status: z.enum(["PUBLISHED", "PRIVATE", "SCHEDULED"]).optional(),
      category: z.string().optional(),
   })).query(async ({ ctx, input }) => {
      const where = {
         status: input.status,
         ...(input.category ? {
            categories: {
               some: {
                  category: {
                     name: input.category,
                  }
               }
            }
         } : {}),
      };

      const [news, total] = await Promise.all([
         ctx.db.news.findMany({
            orderBy: {
               createdAt: "desc",
            },
            include: {
               categories: {
                  include: {
                     category: true,
                  }
               },
               media: true,
            },
            take: input.take,
            skip: input.skip,
            where,
         }),
         ctx.db.news.count({ where })
      ]);

      return {
         items: news,
         total,
      };
   }),

});