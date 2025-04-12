import React, { useEffect, useState } from "react"
import {
  Box,
  List,
  ListItem,
  IconButton,
  Typography,
  Tooltip,
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
// import { useAppSelector } from "../../../../app/hooks"
// import {
//   useGetMyUserQuery,
//   UserPreview,
// } from "../../../../app/api/usersSliceApi"
import { UserPreview } from "../../../api/UsersSlice"
import { useNavigate } from "react-router-dom"

import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
//import "./sidebar.css"
import AddCardIcon from "@mui/icons-material/AddCard"
import HouseIcon from '@mui/icons-material/House';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InventoryIcon from '@mui/icons-material/Inventory';


// import {
//   BadgeIcon,
//   CalendarMonthIcon,
//   MedicalServicesIcon,
//   PaymentIcon,
//   PeopleIcon,
//   VideoCallIcon,
//   ResourcesIcon,
//   ReconciliationsIcon
// } from "./icons"
// import Resources from "../resources/Resources"

// Interface for props
interface Props {
  userData: UserPreview
}
interface UserSidebarAttributes {
  email: string
  username: string
  name: string
  userId: string
  organizationName: string
  tenantId?: string
}

function Sidebar() {
  //const menuItems = useAppSelector(state => state.dashboard.menuItems)
  //const role = useAppSelector(state => state.dashboard.role)
  const navigate = useNavigate()
  const [userAttributes, setUserAttributes] = useState<UserSidebarAttributes>({
    email: "",
    username: "",
    name: "",
    userId: "",
    organizationName: "",
    tenantId: "",
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth >= 768)
  //const { data: myUserData } = useGetMyUserQuery(undefined)

  const sidebarItems = [
    {
        text: 'Agregar/modificar propiedad',
        path: '/properties',
    },
    {
      text: 'Agregar/modificar inquilino',
      path: '/tenants',
    },
    {
      text: 'Crear/modificar inventario',
      path: '/inventories',
    }
]

  const [menuItemsFiltered, setMenuItemsFiltered] = useState<
    { [key: string]: any }[]
  >([])
  const signOutHandler = () => {
    //signOut()
    navigate("/sign-in")
  }

//   const setAttributes = async () => {
//     if (myUserData) {
//       const payload: UserSidebarAttributes = {
//         email: myUserData.email,
//         username: myUserData.username,
//         name: `${myUserData.firstName} ${myUserData.lastName}`,
//         userId: myUserData.userId,
//         organizationName: myUserData.organizationName,
//         tenantId: myUserData.tenantId,
//       }
//       setUserAttributes(payload)
//     }
//   }

//   useEffect(() => {
//     if (myUserData) {
//       setAttributes()
//     }
//   }, [myUserData])
  // Handle window resize to toggle drawer based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDrawerOpen(window.innerWidth >= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter menu items based on role
//   useEffect(() => {
//     const filteredItems = menuItems.filter((x: any) => x.role === role)
//     setMenuItemsFiltered(filteredItems)
//   }, [menuItems, role])

  // Toggle Drawer Open/Close
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open)
  }

  // Navigate to the selected route
  const onSelect = (path: string) => () => {
    navigate(path)
    if (window.innerWidth < 768) setIsDrawerOpen(false) // Close drawer only on mobile
  }

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          margin: 1,
          color: "#0d5074",
          position: "absolute",
          top: 70,
          left: 10,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        variant={"temporary"}
        sx={{
          color: "#ffffff",
          "--Drawer-horizontalSize: clamp(0px, 80%, 200px);": {
            width: "var(--Drawer-horizontalSize)",
          },
          // position: window.innerWidth < 768 ? 'static':'fixed',
        }}
        disableScrollLock // Prevent content blurring
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingTop={3}
        >
        </Box>

        <List component="nav">
          {sidebarItems.map((item: any) => (
            <ListItem key={item.id}>
              <ListItemButton onClick={onSelect(item.path)}>
                <ListItemIcon>
                  <Box component="span">
                    {item.text === "Agregar/modificar propiedad" && <HouseIcon />}
                    {item.text === "Agregar/modificar inquilino" && <PersonAddIcon />}
                    {item.text === "Crear/modificar inventario" && <InventoryIcon />}
                  </Box>
                </ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {userAttributes && (
          <div className="border-t flex p-3 relative">
            <IconButton
              onClick={() => navigate(`/settings/${userAttributes?.tenantId}`)}
              sx={{ color: "black" }}
            >
              <SettingsIcon />
            </IconButton>
            <div
              className={`flex justify-between items-center overflow-hidden transition-all`}
            >
              <div className="leading-4">
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  fontFamily="AlbertSans"
                  color="black"
                >
                  {userAttributes?.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  fontFamily="AlbertSans"
                  color="black"
                >
                  {userAttributes?.username}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  fontFamily="AlbertSans"
                  color="black"
                >
                  {userAttributes?.organizationName}
                </Typography>
              </div>
              <Tooltip title="Logout">
                <IconButton onClick={signOutHandler} sx={{ color: "black" }}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </Drawer>
    </Box>
  )
}

export default Sidebar
