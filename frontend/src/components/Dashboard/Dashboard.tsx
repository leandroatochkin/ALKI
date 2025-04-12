import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
//import { getCurrentUser } from "aws-amplify/auth"
//import { useGetMyUserQuery } from "../../app/api/usersSliceApi"
//import { setUserData, setStripeConnectInstance, setUserNotifications } from "./dashboardSlice"
//import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Snackbar,
  Alert,
  Tooltip
} from "@mui/material"
import Sidebar from "./Sidebar/Sidebar"
import MailIcon from "@mui/icons-material/Mail"
//import BrandLogo from "./components/common/BrandLogo"
//import {
//  CreateStripeAccountSessionRequest,
//  useCreateStripeAccountSessionMutation,
//} from "../../app/api/tenantApiSlice"
//import { loadConnectAndInitialize } from "@stripe/connect-js"
import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsIcon from '@mui/icons-material/Notifications';
//import { useGetNotificationsQuery } from "../../app/api/notificationsSlice"
//import { skipToken } from "@reduxjs/toolkit/query"
import Logo from "../../assets/Logo"



export default function Dashboard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
//   const dispatch = useAppDispatch()
//   const stripeAccountId = useAppSelector(state => state.dashboard.paymentsId)
//   const [createStripeAccountSession, { isSuccess, isError }] =
//     useCreateStripeAccountSessionMutation()

  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [userId, setUserId] = useState<string>('');
  //const { data: userData, refetch, isLoading } = useGetMyUserQuery(undefined)
//   useEffect(() => {
//     if (userData?.userId) {
//       setUserId(userData.userId);
//     }
//   }, [userData])

  const userNotifications = [{
    status: 0,
    title: "New user created",
  }]
  
//   const { data: userNotifications } = useGetNotificationsQuery(
//     userData?.userId ? { userId: userData.userId } : skipToken
//   )


//   useEffect(() => {
//     if (userNotifications) {
//         dispatch(setUserNotifications(userNotifications));
//     }
// }, [userNotifications, dispatch]);


//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const user = await getCurrentUser()
//         if (!user) {
//           navigate("/sign-in")
//         } else {
//           if (!isLoading) {
//             await refetch()
//             dispatch(setUserData(userData || { permissions: [] }))
//           }
//         }
//       } catch (error) {
//         navigate("/sign-in")
//       }
//     }
//     checkUser()
//   }, [navigate, refetch, dispatch, isLoading, userData])

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
      <AppBar position="sticky" sx={{ backgroundColor: "#f8fafd" }}>
        <Toolbar>
          <Logo darkMode={true} size={1}/>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton>
              <Tooltip title="Show notifications">
              <Badge badgeContent={userNotifications?.filter(notification=>notification.status === 0).length} color="error">
              <NotificationsIcon 
//               onClick={() => navigate(`/notifications/${userData?.userId}`)}
               sx={{ color: "black" }}
              />
              </Badge>
              </Tooltip>
          </IconButton>
          <IconButton
            //onClick={() => navigate(`/settings/${userData?.tenantId}`)}
            sx={{ color: "black" }}
          >
            <SettingsIcon />
            <Typography marginLeft={1}> Settings </Typography>
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