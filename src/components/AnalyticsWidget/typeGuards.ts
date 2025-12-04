import type { Block, GridPosition } from "./types";

export function isBlock(cell: Block | null): cell is Block {
  return cell !== null;
}

export function isValidPosition(value: unknown): value is GridPosition {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const pos = value as Record<string, unknown>;

  return (
    typeof pos.row === "number" &&
    typeof pos.col === "number" &&
    Number.isInteger(pos.row) &&
    Number.isInteger(pos.col) &&
    pos.row >= 0 &&
    pos.col >= 0
  );
}
