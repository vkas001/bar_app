export interface MenuItemUnit {
    id: number;
    item_unit_id: number;
    item_unit_name: string;
    item_unit_title: string;
    item_unit_price: number;
}

export interface MenuCategory {
    id: number;
    name: string;
    description?: string | null;
}

export interface MenuItemGroup {
    id: number;
    name: string;
    description?: string | null;
}

export interface MenuLocation {
    id: number;
    name: string;
    code: string;
    is_active: number;
}

export interface MenuItem {
    id: number;
    item_id: number;
    item_name: string;
    item_category: MenuCategory;
    item_group: MenuItemGroup;
    item_unit_id: number;
    item_unit_name: string;
    item_unit_title: string;
    item_unit_price: number;
    location: MenuLocation;
    status: boolean;
}

export interface MenuItemMerged {
    id: number;
    item_id: number;
    item_name: string;
    item_category: MenuCategory;
    item_group: MenuItemGroup;
    item_unit_id: number;
    item_unit_name: string;
    item_unit_title: string;
    item_unit_price: number;
    units: MenuItemUnit[];
    location: MenuLocation;
    status: boolean;
    lowestPrice: number;
}

export interface MenuCategoryWithItems {
    id: number;
    name: string;
    items: MenuItemMerged[];
}