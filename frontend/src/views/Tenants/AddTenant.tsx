import  {useState, useMemo, useEffect} from 'react'
import {
    Paper,
    Typography,
    Button,
    Box,
    Skeleton,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    Link,
    Select,
    MenuItem,
    IconButton
} from '@mui/material'
import {
    DataGrid, 
    GridColDef,
    GridCellParams,
    GridRowSelectionModel,
    GridOverlay,
  } from "@mui/x-data-grid"
  import { useNavigate } from 'react-router-dom'
import { TenantDTO } from '../../api/TenantsApiSlice'
import { paymentMethodMapper } from '../../utils/functions'
import AddTenantDialog from '../../components/Dialogs/AddTenantDilalog'
import DeleteTenantDialog from '../../components/Dialogs/DeleteTenantDialog'
import { 
  useGetTenantsByUserIdQuery, 
  useAssignTenantToPropertyMutation, 
} from '../../api/TenantsApiSlice'
import { useGetPropertiesByUserIdQuery, PropertyDTO } from '../../api/PropertiesApiSlice'
import { useAppSelector } from '../../api/store/hooks'
import dayjs from 'dayjs'
import ReplayIcon from '@mui/icons-material/Replay';
import { customLocaleText } from '../../utils/locale'


interface Observations {
    observations: string,
    pets: number,
    children: number,
    smoking: boolean,
}

const AddTenant = () => {
    const [tenants, setTenants] = useState<TenantDTO[] | []>([])
  
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [tenantToModify, setTenantToModify] = useState<string | null>(null)
    const [observations, setObservations] = useState<Observations | null>(null)
    const [selectedTenant, setSelectedTenant] = useState<string | null>(null)
    const [openDeleteTenantDialog, setOpenDeleteTenantDialog] = useState<boolean>(false)
    const [openAssignToPropertyDialog, setOpenAssignToPropertyDialog] = useState<boolean>(false)
    const userData = useAppSelector(
      state => state.dashboard.userData 
    )

    const idPermissionCheck = (userData.permissions === 'admin' ? userData.id : userData.parentUserId) ?? ''

    const { data, isLoading, isError, refetch } = useGetTenantsByUserIdQuery(idPermissionCheck)


    const { data: properties, isLoading: isLoadingProperties } = useGetPropertiesByUserIdQuery(idPermissionCheck)

    const [assignTenantToProperty, {isLoading: isAssigning}] = useAssignTenantToPropertyMutation()

    const disabledCondition = isLoading || isLoadingProperties || isAssigning

    const mapPropertiesToIdTitle = (properties: PropertyDTO[]): Record<string, string> => {
      return properties.reduce((acc, prop) => {
        acc[prop.id] = prop.title
        return acc
      }, {} as Record<string, string>)
    }

    const mappedProps = mapPropertiesToIdTitle(properties ?? [])
    const propertiesMap =  mappedProps 
   
    

    const handleRowSelection = (selection: GridRowSelectionModel) => {
      const selectedData = selection.map(
        selectedRowId => rows[Number(selectedRowId)]
      )
  
      const selectedTenantsIds = selectedData.flatMap(row =>
        row?.tenantId ? [row.tenantId] : [],
      )
  
      setSelectedTenant(selectedTenantsIds[0] ?? null)
    }
    

    useEffect(() => {
      if (!isError && data && Array.isArray(data.tenants)) {
        setTenants(data.tenants);
      } 
    }, [data, isLoading, isError, refetch]);
    
    
  

    const tenantFiltered = tenants.filter((tenant) => tenant.tenantId === tenantToModify)[0] ?? null

    const navigate = useNavigate()

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
              () => {
            const baseColumns = 
            [
              {
                field: "name",
                headerName: "nombre",
                width: 130,
                editable: false,
              },
              {
                field: "phoneNumber",
                headerName: "teléfono",
                width: 120,
                editable: false,
                renderCell: (params: GridCellParams) => {
                  return (
                      <Link
                        href={`tel:${params.row.phoneNumber}`}
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                      >
                        +{params.row.phoneNumber}
                        </Link>
                  )
                }
              },
              {
                field: "email",
                headerName: "email",
                width: 120,
                editable: false,
                renderCell: (params: GridCellParams) => {
                  return (
                      <Link
                        href={`mailto:${params.row.email}`}
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                      >
                        {params.row.email}
                        </Link>
                  )
                }
              },
              {
                  field: "property",
                  headerName: "prop. asign.",
                  width: 120,
                  editable: false,
                },
              {
                  field: "observations",
                  headerName: "observaciones",
                  width: 120,
                  editable: false,
                  renderCell: (params: GridCellParams) => {
                    return (
                      <Button
                        color="primary"
                        onClick={() => {
                           setObservations(prev=>({
                              ...prev,
                              observations: params.row.observations,
                              pets: params.row.pets,
                              children: params.row.children,
                              smoking: params.row.smoking,
                            }))
                        }}
                      >
                        ver obs.
                      </Button>
                    )
                  },
                },
              {
                  field: "contractStartDate",
                  headerName: "com. contrato",
                  width: 120,
                  editable: false,
                },
              {
                field: "contractEndDate",
                headerName: "fin contrato",
                width: 120,
                editable: false,
              },
              {
                field: "contractStatus",
                headerName: "est. contrato",
                width: 120,
                editable: false,
              },
              {
                field: "contractPaymentFrequency",
                headerName: "frecuencia de pago",
                width: 150,
                editable: false,
              },                
            ]

            const modifyColumn =
            {
              field: "modify",
              headerName: "modificar",
              width: 120,
              editable: false,
              renderCell: (params: GridCellParams) => {
                return (
                  <Button
                    color="primary"
                    onClick={() => {
                       setTenantToModify(params.row.tenantId)
                    }}
                  >
                    Modificar
                  </Button>
                )
              },
            }

            if (userData.permissions !== 'view') {
              baseColumns.push(modifyColumn)
            }
          
            return baseColumns
            },
              [tenants],
            )
      
            const rows = useMemo(
              () =>
                (tenants ?? []).map((tenant: TenantDTO, index: number) => ({
                  id: index,
                  tenantId: tenant.tenantId,
                  propietorId: tenant.propietorId,
                  name: `${tenant.lastName}, ${tenant.firstName}`,
                  fistName: tenant.firstName,
                  lastName: tenant.lastName,
                  email: tenant.email,
                  phoneNumber: tenant.phoneNumber,
                  property: tenant.propertyId,
                  observations: tenant.observations,
                  contractStartDate: dayjs(tenant.contractStartDate).format('DD/MM/YY'),
                  contractEndDate: dayjs(tenant.contractEndDate).format('DD/MM/YY'),
                  contractStatus: tenant.contractStatus,
                  contractId: tenant.contractId,
                  contractType: tenant.contractType,
                  contractValue: `${Number(tenant?.contractValue).toFixed(2) ?? 0}`,
                  contractCurrency: tenant.contractCurrency,
                  contractPaymentMethod: paymentMethodMapper(tenant.contractPaymentMethod),
                  contractPaymentFrequency: tenant.contractPaymentFrequency,
                  payments: tenant.payments,
                  pets: tenant.pets,
                  children: tenant.children,
                  smoking: tenant.smoking ? "Sí" : "No",
                })),
              [tenants],
            )

  const ObservationsDialog = () => {
    return(
        <Dialog
        open={observations !== null}
        onClose={() => setObservations(null)}
        >
            <DialogTitle>Observaciones</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Observaciones: {observations?.observations}</Typography>
                <Typography variant="body1">Niños: {observations?.children}</Typography> 
                <Typography variant="body1">Mascotas: {observations?.pets}</Typography> 
                <Typography variant="body1">Fumador: {observations?.smoking}</Typography>         
            </DialogContent>
            <Button
            onClick={() => setObservations(null)}
            variant='outlined'
            color='warning'
            >
                cerrar
            </Button>
        </Dialog>
    )
  }

  const AssignToPropertyDialog = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)



  const handleAssignTenantToProperty = async () => {
    if (selectedTenant && selectedProperty) {
        const data = {
            tenantId: selectedTenant,
            propertyId: selectedProperty,
        }
        console.log(data)
        await assignTenantToProperty(data).unwrap()
        setOpenAssignToPropertyDialog(false)
    } else {
        console.error("No se seleccionó inquilino o propiedad")
    }
  }

    return(
        <Dialog
        open={openAssignToPropertyDialog}
        onClose={() => setOpenAssignToPropertyDialog(false)}
        fullWidth
        sx={{
          p: 2
        }}
        >
            <DialogTitle>Seleccione la propiedad</DialogTitle>
            <DialogContent>
            <Select
                fullWidth
                defaultValue={Object.keys(propertiesMap)[0]}
                onChange={(e) => setSelectedProperty(e.target.value)}
                >
                {Object.entries(propertiesMap).map(([code, type]) => (
                    <MenuItem key={code} value={code}> 
                    {`${type}`}
                    </MenuItem>
                ))}
                </Select>

            <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              mt: 2,
              gap: 2,
            }}
            >
            
            <Button
            onClick={handleAssignTenantToProperty}
            variant='outlined'
            color='primary'
            disabled={isAssigning || !selectedTenant || !selectedProperty}
            >
                asignar inquilino
            </Button>         
                <Button
            onClick={() => setOpenAssignToPropertyDialog(false)}
            variant='outlined'
            color='warning'
            >
                cerrar
            </Button>  
            </Box>    
            </DialogContent>
            
        </Dialog>
    )
  }

  return (
    <>
    {observations && <ObservationsDialog />}
    {openDialog && <AddTenantDialog open={openDialog} onClose={()=>setOpenDialog(false)} modify={false}/>}
    {tenantToModify && <AddTenantDialog open={!!tenantToModify} onClose={()=>setTenantToModify(null)} modify={true} tenant={tenantFiltered}/>}
    {openAssignToPropertyDialog && <AssignToPropertyDialog />}
    {openDeleteTenantDialog && <DeleteTenantDialog open={openDeleteTenantDialog} onClose={()=>setOpenDeleteTenantDialog(false)} tenantId={selectedTenant ?? ''} refetch={refetch}/>}
      <Paper
        sx={{
            p: 2,
            mt: 2,
        }}
        >
        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        >
          <Typography variant="h4" gutterBottom>
            {
              userData.permissions !== 'view'
              ?
              `Agregar o modificar inquilinos`
              :
              `Inquilinos`
            }
        </Typography>
        <IconButton
        onClick={() => refetch()}
        >
          <ReplayIcon/>
        </IconButton>
        </Box>
        {
          !isLoading
          ?
          (
            <DataGrid
            rows={rows}
            columns={columns}
            localeText={customLocaleText}
            pagination
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="client"
            rowCount={rows.length}
            disableColumnFilter
            disableColumnSelector
            checkboxSelection={userData.permissions !== 'view'}
            disableMultipleRowSelection
            onRowSelectionModelChange={handleRowSelection}
            sx={{
              opacity: isLoading  ? 0.7 : 1,
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
          :
        (
            <TableSkeleton/>
        )
        }
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                justifyContent: "flex-end",
                                gap: 2,
                                mt: 2,
                                }}
                                >
                                {
                                  userData.permissions !== 'view' &&
                                  <>
                                  <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => setOpenDialog(true)}
                                  >
                                      agregar inquilino
                                  </Button>
                                  <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => setOpenAssignToPropertyDialog(true)}
                                  disabled={disabledCondition || !selectedTenant }
                                  >
                                      + asignar a propiedad
                                  </Button>
                                  <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => setOpenDeleteTenantDialog(true)}
                                  disabled={disabledCondition || !selectedTenant }
                                  >
                                      - dar de baja
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
        </Paper>
      
    </>
  )
}

export default AddTenant