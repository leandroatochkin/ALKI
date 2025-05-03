import {useState, useEffect, useMemo} from 'react'
import { PropertyDTO } from '../../api/PropertiesApiSlice'
import PropertyCard from '../../components/Cards/PropertyCard'
import { 
  Box, 
  CircularProgress, 
  Paper, 
  Typography,
  Button 
} from '@mui/material'
import { useGetPropertiesByUserIdQuery } from '../../api/PropertiesApiSlice'
import {LinearProgress} from '@mui/material'
import { useAppSelector } from '../../api/store/hooks'
import { UserPreview } from '../../api/UsersSlice'
import { skipToken } from '@reduxjs/toolkit/query';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom'

const Properties = () => {
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const userData: UserPreview | undefined = useAppSelector(
    (state) => state.dashboard.userData
  );

  const userId = userData?.id;


  const navigate = useNavigate()


  const { data, isLoading, isError } = useGetPropertiesByUserIdQuery(
    userId ? userId : skipToken
  );

  const { currentMonthlyTotalRevenue, calculatedMRR } = useMemo(() => {
    const payments = properties
      .flatMap((property) => property.tenantData?.payments ?? [])
      .map((payment) => Number(payment?.amount) || 0);
  
    const contractValues = properties
      .map((property) => Number(property.tenantData?.contractValue) || 0);
  
    const currentMonthlyTotalRevenue = payments.reduce((sum, val) => sum + val, 0);
    const calculatedMRR = contractValues.reduce((sum, val) => sum + val, 0);
  
    return { currentMonthlyTotalRevenue, calculatedMRR };
  }, [properties]);
  
  
  const getRevenueProgress = () => {
    const targetMonthlyRevenue = !userData?.autoCalculateMRR
      ? userData?.monthlyRevenue
      : calculatedMRR;
  
    return targetMonthlyRevenue ?? 0 > 0
      ? Math.min(
          100,
          Math.round((currentMonthlyTotalRevenue / (targetMonthlyRevenue || 1)) * 100)
        )
      : 0;
  };


  useEffect(() => {
    if (data) {
      setProperties(data);
    }
  }, [data]);
  useEffect(()=>{
    const revenueProgress = getRevenueProgress()
    setProgress(revenueProgress)
  },[properties])

if (!userData?.id) return <div>Loading user...</div>;


const LinearProgressWithLabel = (props: any) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const NoProperty = () => {
  return(
    <Box 
        sx={{
            height: '100%', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            }}>
                <Box sx={{
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                    }}>
                    <HomeWorkIcon
                    fontSize='large'
                    />
                            <Typography>
                                Aún no has cargado ninguna propiedad.
                            </Typography>
                            <Button
                            variant='outlined'
                            onClick={
                              ()=>navigate('/properties')
                            }
                            >
                              empieza por aquí
                            </Button>
                      </Box>
          </Box>
  )
}

if (!userData?.id) return <div>Loading user...</div>;
if (isLoading) return <div>Loading properties...</div>;
if (properties.length === 0 || isError) return <NoProperty/>
                                

  return (
  <>
  {isError && (
    <Paper sx={{ padding: 2, backgroundColor: 'error.main', color: 'white', mt: 2 }}>
        <Typography variant="h6">Hubo un error cargando sus propiedades</Typography>
        <Typography variant="body2">Por favor intente más tarde</Typography>
    </Paper>
  )}
          <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 2,
            }}
        >
            <Paper
            sx={{
              p: 1,
              borderRadius: 2
            }}
            >
            <Typography>
              {`Ingreso mensual (meta: $${userData?.autoCalculateMRR ? calculatedMRR?.toFixed(2) : Number(userData?.monthlyRevenue).toFixed(2)})`}
            </Typography>
            <Typography 
            variant='h4'
            sx={{
              textAlign: 'end'
            }}
            >
       {`$${Number(currentMonthlyTotalRevenue).toFixed(2)}`}

            </Typography>
            <LinearProgressWithLabel value={progress}/>
            </Paper>

            { 
            !isLoading
            ?
            properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
            ))
            :
            (
            <CircularProgress size={40} color='primary'/>
            )
            }
            
        </Box>
  </>
  )
}

export default Properties