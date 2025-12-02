import { useCallback, useState, type PropsWithChildren } from "react";

import {
  ensureGridCapacity,
  findFirstEmptyCell,
  initializeGrid,
} from "../../utils";
import type { BlockType, Block, GridCell } from "../../types";

import { GridContext, type GridContextValue } from "./grid-context";
import { generateNewBlock } from "./utils";

export const GridProvider = ({ children }: PropsWithChildren) => {
  const [blocks, setBlocks] = useState<GridCell[][]>(() => initializeGrid(0));

  const addBlock = useCallback((type: BlockType) => {
    setBlocks((currentBlocks) => {
      const { gridWithCapacity, emptyCell } = ensureGridCapacity(currentBlocks);

      const newBlock: Block = generateNewBlock({ ...emptyCell, type });

      return gridWithCapacity.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === emptyCell.row && colIndex === emptyCell.col
            ? newBlock
            : cell
        )
      );
    });
  }, []);

  const removeBlock = useCallback((id: string) => {
    setBlocks((currentBlocks) => {
      return currentBlocks.map((row) =>
        row.map((cell) => (cell?.id === id ? null : cell))
      );
    });
  }, []);

  const value: GridContextValue = {
    blocks,
    addBlock,
    removeBlock,
    findFirstEmptyCell: useCallback(() => findFirstEmptyCell(blocks), [blocks]),
  };

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};
