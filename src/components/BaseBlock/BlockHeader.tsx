import type { BlockType } from "../../types";

import { BlockBadge } from "./BlockBadge";

interface BlockHeaderProps {
  showActions: boolean;
  type: BlockType;
  onDelete: () => void;
}

export function BlockHeader({ showActions, type, onDelete }: BlockHeaderProps) {
  return (
    <div className="base-block__header">
      <BlockBadge type={type} />

      {showActions && (
        <button
          className="base-block__delete"
          onClick={onDelete}
          aria-label="Delete block"
          title="Delete block"
        >
          ✕
        </button>
      )}
    </div>
  );
}
