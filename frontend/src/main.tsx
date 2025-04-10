import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NotFound, LoginPage } from './views/index.ts'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginPage />
    ),
    errorElement: <NotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
