
import {Box,  Typography,  CircularProgress} from "@mui/material"
import Logo from "../../assets/Logo";
import { useAuth0 } from "@auth0/auth0-react";
import AnimatedButton from "./Button/Button";
import { useEffect } from "react";


export default function LoginPage() {
  

  const {  loginWithRedirect, isLoading } = useAuth0()


  const handleSubmit = async () => {
    loginWithRedirect({
      authorizationParams: {
        ui_locales: "es",
      },
    })
    
  }

  useEffect(()=>{
    fetch('https://vhvmtfflzg.execute-api.us-east-2.amazonaws.com/default/alki/test', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ foo: 'bar' }),
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
  },[])

 
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