import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Box,
    Typography,
    MenuItem,
    CircularProgress,
    Select
  } from "@mui/material"
  import { useEffect, useState } from "react"
 import { 
    Member, 
    Organization, 
    useUpdateOrganizationMutation, 
    useCreateOrganizationMutation 
} from "../../api/OrganizationsSlice"
  import DeleteIcon from "@mui/icons-material/Delete"
  import AddIcon from "@mui/icons-material/Add"

  
  interface OrganizationProps {
    open: boolean
    onClose: () => void
    organization?: Organization // optional for new
    isNew?: boolean
  }
  
  const permissionOptions = ["Administrador", "Editor", "Solo lectura"]
  
const NewOrganizationDialog: React.FC<OrganizationProps> = ({open, onClose, organization, isNew}) => {
    const [updateOrganization, { isLoading: isUpdating }] = useUpdateOrganizationMutation()
    const [createOrganization, { isLoading: isCreating }] = useCreateOrganizationMutation()
  
    const [orgData, setOrgData] = useState<Organization>(
      organization || {
        organizationId: '',
        creatorId: "",
        name: "",
        description: "",
        members: [],
      }
    )

    console.log(organization?.members)
  
    useEffect(() => {
      if (open && organization) {
        setOrgData(organization)
      } else if (open && isNew) {
        setOrgData({
          organizationId: crypto.randomUUID(),
          creatorId: "",
          name: "",
          description: "",
          members: [],
        })
      }
    }, [open, organization, isNew])
  
    const handleMemberChange = (index: number, key: keyof Member, value: string | string[]) => {
      const updatedMembers = [...orgData.members]
      updatedMembers[index] = { ...updatedMembers[index], [key]: value }
      setOrgData({ ...orgData, members: updatedMembers })
    }
  
    const handleAddMember = () => {
      const newMember: Member = {
        memberId: crypto.randomUUID(),
        name: "",
        email: "",
        permissions: [],
      }
      setOrgData(prev => ({ ...prev, members: [...prev.members, newMember] }))
    }
  
    const handleRemoveMember = (index: number) => {
      const updated = [...orgData.members]
      updated.splice(index, 1)
      setOrgData({ ...orgData, members: updated })
    }
  
    const handleSave = async () => {
      if (isNew) {
        await createOrganization(orgData)
      } else {
        await updateOrganization(orgData)
      }
      onClose()
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
            <Typography variant="h6">Miembros</Typography>
            {orgData.members.map((member, index) => (
              <Box key={member.memberId} 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
              >
                <TextField
                  label="Nombre"
                  value={member.name} 
                  onChange={e => handleMemberChange(index, "name", e.target.value)}
                />
                <TextField
                  label="Email"
                  value={member.email}
                  onChange={e => handleMemberChange(index, "email", e.target.value)}
                />
                <Select
                    
                  label="Permisos"
                  value={member.permissions[0] || ""}
                  onChange={e => handleMemberChange(index, "permissions", [e.target.value])}
                >
                  {permissionOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <IconButton onClick={() => handleRemoveMember(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{ mt: 1 }}
              onClick={handleAddMember}
            >
              Agregar miembro
            </Button>
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