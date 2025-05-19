import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "./store/token";



export interface UserPreview {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string
    email?: string;
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
    permissions: string
    isPremium: boolean
    parentUserId?: string 
    password?: string
}

export interface UserInfo {
    userInfo: UserPreview
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
    permissions: ['admin'] ,
    isPremium: false
}



export const userApiSlice = createApi({
    reducerPath: "userApiSlice",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_SERVER_HOST,
      prepareHeaders: async (headers) => {
        try {
          // Dynamically import Auth0, outside hooks
          const token = getToken()
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
      onboardUser: builder.mutation<void, UserPreview>({
        query: (payload) => ({
          url: `/newuser`,
          method: "POST",
          body: payload,
        }),
      }),
      getUserData: builder.query<UserInfo, string>({
        query: (id) => ({
          url: `/user?id=${id}`,
          method: "GET",
        }),
      }),
      updateUserData: builder.mutation<void, UserPreview>({
        query: (payload) => ({
          url: `/update-user`,
          method: "POST",
          body: payload,
        }),
      })
    }),
  })
  
  export const {
    useOnboardUserMutation,
    useGetUserDataQuery,
    useUpdateUserDataMutation,
  } = userApiSlice