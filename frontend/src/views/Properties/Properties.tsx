import React from 'react'
import { mockProperties } from '../../api/PropertiesApiSlice'
import PropertyCard from '../../components/Cards/PropertyCard'
import { Box } from '@mui/material'

const Properties = () => {
  return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 2,
            }}
        >
            {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
            ))}
        </Box>
  )
}

export default Properties