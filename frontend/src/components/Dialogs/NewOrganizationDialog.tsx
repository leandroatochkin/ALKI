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
  import { useEffect, useState } from "react"
 import { 
    Organization, 
    useUpdateOrganizationMutation, 
    useCreateOrganizationMutation 
} from "../../api/OrganizationsSlice"
  import { useAppSelector } from "../../api/store/hooks"
  import { useDispatch } from "react-redux"
  import { showToast } from "../../api/ToastSlice"

  
  interface OrganizationProps {
    open: boolean
    onClose: () => void
    organization?: Organization // optional for new
    isNew?: boolean
    refetch: () => void
  }
  
  
const NewOrganizationDialog: React.FC<OrganizationProps> = ({open, onClose, organization, isNew, refetch}) => {
    const [updateOrganization, { isLoading: isUpdating }] = useUpdateOrganizationMutation()
    const [createOrganization, { isLoading: isCreating }] = useCreateOrganizationMutation()
    const userData = useAppSelector(
        state => state.dashboard.userData
    )
    const dispatch = useDispatch()
  
    const [orgData, setOrgData] = useState<Organization>(
      organization || {
        organizationId: '',
        userId: "",
        name: "",
        description: "",
      }
    )


  
    useEffect(() => {
      if (open && organization) {
        setOrgData(organization)
      } else if (open && isNew) {
        setOrgData({
          userId: userData.id,
          name: "",
          description: "",
        })
      }
    }, [open, organization, isNew])
  

    
  
  
    const handleSave = async () => {
      try{
        if (isNew) {
        await createOrganization(orgData)
        dispatch(showToast({message: 'Organización creada.', severity: 'success'}))
        refetch()
        onClose()
      } else {
        await updateOrganization(orgData)
        dispatch(showToast({message: 'Organización actualizada.', severity: 'success'}))
        refetch()
        onClose()
      }
      } catch(e){
        dispatch(showToast({message: 'Error al guardar la organización.', severity: 'error'}))
        console.log(e)
      }
      
    }
  
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
  

  export default NewOrganizationDialog