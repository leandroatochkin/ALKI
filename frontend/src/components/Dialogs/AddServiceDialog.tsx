    import React, { useState } from 'react'
    import {
        Box,
        Typography,
        Button,
        Dialog,
        DialogTitle,
        DialogContent,
        TextField,
        CircularProgress,
        Select,
        MenuItem
    } from '@mui/material'
    import { ServiceDTO } from '../../api/ServicesApiSlice'
    import { usePostServicesMutation } from '../../api/ServicesApiSlice'
    import { useForm } from 'react-hook-form'
import { addressRegex, nameRegex, onlyNumbersRegex } from '../../utils/regexPatterns'
import { useAppSelector } from '../../api/store/hooks'
import { UserPreview } from '../../api/UsersSlice'

    interface AddItemsToInventoryDialogProps {
        open: boolean
        onClose: () => void
        propertyId: string
        refetch: () => void
    }


    
    const AddServiceDialog: React.FC<AddItemsToInventoryDialogProps> = ({open, onClose, propertyId, refetch}) => {
    const [newServices, setNewServices] = useState<ServiceDTO[] | []>([])
     const userData: UserPreview = useAppSelector(
                state => state.dashboard.userData,
              )


    const [postServices, {isLoading}] = usePostServicesMutation()
  
     
         const {
             register,
             handleSubmit,
             formState: {errors},
             reset
         } = useForm<ServiceDTO>({
             defaultValues: {
                 propertyId: propertyId,
                 userId: userData.permissions === 'admin' ? userData.id : userData.parentUserId,
                 serviceId: '',
             }
             
         })
    


    const handleAddServices = () => {
        if (!newServices.length) return
        try{
          postServices(newServices).unwrap()
          refetch()
          setNewServices([])
          onClose()
        } catch (error) {
          console.error('Error al añadir artículos al inventario', error)
        }
        
      }

      const addService = (data: ServiceDTO) => {
         setNewServices(prev => [...prev, data])
         reset()
      }
  
  

  
      return(
          <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          sx={{
            p: 2
          }}
          >
              <DialogTitle>Añadir servicios</DialogTitle>
              
              <DialogContent>
              {newServices.length > 0 && (
                  <Box sx={{ p: 2 }}>
                      <Typography variant="h6">Servicio añadidos:</Typography>
                      {newServices.map((service, index) => (
                          <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 1,
                            borderBottom: "1px solid #ccc",
                          }}
                          key={index}
                          >
                            <Typography>{service.serviceName}</Typography>
                            <Typography>AR${Number(service.serviceCost).toFixed(2)}</Typography>
                            <Typography>Paga: {service.serviceResponsibility}</Typography>
                          </Box>
                      ))}
                  </Box>
              )}
          
    <Box
    sx={{   
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    }}
    >
        <form
        onSubmit={handleSubmit(addService)}
        >
                <TextField
                fullWidth   
                id='serviceName'
                placeholder="Nombre del servicio"
                {...register(`serviceName`,{
                    required: true,
                    pattern: {
                    value: nameRegex,
                    message: 'Solo letras, números, tildes, guiones y apóstrofes. Mínimo 5 caracteres'
                    }
                })}
                error={!!errors.serviceName}
                helperText={errors.serviceName?.message}
                />

                <TextField
                fullWidth   
                id='serviceCost'
                type='number'
                placeholder="Costo del servicio"
                {...register(`serviceCost`,{
                    required: true,
                    pattern: {
                    value: onlyNumbersRegex,
                    message: 'Solo números. Mínimo 2 caracteres'
                    }
                })}
                error={!!errors.serviceCost}
                helperText={errors.serviceCost?.message}
                />

                <TextField
                fullWidth   
                id='serviceDescription'
                type='Descripción'
                placeholder="Descripción del servicio"
                multiline
                minRows={2}
                {...register(`serviceDescription`,{
                    required: true,
                    pattern: {
                    value: addressRegex,
                    message: 'Solo letras, números, tildes, guiones y apóstrofes. Mínimo 5 caracteres'
                    }
                })}
                error={!!errors.serviceDescription}
                helperText={errors.serviceDescription?.message}
                />
    
               <Box
               sx={{
                display: 'flex',
               }}
               >
                <Select
                fullWidth
                {...register("serviceResponsibility", {
                    required: 'Este campo es obligatorio',
                    })}
                defaultValue={'inquilino'}
                    >
                    {['propietario', 'inquilino'].map((name, index) => (
                                    <MenuItem key={index} value={name}>
                                    {`${name}`}
                                    </MenuItem>
                    ))}
                </Select>




                <Button
                variant="contained"
                type='submit'
                sx={{ width: {xs: 230, sm: 40}, height: {xs: 55, sm: 55} }}
                >
                        +
                </Button>
               </Box>
        </form>

    </Box>


        

              <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                mt: 2,
                gap: 2,
              }}
              >
              
              <Button
              onClick={handleAddServices}
              variant='outlined'
              color='primary'
              disabled={!newServices.length || isLoading}
              >
                  {
                    isLoading
                    ?
                    <CircularProgress size={20} />
                    :
                    `Añadir servicios`
                  }
              </Button>         
                  <Button
              onClick={() => {
                onClose()
              }}
              variant='outlined'
              color='warning'
              >
                  volver
              </Button>  
              </Box>    
              </DialogContent>
              
          </Dialog>
      )
    }

    export default AddServiceDialog