"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBookmark, updateBookmark, deleteBookmark } from "./api";
import { createBookmarkSchema, updateBookmarkSchema } from "./validations";

export type ActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

function parseTags(tagsString: string | null): string[] {
  if (!tagsString) return [];
  return tagsString
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function createBookmarkAction(
  _prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    url: formData.get("url") as string,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
    tags: parseTags(formData.get("tags") as string | null),
  };

  const parsed = createBookmarkSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      error: "入力内容に問題があります",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await createBookmark(parsed.data);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "作成に失敗しました",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateBookmarkAction(
  id: number,
  _prevState: ActionState | undefined,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    url: formData.get("url") as string,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || undefined,
    tags: parseTags(formData.get("tags") as string | null),
  };

  const parsed = updateBookmarkSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      error: "入力内容に問題があります",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await updateBookmark(id, parsed.data);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "更新に失敗しました",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteBookmarkAction(id: number): Promise<void> {
  await deleteBookmark(id);
  revalidatePath("/");
  redirect("/");
}
