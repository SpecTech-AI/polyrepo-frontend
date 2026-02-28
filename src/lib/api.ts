import { config } from "./config";
import type {
  ApiResponse,
  Bookmark,
  CreateBookmarkInput,
  UpdateBookmarkInput,
} from "./types";

/**
 * APIクライアント
 *
 * Server Component / Server Actions からのみ呼び出す。
 * config.apiUrl を使用するため、Docker内部ネットワークでも動作する。
 */

const API_BASE = config.apiUrl;

class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiClientError(
      body.error || `APIエラー: ${res.status}`,
      res.status,
    );
  }
  return res.json();
}

/** ブックマーク一覧を取得する */
export async function getBookmarks(tag?: string): Promise<Bookmark[]> {
  const params = tag ? `?tag=${encodeURIComponent(tag)}` : "";
  const res = await fetch(`${API_BASE}/api/bookmarks${params}`, {
    next: { tags: ["bookmarks"] },
  });
  const json = await handleResponse<ApiResponse<Bookmark[]>>(res);
  return json.data;
}

/** 指定IDのブックマークを取得する */
export async function getBookmark(id: number): Promise<Bookmark> {
  const res = await fetch(`${API_BASE}/api/bookmarks/${id}`, {
    next: { tags: ["bookmarks", `bookmark-${id}`] },
  });
  const json = await handleResponse<ApiResponse<Bookmark>>(res);
  return json.data;
}

/** ブックマークを新規作成する */
export async function createBookmark(
  input: CreateBookmarkInput,
): Promise<Bookmark> {
  const res = await fetch(`${API_BASE}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await handleResponse<ApiResponse<Bookmark>>(res);
  return json.data;
}

/** ブックマークを更新する */
export async function updateBookmark(
  id: number,
  input: UpdateBookmarkInput,
): Promise<Bookmark> {
  const res = await fetch(`${API_BASE}/api/bookmarks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await handleResponse<ApiResponse<Bookmark>>(res);
  return json.data;
}

/** ブックマークを削除する */
export async function deleteBookmark(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/bookmarks/${id}`, {
    method: "DELETE",
  });
  await handleResponse(res);
}
