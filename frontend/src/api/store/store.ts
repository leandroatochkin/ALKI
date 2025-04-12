import type { Store } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { inventoriesApiSlice } from "../InventoriesApiSlice"
import { propertiesApiSlice } from "../PropertiesApiSlice"
import { tenantsApiSlice } from "../TenantsApiSlice"

export const store: Store = configureStore({
    reducer: {
      //onboard: onboardReducer,
      //dashboard: dashboardSlice,
      //staff: staffSlice,
      //patient: patientSlice,
      //[authApi.reducerPath]: authApi.reducer,
      [inventoriesApiSlice.reducerPath]: inventoriesApiSlice.reducer,
      [propertiesApiSlice.reducerPath]: propertiesApiSlice.reducer,
      [tenantsApiSlice.reducerPath]: tenantsApiSlice.reducer,
      
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        inventoriesApiSlice.middleware,
        propertiesApiSlice.middleware,
        tenantsApiSlice.middleware,
      ),
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch