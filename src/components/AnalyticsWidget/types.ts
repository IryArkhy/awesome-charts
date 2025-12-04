export type BlockType = "line-chart" | "bar-chart" | "text";

export interface Block {
  id: string;
  type: BlockType;
  row: number;
  col: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

export type GridCell = Block | null;
