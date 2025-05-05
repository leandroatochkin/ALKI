import React from 'react'
import { PropertyDTO } from '../../api/PropertiesApiSlice'
import { Dialog, DialogTitle, DialogContent, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { propertyTitleMapper } from '../../utils/functions'
import { useNavigate } from 'react-router-dom';

interface PropertyInfoDialogProps {
    property: PropertyDTO,
    open: boolean,
    onClose: () => void
}

const PropertyInfoDialog: React.FC<PropertyInfoDialogProps> = ({property, open, onClose}) => {

    const navigate = useNavigate()

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
                <Typography>Tipo: {propertyTitleMapper(property.type)}</Typography>
                {
                    property.tenantData && (
                        <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    >
                    <Typography component="span">Inquilino</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                     <Typography>Nombre: {property.tenantData?.lastName}, {property.tenantData?.firstName}</Typography>
                     <Typography>Email: {property.tenantData?.email}</Typography>
                     <Typography>Teléfono: {property.tenantData?.phoneNumber}</Typography>
                     <Typography>Mascotas: {property.tenantData?.pets}</Typography>
                     <Typography>Niños: {property.tenantData?.children}</Typography>
                     <Typography>Fumador?: {property.tenantData?.smoking ? 'Sí' : 'No'}</Typography>
                     {property.tenantData?.observations && <Typography>Observaciones: {property.tenantData?.observations}</Typography>}
                     <Box
                     sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        gap: 2,
                     }}
                     >
                        <Button
                        variant='contained'
                        color='primary'
                        onClick={()=>navigate(`/payments?tenantId=${property.tenantData?.tenantId}`)}
                        >
                        ver pagos
                        </Button>
                        <Button
                        variant='contained'
                        color='warning'
                        >
                        ver contrato
                        </Button>
                     </Box>
                    </AccordionDetails>
                </Accordion>
                    )
                }
            </Box>
        </DialogContent>

    </Dialog>
  )
}

export default PropertyInfoDialog