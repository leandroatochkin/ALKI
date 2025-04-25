import { Payment } from "./payments";

export interface TenantDTO {
    tenantId: string;
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
    contractPaymentFrequency: string; 
    payments: Payment[];
    pets: number;
    children: number;
    smoking: boolean;
    propertyId?: string;
}

export interface AssignTenantDTO {
    tenantId: string;
    propertyId: string;
}