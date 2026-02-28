import { z } from "zod";

export const createBookmarkSchema = z.object({
  url: z
    .string()
    .min(1, "URLは必須です")
    .url("有効なURLを入力してください"),
  title: z.string().min(1, "タイトルは必須です"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateBookmarkSchema = z.object({
  url: z
    .string()
    .url("有効なURLを入力してください")
    .optional()
    .or(z.literal("")),
  title: z.string().min(1, "タイトルは必須です").optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
