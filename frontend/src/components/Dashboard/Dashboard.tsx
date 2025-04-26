import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import Sidebar from "./Sidebar/Sidebar"
import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logo from "../../assets/Logo"
import { useAppSelector, useAppDispatch } from "../../api/store/hooks"
import { useGetUserDataQuery } from "../../api/UsersSlice"
import { getUserId } from "../../api/store/id"
import { setUserData, setUserId } from "./DashboardStore/DashboardStore"



export default function Dashboard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  
  const userData = useAppSelector(
    state => state.dashboard.userData
  )
  const userId = useAppSelector(
    state => state.dashboard.userId
  )

  console.log(userId)

  const { data, isLoading } = useGetUserDataQuery(userId ?? '', {
    skip: !userId, // ⛔ don't send the query if we don't have a userId yet
  })

  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showSnackbar, setShowSnackbar] = useState(false)

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserData(data.userInfo))
      console.log('✅ userData after login:', data.userInfo)
    } else if (!isLoading && !data) {
      navigate("/sign-in")
    }
  }, [data, isLoading])
  


  const handleCloseSnackbar = () => setShowSnackbar(false)

  return (
    <Box
      color={"primary"}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height  
        background: 'linear-gradient(135deg, #1d1d1d, #2c2c2c)', // slate-50 to slate-100
      }}
    >
      <CssBaseline />

      {/* App Bar for Messages */}
      <AppBar position="sticky" >
        <Toolbar>
          <div
          onClick={
            ()=>navigate('/home')
          }
          >
          <Logo darkMode={true} size={1}/>
          </div>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton
            onClick={() => navigate(`/settings`)}
            sx={{
              color: userData.theme !== 'dark' ? `#333` : `#e6fff8`
            }}
          >
            <SettingsIcon />
            <Typography 
            marginLeft={1}
            
            > Ajustes </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content with Sidebar */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box
          sx={{
            padding: "30px",
            boxSizing: "border-box",

            width: "99%",
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error ? "error" : "success"}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}