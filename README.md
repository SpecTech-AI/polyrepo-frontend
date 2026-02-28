# Bookmark Manager — Frontend (Next.js)

ブックマーク管理ツールのフロントエンドリポジトリです。
**ポリレポ構成**（FE/BE 分離）を学ぶための上級者向けチュートリアルです。

## アーキテクチャ

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│  Next.js     │────▶│  Hono API    │────▶ PostgreSQL
│              │     │  :3000       │     │  :3001       │     :5432
└──────────────┘     └──────────────┘     └──────────────┘
                     (このリポジトリ)      (別リポジトリ)
```

- **フロントエンド（このリポジトリ）**: Next.js App Router + Tailwind CSS
- **バックエンド（別リポジトリ）**: Hono + Prisma + PostgreSQL

## 前提条件

- Node.js 20 以上
- npm
- Docker & Docker Compose（Docker 起動時）
- バックエンドリポジトリ（polyrepo-backend）

## セットアップ

### ローカル開発

```bash
# 1. リポジトリをクローン
git clone <このリポジトリのURL>
cd polyrepo-frontend

# 2. 依存関係をインストール
npm install

# 3. 環境変数を設定
cp .env.example .env.local

# 4. バックエンドが起動していることを確認（port 3001）

# 5. 開発サーバーを起動
npm run dev
```

`http://localhost:3000` でアクセスできます。

### Docker Compose で起動（バックエンドリポジトリから）

バックエンドリポジトリの `docker-compose.yml` でフロントエンドも含めて一括起動できます。

```bash
cd ../polyrepo-backend
docker compose up --build
```

## チュートリアル（ステップ別ブランチ）

各ステップはGitブランチとして管理されています。順番にチェックアウトして学習してください。

| ステップ | ブランチ | 内容 |
|----------|----------|------|
| Step 01 | `step/01` | プロジェクト初期化と環境設定 |
| Step 02 | `step/02` | APIクライアントと型定義 |
| Step 03 | `step/03` | ブックマーク一覧ページ（Server Component） |
| Step 04 | `step/04` | ブックマーク作成（Server Actions + Form） |
| Step 05 | `step/05` | 編集・削除機能（CRUD完成） |
| Step 06 | `step/06` | Docker対応 |
| Step 07 | `step/07` | 仕上げとREADME |

```bash
# 例: Step 03 から始める場合
git checkout step/03
npm install
npm run dev
```

## ステップ解説

### Step 01 — プロジェクト初期化と環境設定

Next.js App Router + TypeScript + Tailwind CSS でプロジェクトを作成します。

**学習ポイント: デュアル API URL**

ポリレポ構成の最大のポイントは、サーバーサイドとクライアントサイドで異なるAPIのURLを使い分けることです。

```
NEXT_PUBLIC_API_URL=http://localhost:3001  # ブラウザ用
API_URL=http://localhost:3001              # サーバー用（Docker時は http://backend:3001）
```

- `NEXT_PUBLIC_` プレフィックス付き → ビルド時にクライアントバンドルに埋め込まれる
- プレフィックスなし → サーバーサイドでのみ参照可能

Docker Compose 環境では、サーバーサイドは Docker 内部ネットワーク（`http://backend:3001`）を使い、ブラウザはポートマッピング経由（`http://localhost:3001`）でアクセスします。

### Step 02 — APIクライアントと型定義

**学習ポイント: ポリレポでの型管理**

モノレポなら共通パッケージで型を共有できますが、ポリレポでは**手動で型を複製**する必要があります。

```
バックエンド: src/application/dto/bookmark-dto.ts（源泉）
フロントエンド: src/lib/types.ts（複製）
```

型ドリフト（型の不一致）を防ぐために：
- バックエンドの型を「正」として管理する
- 将来的には OpenAPI / Swagger での自動生成を検討

### Step 03 — ブックマーク一覧ページ

Server Component でバックエンド API を直接呼び出します。`useEffect` や `useState` は不要です。

**学習ポイント**:
- Server Component によるデータフェッチ
- URL サーチパラメータによるタグフィルター
- `loading.tsx` / `error.tsx` による状態管理

### Step 04 — ブックマーク作成

Server Actions を使って、フォーム送信をサーバーサイドで処理します。

**学習ポイント: Server Actions の流れ**

```
ブラウザ → Server Action → API クライアント → バックエンド API → DB
```

フルスタック Next.js（モノレポ）なら Server Action から直接 DB にアクセスしますが、ポリレポでは**必ずバックエンドの API を経由**します。これがポリレポ構成の核心的なパターンです。

### Step 05 — 編集・削除機能

動的ルート（`/bookmarks/[id]/edit`）と、Server/Client Component の境界を学びます。

**学習ポイント: Server/Client Component の使い分け**

- Server Component: データフェッチ、ページレイアウト
- Client Component: ユーザーインタラクション（`onClick`、`confirm` ダイアログ）

### Step 06 — Docker 対応

Next.js のマルチステージ Docker ビルドを作成します。

**学習ポイント**:
- `output: "standalone"` による軽量イメージ
- バックエンドの `docker-compose.yml` からの参照方法
- Docker 内部ネットワーク vs ホストポートマッピング

### Step 07 — 仕上げ

カスタム 404 ページ、ナビゲーション改善、README 整備を行います。

## ディレクトリ構成（最終形）

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # ブックマーク一覧
│   ├── loading.tsx         # ローディングUI
│   ├── error.tsx           # エラーUI
│   ├── not-found.tsx       # 404ページ
│   ├── new/
│   │   └── page.tsx        # 新規作成フォーム
│   └── bookmarks/
│       └── [id]/
│           └── edit/
│               └── page.tsx # 編集フォーム
├── components/
│   ├── header.tsx          # ヘッダーナビゲーション
│   ├── bookmark-list.tsx   # 一覧表示
│   ├── bookmark-card.tsx   # カード表示
│   ├── bookmark-form.tsx   # 共用フォーム（作成/編集）
│   ├── tag-badge.tsx       # タグバッジ
│   └── delete-button.tsx   # 削除ボタン
└── lib/
    ├── config.ts           # デュアルAPI URL設定
    ├── types.ts            # バックエンド型の複製
    ├── api.ts              # APIクライアント
    ├── actions.ts          # Server Actions
    └── validations.ts      # Zodバリデーション
```

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| バリデーション | Zod |
| コンテナ | Docker (multi-stage build) |

## API エンドポイント（バックエンド）

| メソッド | パス | 説明 |
|----------|------|------|
| GET | `/api/health` | ヘルスチェック |
| GET | `/api/bookmarks` | ブックマーク一覧 |
| GET | `/api/bookmarks?tag=xxx` | タグでフィルター |
| GET | `/api/bookmarks/:id` | ブックマーク詳細 |
| POST | `/api/bookmarks` | ブックマーク作成 |
| PUT | `/api/bookmarks/:id` | ブックマーク更新 |
| DELETE | `/api/bookmarks/:id` | ブックマーク削除 |

## ポリレポ vs モノレポ

このチュートリアルはポリレポ構成です。モノレポとの違い：

| 観点 | ポリレポ | モノレポ |
|------|----------|----------|
| 型共有 | 手動複製 | 共通パッケージ |
| FE→DB | API経由のみ | 直接アクセス可 |
| デプロイ | 独立デプロイ | 一括/独立 |
| CI/CD | リポジトリ単位 | パス単位 |
| Docker | 複数リポジトリ参照 | 単一コンテキスト |

## ライセンス

MIT
