export interface UserPreview {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    address: string;
    monthlyRevenue: number
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