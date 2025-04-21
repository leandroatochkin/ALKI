import { Auth0Client } from "@auth0/auth0-spa-js"

let auth0Client: Auth0Client | null = null

export async function initAuth0() {
  if (!auth0Client) {
    const { createAuth0Client } = await import("@auth0/auth0-spa-js")
    auth0Client = await createAuth0Client({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT,
      authorizationParams: {
        redirect_uri: `http://localhost:5173/home`,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE
      },
    })
  }
  return auth0Client
}

export async function getAccessTokenSilently() {
  const client = await initAuth0()
  console.log(client.getTokenSilently())
  return client.getTokenSilently()
}

export async function getAccessTokenWithConsent() {
    const client = await initAuth0()
    try {
      await client.loginWithPopup({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      const token = await client.getTokenSilently();
      return token;
    } catch (err) {
      console.error("Consent/login error:", err);
      return null;
    }
  }
  
