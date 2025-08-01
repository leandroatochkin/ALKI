import {useMemo, useState, useEffect} from 'react'
import {
    Paper,
    Typography,
    Button,
    Box,
    Skeleton,
    CircularProgress,
    IconButton,
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridRowSelectionModel,
    GridOverlay,
  } from "@mui/x-data-grid"
  import { PropertyDTO } from '../../api/PropertiesApiSlice'
  import { propertyTitleMapper } from '../../utils/functions'
  import { useNavigate } from 'react-router-dom'
  import AddPropertyDialog from '../../components/Dialogs/AddPropertyDialog'
  import { useGetPropertiesByUserIdQuery, useDeletePropertyMutation } from '../../api/PropertiesApiSlice'
  import { useAppSelector } from '../../api/store/hooks'
  import ReplayIcon from '@mui/icons-material/Replay'
  import { UserPreview } from '../../api/UsersSlice'
  import { customLocaleText } from '../../utils/locale'

const AddProperty = () => {
        const [properties, setProperties] = useState<PropertyDTO[] | []>([])
        const [openDialog, setOpenDialog] = useState<boolean>(false)
        const [propertyToModify, setPropertyToModify] = useState<string | null>(null)
        const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
         const userData: UserPreview = useAppSelector(
            state => state.dashboard.userData,
          )
        const propertyFiltered = properties.filter((property) => property.id === propertyToModify)[0] ?? null
         
        const { data, isLoading, isError, refetch } = useGetPropertiesByUserIdQuery((userData.permissions === 'admin' ? userData.id : userData.parentUserId) ?? '')

        const [deleteProperty,{isLoading: isDeleting}] = useDeletePropertyMutation()

      
        

        useEffect(() => {
          if (Array.isArray(data)) {
          setProperties(data);
        } else {
          setProperties([]); // fallback to empty array
        }
      }, [data, isLoading, isError, refetch])

      
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
            field: "services",
            headerName: "servicios",
            width: 120,
            editable: false,
            renderCell: (params: GridCellParams) => {
              return (
                <Button
                  color="primary"
                  onClick={() => {
                   navigate(`/services?propertyId=${params.row.propertyId}`)
                  }}
                >
                  ver servicios
                </Button>
              )
            },
          } 
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
                 setPropertyToModify(params.row.propertyId)
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
        [userData.permissions],
      )

      

      const rows = useMemo(
        () =>
          (properties ?? []).map((property: PropertyDTO, index: number) => ({
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
        [properties],
      )

        const handleRowSelection = (selection: GridRowSelectionModel) => {
            const selectedData = selection.map(
              selectedRowId => rows[Number(selectedRowId)]
            )
        
            const selectedPropertyId = selectedData.flatMap(row =>
              row?.propertyId ? [row.propertyId] : [],
            )
        
            setSelectedProperty(selectedPropertyId[0] ?? null)
          }

          const handleDeleteProperty = () => {
            if(confirm("¿Está seguro de que desea eliminar esta propiedad?")) {
              try{
                if (selectedProperty) {
                  deleteProperty(selectedProperty).unwrap()
                  setSelectedProperty(null)
                }
              } catch (error) {
                console.error("Error deleting property:", error)
              }
            } return

          }

          


  return (
    <>
    {openDialog && <AddPropertyDialog open={openDialog} onClose={()=>setOpenDialog(false)} modify={false} refetch={refetch}/>}
    {propertyToModify && <AddPropertyDialog open={!!propertyToModify} onClose={()=>setPropertyToModify(null)} modify={true} property={propertyFiltered} refetch={refetch}/>}
    <Paper
    sx={{
        p: 2,
        mt: 2
    }}
    >
   <Box
   sx={{
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
   }}
   >
   <Typography variant="h4" gutterBottom>
        {
          userData.permissions === 'view'
          ?
          `Propiedades`
          :
          `Agregar o modificar propiedades`
        }
    </Typography>
    <IconButton
    onClick={
      ()=>refetch()
    }
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
            loading={
              isLoading
            }
            sx={{
              opacity: isLoading ? 0.7 : 1,
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
          flexDirection: {
              xs: "column",
              md: "row",
          },
          justifyContent: "flex-end",
          gap: 2,
          mt: 2
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
              agregar propiedad
          </Button>
          <Button
          variant="outlined"
          color="primary"
          onClick={handleDeleteProperty}
          disabled={!selectedProperty || isDeleting}
          >
              eliminar propiedad
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

export default AddProperty