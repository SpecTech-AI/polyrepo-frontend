import Link from "next/link";
import { createBookmarkAction } from "@/lib/actions";
import { BookmarkForm } from "@/components/bookmark-form";

export default function NewBookmarkPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← 一覧に戻る
        </Link>
        <h2 className="mt-2 text-xl font-bold">ブックマークを追加</h2>
      </div>
      <div className="max-w-lg">
        <BookmarkForm action={createBookmarkAction} submitLabel="追加する" />
      </div>
    </div>
  );
}
