import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-bold">404 - ページが見つかりません</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        トップに戻る
      </Link>
    </div>
  );
}
