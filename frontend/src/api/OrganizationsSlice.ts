import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "./store/token"


export interface Member{
    memberId: string
    name: string
    email: string
    permissions: string[]
}

export interface Organization {
    organizationId?: string
    userId?: string
    name: string
    description: string
}

export const organizationsApiSlice = createApi({
    reducerPath: "organizationsApiSlice",
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
      getOrganizationsByUserId: builder.query<Organization[], string>({
        query: userId => ({
          url: `/get-organizations-by-userId?userId=${userId}`,
          method: "GET",
        }),
      }),
      createOrganization: builder.mutation<void, Organization>({
        query: payload => ({
          url: `/create-organization`,
          method: "POST",
          body: payload
        }),
      }),
      updateOrganization: builder.mutation<void, Organization>({
        query: payload => ({
          url: `/update-organization`,
          method: "POST",
          body: payload
        }),
      }),
      deleteOrganization: builder.mutation<void, string>({
        query: organizationId => ({
          url: `/delete-organization?organizationId=${organizationId}`,
          method: "DELETE",
        }),
      }),
      getOrganizationMembersByOrganizationId: builder.query<Member[], string>({
        query: organizationId => ({
          url: `/get-organization-members-by-organizationId?organizationId=${organizationId}`,
          method: "GET",
        }),
      }),
      deleteOrganizationMember: builder.mutation<void, string>({
        query: memberId => ({
          url: `/delete-organization-member?memberId=${memberId}`,
          method: "DELETE",
        }),
      }),
    })
})

export const { 
useGetOrganizationsByUserIdQuery,
useCreateOrganizationMutation,
useDeleteOrganizationMutation,
useGetOrganizationMembersByOrganizationIdQuery,
useDeleteOrganizationMemberMutation,
useUpdateOrganizationMutation
} = organizationsApiSlice


  