import {Button, Box, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {

  const navigate = useNavigate()

  return (
    <Box sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Crect fill='%23ee5522' width='200' height='200'/%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23d23d09' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E")`,
        color: "#f5f5f5",
       
    }}>
      <Box
      sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
        }}
      >
        <Box 
        sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
        }}
        >
          <Box sx={{
            height: {xs: "15rem", sm: "20rem"},
            width: {xs: "15rem", sm: "20rem"},
            
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </Box>
        </Box>
        <Typography 
        variant="h1"
        sx={{
            textAlign: "center",
            textShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
        >404</Typography>
        <Typography variant="h2"
        sx={{
          textShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
        >Page Not Found</Typography>
        <Typography variant="body1">
          La página que buscas se movió o se eliminó. Podés volver a la página de inicio o buscar algo nuevo.
        </Typography>
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2
        }}
        >
        <Button
        variant="contained"
        onClick={
          () => navigate('/')
        }
        sx={{
          background: '#f5f5f5'
        }}
        >
            volver a la página principal
        </Button>
        </Box>
      </Box>
    </Box>
  )
}
