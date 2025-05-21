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
    GridRowSelectionModel
  } from "@mui/x-data-grid"
import { ServiceDTO, useGetServicesByPropertyIdQuery, useDeleteServiceMutation } from '../../api/ServicesApiSlice'
  import ReplayIcon from '@mui/icons-material/Replay'
  import { customLocaleText } from '../../utils/locale'
  import { useNavigate, useLocation } from 'react-router-dom'
  import AddServiceDialog from '../../components/Dialogs/AddServiceDialog'
  import { useAppSelector } from '../../api/store/hooks'
  import { UserPreview } from '../../api/UsersSlice'




const Services = () => {
const [services, setServices] = useState<ServiceDTO[] | []>([])
const [openAddServiceDialog, setOpenAddServiceDialog] = useState<boolean>(false)
const [selectedService, setSelectedService] = useState<string | null>(null)   
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search) 
           const userData: UserPreview = useAppSelector(
              state => state.dashboard.userData,
            )

  const propertyId = queryParams.get("propertyId")



const {data, isLoading, error, refetch} = useGetServicesByPropertyIdQuery(propertyId ?? '')
const [deleteService, {isLoading: isDeleting}] = useDeleteServiceMutation()


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

      
              const handleRowSelection = (selection: GridRowSelectionModel) => {
                  const selectedData = selection.map(
                    selectedRowId => rows[Number(selectedRowId)]
                  )
              
                  const selectedServiceId = selectedData.flatMap(row =>
                    row?.serviceId ? [row.serviceId] : [],
                  )
              
                  setSelectedService(selectedServiceId[0] ?? null)
                }

            const handleDeleteService = async () => {
                if (!selectedService) return;
                try{
                    if(confirm(`¿Está seguro que quiere eliminar el servicio seleccionado?`)){
                        await deleteService(selectedService).unwrap()
                           refetch()
                        alert(`Servicio eliminado.`)
                     
                    }
            } catch(e){
                console.error(e)
                alert(`Error al eliminar servicio.`)
            }
            }

      
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
                  field: "serviceDescription",
                  headerName: "descripción",
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
                  serviceCost: `$${Number(service.serviceCost).toFixed(2)}`,
                  serviceResponsibility: service.serviceResponsibility,
                  serviceDescription: service.serviceDescription,
                }))
             
    

  return (
    <>
    {
        openAddServiceDialog && <AddServiceDialog open={openAddServiceDialog} onClose={()=>setOpenAddServiceDialog(false)} propertyId={propertyId ?? ''} refetch={refetch}/>
    }
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
        Servicios de la propiedad
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
              disableMultipleRowSelection
              disableColumnFilter
              disableColumnSelector
              checkboxSelection={userData.permissions !== 'view'}
              onRowSelectionModelChange={handleRowSelection}
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
                gap: 2,
                justifyContent: "flex-end",
                mt: 2
            }}
            > 
                {
                    userData.permissions !== 'view' &&
                <>
                <Button
                variant="outlined"
                color="primary"
                onClick={() => {setOpenAddServiceDialog(true)}}
                disabled={isLoading || isDeleting}
                >
                    añadir servicio
                </Button>
                <Button
                variant="outlined"
                color="primary"
                onClick={handleDeleteService}
                disabled={isLoading || isDeleting}
                >
                    eliminar servicio
                </Button>
                </>   
                }
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