export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    inventoryId: string
}

export interface Inventory {
    id: string;
    propertyId: string;
    date: string;
}