import React, {useState} from 'react'
import {
    Box, 
    Button, 
    Typography, 
    FormLabel, 
    Paper,
    Divider,
} from "@mui/material"
import { PropertyDTO } from '../../api/PropertiesApiSlice'
import { PropertyIconMapper } from '../../utils/functions'
import PropertyInfoDialog from '../Dialogs/PropertyInfoDialog'

interface PropertyCardProps {
    property: PropertyDTO
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const IconComponent = PropertyIconMapper(property.type)

    
  return (
    <>
    {openDialog && <PropertyInfoDialog property={property} open={openDialog} onClose={() => setOpenDialog(false)} />}
    <Paper
    sx={{
        borderRadius: 2
    }}
    >
        <Box
        sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            width: '100%',
            padding: 2,
        }}
        >
         {/*UPPER*/}   
            <Box
            sx={{
                width: {xs: '100%',md: '30%'},
                display: 'flex',
                gap: 2,
                padding: 2,
            }}
            >   
            <Box>
            {IconComponent ? <IconComponent /> : null}
            </Box>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
            >
                <Typography>
                    {property.address}
                </Typography>
                <Typography>
                    {property.title}
                </Typography>
            </Box>
            </Box>
            <Divider />
         {/*LOWER*/}
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          >
            <Box
          sx={{
                width: '100%',
                display: 'flex',
                padding: 2,
                flexDirection: {xs: 'column', md: 'row'},
          }}
          >
           <Box
           sx={{
            display: 'flex',
            flexDirection: 'column',
           }}
           >
           <FormLabel htmlFor='tenantName'>Inquilino</FormLabel>
           <Typography>{property.tenantData?.lastName}, {property.tenantData?.firstName}</Typography>
           </Box>
           <Box
           sx={{
            display: 'flex',
            flexDirection: 'column',
           }}
           >
            <Typography>${property.tenantData?.contractValue.toFixed(2)}</Typography>
            <Typography>hasta {property.tenantData?.contractEndDate}</Typography>
           </Box>
          </Box>
          <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            gap: 2
          }}
          >
            <Button
            variant='outlined'
            color='primary'
            >
                marcar pago
            </Button>
            <Button
            variant='outlined'
            color='warning'
            onClick={() => setOpenDialog(true)}
            >
                informacion
            </Button>

          </Box>
          </Box>
        </Box>
    </Paper>
    </>
  )
}

export default PropertyCard