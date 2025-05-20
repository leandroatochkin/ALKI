import {useEffect, useState, useMemo} from 'react'
import {
    Paper,
    Box,
    Typography,
    Skeleton,
    CircularProgress,
    Button,
    IconButton,
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridOverlay,
  } from "@mui/x-data-grid"
import { useParams } from 'react-router-dom'
import { ServiceDTO, useGetServicesByPropertyIdQuery } from '../../api/ServicesApiSlice'
import { useGetPropertyByIdQuery } from '../../api/PropertiesApiSlice'
  import ReplayIcon from '@mui/icons-material/Replay'
  import { customLocaleText } from '../../utils/locale'
  import { useNavigate } from 'react-router-dom'




const Services = () => {
const [services, setServices] = useState<ServiceDTO[] | []>([])    

const { propertyId } = useParams<{ propertyId: string }>()

const {data, isLoading, error, refetch} = useGetServicesByPropertyIdQuery(propertyId ?? '')
const {data: propertyData, isLoading: isLoadingProperty, error: errorProperty} = useGetPropertyByIdQuery(propertyId ?? '')

const navigate = useNavigate()


    useEffect(() => {
      if (isLoading) return; // Don't do anything while loading
    
      if (!error && data && Array.isArray(data)) {
        setServices(data);
      }

      if(error) {
        console.error(error)
        alert(`Error al cargar servicios.`)
      }
    }, [data, isLoading, error, refetch]);

        const TableSkeleton = () => (// for later use
        <Box
          sx={{ width: "100%", height: "calc(100vh - 300px)", minHeight: "400px" }}
        >
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <Skeleton
                key={i}
                height={35}
                animation="wave"
                sx={{
                  my: 0.5,
                  opacity: 1 - i * 0.1, // Fades as it goes down
                }}
              />
            ))}
        </Box>
      )
    
      const CustomLoadingOverlay = () => (
        <GridOverlay
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={40} />
        </GridOverlay>
      )

      
            const columns = useMemo<GridColDef<(typeof rows)[number]>[]>(
              () => [
                {
                  field: "serviceName",
                  headerName: "servicio",
                  width: 130,
                  editable: false,
                },
                {
                  field: "serviceCost",
                  headerName: "monto",
                  width: 120,
                  editable: false,
                },
                {
                  field: "serviceResponsibility",
                  headerName: "responsable",
                  width: 150,
                  editable: false,
                },
                {
                  field: "method",
                  headerName: "método de pago",
                  width: 100,
                  editable: false,
                },
                
              ],
              [],
            )
      
            const rows = (services ?? []).map((service: ServiceDTO, index: number) => ({
                  id: index,
                  serviceId: service.serviceId,
                  propertyId: service.propertyId,
                  serviceName: service.serviceName,
                  serviceCost: service.serviceCost,
                  serviceResponsibility: service.serviceResponsibility,
                  serviceDescription: service.serviceDescription,
                }))
             
    

  return (
    <>
    <Paper
    sx={{
        p: 2,
        mt: 2,
    }}
    >
     {
      isLoading 
      ?
      (
        <CircularProgress size={40}/>
      )
      :
     (
      <>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      >
        <Typography variant="h6" sx={{ padding: 2 }}>
        Servicios de {propertyData?.title}
        </Typography>
        <IconButton
        onClick={() => refetch()}
        >
          <ReplayIcon/>
        </IconButton>
      </Box>
            {
              isLoading
              ?
              <TableSkeleton />
              :
              (
                <DataGrid
              localeText={customLocaleText}  
              rows={rows}
              columns={columns}
              pagination
              pageSizeOptions={[10, 25, 50, 100]}
              paginationMode="client"
              rowCount={rows.length}
              disableColumnFilter
              disableColumnSelector
              checkboxSelection
              sx={{
                //opacity: isUnpaidNotesLoading || refreshLoading ? 0.7 : 1,
                opacity: 1,
                transition: "opacity 0.3s ease",
                minHeight: "400px",
                height: "calc(100vh - 300px)",
                maxHeight: "600px",
              }}
              slots={{
                loadingOverlay: CustomLoadingOverlay,
              }}
            />
              )
            }
            <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                justifyContent: "flex-end",
                mt: 2
            }}
            >
                <Button
                variant="outlined"
                color="secondary"
                onClick={() => {navigate('/home')}}
                >
                    volver
                </Button>
            </Box>
      </>
     )
     }
    </Paper>
    </>
  )
}

export default Services