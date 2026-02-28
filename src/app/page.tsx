export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-2xl font-bold">Bookmark Manager</h2>
      <p className="text-gray-600 dark:text-gray-400">
        ブックマーク管理ツールのフロントエンドです。
      </p>
      <p className="text-sm text-gray-500">
        バックエンドAPI: {process.env.API_URL || "http://localhost:3001"}
      </p>
    </div>
  );
}
