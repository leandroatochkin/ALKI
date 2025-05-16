import  {useMemo, useCallback, useEffect, useState} from 'react'
import {
    Paper,
    Box,
    Typography,
    Skeleton,
    Chip,
    CircularProgress,
    Button,
    IconButton,
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridOverlay,
  } from "@mui/x-data-grid"
import { Payment } from '../../api/PaymentsApiSlice'
import { TenantDTO } from '../../api/TenantsApiSlice'
import dayjs from "dayjs"
import { paymentMethodMapper } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'
import { useGetTenantPaymentsByTenantIdQuery } from '../../api/PaymentsApiSlice'
import { useGetTenantByIdQuery } from '../../api/TenantsApiSlice'
  import ReplayIcon from '@mui/icons-material/Replay'
  import { customLocaleText } from '../../utils/locale'


const TenantPayments = () => {
const [payments, setPayments] = useState<Payment[] | []>([])
const [tenant, setTenant] = useState<TenantDTO | null>(null)

const tenantId = new URLSearchParams(window.location.search).get('tenantId') || '';

const {data, isLoading, isError, status, refetch} = useGetTenantPaymentsByTenantIdQuery(tenantId)
const {data: tenantData, isLoading: isLoadingTenant} = useGetTenantByIdQuery(tenantId)
console.log(tenantData?.tenants[0])
console.log(data)

    useEffect(() => {
      if (isLoading) return; // Don't do anything while loading
    
      if (!isError && data && Array.isArray(data)) {
        setPayments(data);
      }
    }, [data, isLoading, isError, refetch]);

    useEffect(() => {
      if (isLoadingTenant) return; // Don't do anything while loading
    
      if (!isLoadingTenant && tenantData) {
        if (Array.isArray(tenantData.tenants)) {
          setTenant(tenantData.tenants[0]);
        }
       
      }
    }, [tenantData, isLoadingTenant])



const navigate = useNavigate()    

const statusColor = useCallback((status: number) => {
        switch (status) {
          case 0:
            return "green"
          case 1:
            return "red"
          case 2:
            return "orangered"
          default:
            return "gray"
        }
      }, [])

const statusMapper = useCallback((status: number) => {
        switch (status) {
          case 0:
            return "pago"
          case 1:
            return "deuda"
          case 2:
            return "pendiente"
          default:
            return "N/D"
        }
      }, [])


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
            field: "period",
            headerName: "período",
            width: 130,
            editable: false,
          },
          {
            field: "amount",
            headerName: "monto",
            width: 120,
            editable: false,
          },
          {
            field: "date",
            headerName: "fecha de pago",
            width: 150,
            editable: false,
          },
          {
            field: "method",
            headerName: "método de pago",
            width: 100,
            editable: false,
          },
          {
            field: "status",
            headerName: "status",
            width: 120,
            editable: false,
            renderCell: (params: GridCellParams) => {
              const status = params.row.status
              return (
                <Chip
                  label={statusMapper(status)}
                  variant="outlined"
                  style={{
                    color: `${statusColor(status)}`,
                    border: `1px solid ${statusColor(status)}`,
                  }}
                />
              )
            },
          },
        ],
        [],
      )

      const rows = useMemo(
        () =>
          (payments ?? []).map((payment: Payment, index: number) => ({
            id: index,
            paymentId: payment.id,
            amount: `$${Number(payment.amount).toFixed(2)}`,
            date: dayjs(payment.date).format("DD/MM/YYYY"),
            method: paymentMethodMapper(payment.method),
            period: payment.period,
            status: payment.status,
          })),
        [],
      )




  return (
    <>
    <Paper
    sx={{
        p: 2,
        mt: 2,
    }}
    >
     {
      isLoadingTenant 
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
        Pagos de {tenant?.firstName} {tenant?.lastName}
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
              //rowSelectionModel={selectedId}
              //onRowSelectionModelChange={setSelectedId}
            //   loading={
            //     isUnpaidNotesLoading || isLoadingRatesById || refreshLoading
            //   }
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

export default TenantPayments