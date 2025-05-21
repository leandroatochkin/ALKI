import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material"
import Sidebar from "./Sidebar/Sidebar"
import SettingsIcon from "@mui/icons-material/Settings"
import Logo from "../../assets/Logo"
import { useAppSelector, useAppDispatch } from "../../api/store/hooks"
import { useGetUserDataQuery } from "../../api/UsersSlice"
import { setUserData } from "./DashboardStore/DashboardStore"
import { getTheme } from "../../utils/theme"
import Toast from "../Toast/Toast"



export default function Dashboard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  
  const userData = useAppSelector(
    state => state.dashboard.userData
  )
  const userId = useAppSelector(
    state => state.dashboard.userId
  )

  const theme = getTheme(userData.theme === 'light' || userData.theme === 'dark' ? userData.theme : 'dark') 

  const encodedSvg = theme.palette.mode === 'dark'
    ? `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 200 200'%3E%3Crect fill='%23222222' width='200' height='200'/%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23003366'/%3E%3Cstop offset='1' stop-color='%23006699'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'%3E%3Cstop offset='0' stop-color='%23454545'/%3E%3Cstop offset='1' stop-color='%23666666'/%3E%3C/linearGradient%3E%3Cfilter id='c' x='0' y='0' width='200%25' height='200%25'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='12' /%3E%3C/filter%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='.5' filter='url(%23c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E`
    : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 200 200'%3E%3Crect fill='%23eeeeee' width='200' height='200'/%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23005092'/%3E%3Cstop offset='1' stop-color='%23007cc4'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'%3E%3Cstop offset='0' stop-color='%235c5c5c'/%3E%3Cstop offset='1' stop-color='%23aaaaaa'/%3E%3C/linearGradient%3E%3Cfilter id='c' x='0' y='0' width='200%25' height='200%25'%3E%3CfeGaussianBlur in='SourceGraphic' stdDeviation='12' /%3E%3C/filter%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='.2' filter='url(%23c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E`


  const { data, isLoading } = useGetUserDataQuery(userId ?? '', {
    skip: !userId, // ⛔ don't send the query if we don't have a userId yet
  })



  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setUserData(data.userInfo))

    } else if (!isLoading && !data) {
      navigate("/")
    }
  }, [data, isLoading])
  

  return (
    <Box
      color={"primary"}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh", // Full viewport height  
        background: `url("${encodedSvg}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
              color: `#e6fff8`
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
      <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'space-between'}} >
        <Sidebar />
        <Box
          sx={{
            padding: "30px",
            boxSizing: "border-box",
            width: "99%",
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {children}
        </Box>
        <Box
        sx={{
          width: "100%",
          background: 'transparent',
          textAlign: 'end'
        }}
        >
          <a 
          style={{
            fontSize: 'small'
          }}
          href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/">Free SVG Backgrounds and Patterns by SVGBackgrounds.com</a>
        </Box>
      </Box>
     <Toast/>
    </Box>
  )
}