import { MenuItem, MenuItemMerged, MenuCategoryWithItems } from '../types/menu.types';

export const mapMenuItems = (rawItems: MenuItem[]): MenuCategoryWithItems[] => {
    // Merge items with same item_id
    const itemMap = new Map<number, MenuItemMerged>();

    rawItems.forEach((item) => {
        if (!item.status) return;

        const unit = {
            id: item.id,
            item_unit_id: item.item_unit_id,
            item_unit_name: item.item_unit_name,
            item_unit_title: item.item_unit_title,
            item_unit_price: item.item_unit_price,
        };

        const existing = itemMap.get(item.item_id);

        if (existing) {
            existing.units.push(unit);
            existing.lowestPrice = Math.min(existing.lowestPrice, item.item_unit_price);
        } else {
            itemMap.set(item.item_id, {
                id: item.id,
                item_id: item.item_id,
                item_name: item.item_name,
                item_category: item.item_category,
                item_group: item.item_group,
                item_unit_id: item.item_unit_id,
                item_unit_name: item.item_unit_name,
                item_unit_title: item.item_unit_title,
                item_unit_price: item.item_unit_price,
                units: [unit],
                location: item.location,
                status: item.status,
                lowestPrice: item.item_unit_price,
            });
        }
    });

    const mergedItems = Array.from(itemMap.values());

    // Group by category
    const categoryMap = new Map<number, MenuCategoryWithItems>();
    mergedItems.forEach((item) => {
        const catId = item.item_category.id;
        if (!categoryMap.has(catId)) {
            categoryMap.set(catId, {
                id: catId,
                name: item.item_category.name,
                items: [],
            });
        }
        categoryMap.get(catId)!.items.push(item);
    });

    return [
        { id: -1, name: 'All Items', items: mergedItems },
        ...Array.from(categoryMap.values()),
    ];
};