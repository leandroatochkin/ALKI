import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NotFound, LoginPage, SignUpPage } from './views/index.ts'
import Dashboard from './components/Dashboard/Dashboard.tsx'
import Properties from './views/Properties/Properties.tsx'


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
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
