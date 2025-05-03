import { Payment } from "./PaymentsApiSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "./store/token";

export interface TenantsResponse {
  tenants: TenantDTO[]
}

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

export interface TenantTermination {
    tenantId: string;
    terminationReason: string;
}

export const tenantsApiSlice = createApi({
    reducerPath: "tenantsApiSlice",
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
      getTenantById: builder.query<TenantDTO, string>({
        query: id => ({
          url: `api/tenants/get-tenant-by-id/${id}`,
          method: "GET",
        }),
      }),
      getTenantsByUserId: builder.query<TenantsResponse, string>({
        query: userId => ({
          url: `/get-tenants?userId=${userId}`,
          method: "GET",
        }),
      }),
      postTenant: builder.mutation<void, TenantDTO>({
        query: payload => ({
          url: `/add-tenant`,
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
      deleteTenant: builder.mutation<void, TenantTermination>({
        query: payload => ({
          url: `/delete-tenant`,
          method: "POST",
          body: payload,
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
