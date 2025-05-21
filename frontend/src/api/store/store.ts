// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer"; // 👈 NEW import!
import { inventoriesApiSlice } from "../InventoriesApiSlice";
import { propertiesApiSlice } from "../PropertiesApiSlice";
import { tenantsApiSlice } from "../TenantsApiSlice";
import { paymentsApiSlice } from "../PaymentsApiSlice";
import { organizationsApiSlice } from "../OrganizationsSlice";
import { userApiSlice } from "../UsersSlice";
import { servicesApiSlice } from "../ServicesApiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dashboard"], // 👈 only persist dashboard (and maybe later others)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 👈 ADD THIS or persist will complain about non-serializable data
    }).concat(
      inventoriesApiSlice.middleware,
      propertiesApiSlice.middleware,
      tenantsApiSlice.middleware,
      paymentsApiSlice.middleware,
      organizationsApiSlice.middleware,
      userApiSlice.middleware,
      servicesApiSlice.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
