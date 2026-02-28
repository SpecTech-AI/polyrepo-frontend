export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 p-4 dark:border-gray-800"
        >
          <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-4 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="mt-3 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
            <div className="h-6 w-12 rounded-full bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
