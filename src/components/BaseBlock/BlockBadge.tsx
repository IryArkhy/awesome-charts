import type { BlockType } from "../../types";

interface BlockBadgeProps {
  type: BlockType;
}
export function BlockBadge({ type }: BlockBadgeProps) {
  return (
    <span className="base-block__type-badge">{type.replace("-", " ")}</span>
  );
}
