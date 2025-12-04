import type { BlockType } from "../../types";
import { useGrid } from "../../context";
import { Checkbox } from "../../../Checkbox";

import { ToolbarButton } from "./ToolbarButton";
import "./Toolbar.css";

interface ToolbarBlock {
  type: BlockType;
  label: string;
  icon: string;
}

const BLOCK_TYPES: ToolbarBlock[] = [
  {
    type: "line-chart",
    label: "Line Chart",
    icon: "📈",
  },
  {
    type: "bar-chart",
    label: "Bar Chart",
    icon: "📊",
  },
  {
    type: "text",
    label: "Text",
    icon: "📝",
  },
];

export function Toolbar() {
  const { addBlock, autoTrimEmptyRows, setAutoTrimEmptyRows } = useGrid();

  return (
    <div className="toolbar">
      <div className="toolbar__section">
        <div className="toolbar__label">Add Widget:</div>
        <div className="toolbar__buttons">
          {BLOCK_TYPES.map(({ type, label, icon }) => {
            return (
              <ToolbarButton
                key={type}
                label={label}
                icon={icon}
                onClick={() => addBlock(type)}
              />
            );
          })}
        </div>
      </div>
      <div className="toolbar__section">
        <Checkbox
          label="Remove empty rows"
          checked={autoTrimEmptyRows}
          onChange={(e) => setAutoTrimEmptyRows(e.target.checked)}
        />
      </div>
    </div>
  );
}
