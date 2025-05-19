// App.tsx or AuthInit.tsx
import { useEffect } from "react"
import { getAccessTokenWithConsent } from "../../api/hooks/auth0-client"

const AuthInit = () => {
  useEffect(() => {
    const getToken = async () => {
      const token = await getAccessTokenWithConsent()
      return token
      // Optionally store it somewhere if needed
    }

    getToken()
  }, [])

  return null // This is just a token initializer
}

export default AuthInit
