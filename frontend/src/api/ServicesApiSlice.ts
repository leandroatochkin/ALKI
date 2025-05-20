import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "./store/token";

export interface ServiceDTO {
    serviceId: string;
    propertyId: string;
    serviceName: string;
    serviceCost: number;
    serviceResponsibility: string;
    serviceDescription: string;
}

export const servicesApiSlice = createApi({
    reducerPath: "servicesApiSlice",
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
      getServicesByPropertyId: builder.query<ServiceDTO[], string>({
        query: propertyId => ({
          url: `/get-services-by-property-id?propertyId=${propertyId}`,
          method: "GET",
        }),
      }),
      postServices: builder.mutation<void, ServiceDTO[]>({
        query: payload => ({
          url: `/add-services`,
          method: "POST",
          body: payload,
        }),
      }),
      deleteService: builder.mutation<void, string>({
        query: serviceId => ({
            url: `/delete-service?serviceId=${serviceId}`,
            method: "DELETE",
        })
      })
    })
})

export const {
  useGetServicesByPropertyIdQuery,
  usePostServicesMutation,
  useDeleteServiceMutation
 } = servicesApiSlice
