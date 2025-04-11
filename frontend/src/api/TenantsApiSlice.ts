import { Payment } from "./PropertiesApiSlice";

export interface TenantDTO {
    id: string;
    propietorId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    observations?: string;
    contractStartDate: string;
    contractEndDate: string;
    contractStatus: string;
    contractId: string;
    contractType: string;
    contractValue: number;
    contractCurrency: string;
    contractPaymentMethod: number;
    contractPaymentFrequency: string; // "monthly", "biweekly", "weekly", etc.
    payments: Payment[];
    pets: number;
    children: number;
    smoking: boolean;
    propertyId?: string;
}