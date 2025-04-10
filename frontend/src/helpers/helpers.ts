import { useNavigate } from "react-router-dom";



export const navigateHome = () => {
    const navigate = useNavigate()
    navigate("/")
}