import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NotFound, LoginPage, SignUpPage } from './views/index.ts'
import Dashboard from './components/Dashboard/Dashboard.tsx'


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
        <h1>Home</h1>
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
