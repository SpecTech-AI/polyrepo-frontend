import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold hover:opacity-80">
          Bookmark Manager
        </Link>
        <nav>
          <Link
            href="/new"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            追加
          </Link>
        </nav>
      </div>
    </header>
  );
}
