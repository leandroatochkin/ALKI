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
}

export const mockUser = {
    id: 'user01',
    firstName: 'leandro',
    lastName: 'atochkin',
    email: 'mail@mail.com',
    phoneNumber: '2235111111',
    countryCode: '54',
    address: 'direccion',
    monthlyRevenue: 120000

}