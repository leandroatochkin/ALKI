import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "./store/token";


export interface Payment {
    id: string;
    tenantId: string
    amount: number;
    date: string;
    method: number; // 0: bank transfer, 1: cash, 2: credit card, 3: debit card, 4: other
    period: string;
    status: number; // 0: paid, 1: pending, 2: debt
}


export const paymentsApiSlice = createApi({
    reducerPath: "paymentsApiSlice",
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
    endpoints: builder => ({
      getTenantPaymentsByTenantId: builder.query<Payment[], string>({
        query: tenantId => ({
          url: `/get-payments-by-tenantId?tenantId=${tenantId}`,
          method: "GET",
        }),
      }),
      getPaymentsByUserId: builder.query<Payment[], string>({
        query: userId => ({
          url: `api/payments/get-payments-by-userId/${userId}`,
          method: "GET",
        }),
      }),
      getPaymentById: builder.query<Payment, string>({
        query: paymentId => ({
          url: `api/payments/${paymentId}`,
          method: "GET",
        }),
      }),
      postPayments: builder.mutation<void, Payment[]>({
        query: payload => ({
          url: `api/payments`,
          method: "POST",
          body: payload,
        }),
      }),
    })
})

export const { 
useGetPaymentByIdQuery,
useGetPaymentsByUserIdQuery,
useGetTenantPaymentsByTenantIdQuery,
usePostPaymentsMutation
} = paymentsApiSlice