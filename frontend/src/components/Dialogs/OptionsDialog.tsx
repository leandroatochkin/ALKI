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
    Typography,
    Checkbox,
    FormControlLabel,
    ButtonGroup,
    ToggleButton,
    ToggleButtonGroup 
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'; 
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import 'dayjs/locale/es'
import { spanishLocaleText } from '../../utils/dataLists';
import { UserPreview } from '../../api/UsersSlice';
import {  onlyNumbersRegex } from '../../utils/regexPatterns';
import { useNavigate } from 'react-router-dom';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';



interface OptionsDialogProps {
    userData: UserPreview,
    open: boolean,
    onClose: () => void
}

const OptionsDialog: React.FC<OptionsDialogProps> = ({userData, open, onClose}) => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: {errors},
    } = useForm<UserPreview>({
        defaultValues: {
            id: ''
        }
        
    })

     useEffect(() => {
                    if (userData) {
                      // Set basic fields
                      setValue('monthlyRevenue', userData.monthlyRevenue)
                      setValue('autoCalculateMRR', userData.autoCalculateMRR)
                      setValue('theme', userData.theme)
                    }
                  }, [userData, setValue])



    const onSubmit = (data: UserPreview) => {
        console.log(data)
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
                            userData.permissions[0] === 'admin' &&
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
                                    control={control} // <- from useForm()
                                    render={({ field }) => (
                                        <FormControlLabel
                                        control={
                                            <Checkbox
                                            {...field}
                                            checked={field.value}
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
                        onChange={(e, val) => setValue('theme', val)}
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
                            >
                                guardar cambios
                            </Button>
                            <Button
                            variant='outlined'
                            color='warning'
                            onClick={() => {
                                navigate('/')
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