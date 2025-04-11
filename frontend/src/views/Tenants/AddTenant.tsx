import React, {useState, useMemo} from 'react'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Skeleton,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    Link,
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridRowSelectionModel,
    GridOverlay,
    GridPaginationModel,
  } from "@mui/x-data-grid"
  import { mockProperties } from '../../api/PropertiesApiSlice'
  import { useNavigate } from 'react-router-dom'
import { TenantDTO } from '../../api/TenantsApiSlice'
import { paymentMethodMapper } from '../../utils/functions'
import AddTenantDialog from '../../components/Dialogs/AddTenantDilalog'


interface Observations {
    observations: string,
    pets: number,
    children: number,
    smoking: boolean,
}

const AddTenant = () => {
    const [tenants, setTenants] = useState<TenantDTO[] | []>(
        mockProperties.map(property => property.tenantData).filter((tenant): tenant is TenantDTO => tenant !== undefined) ?? []
    )
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [tenantToModify, setTenantToModify] = useState<TenantDTO | null>(null)
    const [observations, setObservations] = useState<Observations | null>(null)

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
              () => [
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
                },
                {
                  field: "delete",
                  headerName: "eliminar",
                  width: 120,
                  editable: false,
                  renderCell: (params: GridCellParams) => {
                    return (
                      <Button
                        color="primary"
                        onClick={() => {
                          console.log("Modificar propiedad", params.row.propertyId)
                        }}
                      >
                        Eliminar
                      </Button>
                    )
                  },
                },
              ],
              [],
            )
      
            const rows = useMemo(
              () =>
                (tenants ?? []).map((tenant: TenantDTO, index: number) => ({
                  id: index,
                  propietorId: tenant.propietorId,
                  name: `${tenant.lastName}, ${tenant.firstName}`,
                  fistName: tenant.firstName,
                  lastName: tenant.lastName,
                  email: tenant.email,
                  phoneNumber: tenant.phoneNumber,
                  property: tenant.propertyId,
                  observations: tenant.observations,
                  contractStartDate: tenant.contractStartDate,
                  contractEndDate: tenant.contractEndDate,
                  contractStatus: tenant.contractStatus,
                  contractId: tenant.contractId,
                  contractType: tenant.contractType,
                  contractValue: `${tenant.contractValue.toFixed(2)}`,
                  contractCurrency: tenant.contractCurrency,
                  contractPaymentMethod: paymentMethodMapper(tenant.contractPaymentMethod),
                  contractPaymentFrequency: tenant.contractPaymentFrequency,
                  payments: tenant.payments,
                  pets: tenant.pets,
                  children: tenant.children,
                  smoking: tenant.smoking ? "Sí" : "No",
                })),
              [],
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

  return (
    <>
    {observations && <ObservationsDialog />}
    {openDialog && <AddTenantDialog open={openDialog} onClose={()=>setOpenDialog(false)} modify={false} />}
      <Paper
        sx={{
            p: 2,
        }}
        >
        <Typography variant="h4" gutterBottom>
            Agregar o modificar inquilinos
        </Typography>
             <DataGrid
                          rows={rows}
                          columns={columns}
                          pagination
                          pageSizeOptions={[10, 25, 50, 100]}
                          paginationMode="client"
                          rowCount={rows.length}
                          disableColumnFilter
                          disableColumnSelector
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
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 2,
                                }}
                                >   
                                <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setOpenDialog(true)}
                                >
                                    agregar inquilino
                                </Button>
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