import { TenantDTO } from "./TenantsApiSlice";

export interface Service {
    id: string;
    type: string; // e.g., "cleaning", "maintenance", "security"
    payer: string; // e.g., "tenant", "owner"
}

export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
}

export interface Payment {
    id: string;
    amount: number;
    date: string;
    method: number; // 0: bank transfer, 1: cash, 2: credit card, 3: debit card, 4: other
    period: string;
    status: number; // 0: paid, 1: pending, 2: debt
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
    inventory?: InventoryItem[];
    services?: Service[];
}

export const mockProperties: PropertyDTO[] = [
    {
      id: "prop-001",
      userId: "user-abc",
      title: "Downtown Loft",
      description: "Cozy modern loft in the heart of the city.",
      address: "123 Main St, Capital City",
      occupied: true,
      city: 'ciudad',
      state: 'provincia',
      country: 'Argentina',
      tenantData: {
        id: "tenant-001",
        propietorId: "user-abc",
        firstName: "Lucas",
        lastName: "Gómez",
        email: "lucas.gomez@example.com",
        phoneNumber: "541123456789",
        observations: "Prefers email communication.",
        contractStartDate: "2024-01-01",
        contractEndDate: "2024-12-31",
        contractStatus: "active",
        contractId: "contract-001",
        contractType: "residential",
        contractValue: 120000,
        contractCurrency: "ARS",
        contractPaymentMethod: 0,
        contractPaymentFrequency: "monthly",
        propertyId: "prop-001",
        payments: [
          {
            id: "pay-001",
            amount: 10000,
            date: "2024-01-05",
            method: 0,
            period: "2024-01",
            status: 0
          },
          {
            id: "pay-002",
            amount: 10000,
            date: "2024-02-05",
            method: 0,
            period: "2024-02",
            status: 0
          }
        ],
        pets: 1,
        children: 0,
        smoking: false
      },
        type: 0 // Residential
    },
    {
      id: "prop-002",
      userId: "user-abc",
      title: "Seaside Apartment",
      description: "Ocean view, 2BR apartment with balcony.",
      address: "456 Beach Ave, Mar del Plata",
      city: 'ciudad',
      state: 'provincia',
      country: 'Argentina',
      occupied: true,
      tenantData: {
        id: "tenant-002",
        propietorId: "user-abc",

        firstName: "Valentina",
        lastName: "Ruiz",
        email: "valen.ruiz@example.com",
        phoneNumber: "5491122334455",
        contractStartDate: "2023-06-01",
        contractEndDate: "2024-05-31",
        contractStatus: "active",
        contractId: "contract-002",
        contractType: "residential",
        contractValue: 150000,
        contractCurrency: "ARS",
        contractPaymentMethod: 1,
        contractPaymentFrequency: "monthly",
        propertyId: "prop-002",
        payments: [
          {
            id: "pay-003",
            amount: 12500,
            date: "2024-03-01",
            method: 1,
            period: "2024-03",
            status: 0
          }
        ],
        pets: 0,
        children: 2,
        smoking: true
      },
      type: 1 // Residential
    },
    {
      id: "prop-003",
      userId: "user-abc",
      title: "Country House",
      description: "Quiet retreat with large garden space.",
      address: "789 Campo Rd, Córdoba",
      city: 'ciudad',
      state: 'provincia',
      country: 'Argentina',
      occupied: true,
      tenantData: {
        id: "tenant-003",
        propietorId: "user-abc",

        firstName: "Joaquín",
        lastName: "Pérez",
        email: "joaquin.perez@example.com",
        phoneNumber: "541167890123",
        observations: "Has a dog and works from home.",
        contractStartDate: "2022-03-01",
        contractEndDate: "2025-03-01",
        contractStatus: "active",
        contractId: "contract-003",
        contractType: "residential",
        contractValue: 180000,
        contractCurrency: "USD",
        contractPaymentMethod: 2,
        contractPaymentFrequency: "quarterly",
        propertyId: "prop-003",
        payments: [
          {
            id: "pay-004",
            amount: 45000,
            date: "2024-04-01",
            method: 2,
            period: "Q2 2024",
            status: 1
          }
        ],
        pets: 1,
        children: 1,
        smoking: false
      },
      type: 2 // Residential
    }
  ];
  