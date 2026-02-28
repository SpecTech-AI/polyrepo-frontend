/**
 * バックエンドAPIの型定義
 *
 * ポリレポ構成では、バックエンドとフロントエンドで型を共有するパッケージがないため、
 * バックエンドの DTO（src/application/dto/bookmark-dto.ts）を手動で複製する。
 *
 * ⚠️ バックエンドの型を変更した場合は、このファイルも手動で更新する必要がある。
 *    型の不一致（型ドリフト）を防ぐため、バックエンドの型定義を参照元として管理すること。
 */

/** バックエンドから返却されるブックマークのレスポンス型 */
export type Bookmark = {
  id: number;
  url: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

/** ブックマーク作成リクエストの型 */
export type CreateBookmarkInput = {
  url: string;
  title: string;
  description?: string;
  tags?: string[];
};

/** ブックマーク更新リクエストの型 */
export type UpdateBookmarkInput = {
  url?: string;
  title?: string;
  description?: string;
  tags?: string[];
};

/** バックエンドのAPIレスポンスのラッパー型 */
export type ApiResponse<T> = {
  data: T;
};

/** バックエンドのエラーレスポンス型 */
export type ApiError = {
  error: string;
};
