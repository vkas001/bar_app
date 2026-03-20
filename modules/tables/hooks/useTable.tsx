import { useState } from "react";
import { mockTables } from "../data/table.data";
import { Table } from "../types/table.types";

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedIds, setSelectedIds] = useState<string[]>(["4"]);

  const toggleTableSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return {
    tables,
    selectedIds,
    toggleTableSelection,
  };
};