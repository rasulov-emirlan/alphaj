import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const wordsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  create: publicProcedure
    .input(
      z
        .object({
          englishMeaning: z.string(),
          englishSpelling: z.string(),
          hiragana: z.string(),
          katakana: z.string().nullable(),
          kanji: z.string().nullable(),
        })
        .required()
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.words.create({
        data: {
          englishMeaning: input.englishMeaning,
          englishSpelling: input.englishSpelling,
          hiragana: input.hiragana,
          katakana: input.katakana,
          kanji: input.kanji,
        },
      });
    }),
  read: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.words.findUnique({
      where: {
        id: input,
      },
    });
  }),
  readAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.words.findMany();
  }),
  update: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
          englishMeaning: z.string().min(1),
          englishSpelling: z.string().min(1),
          hiragana: z.string().min(1),
          katakana: z.string().nullable(),
          kanji: z.string().nullable(),
        })
        .required()
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.words.update({
        where: {
          id: input.id,
        },
        data: {
          englishMeaning: input.englishMeaning,
          englishSpelling: input.englishSpelling,
          hiragana: input.hiragana,
          katakana: input.katakana,
          kanji: input.kanji,
        },
      });
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.words.delete({
      where: {
        id: input,
      },
    });
  }),
});
