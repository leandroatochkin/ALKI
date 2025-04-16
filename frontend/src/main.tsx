import { StrictMode } from 'react'
import { Provider } from "react-redux"
import {store} from './api/store/store.ts'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { 
  NotFound, 
  LoginPage, 
  SignUpPage, 
  AddProperty, 
  AddTenant, 
  AddInventory, 
  Settings, 
  Organizations 
} from './views/index'
import Dashboard from './components/Dashboard/Dashboard.tsx'
import Properties from './views/Properties/Properties.tsx'
import TenantPayments from './views/Payments/TenantPayments.tsx'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './utils/theme.ts'



import { mockProperties } from './api/PropertiesApiSlice.ts'
import { mockUser } from './api/UsersSlice.ts'

const mockTenant = {
  tenantId: "tenant-001",
  propietorId: "propietor-001",
  firstName: "Lucas",
  lastName: "Gómez",
  email: "lucas.gomez@example.com",
  phoneNumber: "541123456789",
  observations: "Prefers email communication.",
  contractStartDate: "2024-01-01",
  contractEndDate: "2024-12-31",
  contractStatus: "active",
  contractId: "contract-001",
  contractType: "residential",
  contractValue: 120000,
  contractCurrency: "ARS",
  contractPaymentMethod: 0,
  contractPaymentFrequency: "monthly",
  payments: [
    {
      id: "pay-001",
      tenantId: "tenant-001",
      amount: 10000,
      date: "2024-01-05",
      method: 0,
      period: "2024-01",
      status: 0
    },
    {
      id: "pay-002",
      tenantId: "tenant-001",
      amount: 10000,
      date: "2024-02-05",
      method: 0,
      period: "2024-02",
      status: 0
    }
  ],
  pets: 1,
  children: 0,
  smoking: false
}


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage />
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: (
      <SignUpPage />
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: (
      <Dashboard>
        <Properties />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/payments",
    element: (
      <Dashboard>
        <TenantPayments tenant={mockTenant} />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/properties",
    element: (
      <Dashboard>
        <AddProperty />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/tenants",
    element: (
      <Dashboard>
        <AddTenant />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/inventories",
    element: (
      <Dashboard>
        <AddInventory />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/settings",
    element: (
      <Dashboard>
        <Settings />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/organizations",
    element: (
      <Dashboard>
        <Organizations />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
])



const theme = getTheme(mockUser.theme === "dark" || mockUser.theme === "light" ? mockUser.theme : "light")

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider theme={theme}>
     <CssBaseline />
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </ThemeProvider>
  </StrictMode>,
)
