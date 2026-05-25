# eni-platform

AniService Frontend Platform — Design System Monorepo

## Getting started

```bash
# 依存インストール
pnpm install

# 開発サーバー（全アプリ）
pnpm dev

# Storybook
pnpm storybook

# ビルド
pnpm build

# lint
pnpm lint

# 型チェック
pnpm typecheck
```

## Structure

```
packages/   # 再利用可能な資産（@eni/* として Artifact Registry に publish）
apps/       # 消費者（Next.js アプリ、Storybook、Docs）
tools/      # 開発ツール（CLI、Figma 同期）
docs/adr/   # Architecture Decision Records
```

## Packages

| Package | 役割 |
|---|---|
| `@eni/config` | tsconfig / Tailwind preset / Biome 設定 |
| `@eni/tokens` | デザイントークン（色・スペース・タイポ・モーション） |
| `@eni/ui` | UIコンポーネント (L4) + パターン (L5) |
| `@eni/icons` | アイコン（lucide + 自作） |
| `@eni/illustrations` | イラスト（空状態・エラー画面） |
| `@eni/motion` | framer-motion プリセット |
| `@eni/auth` | 認証フック（EniTrance 接続） |
| `@eni/api-client` | GraphQL クライアント（EniDB codegen） |
| `@eni/schemas` | Zod スキーマ |
| `@eni/test-utils` | テストユーティリティ |

## New service in 10 minutes

```bash
pnpm create @eni/app my-new-service
```
