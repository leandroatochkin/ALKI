export interface SignUpDTO {
    email: string
    password: string
    firstName: string
    middleName?: string
    lastName: string
    phoneNumber: string
    countryCode: string
    country: string
    state: string
    city: string
    addressLine1: string
    addressLine2?: string
    postalCode: string
}