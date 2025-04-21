import { getAccessTokenSilently as realGetAccessTokenSilently } from './auth0-client'

export const getAccessTokenSilently = async () => {
  try {
    const token = await realGetAccessTokenSilently()
    return token
  } catch (error) {
    console.error("Failed to get token silently", error)
    return null
  }
}