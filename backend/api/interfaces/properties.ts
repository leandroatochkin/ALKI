import { TenantDTO } from "./tenants";
import { Inventory } from "./inventories";

export interface Service {
    id: string;
    type: string; // e.g., "cleaning", "maintenance", "security"
    payer: string; // e.g., "tenant", "owner"
}

export interface PropertyDTO {
    id: string;
    userId: string;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    occupied?: boolean;
    tenantData?: TenantDTO
    type: number; // 0: house, 1: apartment, 2: store/commercial, 3: Land, 4: office, 5: industrial, 6: other
    inventory?: Inventory;
    services?: Service[];
}