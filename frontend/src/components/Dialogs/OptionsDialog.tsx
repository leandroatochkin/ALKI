import React, {useEffect} from 'react'
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Box, 
    TextField, 
    FormLabel, 
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    ToggleButton,
    ToggleButtonGroup,
    CircularProgress 
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'; 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import 'dayjs/locale/es'
import { spanishLocaleText } from '../../utils/dataLists';
import { UserPreview } from '../../api/UsersSlice';
import {  onlyNumbersRegex } from '../../utils/regexPatterns';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch } from '../../api/store/hooks'
import { setUserData } from '../../components/Dashboard/DashboardStore/DashboardStore'
import { useUpdateUserDataMutation } from '../../api/UsersSlice';



interface OptionsDialogProps {
    userData: UserPreview,
    open: boolean,
    onClose: () => void
}

const OptionsDialog: React.FC<OptionsDialogProps> = ({ open, onClose, userData}) => {

      const [updateUser, {isLoading}] = useUpdateUserDataMutation()

    const dispatch = useAppDispatch()
        



    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: {errors},
    } = useForm<UserPreview>({
        defaultValues: {
            id: userData.id
        }
        
    })

     useEffect(() => {
                    if (userData) {
                      setValue('firstName', userData.firstName)
                      setValue('lastName', userData.lastName)
                      setValue('middleName', userData.middleName)
                      setValue('email', userData.email)
                      setValue('phoneNumber', userData.phoneNumber)
                      setValue('countryCode', userData.countryCode)
                      setValue('addressLine1', userData.addressLine1)
                      setValue('addressLine2', userData.addressLine2)
                      setValue('state', userData.state)
                      setValue('city', userData.city)
                      setValue('postalCode', userData.postalCode)
                      setValue('autoCalculateMRR', userData.autoCalculateMRR)
                      setValue('theme', userData.theme)
                      setValue('monthlyRevenue', Number(userData.monthlyRevenue))
                    }
                  }, [userData, setValue])



    const onSubmit = async (data: UserPreview) => {
    try {
        const transformedData = {
            ...data,
            monthlyRevenue: parseInt(data.monthlyRevenue as any, 10)
        };
        await updateUser(transformedData).unwrap();
        alert(`Datos actulizados`);
    } catch (e) {
        alert(`Error al actualizar datos`);
        console.log(e);
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
        <DialogTitle>Opciones</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                        <Box>
                        {/*---PERSONAL INFO---*/}

                        
                        {
                            userData.permissions === 'admin' &&
                            <>
                            {/*MMR*/}
                        <Box>
                            <FormLabel htmlFor="monthlyRevenue">Meta de ingresos mensuales</FormLabel>
                            <Typography
                            variant='body1'
                            >
                                Puede ingresar la meta manualmente o elegir que se calcule en base a los contratos que tenga activos
                            </Typography>
                            <Box 
                            sx={{
                                display: 'flex'
                            }}
                            >
                                <TextField
                                type='number'
             
                                id="monthlyRevenue"
                                variant="standard"
                                placeholder="Ingreso mensual"
                                {...register(`monthlyRevenue`, 
                                    { required: 'Campo obligatorio', 
                                        pattern: { 
                                            value: onlyNumbersRegex, 
                                            message: 'Solo números. Mínimo 2 números.' 
                                        } })}
                                error={!!errors.postalCode}
                                helperText={errors.postalCode?.message}
                                />
                                <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: 1
                                }}
                                >
                                
                               <Controller
                                    name="autoCalculateMRR"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                const val = e.target.checked;
                                                field.onChange(val); 
                                                dispatch(setUserData({ ...userData, autoCalculateMRR: val }));
                                            }}
                                            />
                                        }
                                        label="auto-calcular"
                                        />
                                    )}
                                    />

                       
                                </Box>
                            </Box>
                        </Box>
                            </>
                        }
                        {/*THEME*/}
                        <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            flexDirection: 'column',
                 

                        }}
                        >
                        <FormLabel htmlFor='theme'>Tema</FormLabel>
                        <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            mt:1
                        }}
                        >
                        <ToggleButtonGroup
                        id='theme'
                        value={watch('theme')} 
                        onChange={(_e, val) => {
                            setValue('theme', val)
                            dispatch(setUserData({ ...userData, theme: val }));
                        }}
                        color='primary'
                        exclusive
                        >
                            <ToggleButton
                            value='dark'
                            >
                                <BedtimeIcon/>
                                oscuro
                            </ToggleButton>
                            <ToggleButton
                            value='light'
                            >
                                <LightModeIcon/>
                                claro
                            </ToggleButton>
                        </ToggleButtonGroup>
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

export default OptionsDialog