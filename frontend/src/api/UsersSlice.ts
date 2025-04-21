import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { useAuth0 } from "@auth0/auth0-react";



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
    password?: string
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

const backend = import.meta.env.VITE_SERVER_HOST

export const userApiSlice = createApi({
    reducerPath: "userApiSlice",
    baseQuery: fetchBaseQuery({
      baseUrl: backend,
      prepareHeaders: async (headers, { getState }) => {
        try {
          // Dynamically import Auth0, outside hooks
          const { getAccessTokenSilently } = await import('./hooks/getToken') // <- we'll create this
          const token = await getAccessTokenSilently()
            console.log(token)
          if (token) {
            headers.set("authorization", `Bearer ${token}`)
          }
        } catch (error) {
          console.error("Error fetching access token", error)
        }
  
        return headers
      },
    }),
    endpoints: (builder) => ({
      signUpUser: builder.mutation<void, UserPreview>({
        query: (payload) => ({
          url: `/signup`,
          method: "POST",
          body: payload,
        }),
      }),
    }),
  })
  
  export const {
    useSignUpUserMutation,
  } = userApiSlice