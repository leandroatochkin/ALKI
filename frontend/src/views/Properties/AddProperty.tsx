import React,{useMemo, useState} from 'react'
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Skeleton,
    CircularProgress,
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridRowSelectionModel,
    GridOverlay,
    GridPaginationModel,
  } from "@mui/x-data-grid"
  import { mockProperties, PropertyDTO } from '../../api/PropertiesApiSlice'
  import { propertyTitleMapper } from '../../utils/functions'
  import { useNavigate } from 'react-router-dom'
  import AddPropertyDialog from '../../components/Dialogs/AddPropertyDialog'

const AddProperty = () => {
        const [openDialog, setOpenDialog] = useState<boolean>(false)

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
            field: "title",
            headerName: "nombre",
            width: 130,
            editable: false,
          },
          {
            field: "address",
            headerName: "dirección",
            width: 120,
            editable: false,
          },
          {
            field: "city",
            headerName: "ciudad",
            width: 120,
            editable: false,
          },
          {
            field: "state",
            headerName: "provincia/estado",
            width: 120,
            editable: false,
          },
          {
            field: "country",
            headerName: "país",
            width: 120,
            editable: false,
          },
          {
            field: "type",
            headerName: "tipo de prop.",
            width: 150,
            editable: false,
          },
          {
            field: "occupied",
            headerName: "ocupada",
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
                    console.log("Modificar propiedad", params.row.propertyId)
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
          (mockProperties ?? []).map((property: PropertyDTO, index: number) => ({
            id: index,
            propertyId: property.id,
            title: property.title,
            address: property.address,
            city: property.city,
            state: property.state,
            country: property.country,
            type: propertyTitleMapper(property.type),
            occupied: property.occupied ? "Sí" : "No",
          })),
        [],
      )


  return (
    <>
    {openDialog && <AddPropertyDialog open={openDialog} onClose={()=>setOpenDialog(false)} modify={false}/>}
    <Paper
    sx={{
        p: 2,
    }}
    >
    <Typography variant="h4" gutterBottom>
        Agregar o modificar propiedades
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
                                    gap: 2,
                                }}
                                >   
                                    <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setOpenDialog(true)}
                                    >
                                        agregar propiedad
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

export default AddProperty