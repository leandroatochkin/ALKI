import  {useState, useEffect, useCallback} from 'react'
import {
    Paper,
    Typography,
    Box,
    Skeleton,
    CircularProgress,
    Select,
    MenuItem,
    FormLabel,
    Button,
    IconButton,
} from '@mui/material'
import {
    DataGrid,
    GridOverlay,
    GridRowSelectionModel
  } from "@mui/x-data-grid"
import { InventoryItem } from '../../api/InventoriesApiSlice'
import { 
  useGetInventoryByPropertyQuery, 
  useDeleteInventoryItemsMutation, 
  useDeleteInventoryMutation,
} from '../../api/InventoriesApiSlice'
import { useGetPropertiesByUserIdQuery } from '../../api/PropertiesApiSlice'
import AddItemsToInventoryDialog from '../../components/Dialogs/AddInventoryDialog'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../api/store/hooks'
import { customLocaleText } from '../../utils/locale'
import LockIcon from '@mui/icons-material/Lock';
import ReplayIcon from '@mui/icons-material/Replay'
import { useDispatch } from 'react-redux'
import { showToast } from '../../api/ToastSlice'

const AddInventory = () => {
const [inventory, setInventory] = useState<InventoryItem[] | null>(null)
const [selectedProperty, setSelectedProperty] = useState<string>('prop-001')
const [openAddItemsToInventoryDialog, setOpenAddItemsToInventoryDialog] = useState<boolean>(false)
const [itemsToDelete, setItemsToDelete] = useState<string[]>([])
const [list, setList] = useState<any | null>(null)
const userData = useAppSelector(
  state => state.dashboard.userData
)


const navigate = useNavigate()

const {data: propertiesData, isLoading: isLoadingProperties } = useGetPropertiesByUserIdQuery((userData.permissions === 'admin' ? userData.id : userData.parentUserId) ?? '')


const { data, isLoading, refetch: refetchItems, isError} = useGetInventoryByPropertyQuery(selectedProperty)
const [deleteItems, {isLoading: isDeletingItems}] = useDeleteInventoryItemsMutation()
const [deleteInventory, {isLoading: isDeletingInventory}] = useDeleteInventoryMutation()
const dispatch = useDispatch()


const propertiesMap = propertiesData?.reduce((acc, property) => {
  acc[property.propId] = property.title
  return acc
}, {} as Record<string, string>)

useEffect(()=>{
  if(propertiesData){
    refetchItems()
    setList(propertiesMap)
  } else {
    console.error('No se encontraron propiedades')
    dispatch(showToast({message: 'No se encontraron propiedades.', severity: 'error'}))
  }
},[propertiesData, isLoadingProperties])


useEffect(() => {
    if (data) {
        refetchItems()
        setInventory(data)
        if(isError){
          setInventory([])
        }
    } else {
        console.error('No se encontró el inventario')
        dispatch(showToast({message: 'No se encontró el inventario.', severity: 'error'}))
    }
},[data, selectedProperty])

useEffect(() => {
  if (list && !selectedProperty) {
    const firstKey = Object.keys(list)[0]
    if (firstKey) setSelectedProperty(firstKey)
  }
}, [list])

const handleDownloadQrsPDF = useCallback(async (propertyId: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_HOST}/return-pdfs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include auth if needed
      },
      body: JSON.stringify({ propertyId }),
    });
    dispatch(showToast({message: 'Solicitud exitosa.', severity: 'success'}))
    if (!response.ok) {
      throw new Error("Failed to fetch PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `inventario-${propertyId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  } catch (error) {
    console.error("Error exporting PDF:", error);
    dispatch(showToast({message: 'Error al descargar plantilla.', severity: 'error'}))
  }
}, []);


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
  

                const columns = 
                    [
                      {
                        field: "itemName",
                        headerName: "Artículo",
                        width: 130,
                        editable: false,
                      },
                      {
                        field: "quantity",  
                        headerName: "Cantidad",
                        width: 120,
                        editable: false,
                      },
                    ]
              
                  const rows = (inventory ?? []).map((item: InventoryItem, index: number) => ({
                    id: index,
                    itemId: item.id,
                    itemName: item.name,
                    quantity: item.quantity,
                    inventoryId: item.inventoryId,
                  }))

          const handleRowSelection = (selection: GridRowSelectionModel) => {
            const selectedData = selection.map(
              selectedRowId => rows[Number(selectedRowId)]
            )
        
            const selectedItemsIds = selectedData.flatMap(row =>
              row?.itemId ? [row.itemId] : [],
            )
        
            setItemsToDelete(selectedItemsIds ?? [])
          }


          const handleDeleteItems = () => {
            if(confirm('¿Está seguro que quiere eliminar estos artículos?') && itemsToDelete.length) {
              try{
                console.log(itemsToDelete)
                deleteItems(itemsToDelete).unwrap()
                refetchItems()
              } catch(e) {
                console.log(e)
              }
            }
          }

          const handleDeleteInventory = () => {
            if(confirm('¿Está seguro que quiere eliminar este inventario?') && inventory) {
              try{
                deleteInventory((inventory && inventory[0]?.inventoryId) ?? '').unwrap()
                refetchItems()
              } catch(e) {
                console.log(e)
              } 
            }
          }

  return (
      <>
      {
        openAddItemsToInventoryDialog && 
        <AddItemsToInventoryDialog 
        open={openAddItemsToInventoryDialog} 
        onClose={()=>setOpenAddItemsToInventoryDialog(false)} 
        propertyId={selectedProperty} 
        refetch={refetchItems}
        prevItems={inventory?.length}
        />
      }
         <Paper
    sx={{
        p: 2,
        mt: 2
    }}
    >
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    >
      <Typography variant="h4" gutterBottom>
        {
          userData.permissions === 'view'
          ?
          `Inventarios`
          :
          `Agregar o modificar inventarios`
        }
    </Typography>
    <IconButton
        onClick={
          ()=>refetchItems()
        }
        >
          <ReplayIcon/>
        </IconButton>

    </Box>
    <FormLabel htmlFor='propiedades'>
    {
          userData.permissions === 'view'
          ?
          `Seleccione la propiedad`
          :
          `Seleccione la propiedad a inventariar`
        }
      </FormLabel>
        <Select
            fullWidth
            id='propiedades'
            value={selectedProperty}
            sx={{ mb: 2 }}
            onChange={(e) => {
                const selectedProperty = e.target.value
                setSelectedProperty(selectedProperty)

            }
            }
        >
            {propertiesMap && Object.entries(propertiesMap).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                    {value}
                </MenuItem>
            ))}
        </Select>
        <FormLabel htmlFor='inventario'>Inventario</FormLabel>
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
            :
            (
                <TableSkeleton/>
            )
        }
            <Box
    sx={{
      display: 'flex',
      flexDirection: {
        xs: 'column',
        md: 'row' 
      },
      justifyContent: 'flex-end',
      gap: 2,
      mt: 2
    }}
    >  
       {
        userData.permissions !== 'view' &&
        <>
       <Button
       onClick={()=>setOpenAddItemsToInventoryDialog(true)}
       variant='outlined'
       color='primary'
       >
        añadir artículos
       </Button>
       <Button
       onClick={handleDeleteItems}
       variant='outlined'
       color='warning'
       disabled={isDeletingItems || !itemsToDelete.length}
       >
        {
          isDeletingItems
          ?
          <CircularProgress size={20} />
          :
          `borrar artículos`
        }
       </Button>
       <Button
       onClick={handleDeleteInventory}
       variant='outlined'
       color='warning'
       disabled={isDeletingInventory || !inventory}
       >
        {
          isDeletingInventory
          ?
          <CircularProgress size={20}/>
          :
           `eliminar inventario`
        }
       </Button>
       </>

       }
       <Button
       onClick={() => handleDownloadQrsPDF(selectedProperty)}
       variant='outlined'
       color='primary'
       disabled={!userData.isPremium || !selectedProperty}
       >
        {!userData.isPremium ? <LockIcon sx={{mr:1}}/> : ''}
        Descargar plantilla QR

       </Button>
       <Button
       onClick={()=>navigate('/home')}
       variant='outlined'
       color='secondary'
       >
        volver
       </Button>
    </Box>
    </Paper>

    </>
  )
}

export default AddInventory