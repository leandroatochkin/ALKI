import React, {useState, useEffect} from 'react'
import { mockProperties, PropertyDTO } from '../../api/PropertiesApiSlice'
import PropertyCard from '../../components/Cards/PropertyCard'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useGetPropertiesByUserIdQuery } from '../../api/PropertiesApiSlice'
import {LinearProgress} from '@mui/material'
import { useAppSelector } from '../../api/store/hooks'
import { UserPreview } from '../../api/UsersSlice'

const Properties = () => {
const [properties, setProperties] = useState<PropertyDTO[] | []>([])
const [progress, setProgress] = useState<number>(0);
  const userData: UserPreview = useAppSelector(
        state => state.dashboard.userData,
      )

const { data, isLoading, isError } = useGetPropertiesByUserIdQuery('') 

useEffect(() => {
    if (data) {
        setProperties(data)
    } else {
        setProperties(mockProperties)
    }
},[data])

const currentMonthlyTotalRevenue = properties
.map((property) => property.tenantData?.payments ?? [])
.map((payments) => payments.map((payment) => payment?.amount ?? 0))
.flat()
.reduce((acc, propertyRev) => acc + propertyRev, 0)

const calculatedMRR = properties
.map((property) => property.tenantData?.contractValue ?? [])
.flat()
.reduce((acc, contractValue) => acc + contractValue, 0)

console.log(calculatedMRR)
console.log(properties)


const getRevenueProgress = () => {

const targetMonthlyRevenue = !userData.autoCalculateMRR ? userData.monthlyRevenue : calculatedMRR

const progress = targetMonthlyRevenue > 0 
    ? Math.min(100, Math.round((currentMonthlyTotalRevenue / targetMonthlyRevenue) * 100))
    : 0

  return progress
}

useEffect(()=>{
  const revenueProgress = getRevenueProgress()
  setProgress(revenueProgress)
},[properties])

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
              {`Ingreso mensual (meta: $${userData.autoCalculateMRR ? calculatedMRR.toFixed(2) : userData.monthlyRevenue.toFixed(2)})`}
            </Typography>
            <Typography 
            variant='h4'
            sx={{
              textAlign: 'end'
            }}
            >
              {`$${currentMonthlyTotalRevenue.toFixed(2)}`}
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