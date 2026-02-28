import type { Bookmark } from "@/lib/types";
import { BookmarkCard } from "./bookmark-card";

type BookmarkListProps = {
  bookmarks: Bookmark[];
  activeTag?: string;
};

export function BookmarkList({ bookmarks, activeTag }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p className="text-lg">ブックマークがありません</p>
        <p className="mt-1 text-sm">
          {activeTag
            ? `タグ「${activeTag}」に一致するブックマークが見つかりません`
            : "最初のブックマークを追加しましょう"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          activeTag={activeTag}
        />
      ))}
    </div>
  );
}
