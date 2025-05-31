import React, {useEffect } from 'react'
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Box, 
    FormLabel, 
    TextField, 
    Button, 
    Select, 
    MenuItem,
    ButtonGroup,
    Typography,
    CircularProgress 
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form'
import { 
    nameRegex, 
    emailRegex, 
    phoneRegex, 
    observationsRegex 
} from '../../utils/regexPatterns';
import { 
    contractStatusList, 
    contractCurrencyList,
    contractPaymentMethodList 
} from '../../utils/dataLists';
import { 
    TenantDTO,
    usePostTenantMutation,
    useUpdateTenantMutation
 } from '../../api/TenantsApiSlice';
import dayjs from 'dayjs';
import { useAppSelector } from '../../api/store/hooks';
import { UserPreview } from '../../api/UsersSlice';
import { useDispatch } from 'react-redux';
import { showToast } from '../../api/ToastSlice';





interface TenantInfoDialogProps {
    tenant?: TenantDTO,
    open: boolean,
    modify?: boolean,
    onClose: () => void,
}

const AddTenantDialog: React.FC<TenantInfoDialogProps> = ({tenant, open, modify, onClose}) => {
    const userData: UserPreview = useAppSelector(
        state => state.dashboard.userData
    )


    const dispatch = useDispatch()
     const {  
            handleSubmit, 
            register, 
            setValue,
            watch,
            formState: { errors }, 
              } = useForm<TenantDTO>(
                {
                    defaultValues: {
                        propietorId: userData.permissions === 'admin' ? userData?.id : userData?.parentUserId
                    }
                }
              )
    const smoking = watch("smoking")
              useEffect(() => {
                if (modify && tenant) {
                  // Set basic fields
                  setValue('firstName', tenant.firstName)
                  setValue('lastName', tenant.lastName)
                  setValue('email', tenant.email)
                  setValue('phoneNumber', tenant.phoneNumber)
                  setValue('observations', tenant.observations)
                  setValue('pets', tenant.pets)
                  setValue('smoking', tenant.smoking)
                  setValue('children', tenant.children)
                  setValue('contractStartDate', tenant.contractStartDate)
                  setValue('contractEndDate', tenant.contractEndDate)
                  setValue('contractStatus', tenant.contractStatus)
                  setValue('contractValue', tenant.contractValue)
                  setValue('contractCurrency', tenant.contractCurrency)
                  setValue('contractPaymentFrequency', tenant.contractPaymentFrequency)
                  setValue('contractPaymentMethod', tenant.contractPaymentMethod)
                }
              }, [modify, tenant, setValue])



    const [postTenant, {isLoading: isPosting }] = usePostTenantMutation()
    const [updateTenant, {isLoading: isUpdating }] = useUpdateTenantMutation()


    


    const onSubmit = async (data: TenantDTO) => {
        try {
            if (modify && tenant) {
              
                await updateTenant({
                    ...tenant,
                    ...data,
                })
               dispatch(showToast({ message: 'Inquilino actualizado.', severity: 'success' }))
            } else {
                
                await postTenant(data)
                dispatch(showToast({ message: 'Inquilino creado.', severity: 'success' }))
            }

        } catch (error) {
            console.error('Error adding tenant:', error)
            dispatch(showToast({ message: 'Error al crear/modificar inquilino.', severity: 'error' }))
        }
    }

  return (
        <>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    >
        <DialogTitle>{modify? 'Modificar inquilino' : 'Agregar inquilino'}</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/*TENANT FIRST NAME*/}
            <Box>
                <FormLabel htmlFor="firstName">Nombre</FormLabel>
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
                                message: 'Solo letras, números, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT LAST NAME*/}
            <Box>
                <FormLabel htmlFor="lastName">Apellido</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="lastName"
                    variant="standard"
                    placeholder="Nombre"
                    {...register(`lastName`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: nameRegex, 
                                message: 'Solo letras, números, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT EMAIL*/}
            <Box>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="email"
                    variant="standard"
                    placeholder="E-mail"
                    {...register(`email`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: emailRegex, 
                                message: 'E-mail inválido' 
                            } })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT PHONE*/}
            <Box>
                <FormLabel htmlFor="phoneNumber">Télefono</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="phoneNumber"
                    variant="standard"
                    placeholder="Télefono"
                    {...register(`phoneNumber`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: phoneRegex, 
                                message: 'Télefono inválido' 
                            } })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT OBSERVATIONS*/}
            <Box>
                <FormLabel htmlFor="observations">Observaciones</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    rows={4}
                    multiline
                    id="observations"
                    variant="standard"
                    placeholder="Observaciones"
                    {...register(`observations`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: observationsRegex, 
                                message: 'Solo letras, números, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.observations}
                    helperText={errors.observations?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT PETS*/}
            <Box>
                <FormLabel htmlFor="pets">Mascotas</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    type='number'
                    id="pets"
                    variant="standard"
                    placeholder="Mascotas"
                    {...register(`pets`, 
                        { required: 'Campo obligatorio'})}
                    error={!!errors.pets}
                    helperText={errors.pets?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT CHILDREN*/}
            <Box>
                <FormLabel htmlFor="children">Niños</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    type='number'
                    id="children"
                    variant="standard"
                    placeholder="Niños"
                    {...register(`children`, 
                        { required: 'Campo obligatorio'})}
                    error={!!errors.children}
                    helperText={errors.children?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT SMOKING*/}
            <Box>
            <FormLabel htmlFor="smoking">Fumador</FormLabel>
            <Box className="relative">
                <ButtonGroup>
                <Button
                    variant={smoking === true ? 'contained' : 'outlined'}
                    onClick={() => setValue('smoking', true)}
                >
                    sí
                </Button>
                <Button
                    variant={smoking === false ? 'contained' : 'outlined'}
                    onClick={() => setValue('smoking', false)}
                >
                    no
                </Button>
                </ButtonGroup>
                {errors.smoking && (
                <Typography color="error" variant="caption">
                    {errors.smoking.message}
                </Typography>
                )}
            </Box>
            </Box>

            <Typography variant="h6" gutterBottom mt={2}>
                Información del contrato
            </Typography>

            {/*TENANT CONTRACT START DATE*/}
            <Box>
                <FormLabel htmlFor="contractStartDate">Fecha de inicio del contrato</FormLabel>
                <DatePicker
                    value={modify && tenant?.contractStartDate ? dayjs(tenant.contractStartDate) : null}
                    onChange={(newValue) => setValue('contractStartDate', newValue ? newValue.toISOString() : '')}
                    format="MM/DD/YYYY" 
                />
            </Box>
            {/*TENANT CONTRACT END DATE*/}
            <Box>
                <FormLabel htmlFor="contractEndDate">Fecha de fin del contrato</FormLabel>
                <DatePicker
                    value={modify && tenant?.contractEndDate ? dayjs(tenant.contractEndDate) : null}
                    onChange={(newValue) => setValue('contractEndDate', newValue ? newValue.toISOString() : '')}
                    format="MM/DD/YYYY" 
                />
            </Box>
            {/*TENANT CONTRACT STATUS*/}
            <Box>
                <FormLabel htmlFor="contractStatus">Estado del contrato</FormLabel>
                    <Box>
                        <Select
                            {...register("contractStatus", {
                                required: 'Este campo es obligatorio',
                            })}
                            defaultValue={0}
                            >
                            {Object.entries(contractStatusList).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                {`${name}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
            </Box>
             {/*TENANT CONTRACT VALUE*/}
            <Box>
                <FormLabel htmlFor="contractValue">Monto</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    type='number'
                    id="contractValue"
                    variant="standard"
                    placeholder="Monto"
                    {...register(`contractValue`, 
                        { required: 'Campo obligatorio'})}
                    error={!!errors.contractValue}
                    helperText={errors.contractValue?.message}
                    />    
                </Box>
            </Box>
            {/*TENANT CONTRACT CURRENCY*/}
            <Box>
                <FormLabel htmlFor="contractCurrency">Moneda de pago</FormLabel>
                    <Box>
                        <Select
                            {...register("contractCurrency", {
                                required: 'Este campo es obligatorio',
                            })}
                            defaultValue={0}
                            >
                            {Object.entries(contractCurrencyList).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                {`${name}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
            </Box>
            {/*TENANT CONTRACT FREQUENCY*/}
            <Box>
                <FormLabel htmlFor="contractPaymentFrequency">Frecuencia de pago</FormLabel>
                    <Box>
                        <Select
                            {...register("contractPaymentFrequency", {
                                required: 'Este campo es obligatorio',
                            })}
                            defaultValue={'mensual'}
                            >
                            {['semanal', 'bisemanal', 'mensual', 'bimestral', 'trimestral'].map((option, index) => (
                                <MenuItem key={index} value={option}>
                                {`${option}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
            </Box>
            {/*TENANT CONTRACT PAYMENT METHOD*/}
            <Box>
                <FormLabel htmlFor="contractPaymentMethod">Método de pago</FormLabel>
                    <Box>
                        <Select
                            {...register("contractPaymentMethod", {
                                required: 'Este campo es obligatorio',
                            })}
                            defaultValue={0}
                            >
                            {Object.entries(contractPaymentMethodList).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                {`${name}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
            </Box>



            <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                },
                justifyContent: 'flex-end',
                mt: 2,
                gap: 2
            }}
            >       
                    <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    disabled={isPosting || isUpdating}
                    >
                        {
                            isPosting || isUpdating
                            ?
                            (
                                <CircularProgress size={20} color='primary'/>
                            ) 
                            :
                            (
                                modify ? 'Modificar' : 'Agregar'
                            )
                        }
                    </Button>
                    <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClose}
                    disabled={isPosting || isUpdating}
                    >
                        volver
                    </Button>
                    
            </Box>
            </form>
        </DialogContent>

    </Dialog>
     </LocalizationProvider>
     
        </>
  )
}

export default AddTenantDialog