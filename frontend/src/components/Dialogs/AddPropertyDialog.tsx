import React, {useEffect} from 'react'
import { PropertyDTO } from '../../api/PropertiesApiSlice'
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    Box, 
    FormLabel, 
    TextField, 
    Button, 
    Checkbox, 
    Select, 
    MenuItem 
} from '@mui/material'

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { addressRegex, propertyNameRegex } from '../../utils/regexPatterns';
import { propertyTypeList, countryListAlpha2 } from '../../utils/dataLists';


interface PropertyInfoDialogProps {
    property?: PropertyDTO,
    open: boolean,
    modify?: boolean,
    onClose: () => void,
}

const AddPropertyDialog: React.FC<PropertyInfoDialogProps> = ({property, open, modify, onClose}) => {

     const {  
            handleSubmit, 
            register, 
            setValue,
            getValues,
            formState: { errors }, 
              } = useForm<PropertyDTO>()

              useEffect(() => {
                if (modify && property) {
                  // Set basic fields
                  setValue('title', property.title)
                  setValue('description', property.description)
                  setValue('address', property.address)
                  setValue('city', property.city)
                  setValue('state', property.state)
                  setValue('country', property.country)
                  setValue('occupied', property.occupied)
                  setValue('type', property.type)
                }
              }, [modify, property, setValue])

    const navigate = useNavigate()

    const onSubmit = async (data: PropertyDTO) => {
        try {
            // Call the API to add the property
            console.log(data)
            // If successful, close the dialog and refresh the properties list
            onClose()
        } catch (error) {
            console.error('Error adding property:', error)
        }
    }

  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    >
        <DialogTitle>{modify? 'Modificar propiedad' : 'Agregar propiedad'}</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/*PROP NAME*/}
            <Box>
                <FormLabel htmlFor="firstName">Nombre</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="firstName"
                    variant="standard"
                    placeholder="Nombre"
                    {...register(`title`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: propertyNameRegex, 
                                message: 'Solo letras, números, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    />    
                </Box>
            </Box>
            {/*PROP DESCRIPTION*/}
            <Box>
                <FormLabel htmlFor="description">Descripción</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="description"
                    variant="standard"
                    placeholder="Descripción"
                    {...register(`description`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: addressRegex, 
                                message: 'Solo letras, números, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    />    
                </Box>
            </Box>
            {/*PROP ADDRESS*/}
            <Box>
                <FormLabel htmlFor="address">Dirección</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="address"
                    variant="standard"
                    placeholder="Dirección"
                    {...register(`address`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: addressRegex, 
                                message: 'Solo letras, números, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    />    
                </Box>
            </Box>
            {/*PROP CITY*/}
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
                                value: propertyNameRegex, 
                                message: 'Solo letras, números, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    />    
                </Box>
            </Box>
            {/*PROP STATE*/}
            <Box>
                <FormLabel htmlFor="state">Provincia/estado</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="state"
                    variant="standard"
                    placeholder="Provincia"
                    {...register(`state`, 
                        { required: 'Campo obligatorio', 
                            pattern: { 
                                value: propertyNameRegex, 
                                message: 'Solo letras, números, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                            } })}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    />    
                </Box>
            </Box>
            {/*COUNTRY*/}
            <Box>
                <FormLabel htmlFor="country">País</FormLabel>
                    <Box>
                        <Select
                            {...register("country", {
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
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
                mt: 1
            }}
            >
                {/*PROP OCCUPIED*/}
            <Box>
                <FormLabel htmlFor="occupied">Ocupada</FormLabel>
                <Box className="relative">
                    <Checkbox
                    checked={property?.occupied}
                    id="occupied"
                    {...register(`occupied`)}
                    />    
                </Box>
            </Box>
            {/*PROP TYPE*/}
            <Box>
                <FormLabel htmlFor="type">Tipo</FormLabel>
                <Box>
                <Select
                {...register("type", {
                    required: 'Este campo es obligatorio',
                })}
                defaultValue={0}
                >
                {Object.entries(propertyTypeList).map(([code, type]) => (
                    <MenuItem key={code} value={code}>
                    {`${type}`}
                    </MenuItem>
                ))}
                </Select>
                </Box>
            </Box>
            </Box>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                gap: 2
            }}
            >       <Button
                     variant="contained"
                     color="secondary"
                     onClick={onClose}
                        >
                        volver
                    </Button>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                        {modify ? 'Modificar' : 'Agregar'}
                    </Button>
            </Box>
            </form>
        </DialogContent>

    </Dialog>
  )
}

export default AddPropertyDialog