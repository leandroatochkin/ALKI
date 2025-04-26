import { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { setToken } from "../../api/store/token"
import { setId } from "../../api/store/id"
import { useAppDispatch } from "../../api/store/hooks"
import { setUserData, setUserId } from "../../components/Dashboard/DashboardStore/DashboardStore"
import { useGetUserDataQuery } from "../../api/UsersSlice"


const PostLogin = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()
  const [id, setId]=useState<string | null>(null)
  const { data, isLoading: isLoadingUser } = useGetUserDataQuery(id ?? '', {
      skip: !id, // ⛔ don't send the query if we don't have a userId yet
    })
  
  const navigate = useNavigate()
  const dispatch = useAppDispatch()



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
        dispatch(setUserId(user?.sub))
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

  useEffect(()=>{
    if(data){
        dispatch(setUserData(data.userInfo))
    }
  },[data, isLoadingUser])

  return null
}

export default PostLogin
