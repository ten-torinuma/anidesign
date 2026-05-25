"use client";

import React, { useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card";
import { cn } from "../lib/utils";

export interface LoginFormProps {
  /** Google サインインボタン押下時 */
  onGoogleSignIn?: () => Promise<void>;
  /** メール/パスワードでのサインイン */
  onEmailSignIn?: (email: string, password: string) => Promise<void>;
  /** ロード中（ボタンを無効化） */
  isLoading?: boolean;
  /** エラーメッセージ */
  error?: string;
  /** サービス名（タイトルに表示） */
  serviceName?: string;
  className?: string;
}

export function LoginForm({
  onGoogleSignIn,
  onEmailSignIn,
  isLoading = false,
  error,
  serviceName,
  className,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loading = isLoading || submitting;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onEmailSignIn || loading) return;
    setSubmitting(true);
    try {
      await onEmailSignIn(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!onGoogleSignIn || loading) return;
    setSubmitting(true);
    try {
      await onGoogleSignIn();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader className="text-center">
        <CardTitle>{serviceName ? `${serviceName} にログイン` : "ログイン"}</CardTitle>
        <CardDescription>アカウント情報を入力してください</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {onGoogleSignIn && (
          <>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <GoogleIcon />
              Google でログイン
            </Button>

            {onEmailSignIn && (
              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">または</span>
                <div className="h-px flex-1 bg-border" />
              </div>
            )}
          </>
        )}

        {onEmailSignIn && (
          <form id="login-form" onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </form>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </CardContent>

      {onEmailSignIn && (
        <CardFooter>
          <Button
            type="submit"
            form="login-form"
            className="w-full"
            disabled={loading}
          >
            {loading ? "ログイン中..." : "ログイン"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

LoginForm.displayName = "LoginForm";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
