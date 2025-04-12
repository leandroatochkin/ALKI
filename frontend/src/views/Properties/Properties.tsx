import React, {useState, useEffect} from 'react'
import { mockProperties, PropertyDTO } from '../../api/PropertiesApiSlice'
import PropertyCard from '../../components/Cards/PropertyCard'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useGetPropertiesByUserIdQuery } from '../../api/PropertiesApiSlice'

const Properties = () => {
const [properties, setProperties] = useState<PropertyDTO[] | []>([])

const { data, isLoading, isError } = useGetPropertiesByUserIdQuery('') 

useEffect(() => {
    if (data) {
        setProperties(data)
    } else {
        setProperties(mockProperties)
    }
},[data])

  return (
  <>
  {isError && (
    <Paper sx={{ padding: 2, backgroundColor: 'error.main', color: 'white' }}>
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