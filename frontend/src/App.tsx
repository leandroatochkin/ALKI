import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { 
  NotFound, 
  LoginPage, 
  SignUpPage, 
  AddProperty, 
  AddTenant, 
  AddInventory, 
  Settings, 
  Organizations,
  Onboarding,
  PostLogin,
  Properties,
  TenantPayments 
} from './views/index'
import Dashboard from './components/Dashboard/Dashboard.tsx'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './utils/theme.ts'
import { useAppSelector } from './api/store/hooks.ts'



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
        <TenantPayments/>
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

export const App = () => {
  const userData = useAppSelector(state => state.dashboard.userData)
  const theme = getTheme(userData.theme === 'light' || userData.theme === 'dark' ? userData.theme : 'dark') // fallback if needed

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
