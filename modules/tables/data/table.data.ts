import { Table } from "../types/table.types";

export const mockTables: Table[] = [
  { id: "1", label: "A:9", seats: 8, status: "empty" },
  { id: "2", label: "B:1", seats: 8, status: "empty" },
  { id: "3", label: "B:2", seats: 6, status: "empty" },
  { id: "4", label: "A:12", seats: 6, status: "empty" },
  { id: "5", label: "B:3", seats: 6, status: "empty" },
  { id: "6", label: "B:4", seats: 6, status: "empty" },
  { id: "7", label: "VIP1:9", seats: 8, status: "empty" },
  { id: "8", label: "VIP2:1", seats: 8, status: "empty" },
  { id: "9", label: "C:2", seats: 6, status: "empty" },
  { id: "10", label: "D:12", seats: 6, status: "empty" },
  { id: "11", label: "C:3", seats: 6, status: "occupied" },
  { id: "12", label: "C:4", seats: 6, status: "occupied" },
];