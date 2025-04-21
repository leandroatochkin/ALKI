export interface User {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string
    email: string;
    phoneNumber: string;
    countryCode: string;
    addressLine1: string;
    addressLine2?: string;
    monthlyRevenue: number
    state: string
    city: string
    postalCode: string
    autoCalculateMRR?: boolean
    theme: string
    permissions: string[]
    isPremium: boolean
    parentUserId?: string 
}

export interface Auth {
    emailAuth: string;
    sub: string
}

export interface AuthResponse {
    auth: Auth
    body: User
}

