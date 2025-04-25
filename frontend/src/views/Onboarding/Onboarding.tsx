import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Material UI imports
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { 
  CheckCircle, 
  Person as PersonIcon, 
  Work as WorkIcon, 
  LocationOn as LocationIcon 
} from "@mui/icons-material";
import { UserPreview } from "../../api/UsersSlice";
import { 
    emailRegex, 
    nameRegex, 
    passwordRegex,
    phoneRegex, 
    onlyNumbersRegex,
    addressRegex
} from '../../utils/regexPatterns';
import { countryListAlpha2 } from "../../utils/dataLists";
import { useOnboardUserMutation } from "../../api/UsersSlice";
import { getUserId } from "../../api/store/id";



// TabPanel component for tab content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const Onboarding = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(33);

      const {  
          handleSubmit, 
          register, 
          watch,
          setError, 
          formState: { errors }, 
            } = useForm<UserPreview>({
                defaultValues: {
                    id: getUserId() ?? '',
                    middleName: ''
                }
                
            })
  


  // Handle step changes
  const handleStepChange = (event: React.SyntheticEvent, newStep: number) => {
    setActiveStep(newStep);
    if (newStep === 0) setProgress(50);
    if (newStep === 1) setProgress(100);
  }
  const [onBoard, { isLoading }] = useOnboardUserMutation();

  const onSubmit = async (data: UserPreview) => {
    try {
      await onBoard(data).unwrap()
      navigate('/home')
    } catch (err) {
      console.error('Onboarding error:', err)
      navigate('/error')
    }
  }

  return (
    <Container maxWidth="md" sx={{ 
        height: '100dvh'
     }}>
      <Box>
        <CardHeader 
          title={
            <Typography variant="h5" align="center">
              Bienvenid@ a ALKI! 
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Ayudenos a personalizar su experiencia completando estos campos.
            </Typography>
          }
        />
        
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        
        <CardContent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeStep} 
                onChange={handleStepChange} 
                variant="fullWidth"
                aria-label="profile steps"
              >

                {/*PERSONAL INFO*/}
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                      Personal
                    </Box>
                  } 
                  {...a11yProps(0)} 
                  disabled={activeStep !== 0}
                />


                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ mr: 1 }} fontSize="small" />
                      Ubicación
                    </Box>
                  } 
                  {...a11yProps(1)} 
                  disabled={activeStep !== 1 && activeStep !== 2}
                />
                
              </Tabs>
            </Box>

            {/* Personal Tab */}
            <form 
            onSubmit={handleSubmit(onSubmit)}
            >
            <TabPanel value={activeStep} index={0}>
         
                <Box
                sx={{
                    pointerEvents: isLoading ? 'none' : 'all'
                }}
                >
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
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Button 
        
                    variant="outlined" 
                    fullWidth
                    size="large"
                    onClick={
                        () => {
                            setActiveStep(1);
                            setProgress(90);
                          }
                      }
                  >
                    continuar
                  </Button>
                </Box>
              
            </TabPanel>

         
            <TabPanel value={activeStep} index={1}>
             
                {/* Add your professional form fields here */}
                <Box
                sx={{
                    pointerEvents: isLoading ? 'none' : 'all'
                }}
                >
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
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => {
                      setActiveStep(0);
                      setProgress(50);
                    }}
                    disabled={isLoading}
                  >
                    volver
                  </Button>
                  <Button 
                  type="submit"
                  >
                    {
                        isLoading
                        ?
                        <CircularProgress size={20}/>
                        :
                        `enviar datos`
                    }

                  </Button>
                </Box>
        
            </TabPanel>
            </form>
          </Box>
        </CardContent>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle sx={{ mr: 1 }} color="success" fontSize="small" />
            Su información se almacena de forma segura y se puede editar en cualquier momento.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}