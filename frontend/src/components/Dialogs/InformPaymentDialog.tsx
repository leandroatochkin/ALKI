import React from 'react'
import { PropertyDTO } from '../../api/PropertiesApiSlice'
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Box, 
    Typography, 
    TextField, 
    FormLabel, 
    Select, 
    MenuItem,
    Button,
    CircularProgress 
} from '@mui/material'
import { useForm } from 'react-hook-form'; 
import { Payment } from '../../api/PaymentsApiSlice';
import { contractPaymentMethodList } from '../../utils/dataLists';
import { onlyNumbersRegex } from '../../utils/regexPatterns';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { spanishLocaleText } from '../../utils/dataLists';
import { paymentStatusMapper } from '../../utils/dataLists';
import { usePostPaymentsMutation } from '../../api/PaymentsApiSlice';


interface InformPaymentDialogProps {
    property: PropertyDTO,
    open: boolean,
    onClose: () => void
}

const InformPaymentDialog: React.FC<InformPaymentDialogProps> = ({property, open, onClose}) => {
    const currentMonth = dayjs().startOf('month')

    const [postPayment, {isLoading: isPaying}] = usePostPaymentsMutation()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
    } = useForm<Payment>({
        defaultValues: {
            id: '',
            date: String(new Date()),
            period: dayjs().startOf('month').format('MM-YY'),
            tenantId: property.tenantData?.tenantId,
            status: 0
        }
    })



    const onSubmit = (data: Payment) => {
        try{
            const paymentArr = Array(data)
            postPayment(paymentArr).unwrap()
        } catch(e){
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
        <DialogTitle>Informar pago manual</DialogTitle>
        <DialogContent>
            <Box
            >
                <Typography
                sx={{
                    fontWeight: 'bold'
                }}
                >{property.title}</Typography>
                <Typography>monto mensual: ${property.tenantData?.contractValue.toFixed(2)}{property.tenantData?.contractCurrency}</Typography>
                <form
                onSubmit={handleSubmit(onSubmit)}
                >
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    >
                            <FormLabel htmlFor='amount'>Monto:</FormLabel>
                    <TextField
                    id='amount'
                    type='number'
                    {...register(`amount`,
                        {
                            required: 'Campo requerido',
                            pattern: onlyNumbersRegex
                        }
                    )}
                    />
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    >
                    <FormLabel htmlFor='method'>Forma de pago:</FormLabel>
                    <Select
                          {...register(`method`, {
                            required: 'Este campo es obligatorio',
                        })}
                        defaultValue={0}
                    >
                        {Object.entries(contractPaymentMethodList).map(([code, type]) => (
                            <MenuItem key={code} value={code}>
                                {`${type}`}
                            </MenuItem>
                            ))}
                    </Select>
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    >
                    <FormLabel htmlFor='date'>Fecha de pago:</FormLabel>
                    <DatePicker
                    value={dayjs(new Date())}
                    onChange={(newValue) => setValue('date', newValue ? newValue.toISOString() : '')}
                    format="MM/DD/YYYY" 
                    />
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    >
                    <FormLabel htmlFor='period'>Período</FormLabel>
                    <DatePicker
                    label="Mes"
                    views={['year', 'month']}
                    value={watch('period') ? dayjs(watch('period'), 'MM-YY') : currentMonth} 
                    onChange={(newValue) =>
                        setValue('period', newValue ? newValue.format('YYYY-MM') : '')
                    }
                    format="MM/YYYY"
                    />
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    >
                    <FormLabel htmlFor='method'>Estado del pago:</FormLabel>
                    <Select
                          {...register(`status`, {
                            required: 'Este campo es obligatorio',
                        })}
                        defaultValue={0}
                    >
                        {Object.entries(paymentStatusMapper).map(([code, type]) => (
                            <MenuItem key={code} value={code}>
                                {`${type}`}
                            </MenuItem>
                            ))}
                    </Select>
                    </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            md: 'row'
                        },
                        mt: 2,
                        gap: 2
                    }}
                    >
                    <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    disabled={isPaying}
                    >
                        {
                            isPaying
                            ?
                            <CircularProgress size={20}/>
                            :
                            'registrar pago'
                        }
                    </Button>
                    <Button
                    variant='outlined'
                    color='secondary'
                    onClick={onClose}
                    >
                        volver
                    </Button>
                    </Box>
                </form>

            </Box>
        </DialogContent>

    </Dialog>
   </LocalizationProvider>
  )
}

export default InformPaymentDialog