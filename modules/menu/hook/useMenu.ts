import { getToken } from '@/shared/storage/secure';
import { useEffect, useState } from 'react';
import { MenuCategoryWithItems } from '../types/menu.types';
import { mapMenuItems } from '../utils/menuMapper';

export const useMenu = () => {
    const [categories, setCategories] = useState<MenuCategoryWithItems[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoryWithItems | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            setLoading(true);
            const baseUrl = process.env.EXPO_PUBLIC_API_URL;
            const token = await getToken();

            const res = await fetch(`${baseUrl}/pos/menu`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : '',
                },
            });

            const json = await res.json();
            const cats = mapMenuItems(json.data.items || []);

            setCategories(cats);
            setSelectedCategory(cats[0]);
        } catch (err) {
            console.error('Error fetching menu:', err);
            setError('Failed to load menu');
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        selectedCategory,
        setSelectedCategory,
        loading,
        error,
        refetch: fetchMenu,
    };
};
