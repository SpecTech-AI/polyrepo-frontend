import Link from "next/link";

type TagBadgeProps = {
  tag: string;
  active?: boolean;
};

export function TagBadge({ tag, active }: TagBadgeProps) {
  return (
    <Link
      href={active ? "/" : `/?tag=${encodeURIComponent(tag)}`}
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {tag}
    </Link>
  );
}
