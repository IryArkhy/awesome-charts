import { createContext, useContext } from "react";

import type { BlockType, GridCell, GridPosition } from "../../../types";

export interface GridContextValue {
  blocks: GridCell[][];
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, newPosition: GridPosition) => void;
  removeEmptyRows: boolean;
  changeRemoveEmptyRows: (value: boolean) => void;
}

export const GridContext = createContext<GridContextValue | undefined>(
  undefined
);

export const useGrid = (): GridContextValue => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("useGrid must be used within GridProvider");
  }

  return context;
};
