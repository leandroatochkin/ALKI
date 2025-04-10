import React from 'react'
import { PropertyDTO } from '../../api/PropertiesApiSlice'
import { Dialog, DialogTitle, DialogContent, Box, Typography } from '@mui/material'
import { PropertyTitleMapper } from '../../utils/functions'

interface PropertyInfoDialogProps {
    property: PropertyDTO,
    open: boolean,
    onClose: () => void
}

const PropertyInfoDialog: React.FC<PropertyInfoDialogProps> = ({property, open, onClose}) => {
  return (
    <Dialog
    open={open}
    onClose={onClose}
    >
        <DialogTitle>Información de la propiedad</DialogTitle>
        <DialogContent>
            <Box>
                <Typography>Dirección: {property.address}</Typography>
                <Typography>Título: {property.title}</Typography>
                <Typography>Descripción: {property.description}</Typography>
                <Typography>Tipo: {PropertyTitleMapper(property.type)}</Typography>
            </Box>
        </DialogContent>

    </Dialog>
  )
}

export default PropertyInfoDialog