import React from 'react'
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Box, 
    TextField, 
    Button, 
    CircularProgress, 
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { 
    useDeleteTenantMutation,
 } from '../../api/TenantsApiSlice';
 import { useDispatch } from 'react-redux';
 import { showToast } from '../../api/ToastSlice';






interface DeleteTenantDialogProps {
    tenantId: string,
    open: boolean,
    onClose: () => void,
    refetch: () => void
}

const DeleteTenantDialog: React.FC<DeleteTenantDialogProps> = ({tenantId, open, onClose, refetch}) => {
    const [terminationReason, setTerminationReason] = React.useState<string>('')

const [deleteTenant, {isLoading: isDeleting}] = useDeleteTenantMutation()
const dispatch = useDispatch()

    const handleDeleteTenant = async () => {
        if(confirm('¿Está seguro de que desea dar de baja al inquilino?')){
            try {
                if (tenantId && terminationReason) {
                    await deleteTenant({
                        tenantId: tenantId,
                        terminationReason: terminationReason,
                    }).unwrap()
                    dispatch(showToast({message: 'Inquilino dado de baja', severity: 'success'}))
                    refetch()
                    onClose()
                    setTerminationReason('')
                } 
                
            } catch (error) {
                dispatch(showToast({message: 'Error al dar de baja inquilino.', severity: 'error'}))
                console.error('Error deleting tenant:', error)
            }
        }
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    >
        <DialogTitle>Dar de baja inquilino</DialogTitle>
        <DialogContent>
     
            <TextField
            id='terminationReason'
            label='Motivo de baja'
            variant='outlined'
            fullWidth
            value={terminationReason}
            onChange={(e) => setTerminationReason(e.target.value)}
            error={terminationReason.length === 0}
            helperText={terminationReason.length === 0 ? 'Campo requerido' : ''}
            sx={{
                mt: 2
            }}
            multiline
            rows={2}
            />
    
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
        }}
        >
            <Button
            variant='outlined'
            color='secondary'
            onClick={onClose}
            >
                volver
            </Button>
            <Button
            variant='outlined'
            color='primary'
            onClick={handleDeleteTenant}
            disabled={isDeleting || terminationReason.length === 0}>
                {isDeleting ? <CircularProgress size={20} /> : 'Dar de baja'}
        </Button>
        </Box>
        </DialogContent>

    </Dialog>
     </LocalizationProvider>
  )
}

export default DeleteTenantDialog