"use client";

import { Input } from "../components/input";
import { Label } from "../components/label";
import { cn } from "../lib/utils";

export interface TenantIdFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const TENANT_ID_REGEX = /^[a-zA-Z][a-zA-Z0-9-]{3,19}$/;

function validate(value: string): string | null {
  if (!value) return null;
  if (!/^[a-zA-Z]/.test(value)) return "英字で始める必要があります";
  if (!/^[a-zA-Z0-9-]+$/.test(value)) return "英字・数字・ハイフンのみ使用できます";
  if (value.length < 4) return "4文字以上で入力してください";
  if (value.length > 20) return "20文字以内で入力してください";
  return null;
}

export function TenantIdField({ value, onChange, disabled, className }: TenantIdFieldProps) {
  const error = validate(value);
  const isValid = TENANT_ID_REGEX.test(value);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label>テナントID</Label>
      <p className="text-xs text-muted-foreground">英字で始まる4〜20文字（英字・数字・ハイフンのみ）</p>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例: enisia-corp"
        disabled={disabled}
        aria-invalid={!!error}
        className={error ? "border-destructive focus-visible:ring-destructive/30" : ""}
      />
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

TenantIdField.displayName = "TenantIdField";

export { TENANT_ID_REGEX };
