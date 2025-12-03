import { use } from "react";

import { getCachedData } from "../../utils";
import type { Block } from "../../types";

import { BaseBlock } from "../BaseBlock";

interface DataBlockProps<T> {
  block: Block;
  dataUrl: string;
  children: (data: T) => React.ReactNode;
}

export function DataBlock<T>({ dataUrl, block, children }: DataBlockProps<T>) {
  const data = use(getCachedData<T>(dataUrl));

  return <BaseBlock block={block}>{children(data)}</BaseBlock>;
}
