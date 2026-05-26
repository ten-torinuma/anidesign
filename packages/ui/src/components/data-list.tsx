"use client";

import React from "react";
import { cn } from "../lib/utils";

export interface DataListColumn {
  key: string;
  label: string;
  flex?: number;
  width?: number;
  minWidth?: number;
}

function columnStyle(col: DataListColumn): React.CSSProperties {
  if (col.flex !== undefined) {
    return { flex: col.flex, minWidth: col.minWidth ?? 0 };
  }
  return { width: col.width, minWidth: col.minWidth ?? col.width, flexShrink: 0 };
}

export interface DataListItemProps {
  cells: Record<string, React.ReactNode>;
  action?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  /** DataList から注入 — 直接指定不要 */
  columns?: DataListColumn[];
  /** DataList から注入 — 直接指定不要 */
  _actionWidth?: number;
}

export function DataListItem({
  cells,
  action,
  onClick,
  className,
  columns = [],
  _actionWidth,
}: DataListItemProps) {
  const isClickable = !!onClick;

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isClickable ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={cn(
        "flex items-center gap-4 px-5 py-4",
        isClickable && "cursor-pointer hover:bg-muted/25 transition-colors focus-visible:outline-none focus-visible:bg-muted/50",
        className,
      )}
    >
      {columns.map((col) => (
        <div key={col.key} style={columnStyle(col)} className="truncate text-sm text-foreground">
          {cells[col.key]}
        </div>
      ))}

      {_actionWidth !== undefined && (
        <div
          style={{ width: _actionWidth, flexShrink: 0 }}
          className="ml-auto flex justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          {action}
        </div>
      )}
    </div>
  );
}

export interface DataListProps {
  columns: DataListColumn[];
  children: React.ReactNode;
  /** action ボタンを持つ行がある場合に幅を指定（px）。ヘッダーと列が揃う */
  actionWidth?: number;
  className?: string;
}

export function DataList({ columns, children, actionWidth, className }: DataListProps) {
  const childrenWithColumns = React.Children.map(children, (child) => {
    if (React.isValidElement<DataListItemProps>(child) && child.type === DataListItem) {
      return React.cloneElement(child, { columns, ...(actionWidth !== undefined && { _actionWidth: actionWidth }) });
    }
    return child;
  });

  return (
    <div className={cn("bg-card border border-border rounded-lg overflow-hidden", className)}>
      {/* ヘッダー行 */}
      <div className="flex items-center gap-4 px-5 py-3 border-b border-border bg-accent/50">
        {columns.map((col) => (
          <div key={col.key} style={columnStyle(col)} className="text-xs font-medium text-muted-foreground truncate">
            {col.label}
          </div>
        ))}
        {actionWidth !== undefined && (
          <div style={{ width: actionWidth, flexShrink: 0 }} className="ml-auto" />
        )}
      </div>

      {/* データ行 */}
      <div className="divide-y divide-border">
        {childrenWithColumns}
      </div>
    </div>
  );
}

DataList.displayName = "DataList";
DataListItem.displayName = "DataListItem";
