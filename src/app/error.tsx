"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-12 text-center">
      <h2 className="text-xl font-bold text-red-600">エラーが発生しました</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        再試行
      </button>
    </div>
  );
}
