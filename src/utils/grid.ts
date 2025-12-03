import type { GridCell, GridPosition } from "../types";

export const GRID_COLUMNS = 3;

function generateRow() {
  return Array(GRID_COLUMNS).fill(null);
}

export const initializeGrid = (rows: number = 1): GridCell[][] => {
  return Array.from({ length: rows }, () => generateRow());
};

export const findFirstEmptyCell = (
  blocks: GridCell[][]
): GridPosition | null => {
  for (let row = 0; row < blocks.length; row++) {
    for (let col = 0; col < GRID_COLUMNS; col++) {
      if (blocks[row][col] === null) {
        return { row, col };
      }
    }
  }
  return null;
};

export const isCellEmpty = (
  blocks: GridCell[][],
  row: number,
  col: number
): boolean => {
  if (row < 0 || row >= blocks.length || col < 0 || col >= GRID_COLUMNS) {
    return false;
  }

  return blocks[row][col] === null;
};

export const generateBlockId = (): string => {
  return String(crypto.randomUUID());
};

export const isRowEmpty = (row: GridCell[]): boolean => {
  return row.every((cell) => cell === null);
};

export const removeTrailingEmptyRows = (blocks: GridCell[][]): GridCell[][] => {
  if (blocks.length === 0) {
    return blocks;
  }

  let lastNonEmptyIndex = blocks.length - 1;

  while (lastNonEmptyIndex >= 0 && isRowEmpty(blocks[lastNonEmptyIndex])) {
    lastNonEmptyIndex--;
  }

  return blocks.slice(0, lastNonEmptyIndex + 1);
};

export const removeAllEmptyRows = (blocks: GridCell[][]): GridCell[][] => {
  if (blocks.length === 0) {
    return blocks;
  }

  const nonEmptyRows = blocks.filter((row) => !isRowEmpty(row));

  return nonEmptyRows.length > 0 ? nonEmptyRows : initializeGrid(0);
};

interface GridCapacity {
  gridWithCapacity: GridCell[][];
  emptyCell: GridPosition;
}
/**
 * Ensure the grid has enough rows to accommodate a new block
 */
export const ensureGridCapacity = (blocks: GridCell[][]): GridCapacity => {
  let gridWithCapacity = blocks;

  if (blocks.length === 0) {
    gridWithCapacity = initializeGrid(1);

    return { gridWithCapacity, emptyCell: { row: 0, col: 0 } };
  }

  const emptyCell = findFirstEmptyCell(gridWithCapacity);

  if (emptyCell === null) {
    gridWithCapacity = [...blocks, generateRow()];

    return {
      gridWithCapacity,
      emptyCell: { row: gridWithCapacity.length - 1, col: 0 },
    };
  }

  return { gridWithCapacity, emptyCell };
};
