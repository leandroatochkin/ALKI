import React, {useState} from "react"
import {Box, Button, TextField, Typography, FormControl, FormLabel, Checkbox, InputAdornment, IconButton, Input, CircularProgress} from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Logo from "../../assets/Logo";
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import AnimatedButton from "./Button/Button";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  

  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

  const navigate = useNavigate()

  const handleSubmit = async () => {
    loginWithRedirect({
      authorizationParams: {
        ui_locales: "es",
      },
    })
    try {
      const token = await getAccessTokenSilently()
  
      if (user && isAuthenticated) {
        const signupData = {
          id: user.sub,       // Auth0 user ID (e.g. "auth0|123456...")
          email: user.email,  // Optional but useful
        }
  
        const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(signupData)
        })
  
        if (response.ok) {
          console.log('User created in DB 🎉')
        } else {
          console.error('Failed to create user in DB')
        }
      }
    } catch (err) {
      console.error('Signup flow error:', err)
    }
  }

  const handleSignup = async () => {
    try {
      const token = await getAccessTokenSilently()
  
      if (user && isAuthenticated) {
        const signupData = {
          id: user.sub,       // Auth0 user ID (e.g. "auth0|123456...")
          email: user.email,  // Optional but useful
        }
  
        const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(signupData)
        })
  
        if (response.ok) {
          console.log('User created in DB 🎉')
        } else {
          console.error('Failed to create user in DB')
        }
      }
    } catch (err) {
      console.error('Signup flow error:', err)
    }
  }
 
  return (
    <Box 
    sx={{
        height: '100vh',
        width: '100vw',
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1d1d1d, #2c2c2c)', // slate-50 to slate-100
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Box
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
        <Logo />
        </Box>
      <Box
      sx={{
        width: {xs: '90%', md: '40%'},
        maxHeight: '90vh',  
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2, // space-y-8 (approx 32px vertical spacing between children)
        borderRadius: '1rem', // rounded-xl
        boxShadow: 6, // shadow-lg
        pb: 2,
      }}
      >
        {
          isLoading
          ?
          <CircularProgress size={40} />
          :
          <>
        <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3, // mb-6 => 24px
          }}
        >
        
          <Typography 
          variant="body1"
          sx={{
            fontWeight: 600,
          }}
          >
            gestión de propiedades simplificada
          </Typography>
        </Box>

        <Box
        sx={{
          width: '100%',
    
        }}
        >
        <Box 
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
        >

        <AnimatedButton 
          onClick={handleSubmit}
          disabled={isLoading}
          text={'ENTRAR'}
          />

        </Box>
        </Box>

        </>
        }
      </Box>
    </Box>
  )
}