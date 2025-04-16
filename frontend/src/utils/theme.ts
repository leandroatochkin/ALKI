import { createTheme } from '@mui/material/styles'

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2', // blue-ish
      },
      secondary: {
        main: mode === 'dark' ? '#f48fb1' : '#dc004e', // pink/red
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#fff',
      },
      text: {
        primary: mode === 'dark' ? '#e6fff8' : '#000000',
        secondary: mode === 'dark' ? '#bbbbbb' : '#555555',
      },
    },
  })
