export interface Payment {
    id: string;
    amount: number;
    date: string;
    method: string;
    period: string;
    status: string;
}

export interface Tenant {
    id: string;
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
    contractPaymentMethod: string;
    contractPaymentFrequency: string;
    payments: Payment[];
    pets: number;
    children: number;
    smoking: boolean;
}

export interface PropertyDTO {
    id: string;
    userId: string;
    title: string;
    description: string;
    address: string;
    tenantData?: Tenant
}

export const mockProperties: PropertyDTO[] = [
    {
      id: "prop-001",
      userId: "user-abc",
      title: "Downtown Loft",
      description: "Cozy modern loft in the heart of the city.",
      address: "123 Main St, Capital City",
      tenantData: {
        id: "tenant-001",
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
        contractPaymentMethod: "bank transfer",
        contractPaymentFrequency: "monthly",
        payments: [
          {
            id: "pay-001",
            amount: 10000,
            date: "2024-01-05",
            method: "bank transfer",
            period: "2024-01",
            status: "paid"
          },
          {
            id: "pay-002",
            amount: 10000,
            date: "2024-02-05",
            method: "bank transfer",
            period: "2024-02",
            status: "paid"
          }
        ],
        pets: 1,
        children: 0,
        smoking: false
      }
    },
    {
      id: "prop-002",
      userId: "user-abc",
      title: "Seaside Apartment",
      description: "Ocean view, 2BR apartment with balcony.",
      address: "456 Beach Ave, Mar del Plata",
      tenantData: {
        id: "tenant-002",
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
        contractPaymentMethod: "cash",
        contractPaymentFrequency: "monthly",
        payments: [
          {
            id: "pay-003",
            amount: 12500,
            date: "2024-03-01",
            method: "cash",
            period: "2024-03",
            status: "paid"
          }
        ],
        pets: 0,
        children: 2,
        smoking: true
      }
    },
    {
      id: "prop-003",
      userId: "user-abc",
      title: "Country House",
      description: "Quiet retreat with large garden space.",
      address: "789 Campo Rd, Córdoba",
      tenantData: {
        id: "tenant-003",
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
        contractPaymentMethod: "credit card",
        contractPaymentFrequency: "quarterly",
        payments: [
          {
            id: "pay-004",
            amount: 45000,
            date: "2024-04-01",
            method: "credit card",
            period: "Q2 2024",
            status: "pending"
          }
        ],
        pets: 1,
        children: 1,
        smoking: false
      }
    }
  ];
  