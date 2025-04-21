export interface UserPreview {
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

export const mockUser = {
    id: 'user01',
    firstName: 'leandro',
    lastName: 'atochkin',
    email: 'mail@mail.com',
    phoneNumber: '2235111111',
    countryCode: '54',
    addressLine1: 'direccion',
    monthlyRevenue: 120000,
    autoCalculateMRR: true,
    state: 'buenos aires',
    city: 'dolores',
    postalCode: '1122',
    theme: 'dark',
    permissions: ['view'] ,
    isPremium: false
}