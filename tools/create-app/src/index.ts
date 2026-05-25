#!/usr/bin/env node
import * as p from "@clack/prompts";
import pc from "picocolors";
import fs from "node:fs";
import path from "node:path";

async function main() {
  console.log();
  p.intro(pc.bgMagenta(pc.white(" create-eni-app ")));

  const answers = await p.group(
    {
      name: () =>
        p.text({
          message: "サービス名を入力してください",
          placeholder: "my-service",
          validate: (v) => {
            if (!v) return "サービス名は必須です";
            if (!/^[a-z0-9-]+$/.test(v)) return "小文字・数字・ハイフンのみ使用できます";
          },
        }),
      useAuth: () =>
        p.confirm({
          message: "@eni/auth（Firebase 認証）を含めますか？",
          initialValue: true,
        }),
      useApiClient: () =>
        p.confirm({
          message: "@eni/api-client（EniDB GraphQL）を含めますか？",
          initialValue: true,
        }),
      hue: () =>
        p.text({
          message: "ブランドカラーの hue 値（0-360）を入力してください",
          placeholder: "280（デフォルト = #625ed6 indigo）",
          initialValue: "280",
          validate: (v) => {
            const n = Number(v);
            if (Number.isNaN(n) || n < 0 || n > 360) return "0〜360 の数値を入力してください";
          },
        }),
    },
    { onCancel: () => { p.cancel("キャンセルしました"); process.exit(0); } },
  );

  const targetDir = path.resolve(process.cwd(), answers.name as string);

  if (fs.existsSync(targetDir)) {
    p.cancel(`${answers.name} ディレクトリがすでに存在します`);
    process.exit(1);
  }

  const s = p.spinner();
  s.start("ファイルを生成中...");

  generateProject(targetDir, answers as ProjectAnswers);

  s.stop("生成完了！");

  p.note(
    [
      `cd ${answers.name}`,
      "pnpm install",
      "pnpm dev",
    ].join("\n"),
    "次のステップ",
  );

  p.outro(pc.green("✓ プロジェクトが作成されました"));
}

interface ProjectAnswers {
  name: string;
  useAuth: boolean;
  useApiClient: boolean;
  hue: string;
}

function generateProject(dir: string, answers: ProjectAnswers) {
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.join(dir, "src/app"), { recursive: true });
  fs.mkdirSync(path.join(dir, "src/lib"), { recursive: true });

  const eniDeps: Record<string, string> = {
    "@eni/ui": "latest",
  };
  if (answers.useAuth) eniDeps["@eni/auth"] = "latest";
  if (answers.useApiClient) eniDeps["@eni/api-client"] = "latest";

  // package.json
  fs.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify({
      name: answers.name,
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start" },
      dependencies: {
        next: "^15.0.0",
        react: "^19.0.0",
        "react-dom": "^19.0.0",
        ...eniDeps,
        ...(answers.useAuth ? { firebase: "^11.0.0" } : {}),
        ...(answers.useApiClient ? { "@apollo/client": "^3.12.0", graphql: "^16.0.0" } : {}),
      },
      devDependencies: {
        "@types/node": "^22.0.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        tailwindcss: "^4.0.0",
        "@tailwindcss/vite": "^4.0.0",
        typescript: "^5.7.0",
      },
    }, null, 2),
  );

  // globals.css
  fs.writeFileSync(
    path.join(dir, "src/app/globals.css"),
    [
      `@import "@eni/ui/globals.css";`,
      ``,
      `/* ブランドカラーの上書き */`,
      `:root {`,
      `  --eni-hue: ${answers.hue};`,
      `}`,
      ``,
    ].join("\n"),
  );

  // layout.tsx
  const layoutImports = [
    `import type { Metadata } from "next";`,
    `import "./globals.css";`,
    ...(answers.useAuth ? [`import { AuthProvider } from "@eni/auth";`] : []),
  ].join("\n");

  const layoutChildren = answers.useAuth
    ? `<AuthProvider>{children}</AuthProvider>`
    : `{children}`;

  fs.writeFileSync(
    path.join(dir, "src/app/layout.tsx"),
    [
      layoutImports,
      ``,
      `export const metadata: Metadata = { title: "${answers.name}" };`,
      ``,
      `export default function RootLayout({ children }: { children: React.ReactNode }) {`,
      `  return (`,
      `    <html lang="ja">`,
      `      <body>${layoutChildren}</body>`,
      `    </html>`,
      `  );`,
      `}`,
      ``,
    ].join("\n"),
  );

  // firebase.ts (auth あり)
  if (answers.useAuth) {
    fs.writeFileSync(
      path.join(dir, "src/lib/firebase.ts"),
      [
        `import { initFirebase } from "@eni/auth";`,
        ``,
        `initFirebase({`,
        `  apiKey:      process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,`,
        `  authDomain:  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,`,
        `  projectId:   process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,`,
        `});`,
        ``,
      ].join("\n"),
    );

    fs.writeFileSync(
      path.join(dir, ".env.local.example"),
      [
        `NEXT_PUBLIC_FIREBASE_API_KEY=`,
        `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=`,
        `NEXT_PUBLIC_FIREBASE_PROJECT_ID=`,
        ...(answers.useApiClient ? [`NEXT_PUBLIC_ENIDB_URL=`, `NEXT_PUBLIC_TENANT_ID=`] : []),
        ``,
      ].join("\n"),
    );
  }

  // tsconfig.json
  fs.writeFileSync(
    path.join(dir, "tsconfig.json"),
    JSON.stringify({
      extends: "@eni/config/tsconfig/next.json",
      compilerOptions: { paths: { "@/*": ["./src/*"] } },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    }, null, 2),
  );
}

main().catch(console.error);
