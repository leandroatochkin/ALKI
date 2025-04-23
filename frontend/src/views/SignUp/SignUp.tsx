import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { SignUpDTO } from '../../api/SignUpApiSlice'
import {
    Box, 
    Button, 
    TextField, 
    Typography, 
    FormControl, 
    FormLabel, 
    Checkbox, 
    InputAdornment, 
    IconButton, Input, 
    Select, 
    MenuItem
} from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Logo from "../../assets/Logo";
import { 
    emailRegex, 
    nameRegex, 
    passwordRegex,
    phoneRegex, 
    onlyNumbersRegex,
    addressRegex
} from '../../utils/regexPatterns';
import { countryListAlpha2 } from '../../utils/dataLists';
import { useNavigate } from 'react-router-dom';
import { UserPreview, useSignUpUserMutation } from '../../api/UsersSlice';
import { getAccessTokenWithConsent } from '../../api/hooks/auth0-client';
import { useAuth0 } from '@auth0/auth0-react';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [repeatEmail, setRepeatEmail] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")

    const [signUp, {isLoading}] = useSignUpUserMutation()

    const {  
        handleSubmit, 
        register, 
        watch,
        setError, 
        formState: { errors }, 
          } = useForm<UserPreview>()
    const watchEmail = watch("email");
    const watchPassword = watch("password")
    const navigate = useNavigate()
    const onSubmit = async (data: UserPreview) => {
        let hasError = false;
      
        if (repeatEmail !== data.email) {
          setError("email", { type: "manual", message: "Los emails no coinciden" });
          hasError = true;
        }
        if (repeatPassword !== data.password) {
          setError("password", { type: "manual", message: "Las contraseñas no coinciden" });
          hasError = true;
        }
      
        if (hasError) return;
        const token = await getAccessTokenWithConsent()
        const response = fetch(`${import.meta.env.VITE_SERVER_HOST}/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
                })
      };


  return (
    <Box 
    sx={{
        height: '100vh',
        width: '100vw',
        maxHeight: '100vh',
        maxWidth: '100vw',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1d1d1d, #2c2c2c)', // slate-50 to slate-100
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        
      <Box
      sx={{
        width: {xs: '90%', md: '40%'},
        maxHeight: '90vh',  
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // space-y-8 (approx 32px vertical spacing between children)
        p: { xs: 1, sm: 4 }, // p-6 sm:p-8 (24px on xs, 32px on sm+)
        borderRadius: '1rem', // rounded-xl
        boxShadow: 6, // shadow-lg
        overflowY: 'auto', // overflow-y-auto
      }}
      >
        <Box 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3, // mb-6 => 24px
          }}
        >
          <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
        <Logo darkMode={true}/>
        </Box>
          <Typography 
          variant="body1"
          sx={{
            fontWeight: 600,
          }}
          >gestión de propiedades simplificada</Typography>
        </Box>

        <Box className="text-center">

          <Typography 
          variant="body1"
          >complete los datos</Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Box>
            {/*EMAIL*/}
            <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="email"
                    type="email"
                    variant="standard"
                    placeholder="name@example.com"
                    {...register(`email`, { required: 'Required field', pattern: { value: emailRegex, message: 'Invalid email address' } })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                        input: {
                        startAdornment: (
                            <InputAdornment position='start'>
                            <MailIcon 
                                sx={{
                                    color: '#333'
                                }}
                                />
                            </InputAdornment>
                        ),
                        },
                    }}
                    />    
                </Box>
            </Box>
            {/*REPEAT EMAIL*/}       
            <Box>
                <FormLabel htmlFor="repeatEmail">Repetir Email</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="repeatEmail"
                    type="email"
                    variant="standard"
                    placeholder="repeat@example.com"
                    onChange={(e) => setRepeatEmail(e.target.value)}
                    error={repeatEmail !== watchEmail}
                    helperText={
                        repeatEmail && repeatEmail !== watchEmail ? "Emails do not match" : ""
                    }
                    slotProps={{
                        input: {
                        startAdornment: (
                            <InputAdornment position="start">
                            <MailIcon sx={{ color: "#333" }} />
                            </InputAdornment>
                        ),
                        },
                    }}
                    />
                </Box>
            </Box>
            {/*PASSWORD*/}
            <Box>
                <Box>
                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                </Box>
                <Box className="relative">
                    <Input
                        fullWidth
                    id="password"
                    color="secondary"
                    type={showPassword ? "text" : "password"}
                    {...register(`password`, { required: 'Campo requerido', pattern: { value: passwordRegex, message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo' } })}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                        </InputAdornment>
                    }
                    />

                    
                </Box>
            </Box>
            {/*REPEAT PASSWORD*/}
            <Box>
                <FormLabel htmlFor="repeatPassword">Repetir contraseña</FormLabel>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="repeatPassword"
                    type={showPassword ? "text" : "password"}
                    variant="standard"
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    error={repeatPassword !== watchPassword}
                    helperText={
                        repeatPassword && repeatPassword !== watchPassword ? "las contraseñas no coinciden" : ""
                    }
                    />
                </Box>
            </Box>
            {/*---PERSONAL INFO---*/}
            <Typography
            variant='body1'
            color='#333'
            sx={{
                mt: 2,
                mb: 1,
                fontWeight: 600,
            }}
            >
                Información personal
            </Typography>
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
                justifyContent: 'space-between',
                mt: 2,
            }}
            >   
                <Button
                variant='outlined'
                color='warning'
                onClick={() => {
                    navigate('/')
                }}
                >
                    Cancelar
                </Button>
                <Button
                type='submit'
                variant='outlined'
                color='secondary'
                >
                    Crear cuenta
                </Button>
            </Box>

        </Box>    
        </form>


      </Box>
    </Box>
  )
}

export default SignUp