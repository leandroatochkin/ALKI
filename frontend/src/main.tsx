import { StrictMode } from 'react'
import { Provider } from "react-redux"
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
import { Auth0Provider } from '@auth0/auth0-react';
import AuthInit from './views/Auth/AuthInit.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { mockUser } from './api/UsersSlice.ts'
import PostLogin from './views/Login/PostLogin.tsx'
import { Onboarding } from './views/Onboarding/Onboarding.tsx'
import { store, persistor } from './api/store/store.ts'

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
  {
    path: "/auth-redirect",
    element: (
      <PostLogin />
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/onboarding",
    element: (
      <Onboarding />
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/error",
    element: (
      <NotFound />
    ),
    errorElement: <NotFound />,
  },
  

])

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT

console.log(domain)
console.log(clientId)




const theme = getTheme(mockUser.theme === "dark" || mockUser.theme === "light" ? mockUser.theme : "light")

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
    domain= {domain}
    clientId={clientId}
    authorizationParams={{
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      redirect_uri: `${import.meta.env.VITE_FE_CLIENT}/auth-redirect`,
       ui_locales: "es"
    }}
    cacheLocation='localstorage'
    useRefreshTokens
  >
    
     <ThemeProvider theme={theme}>
     <CssBaseline />
     
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     <AuthInit />
     </PersistGate>
     <RouterProvider router={router} />
     </Provider>
     
     </ThemeProvider>

    </Auth0Provider>
  </StrictMode>,
)
