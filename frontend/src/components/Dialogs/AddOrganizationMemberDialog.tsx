import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    CircularProgress,
  } from "@mui/material"

  import { useAppSelector } from "../../api/store/hooks"

  
  interface OrganizationProps {
    open: boolean
    onClose: () => void
    organizationId?: string // optional for new
 
  }
  
  
const AddOrganizationMemberDialog: React.FC<OrganizationProps> = ({open, onClose}) => {
    const userData = useAppSelector(
        state => state.dashboard.userData
    )
  


  
  

    
  

  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{isNew ? "Crear organización" : "Modificar organización"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Nombre"
            value={orgData.name}
            onChange={e => setOrgData({ ...orgData, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Descripción"
            value={orgData.description}
            onChange={e => setOrgData({ ...orgData, description: e.target.value })}
          />
          <Box mt={3}>
      
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isUpdating || isCreating}
          >  
          {
            (isUpdating || isCreating) ? <CircularProgress size={20}/> : (isNew ? "Crear" : "Guardar cambios")
          }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  

  export default AddOrganizationMemberDialog