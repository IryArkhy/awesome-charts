import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";

import type { GridCell } from "../types";
import { removeAllEmptyRows, removeTrailingEmptyRows } from "../context/utils";

type UseGridTrimmingArgs = {
  setGrid: Dispatch<SetStateAction<GridCell[][]>>;
};

type UseGridTrimmingResult = {
  trimEmptyRows: boolean;
  trimGrid: (grid: GridCell[][]) => GridCell[][];
  handleTrimToggle: (value: boolean) => void;
};

export const useGridTrimming = ({
  setGrid,
}: UseGridTrimmingArgs): UseGridTrimmingResult => {
  const [trimEmptyRows, setTrimEmptyRows] = useState(false);

  const trimGrid = useCallback<UseGridTrimmingResult["trimGrid"]>(
    (grid) =>
      trimEmptyRows ? removeAllEmptyRows(grid) : removeTrailingEmptyRows(grid),
    [trimEmptyRows]
  );

  const handleTrimToggle = useCallback(
    (value: boolean) => {
      setTrimEmptyRows(value);

      if (value) {
        setGrid((current) => removeAllEmptyRows(current));
      }
    },
    [setGrid]
  );

  return {
    trimEmptyRows,
    trimGrid,
    handleTrimToggle,
  };
};
