import React, {useState} from "react"
import {Box, Button, TextField, Typography, FormControl, FormLabel, Checkbox, InputAdornment, IconButton, Input} from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Logo from "../../assets/Logo";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log("Login attempt with:", { email, password })
    }, 1500)
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
        gap: 2, // space-y-8 (approx 32px vertical spacing between children)
        p: { xs: 1, sm: 4 }, // p-6 sm:p-8 (24px on xs, 32px on sm+)
        borderRadius: '1rem', // rounded-xl
        boxShadow: 6, // shadow-lg
        background: '#F5F5F5'
      }}
      >
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
            color: '#333',
            fontWeight: 600,
          }}
          >gestión de propiedades simplificada</Typography>
        </Box>

        <Box className="text-center">

          <Typography 
          variant="body1"
          sx={{
            color: '#333',
          }}
          >ingrese sus credenciales para comenzar</Typography>
        </Box>

        <FormControl onSubmit={handleSubmit} fullWidth>
          <Box className="space-y-4"
          >
            <Box className="space-y-2"
            
            >
              <FormLabel htmlFor="email">Email</FormLabel>
              <Box className="relative">
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  variant="standard"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MailIcon 
                            sx={{
                                color: '#333'
                            }}
                            />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                
              </Box>
            </Box>

            <Box className="space-y-2">
              <Box className="flex items-center justify-between">
                <FormLabel htmlFor="password">Password</FormLabel>
                {/* <Link href="#" className="text-xs text-primary hover:underline underline-offset-4">
                  Forgot password?
                </Link> */}
              </Box>
              <Box className="relative">
                <Input
                    fullWidth
                  id="password"
                  color="secondary"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                
              </Box>
            </Box>
          </Box>

          <Box className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <FormLabel htmlFor="remember" >
              recordarme en este dispositivo
            </FormLabel>
          </Box>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <Box className="relative">
            <Box className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </Box>
            <Box 
            sx={{
                color: '#333',
    
              }}
            >
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </Box>
          </Box>

          
        </FormControl>

        <Box className="mt-4 text-center text-sm"
        sx={{
            color: '#333',

          }}
        >
          Don't have an account?{" "}
          <Typography 
          sx={{
            color: '#333',

          }}
          >
            Sign up
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}