import { useEffect, useState } from "react"
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
import { useNavigate } from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import HouseIcon from '@mui/icons-material/House';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InventoryIcon from '@mui/icons-material/Inventory';
import { mockUser } from "../../../api/UsersSlice"
import { UserPreview } from "../../../api/UsersSlice"
import { useAppSelector } from "../../../api/store/hooks"
import { useAuth0 } from "@auth0/auth0-react";
import UserCard from "../../Cards/UserCard"


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
interface UserSidebarAttributes {
  email: string
  name: string
  userId: string
}

function Sidebar() {
  //const menuItems = useAppSelector(state => state.dashboard.menuItems)
  //const role = useAppSelector(state => state.dashboard.role)
  const navigate = useNavigate()
  const { logout } = useAuth0();

  const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth >= 768)
  const userData: UserPreview = useAppSelector(
      state => state.dashboard.userData,
    )
  const sidebarItems = 
    (userData?.permissions === 'admin' || userData?.permissions === 'edit')
    ?
    [
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
    :
    [
    {
        text: 'Propiedades',
        path: '/properties',
    },
    {
      text: 'Inquilinos',
      path: '/tenants',
    },
    {
      text: 'Inventarios',
      path: '/inventories',
    }
    ]


  const signOutHandler = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }




  // Handle window resize to toggle drawer based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDrawerOpen(window.innerWidth >= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])


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
        <MenuIcon sx={{color: '#e6fff8'}}/>
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          //position: window.innerWidth < 768 ? 'static':'fixed',
        }}
        disableScrollLock // Prevent content blurring
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pt: 3,
            height: '100%'
          }}
        >
        <List component="nav">
          {sidebarItems.map((item: any) => (
            <ListItem key={item.id}>
              <ListItemButton onClick={onSelect(item.path)}>
                <ListItemIcon>
                  <Box component="span">
                    {(item.text === "Agregar/modificar propiedad" || item.text === 'Propiedades')  && <HouseIcon />}
                    {(item.text === "Agregar/modificar inquilino" || item.text === 'Inquilinos') && <PersonAddIcon />}
                    {(item.text === "Crear/modificar inventario" || item.text === 'Inventarios') && <InventoryIcon />}
                  </Box>
                </ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {userData && (
          <UserCard name={`${userData.firstName} ${userData.lastName}`} email={userData.email} onSettingsClick={() => navigate(`/settings`)} onLogoutClick={signOutHandler} />
        )}
        </Box>


        
      </Drawer>
    </Box>
  )
}

export default Sidebar
