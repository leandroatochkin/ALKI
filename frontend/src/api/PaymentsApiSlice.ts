import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


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
      baseUrl: import.meta.env.VITE_BASEAPIURL,
    //   prepareHeaders: async headers => {
    //     const session = await fetchAuthSession()
    //     const idToken = session.tokens?.idToken?.toString()
    //     if (idToken) {
    //       headers.set("authorization", `Bearer ${idToken}`)
    //       headers.set("Access-Control-Allow-Origin", "*")
    //       headers.set(
    //         "Access-Control-Allow-Headers",
    //         "Origin, X-Requested-With, Content-Type, Accept",
    //       )
    //     }
    //     return headers
    //   },
    }),
    endpoints: builder => ({
      getTenantPaymentsByTenantId: builder.query<Payment[], string>({
        query: tenantId => ({
          url: `api/payments/get-payments-by-tenantid/${tenantId}`,
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