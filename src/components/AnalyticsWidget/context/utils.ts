import type { BlockType, Block, GridPosition, GridCell } from "../types";
import { GRID_COLUMNS } from "../constants";

function generateRow(): GridCell[] {
  return Array(GRID_COLUMNS).fill(null);
}

export function generateBlockId(): string {
  return String(crypto.randomUUID());
}

export function initializeGrid(rows: number = 1): GridCell[][] {
  return Array.from({ length: rows }, () => generateRow());
}

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

export function findOrCreateEmptyCell(blocks: GridCell[][]): {
  grid: GridCell[][];
  position: GridPosition;
} {
  let grid = blocks;

  if (blocks.length === 0) {
    grid = initializeGrid(1);
    return { grid, position: { row: 0, col: 0 } };
  }

  const emptyCell = findFirstEmptyCell(grid);

  if (emptyCell === null) {
    grid = [...blocks, generateRow()];
    return {
      grid,
      position: { row: grid.length - 1, col: 0 },
    };
  }

  return { grid, position: emptyCell };
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

export function findFirstEmptyCell(blocks: GridCell[][]): GridPosition | null {
  for (let row = 0; row < blocks.length; row++) {
    for (let col = 0; col < GRID_COLUMNS; col++) {
      if (blocks[row][col] === null) {
        return { row, col };
      }
    }
  }
  return null;
}

export function isCellEmpty(
  blocks: GridCell[][],
  row: number,
  col: number
): boolean {
  if (row < 0 || row >= blocks.length || col < 0 || col >= GRID_COLUMNS) {
    return false;
  }

  return blocks[row][col] === null;
}

export function isRowEmpty(row: GridCell[]): boolean {
  return row.every((cell) => cell === null);
}

export function countRowEmptyCells(row: GridCell[]): number {
  return row.filter((cell) => cell === null).length;
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

export function removeBlockById(grid: GridCell[][], id: string): GridCell[][] {
  return grid.map((row) => row.map((cell) => (cell?.id === id ? null : cell)));
}

export function removeTrailingEmptyRows(blocks: GridCell[][]): GridCell[][] {
  if (blocks.length === 0) {
    return blocks;
  }

  let lastNonEmptyIndex = blocks.length - 1;

  while (lastNonEmptyIndex >= 0 && isRowEmpty(blocks[lastNonEmptyIndex])) {
    lastNonEmptyIndex--;
  }

  return blocks.slice(0, lastNonEmptyIndex + 1);
}

export function removeAllEmptyRows(blocks: GridCell[][]): GridCell[][] {
  if (blocks.length === 0) {
    return blocks;
  }

  const nonEmptyRows = blocks.filter((row) => !isRowEmpty(row));

  return nonEmptyRows.length > 0 ? nonEmptyRows : initializeGrid(0);
}
