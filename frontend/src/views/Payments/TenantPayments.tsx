import React, {useMemo, useCallback} from 'react'
import {
    Paper,
    Box,
    Typography,
    Skeleton,
    Chip,
    CircularProgress,
    Button
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridRowSelectionModel,
    GridOverlay,
    GridPaginationModel,
  } from "@mui/x-data-grid"
import { Payment, Tenant } from '../../api/PropertiesApiSlice'
import dayjs, { Dayjs } from "dayjs"
import { paymentMethodMapper } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

interface TenantPaymentsProps {
    tenant: Tenant
}

const TenantPayments: React.FC<TenantPaymentsProps> = ({tenant}) => {

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
          (tenant?.payments ?? []).map((payment: Payment, index: number) => ({
            id: index,
            paymentId: payment.id,
            amount: `$${payment.amount.toFixed(2)}`,
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
        p: 2
    }}
    >
    <Typography variant="h6" sx={{ padding: 2 }}>
    Pagos de {tenant?.firstName} {tenant?.lastName}
    </Typography>
    <DataGrid
              rows={rows}
              columns={columns}
            //   initialState={{
            //     pagination: {
            //       paginationModel: {
            //         page,
            //         pageSize,
            //       },
            //     },
            //   }}
              pagination
              pageSizeOptions={[10, 25, 50, 100]}
              paginationMode="client"
              rowCount={rows.length}
              //paginationModel={{ page, pageSize }}
             // onPaginationModelChange={handlePaginationModelChange}
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
            <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
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
    </Paper>
    </>
  )
}

export default TenantPayments