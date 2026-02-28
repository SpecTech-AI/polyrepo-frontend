"use client";

import { useTransition } from "react";

type DeleteButtonProps = {
  action: () => Promise<void>;
};

export function DeleteButton({ action }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("このブックマークを削除しますか？")) return;
    startTransition(async () => {
      await action();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
    >
      {isPending ? "削除中..." : "削除"}
    </button>
  );
}
