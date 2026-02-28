import Link from "next/link";
import { getBookmarks } from "@/lib/api";
import { BookmarkList } from "@/components/bookmark-list";

type Props = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { tag } = await searchParams;
  const bookmarks = await getBookmarks(tag);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">ブックマーク一覧</h2>
        {tag && (
          <p className="mt-1 text-sm text-gray-500">
            タグ: <span className="font-medium">{tag}</span>
            <Link href="/" className="ml-2 text-blue-600 hover:underline">
              クリア
            </Link>
          </p>
        )}
      </div>
      <BookmarkList bookmarks={bookmarks} activeTag={tag} />
    </div>
  );
}
