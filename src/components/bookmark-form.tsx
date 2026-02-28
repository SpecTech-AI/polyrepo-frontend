"use client";

import { useActionState } from "react";
import type { ActionState } from "@/lib/actions";
import type { Bookmark } from "@/lib/types";

type BookmarkFormProps = {
  action: (
    state: ActionState | undefined,
    formData: FormData,
  ) => Promise<ActionState>;
  initialData?: Bookmark;
  submitLabel: string;
};

export function BookmarkForm({
  action,
  initialData,
  submitLabel,
}: BookmarkFormProps) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label htmlFor="url" className="mb-1 block text-sm font-medium">
          URL <span className="text-red-500">*</span>
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          defaultValue={initialData?.url}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
        />
        {state?.fieldErrors?.url && (
          <p className="mt-1 text-xs text-red-500">
            {state.fieldErrors.url[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialData?.title}
          placeholder="ブックマークのタイトル"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
        />
        {state?.fieldErrors?.title && (
          <p className="mt-1 text-xs text-red-500">
            {state.fieldErrors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium"
        >
          説明
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialData?.description}
          placeholder="ブックマークの説明（任意）"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
        />
      </div>

      <div>
        <label htmlFor="tags" className="mb-1 block text-sm font-medium">
          タグ
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={initialData?.tags.join(", ")}
          placeholder="react, typescript, nextjs（カンマ区切り）"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900"
        />
        <p className="mt-1 text-xs text-gray-500">
          カンマ区切りで複数入力できます
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "送信中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
