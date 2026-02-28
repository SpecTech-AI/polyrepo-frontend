import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookmark } from "@/lib/api";
import { updateBookmarkAction } from "@/lib/actions";
import { BookmarkForm } from "@/components/bookmark-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBookmarkPage({ params }: Props) {
  const { id } = await params;
  const bookmarkId = Number(id);

  if (isNaN(bookmarkId)) {
    notFound();
  }

  let bookmark;
  try {
    bookmark = await getBookmark(bookmarkId);
  } catch {
    notFound();
  }

  const boundAction = updateBookmarkAction.bind(null, bookmarkId);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← 一覧に戻る
        </Link>
        <h2 className="mt-2 text-xl font-bold">ブックマークを編集</h2>
      </div>
      <div className="max-w-lg">
        <BookmarkForm
          action={boundAction}
          initialData={bookmark}
          submitLabel="更新する"
        />
      </div>
    </div>
  );
}
