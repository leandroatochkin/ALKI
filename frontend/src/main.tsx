import { StrictMode } from 'react'
import { Provider } from "react-redux"
import { createRoot } from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import AuthInit from './views/Auth/AuthInit.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './api/store/store.ts'
import { App } from './App.tsx'





const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT



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
    


     
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     <AuthInit />
     </PersistGate>
     <App />
     </Provider>
     

    </Auth0Provider>
  </StrictMode>,
)
