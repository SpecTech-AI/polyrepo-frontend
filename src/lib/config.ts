/**
 * API URL設定
 *
 * ポリレポ構成では、フロントエンドとバックエンドが別オリジンで動作する。
 * さらにDocker Compose環境では、サーバーサイド（SSR）とクライアントサイド（ブラウザ）で
 * 異なるURLを使う必要がある。
 *
 * - apiUrl: Server Component / Server Actions から使う（Docker内部ネットワーク対応）
 * - publicApiUrl: Client Component（ブラウザ）から使う（localhost経由）
 */
export const config = {
  /** サーバーサイドのAPI URL（Server Component, Server Actions用） */
  apiUrl: process.env.API_URL || "http://localhost:3001",
  /** クライアントサイドのAPI URL（ブラウザ用） */
  publicApiUrl:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
} as const;
