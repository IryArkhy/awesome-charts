import type { PropsWithChildren } from "react";

export function GridRow({ children }: PropsWithChildren) {
  return <div className="grid__row">{children}</div>;
}
