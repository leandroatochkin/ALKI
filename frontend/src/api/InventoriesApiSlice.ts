import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "./store/token";
//import { fetchAuthSession } from "aws-amplify/auth"

export interface InventoryItem {
    id?: string;
    name: string;
    quantity: number;
    inventoryId?: string; // Optional, if you want to link it to a specific inventory
}

export interface Inventory {
    id?: string;
    propertyId: string;
    date: string;
    items: InventoryItem[];
}

export interface NewItemsDTO {
      propertyId: string;
      items: InventoryItem[];
}

export const inventoriesApiSlice = createApi({
    reducerPath: "inventoriesApiSlice",
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
      getInventoryById: builder.query<Inventory, string>({
        query: id => ({
          url: `api/inventories/get-inventory-by-id/${id}`,
          method: "GET",
        }),
      }),
      getInventoryByProperty: builder.query<InventoryItem[], string>({
        query: propertyId => ({
          url: `/get-inventory?propertyId=${propertyId}`,
          method: "GET",
        }),
      }),
      postInventoryItems: builder.mutation<void, NewItemsDTO>({
        query: payload => ({
          url: `/add-inventory-items`,
          method: "POST",
          body: payload,
        }),
      }),
      updateInventory: builder.mutation<void, Inventory>({
        query: payload => ({
          url: `api/inventories`,
          method: "PUT",
          body: payload,
        }),
      }),
      deleteInventory: builder.mutation<void, string>({
        query: inventoryId => ({
          url: `/delete-inventory?inventoryId=${inventoryId}`,
          method: "DELETE",
        }),
      }),
      deleteInventoryItems: builder.mutation<void, string[]>({
        query: payload => ({
          url: `/delete-inventory-items`,
          method: "POST",
          body: payload
        }),
      }),
    })
})

export const { 
    useGetInventoryByIdQuery, 
    useGetInventoryByPropertyQuery,
    usePostInventoryItemsMutation,
    useUpdateInventoryMutation,
    useDeleteInventoryMutation,
    useDeleteInventoryItemsMutation 
} = inventoriesApiSlice

export const mockInventories: Inventory[] = [
    {
      id: "inv-001",
      propertyId: "prop-001",
      date: "2025-04-10",
      items: [
        { id: "item-001-1", name: "Heladera", quantity: 1 },
        { id: "item-001-2", name: "Microondas", quantity: 1 },
        { id: "item-001-3", name: "Cocina a gas", quantity: 1 },
        { id: "item-001-4", name: "Pava eléctrica", quantity: 1 },
        { id: "item-001-5", name: "Tostadora", quantity: 1 },
        { id: "item-001-6", name: "Juego de ollas", quantity: 3 },
        { id: "item-001-7", name: "Cubiertos", quantity: 24 },
        { id: "item-001-8", name: "Platos", quantity: 12 },
        { id: "item-001-9", name: "Vasos", quantity: 10 },
        { id: "item-001-10", name: "Sartenes", quantity: 2 },
        { id: "item-001-11", name: "Mesa de cocina", quantity: 1 },
        { id: "item-001-12", name: "Sillas de cocina", quantity: 4 },
        { id: "item-001-13", name: "Cuchillo chef", quantity: 1 },
        { id: "item-001-14", name: "Tupperwares", quantity: 5 },
        { id: "item-001-15", name: "Rallador", quantity: 1 },
        { id: "item-001-16", name: "Colador", quantity: 1 },
        { id: "item-001-17", name: "Tabla para picar", quantity: 2 },
        { id: "item-001-18", name: "Horno eléctrico", quantity: 1 },
        { id: "item-001-19", name: "Licuadora", quantity: 1 },
        { id: "item-001-20", name: "Escurridor de platos", quantity: 1 },
      ],
    },
    {
      id: "inv-002",
      propertyId: "prop-002",
      date: "2025-04-10",
      items: [
        { id: "item-002-1", name: "Sofá", quantity: 1 },
        { id: "item-002-2", name: "Televisor", quantity: 1 },
        { id: "item-002-3", name: "Control remoto", quantity: 2 },
        { id: "item-002-4", name: "Mesa ratona", quantity: 1 },
        { id: "item-002-5", name: "Lámpara de pie", quantity: 1 },
        { id: "item-002-6", name: "Cuadros decorativos", quantity: 3 },
        { id: "item-002-7", name: "Cortinas", quantity: 2 },
        { id: "item-002-8", name: "Alfombra", quantity: 1 },
        { id: "item-002-9", name: "Reproductor de música", quantity: 1 },
        { id: "item-002-10", name: "Estante", quantity: 1 },
        { id: "item-002-11", name: "Plantas de interior", quantity: 2 },
        { id: "item-002-12", name: "Ventilador de pie", quantity: 1 },
        { id: "item-002-13", name: "Espejo decorativo", quantity: 1 },
        { id: "item-002-14", name: "Sillas adicionales", quantity: 2 },
        { id: "item-002-15", name: "Porta llaves", quantity: 1 },
        { id: "item-002-16", name: "Mueble TV", quantity: 1 },
        { id: "item-002-17", name: "Router Wi-Fi", quantity: 1 },
        { id: "item-002-18", name: "Revistero", quantity: 1 },
        { id: "item-002-19", name: "Cojines", quantity: 4 },
        { id: "item-002-20", name: "Manta decorativa", quantity: 1 },
      ],
    },
    {
      id: "inv-003",
      propertyId: "prop-003",
      date: "2025-04-10",
      items: [
        { id: "item-003-1", name: "Cama matrimonial", quantity: 1 },
        { id: "item-003-2", name: "Colchón", quantity: 1 },
        { id: "item-003-3", name: "Sábanas", quantity: 2 },
        { id: "item-003-4", name: "Almohadas", quantity: 4 },
        { id: "item-003-5", name: "Acolchado", quantity: 1 },
        { id: "item-003-6", name: "Mesa de luz", quantity: 2 },
        { id: "item-003-7", name: "Lámpara de noche", quantity: 2 },
        { id: "item-003-8", name: "Ropero", quantity: 1 },
        { id: "item-003-9", name: "Espejo de cuerpo entero", quantity: 1 },
        { id: "item-003-10", name: "Cortinas", quantity: 1 },
        { id: "item-003-11", name: "Ventilador de techo", quantity: 1 },
        { id: "item-003-12", name: "Escritorio", quantity: 1 },
        { id: "item-003-13", name: "Silla de escritorio", quantity: 1 },
        { id: "item-003-14", name: "Lámpara de escritorio", quantity: 1 },
        { id: "item-003-15", name: "Cajonera", quantity: 1 },
        { id: "item-003-16", name: "Caja de seguridad", quantity: 1 },
        { id: "item-003-17", name: "Perchero", quantity: 1 },
        { id: "item-003-18", name: "Despertador", quantity: 1 },
        { id: "item-003-19", name: "Cuadro decorativo", quantity: 2 },
        { id: "item-003-20", name: "Alfombra", quantity: 1 },
      ],
    },
  ];
  