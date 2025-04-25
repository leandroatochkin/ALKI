export interface Payment {
    id: string;
    tenantId: string
    amount: number;
    date: string;
    method: number; // 0: bank transfer, 1: cash, 2: credit card, 3: debit card, 4: other
    period: string;
    status: number; // 0: paid, 1: pending, 2: debt
}