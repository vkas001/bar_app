import { create } from 'zustand';
import { MenuItemMerged, MenuItemUnit } from '@/modules/menu/types/menu.types';
import { CartItem } from '@/modules/orders/types/order.types';

interface CartStore {
    items: CartItem[];
    addItem: (item: MenuItemMerged, unit: MenuItemUnit, quantity: number, note?: string) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addItem: (item, unit, quantity, note) => {
        const existing = get().items.find(
            (i) => i.item_id === item.item_id &&
                i.selectedUnit.item_unit_id === unit.item_unit_id
        );

        if (existing) {
            set((state) => ({
                items: state.items.map((i) =>
                    i.item_id === item.item_id &&
                        i.selectedUnit.item_unit_id === unit.item_unit_id
                        ? {
                            ...i,
                            quantity: i.quantity + quantity,
                            price: (i.quantity + quantity) * i.pricePerQuantity,
                        }
                        : i
                ),
            }));
        } else {
            set((state) => ({
                items: [
                    ...state.items,
                    {
                        id: Date.now(),
                        item_id: item.item_id,
                        name: item.item_name,
                        quantity,
                        pricePerQuantity: unit.item_unit_price,
                        price: unit.item_unit_price * quantity,
                        selectedUnit: {
                            id: unit.id,
                            item_unit_id: unit.item_unit_id,
                            item_unit_name: unit.item_unit_name,
                            item_unit_title: unit.item_unit_title,
                            item_unit_price: unit.item_unit_price,
                        },
                        note,
                    },
                ],
            }));
        }
    },

    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

    updateQuantity: (id, quantity) =>
        set((state) => ({
            items: quantity <= 0
                ? state.items.filter((i) => i.id !== id)
                : state.items.map((i) =>
                    i.id === id
                        ? { ...i, quantity, price: quantity * i.pricePerQuantity }
                        : i
                ),
        })),

    clearCart: () => set({ items: [] }),
    getTotal: () => get().items.reduce((sum, i) => sum + i.price, 0),
    getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));