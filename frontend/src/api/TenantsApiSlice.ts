import { Payment } from "./PaymentsApiSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface TenantDTO {
    tenantId: string;
    propietorId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    observations?: string;
    contractStartDate: string;
    contractEndDate: string;
    contractStatus: string;
    contractId: string;
    contractType: string;
    contractValue: number;
    contractCurrency: string;
    contractPaymentMethod: number;
    contractPaymentFrequency: string; // "monthly", "biweekly", "weekly", etc.
    payments: Payment[];
    pets: number;
    children: number;
    smoking: boolean;
    propertyId?: string;
}

export interface AssignTenantDTO {
    tenantId: string;
    propertyId: string;
}

export const tenantsApiSlice = createApi({
    reducerPath: "tenantsApiSlice",
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
      getTenantById: builder.query<TenantDTO, string>({
        query: id => ({
          url: `api/tenants/get-tenant-by-id/${id}`,
          method: "GET",
        }),
      }),
      getTenantsByUserId: builder.query<TenantDTO[], string>({
        query: userId => ({
          url: `api/tenants/get-tenants-by-userid/${userId}`,
          method: "GET",
        }),
      }),
      postTenant: builder.mutation<void, TenantDTO>({
        query: payload => ({
          url: `api/tenants`,
          method: "POST",
          body: payload,
        }),
      }),
      updateTenant: builder.mutation<void, TenantDTO>({
        query: payload => ({
          url: `api/tenants`,
          method: "PUT",
          body: payload,
        }),
      }),
      deleteTenant: builder.mutation<void, string>({
        query: id => ({
          url: `api/tenants/${id}`,
          method: "DELETE",
        }),
      }),
      assignTenantToProperty: builder.mutation<void, AssignTenantDTO>({
        query: payload => ({
          url: `api/tenants/assign-tenant-to-property`,
          method: "POST",
          body: payload,
        }),
      }),
    })
})

export const {
    useGetTenantByIdQuery, 
    useGetTenantsByUserIdQuery,
    usePostTenantMutation,
    useUpdateTenantMutation,
    useDeleteTenantMutation,
    useAssignTenantToPropertyMutation,
 } = tenantsApiSlice
