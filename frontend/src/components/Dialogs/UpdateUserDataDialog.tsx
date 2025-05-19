import React, {useEffect} from 'react'
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Box, 
    TextField, 
    FormLabel, 
    Select, 
    MenuItem,
    Button,
    CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'; 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import 'dayjs/locale/es'
import { spanishLocaleText } from '../../utils/dataLists';
import { UserPreview } from '../../api/UsersSlice';
import { nameRegex, phoneRegex, addressRegex, onlyNumbersRegex } from '../../utils/regexPatterns';
import { countryListAlpha2 } from '../../utils/dataLists';
import { useUpdateUserDataMutation } from '../../api/UsersSlice';



interface UpdateUserDataDialogProps {
    userData: UserPreview,
    open: boolean,
    onClose: () => void
}

const UpdateUserDataDialog: React.FC<UpdateUserDataDialogProps> = ({userData, open, onClose}) => {


    const [updateUser, {isLoading}] = useUpdateUserDataMutation()


    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<UserPreview>({
        defaultValues: {
            id: userData.id
        }
        
    })

     useEffect(() => {
                    if (userData) {
                      // Set basic fields
                      setValue('firstName', userData.firstName)
                      setValue('lastName', userData.lastName)
                      setValue('middleName', userData.middleName)
                      setValue('email', userData.email)
                      setValue('phoneNumber', userData.phoneNumber)
                      setValue('countryCode', userData.countryCode)
                      setValue('addressLine1', userData.addressLine1)
                      setValue('addressLine2', userData.addressLine2)
                      setValue('monthlyRevenue', userData.monthlyRevenue)
                      setValue('state', userData.state)
                      setValue('city', userData.city)
                      setValue('postalCode', userData.postalCode)
                      setValue('autoCalculateMRR', userData.autoCalculateMRR)
                      setValue('theme', userData.theme)
                    }
                  }, [userData, setValue])



    const onSubmit = async (data: UserPreview) => {
        try{
            await updateUser(data).unwrap()
            alert(`Datos actulizados`);
        } catch(e){
            alert(`Error al actualizar datos`)
            console.log(e)
        }
    }

  return (
   <LocalizationProvider
   dateAdapter={AdapterDayjs}
   adapterLocale='es'
   localeText={spanishLocaleText}
   >
      <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    >
        <DialogTitle>Datos personales</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                        <Box>
                        {/*---PERSONAL INFO---*/}

                        {/*FIRST NAME*/}
                        <Box>
                            <FormLabel htmlFor="email">Nombre</FormLabel>
                            <Box className="relative">
                                <TextField
                                fullWidth
                                id="firstName"
                                variant="standard"
                                placeholder="Nombre"
                                {...register(`firstName`, 
                                    { required: 'Campo obligatorio', 
                                        pattern: { 
                                            value: nameRegex, 
                                            message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                        } })}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                />    
                            </Box>
                        </Box>
                        {/*LAST NAME*/}
                        <Box>
                            <FormLabel htmlFor="lastName">Apellido</FormLabel>
                            <Box className="relative">
                                <TextField
                                fullWidth
                                id="lastName"
                                variant="standard"
                                placeholder="Apellido"
                                {...register(`lastName`, 
                                    { required: 'Campo obligatorio', 
                                        pattern: { 
                                            value: nameRegex, 
                                            message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                        } })}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                />    
                            </Box>
                        </Box>
                        {/*MIDDLE NAME*/}
                        <Box>
                            <FormLabel htmlFor="middleName">Segundo nombre</FormLabel>
                            <Box>
                                <TextField
                                fullWidth
                                id="middleName"
                                variant="standard"
                                placeholder="Segundo nombre"
                                {...register(`middleName`, 
                                    { 
                                        pattern: { 
                                            value: nameRegex, 
                                            message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                        } })}
                                error={!!errors.middleName}
                                helperText={errors.middleName?.message}
                                />    
                            </Box>
                        </Box>
                        {/*PHONE NUMBER*/}
                        <Box>
                            <FormLabel htmlFor="phoneNumber">Telefóno</FormLabel>
                            <Box>
                            <TextField
                                id="phoneNumber"
                                variant="standard"
                                placeholder="541122333666"
                                {...register("phoneNumber", {
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                    value: phoneRegex,
                                    message: 'Debe ingresar un número válido en formato 541122333666, sin 15 ni espacios ni caracteres especiales',
                                    },
                                })}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                />
            
                            </Box>
                        </Box>
                        {/*COUNTRY*/}
                        <Box>
                            <FormLabel htmlFor="country">País</FormLabel>
                            <Box>
                            <Select
                            {...register("countryCode", {
                                required: 'Este campo es obligatorio',
                            })}
                            defaultValue={'AR'}
                            >
                            {Object.entries(countryListAlpha2).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                {`${code} - ${name}`}
                                </MenuItem>
                            ))}
                            </Select>
                            </Box>
                        </Box>
                        {/*STATE*/}
                        <Box>
                            <FormLabel htmlFor="state">Provincia</FormLabel>
                            <Box className="relative">
                                <TextField
                                fullWidth
                                id="state"
                                variant="standard"
                                placeholder="Provincia"
                                {...register(`state`, 
                                    { required: 'Campo obligatorio', 
                                        pattern: { 
                                            value: nameRegex, 
                                            message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                        } })}
                                error={!!errors.state}
                                helperText={errors.state?.message}
                                />    
                            </Box>
                        </Box>
                        {/*CITY*/}
                        <Box>
                            <FormLabel htmlFor="city">Ciudad</FormLabel>
                            <Box className="relative">
                                <TextField
                                fullWidth
                                id="city"
                                variant="standard"
                                placeholder="Ciudad"
                                {...register(`city`, 
                                    { required: 'Campo obligatorio', 
                                        pattern: { 
                                            value: nameRegex, 
                                            message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                        } })}
                                error={!!errors.city}
                                helperText={errors.city?.message}
                                />    
                            </Box>
                        </Box>
                        {/*ADDRESS*/}
                        <Box>
                            <FormLabel htmlFor="addressLine1">Dirección</FormLabel>
                            <Box className="relative">
                                <TextField
                                fullWidth
                                id="addressLine1"
                                variant="standard"
                                placeholder="Dirección, linea 1"
                                {...register(`addressLine1`, 
                                    { required: 'Campo obligatorio', 
                                        pattern: { 
                                            value: addressRegex, 
                                            message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                        } })}
                                error={!!errors.addressLine1}
                                helperText={errors.addressLine1?.message}
                                />    
                            </Box>
                            <Box className="relative">
                                <TextField
                                fullWidth
                                id="addressLine1"
                                variant="standard"
                                placeholder="Dirección, linea 2"
                                {...register(`addressLine2`, 
                                    { 
                                        pattern: { 
                                            value: addressRegex, 
                                            message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                        } })}
                                error={!!errors.addressLine2}
                                helperText={errors.addressLine2?.message}
                                />    
                            </Box>
                        </Box>
                        {/*POSTAL CODE*/}
                        <Box>
                            <FormLabel htmlFor="postalCode">Código postal</FormLabel>
                            <Box className="relative">
                                <TextField
                                fullWidth
                                id="postalCode"
                                variant="standard"
                                placeholder="Código postal"
                                {...register(`postalCode`, 
                                    { required: 'Campo obligatorio', 
                                        pattern: { 
                                            value: onlyNumbersRegex, 
                                            message: 'Solo números. Mínimo 2 números.' 
                                        } })}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode?.message}
                                />    
                            </Box>
                        </Box>

                        <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                md: 'row'
                            },
                            justifyContent: 'space-between',
                            mt: 2,
                            gap: 2
                        }}
                        >   
                            
                            <Button
                            type='submit'
                            variant='outlined'
                            color='secondary'
                            disabled={isLoading}
                            >
                                {
                                    isLoading ? <CircularProgress size={20}/> : 'Guardar cambios'
                                }
                            </Button>
                            <Button
                            variant='outlined'
                            color='warning'
                            disabled={isLoading}
                            onClick={() => {
                                onClose()
                            }}
                            >
                                Cancelar
                            </Button>
                        </Box>
            
                    </Box>    
                    </form>
        </DialogContent>

    </Dialog>
   </LocalizationProvider>
  )
}

export default UpdateUserDataDialog