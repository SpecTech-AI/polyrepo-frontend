import type { Bookmark } from "@/lib/types";
import { TagBadge } from "./tag-badge";

type BookmarkCardProps = {
  bookmark: Bookmark;
  activeTag?: string;
};

export function BookmarkCard({ bookmark, activeTag }: BookmarkCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{bookmark.title}</h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {bookmark.url}
          </a>
          {bookmark.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {bookmark.description}
            </p>
          )}
        </div>
      </div>
      {bookmark.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {bookmark.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} active={tag === activeTag} />
          ))}
        </div>
      )}
      <p className="mt-2 text-xs text-gray-400">
        {new Date(bookmark.createdAt).toLocaleDateString("ja-JP")}
      </p>
    </div>
  );
}
