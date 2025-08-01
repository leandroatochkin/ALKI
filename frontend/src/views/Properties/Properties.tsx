import {useState, useEffect, useMemo} from 'react'
import { PropertyDTO } from '../../api/PropertiesApiSlice'
import PropertyCard from '../../components/Cards/PropertyCard'
import { 
  Box, 
  CircularProgress, 
  Paper, 
  Typography,
  Button, 
  Divider
} from '@mui/material'
import { useGetPropertiesByUserIdQuery } from '../../api/PropertiesApiSlice'
import { useGetMonthlyExpensesByUserIdQuery } from '../../api/ServicesApiSlice'
import {LinearProgress} from '@mui/material'
import { useAppSelector } from '../../api/store/hooks'
import { UserPreview } from '../../api/UsersSlice'
import { skipToken } from '@reduxjs/toolkit/query';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom'

const Properties = () => {
  const [properties, setProperties] = useState<PropertyDTO[] | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(()=>{console.log(properties)},[properties])


  const userData: UserPreview | undefined = useAppSelector(
    (state) => state.dashboard.userData
  );

  const userId = userData?.permissions === 'admin' ? userData.id : userData?.parentUserId;


  const navigate = useNavigate()


  const { data, isLoading, isError } = useGetPropertiesByUserIdQuery(
    userId ? userId : skipToken
  );

  const {data: expenses} = useGetMonthlyExpensesByUserIdQuery(userId ? userId : skipToken)

useEffect(() => {
  if (Array.isArray(data)) {
    setProperties(data);
  } else {
    setProperties([]); // fallback to empty array
  }
}, [data]);

  const expensesData = Array.isArray(expenses) ? Number(Object.values(expenses)[0]).toFixed(2) : 0


const { currentMonthlyTotalRevenue, calculatedMRR } = useMemo(() => {
  if (!Array.isArray(properties)) {
    return { currentMonthlyTotalRevenue: 0, calculatedMRR: 0 };
  }

  const payments = properties
    .flatMap((property) => property?.tenantData?.payments ?? [])
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

if (!userData?.id) return <Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress size={50}/></Box>;
if (isLoading) return <Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress size={50}/></Box>;
if (properties?.length === 0 || isError) return <NoProperty/>
                                

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
            {
              expenses && 
              <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
              >
                <Divider/>
                <Typography>
                 {`Gastos mensuales: $${expensesData}`}
                </Typography>
              </Box>
            }
            </Paper>

            { 
            !isLoading
            ?
            properties?.map((property) => (
            <PropertyCard key={property.propId} property={property} />
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