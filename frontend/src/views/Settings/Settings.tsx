import { useState, useEffect} from 'react'
import {
    Paper,
    Typography,
    Stack,
    Button,
} from '@mui/material'
  import { useNavigate } from 'react-router-dom'
  import { UserPreview } from '../../api/UsersSlice'
  import UpdateUserDataDialog from '../../components/Dialogs/UpdateUserDataDialog'
  import OptionsDialog from '../../components/Dialogs/OptionsDialog'
  import { useAppSelector } from '../../api/store/hooks'
  import LockIcon from '@mui/icons-material/Lock';



const Settings = () => {
 const [user, setUser] = useState<UserPreview | null>(null)
 const [openModifyUserDataDialog, setOpenModifyUserDialog] = useState<boolean>(false)
 const [openOptionsDialog, setOpenOptionsDialog] = useState<boolean>(false)
 const userData: UserPreview = useAppSelector(
    state => state.dashboard.userData,
  )


    useEffect(() => {
          setUser(userData)
      }, [userData])

    const navigate = useNavigate()



          


  return (
    <>
    {openModifyUserDataDialog && user && <UpdateUserDataDialog userData={user} open={openModifyUserDataDialog} onClose={()=>setOpenModifyUserDialog(false)}/>}
    {openOptionsDialog && user && <OptionsDialog userData={user} open={openOptionsDialog} onClose={()=>setOpenOptionsDialog(false)}/>}
    <Paper
    sx={{
        p: 2,
        mt: 2
    }}
    >
    <Typography variant="h4" gutterBottom>
        Ajustes
    </Typography>
        <Stack
        spacing={2}
        >
            <Button
            variant='outlined'
            color='primary'
            onClick={()=>setOpenModifyUserDialog(true)}
            >
                mis datos
            </Button>
            <Button
            variant='outlined'
            color='primary'
            onClick={()=>setOpenOptionsDialog(true)}
            >
                opciones
            </Button>
            {
                userData.permissions[0] === 'admin' &&
                <Button
                variant='outlined'
                color='primary'
                onClick={()=>navigate('/organizations')}
                disabled={!userData.isPremium}
                >   
                {!userData.isPremium ? <LockIcon sx={{mr:1}}/> : ''}
                    organizaciones
                    {!userData.isPremium ? `(SOLO PREMIUM)` : ''}  
                </Button>
            }
            <Button
            variant='outlined'
            color='primary'
            > 
                sobre la app
            </Button>
        </Stack>
    </Paper>
    </>
  )
}

export default Settings