import type { BlockType, Block, GridPosition } from "../../../types";
import type { GridCell } from "../../../types";
import { generateBlockId } from "../../../utils";

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

export function placeBlockInGrid(
  grid: GridCell[][],
  block: Block,
  position: GridPosition
): GridCell[][] {
  return grid.map((row, rowIndex) =>
    row.map((cell, colIndex) =>
      rowIndex === position.row && colIndex === position.col ? block : cell
    )
  );
}

export function findBlockById(grid: GridCell[][], id: string): Block | null {
  for (const row of grid) {
    for (const cell of row) {
      if (cell?.id === id) {
        return cell;
      }
    }
  }
  return null;
}

export function moveBlockInGrid(
  grid: GridCell[][],
  id: string,
  blockToMove: Block,
  newPosition: GridPosition
): GridCell[][] {
  return grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell?.id === id) return null;

      if (rowIndex === newPosition.row && colIndex === newPosition.col) {
        return {
          ...blockToMove,
          row: newPosition.row,
          col: newPosition.col,
        };
      }
      return cell;
    })
  );
}
