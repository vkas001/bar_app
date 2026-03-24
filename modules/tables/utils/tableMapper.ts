import { Table, TableApiResponse } from '../types/table.types';

export const mapTableResponse = (response: TableApiResponse): Table => {
    const { data } = response;
    return {
        ...data,
        label: data.name,        
        seats: data.capacity,      
    };
};