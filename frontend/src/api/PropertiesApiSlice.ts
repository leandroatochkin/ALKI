import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { TenantDTO } from "./TenantsApiSlice";
import { Inventory } from "./InventoriesApiSlice";
import { getToken } from "./store/token";

export interface Service {
    id: string;
    type: string; // e.g., "cleaning", "maintenance", "security"
    payer: string; // e.g., "tenant", "owner"
}




export interface PropertyDTO {
    propId: string;
    userId: string;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    country: string;
    occupied?: boolean;
    tenantData?: TenantDTO | null; // tenant data if occupied
    type: number; // 0: house, 1: apartment, 2: store/commercial, 3: Land, 4: office, 5: industrial, 6: other
    inventory?: Inventory;
    services?: Service[];
}

export const propertiesApiSlice = createApi({
    reducerPath: "propertiesApiSlice",
    baseQuery: fetchBaseQuery({
          baseUrl: import.meta.env.VITE_SERVER_HOST,
          prepareHeaders: async (headers) => {
            try {
              // Dynamically import Auth0, outside hooks
              const token = getToken()
              if (token) {
                headers.set("authorization", `Bearer ${token}`)
                console.log(headers)
              }
            } catch (error) {
              console.error("Error fetching access token", error)
            }
      
            return headers
          },
        }),
    endpoints: builder => ({
      getPropertyById: builder.query<PropertyDTO[], string>({
        query: propertyId => ({
          url: `/get-property-by-id?propertyId=${propertyId}`,
          method: "GET",
        }),
      }),
      getPropertiesByUserId: builder.query<PropertyDTO[], string>({
        query: userId => ({
          url: `/properties?id=${userId}`,
          method: "GET",
        }),
      }),
      postProperty: builder.mutation<void, PropertyDTO>({
        query: payload => ({
          url: `/add-property`,
          method: "POST",
          body: payload,
        }),
      }),
      updateProperty: builder.mutation<void, PropertyDTO>({
        query: payload => ({
          url: `/update-property`,
          method: "PUT",
          body: payload,
        }),
      }),
      deleteProperty: builder.mutation<void, string>({
        query: propId => ({
          url: `/delete-property?propId=${propId}`,
          method: "DELETE",
        }),
      }),
    })
})

export const {
  useGetPropertyByIdQuery,
  useGetPropertiesByUserIdQuery,
  usePostPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
 } = propertiesApiSlice


