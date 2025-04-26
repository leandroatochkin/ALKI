// rootReducer.ts

import { combineReducers } from "@reduxjs/toolkit";
import { dashboardSlice } from "../../components/Dashboard/DashboardStore/DashboardStore";
import { inventoriesApiSlice } from "../InventoriesApiSlice";
import { propertiesApiSlice } from "../PropertiesApiSlice";
import { tenantsApiSlice } from "../TenantsApiSlice";
import { paymentsApiSlice } from "../PaymentsApiSlice";
import { organizationsApiSlice } from "../OrganizationsSlice";
import { userApiSlice } from "../UsersSlice";

const rootReducer = combineReducers({
  dashboard: dashboardSlice.reducer, // 👈
  [inventoriesApiSlice.reducerPath]: inventoriesApiSlice.reducer,
  [propertiesApiSlice.reducerPath]: propertiesApiSlice.reducer,
  [tenantsApiSlice.reducerPath]: tenantsApiSlice.reducer,
  [paymentsApiSlice.reducerPath]: paymentsApiSlice.reducer,
  [organizationsApiSlice.reducerPath]: organizationsApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
});

export default rootReducer;
