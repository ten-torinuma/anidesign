import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:     "border-transparent bg-primary text-primary-foreground",
        outline:     "border-primary/40 bg-transparent text-primary",
        subtle:      "border-transparent bg-primary/8 dark:bg-primary/20 text-primary",
        secondary:   "border-transparent bg-secondary dark:bg-primary/15 text-secondary-foreground dark:text-primary",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        success:     "border-transparent bg-success-subtle text-success-text",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

Badge.displayName = "Badge";

export { badgeVariants };
