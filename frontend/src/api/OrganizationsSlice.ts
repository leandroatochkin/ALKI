import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export interface Member{
    memberId: string
    name: string
    email: string
    permissions: string[]
}

export interface Organization {
    organizationId: string
    creatorId: string
    name: string
    description: string
    members: Member[]
}

export const organizationsApiSlice = createApi({
    reducerPath: "organizationsApiSlice",
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
      getOrganizationsByUserId: builder.query<Organization[], string>({
        query: userId => ({
          url: `api/organizations/get-organizations-by-userid/${userId}`,
          method: "GET",
        }),
      }),
      getOrganizationById: builder.query<Organization, string>({
        query: organizationId => ({
          url: `api/payments/get-organization-by-id/${organizationId}`,
          method: "GET",
        }),
      }),
      createOrganization: builder.mutation<void, Organization>({
        query: payload => ({
          url: `api/organizations`,
          method: "POST",
          body: payload
        }),
      }),
      updateOrganization: builder.mutation<void, Organization>({
        query: payload => ({
          url: `api/organizations`,
          method: "PUT",
          body: payload,
        }),
      }),
      deleteOrganization: builder.mutation<void, string>({
        query: organizationId => ({
          url: `api/organizations/${organizationId}`,
          method: "DELETE",
        }),
      }),
    })
})

export const { 
useGetOrganizationsByUserIdQuery,
useGetOrganizationByIdQuery,
useCreateOrganizationMutation,
useUpdateOrganizationMutation,
useDeleteOrganizationMutation
} = organizationsApiSlice

export const mockOrganizations: Organization[] = [
    {
      organizationId: "org-001",
      creatorId: "user-001",
      name: "Alpha Innovations",
      description: "Tech-forward solutions for modern businesses.",
      members: [
        {
          memberId: "mem-001",
          name: "Alice Johnson",
          email: "alice@alpha.com",
          permissions: ["admin"]
        },
        {
          memberId: "mem-002",
          name: "Brian Smith",
          email: "brian@alpha.com",
          permissions: ["edit"]
        },
        {
          memberId: "mem-003",
          name: "Clara Lee",
          email: "clara@alpha.com",
          permissions: ["view"]
        }
      ]
    },
    {
      organizationId: "org-002",
      creatorId: "user-002",
      name: "Beta Collective",
      description: "A collaborative space for creators and innovators.",
      members: [
        {
          memberId: "mem-004",
          name: "David Kim",
          email: "david@beta.io",
          permissions: ["admin"]
        },
        {
          memberId: "mem-005",
          name: "Eva Martinez",
          email: "eva@beta.io",
          permissions: ["edit"]
        },
        {
          memberId: "mem-006",
          name: "Frank Wu",
          email: "frank@beta.io",
          permissions: ["view"]
        }
      ]
    }
  ]
  