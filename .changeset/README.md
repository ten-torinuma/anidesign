# Changesets

このディレクトリは [Changesets](https://github.com/changesets/changesets) が管理します。

パッケージを変更したら:

```bash
pnpm changeset        # 変更の種類（patch/minor/major）を記録
pnpm version-packages # package.json のバージョンを一括更新
pnpm release          # ビルド → Artifact Registry へ publish
```
