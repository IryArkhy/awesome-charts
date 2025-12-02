import type { BlockType, Block } from "../../types";
import { generateBlockId } from "../../utils";

export function generateNewBlock({
  row,
  col,
  type,
}: {
  row: number;
  col: number;
  type: BlockType;
}): Block {
  return { id: generateBlockId(), type, row, col };
}
