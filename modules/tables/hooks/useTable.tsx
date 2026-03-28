import { getToken } from '@/shared/storage/secure';
import { useEffect, useState } from 'react';
import { Table, TableType } from '../types/table.types';

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableTypes, setTableTypes] = useState<TableType[]>([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      const token = await getToken();

      const res = await fetch(`${baseUrl}/pos/tables`, {
        headers: {
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      });


      const text = await res.text();

      const json = JSON.parse(text);


      if (!json.data) {

      }

      const mapped: Table[] = (json.data || []).map((table: any) => ({
        ...table,
        id: String(table.id),
        label: table.name,
        seats: table.capacity,
      }));

      setTables(mapped);

      const uniqueTypes: TableType[] = [
        'AllTypes',
        ...Array.from(new Set(mapped.map((t) => t.table_type.name))).sort(),
      ];
      setTableTypes(uniqueTypes);

    } catch (err) {

      setError('Failed to load tables');
    } finally {
      setLoading(false);
    }
  };

  const toggleTableSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return { tables, tableTypes, selectedIds, toggleTableSelection, loading, error, refetch: fetchTables };
};