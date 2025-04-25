import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { setToken } from "../../api/store/token"
import { setId } from "../../api/store/id"

const PostLogin = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const uploadUser = async () => {
      try {
        const token = await getAccessTokenSilently()
        setToken(token)
        setId(user?.sub ?? '')

        const res = await fetch(`${import.meta.env.VITE_SERVER_HOST}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: user?.sub,
            email: user?.email
          }),
        })

        const data = await res.json()

        if (data.isNewUser) {
          navigate("/onboarding") 
        } else {
          navigate("/home")
        }
      } catch (err) {
        console.error("Error during signup:", err)
      }
    }

    if (isAuthenticated && user && !isLoading) {
      uploadUser()
    }
  }, [user, isAuthenticated, isLoading])

  return null
}

export default PostLogin
