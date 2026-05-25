import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

// Phase 3 以降: AuthProvider など共通 Provider でラップ
function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from "@testing-library/react";
export { customRender as render };
