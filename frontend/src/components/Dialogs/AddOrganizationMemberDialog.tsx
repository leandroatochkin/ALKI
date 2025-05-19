import { useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Select,
    MenuItem,
    Typography,
    CircularProgress
  } from "@mui/material"
  import { permissionsMap } from "../../utils/dataLists"
  import { useAppSelector } from "../../api/store/hooks"
  import { Member } from "../../api/OrganizationsSlice"
  import { useForm } from 'react-hook-form'
import { emailRegex, nameRegex } from "../../utils/regexPatterns"
import { useAddOrganizationMembersMutation } from "../../api/OrganizationsSlice"

  
  interface OrganizationProps {
    open: boolean
    onClose: () => void
    organizationId?: string // optional for new
 
  }
  
  
const AddOrganizationMemberDialog: React.FC<OrganizationProps> = ({open, onClose, organizationId}) => {
    const [members, setMembers] = useState<Member[] | []>([])
    const userData = useAppSelector(
        state => state.dashboard.userData
    )

  const {
          register,
          handleSubmit,
          reset
      } = useForm<Member>({
          defaultValues: {
         organizationId: organizationId ?? '',
         creatorId: userData.id,
    
          }
      })
  
  const [addMembers, {isLoading: isAdding}] = useAddOrganizationMembersMutation()

  const onSubmit = async (data: Member) => {
      setMembers((prev)=>(
        [...prev, data]
      ))
      reset()
  }
 
  const removeUser = (index: number) =>{
    setMembers((prev)=>
      [...prev.slice(0, index), ...prev.slice(index + 1)]
    )
  }

  const handleAddMembers = async () => {
    if (members.length > 0) {
      if (confirm('¿Esta seguro que quiere agregar estos miembros?')) {
        try {
        await addMembers(members).unwrap()
        onClose()
      } catch (error) {
        alert('Error al agregar miembros')
        console.error(error)
      }
      }
  } return
}
    
  

  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{`Agregar o quitar miembros`}</DialogTitle>
        
        <DialogContent>
          {
          members.length > 0 && 
          (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
          >
            {
              members.map((member, index)=>(
            <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
            }}
            >
              <Typography>
                {member.name}
              </Typography>
              <Typography>
                {member.email}
              </Typography>
              <Typography>
                {member.permissions}
              </Typography>
              <Button
              onClick={()=>removeUser(index)}
              >
                quitar
              </Button>
            </Box>
          ))  
            }
          </Box>
          )
        }
          <form 
          onSubmit={handleSubmit(onSubmit)}
          >
            <Box
            sx={{
              display: 'flex',
              gap: 1
            }}
            >
            <TextField
            fullWidth
            margin="dense"
            label="Nombre"
            {...register(`name`, {
              pattern: nameRegex,
              required: 'Este campo es obligatorio',
          })}
          />
          <TextField
          fullWidth
          margin="dense"
          
            label="email"
            {...register(`email`, {
              pattern: emailRegex,
              required: 'Este campo es obligatorio',
          })}
          />
   
          <Select
            {...register('permissions', {
              required: 'Este campo es obligatorio',
            })}
            defaultValue={'user'}
            fullWidth
            margin="dense"
            sx={{
              m: 1
            }}
          >
            {Object.entries(permissionsMap).map(([permission, type]) => (
              <MenuItem key={permission} value={permission}>
                {type}
              </MenuItem>
            ))}
          </Select>
      
            </Box>
          <Button
          type="submit"
          disabled={isAdding}
          >
            añadir miembro
          </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="outlined"
            disabled={isAdding}
            onClick={handleAddMembers}
          >  
                {
                  isAdding ? <CircularProgress size={20}/> : 'añadir miembros'
                }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  

  export default AddOrganizationMemberDialog