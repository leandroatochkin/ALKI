import React, {useState, useMemo, useEffect} from 'react'
import {
    Paper,
    Typography,
    Box,
    Skeleton,
    CircularProgress,
    Select,
    MenuItem,
    FormLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridOverlay,
    GridRowSelectionModel
  } from "@mui/x-data-grid"
import { propertiesList } from '../../api/PropertiesApiSlice'
import { Inventory, InventoryItem } from '../../api/InventoriesApiSlice'
import { mockInventories } from '../../api/InventoriesApiSlice'
import { useGetInventoryByPropertyQuery, useDeleteInventoryItemsMutation, useDeleteInventoryMutation } from '../../api/InventoriesApiSlice'
import AddItemsToInventoryDialog from '../../components/Dialogs/AddInventoryDialog'
import { useNavigate } from 'react-router-dom'

const AddInventory = () => {
const [inventory, setInventory] = useState<Inventory | null>(null)
const [selectedProperty, setSelectedProperty] = useState<string>('prop-001')
const [openAddItemsToInventoryDialog, setOpenAddItemsToInventoryDialog] = useState<boolean>(false)
const [itemsToDelete, setItemsToDelete] = useState<string[]>([])


const navigate = useNavigate()


const { data, isLoading, isError, refetch: refetchItems } = useGetInventoryByPropertyQuery(selectedProperty)

const [deleteItems, {isLoading: isDeletingItems}] = useDeleteInventoryItemsMutation()
const [deleteInventory, {isLoading: isDeletingInventory}] = useDeleteInventoryMutation()

useEffect(() => {
    const filteredInventory = mockInventories.find(inventory => inventory.propertyId === selectedProperty)
    if (data) {
        setInventory(data)
    } else {
        setInventory(filteredInventory ?? null)
    }
},[data, selectedProperty])

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
                    ],
                    [],
                  )
            
                  const rows = useMemo(
                    () =>
                      (inventory?.items ?? []).map((item: InventoryItem, index: number) => ({
                        id: index,
                        itemId: item.id,
                        itemName: item.name,
                        quantity: item.quantity,
                      })),
                    [],
                  )

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
                console.log(inventory.id)
                deleteInventory(inventory.id).unwrap()
                refetchItems()
              } catch(e) {
                console.log(e)
              } 
            }
          }

  return (
      <>
      {
        openAddItemsToInventoryDialog && <AddItemsToInventoryDialog open={openAddItemsToInventoryDialog} onClose={()=>setOpenAddItemsToInventoryDialog(false)}/>
      }
         <Paper
    sx={{
        p: 2,
        mt: 2
    }}
    >
    <Typography variant="h4" gutterBottom>
        Agregar o modificar inventarios
    </Typography>
    <FormLabel htmlFor='propiedades'>Seleccione la propiedad a inventariar</FormLabel>
        <Select
            fullWidth
            id='propiedades'
            defaultValue={`${propertiesList['prop-001']}`}
            sx={{ mb: 2 }}
            onChange={(e) => {
                const selectedProperty = e.target.value
                setSelectedProperty(selectedProperty)

            }
            }
        >
            {Object.entries(propertiesList).map(([key, value]) => (
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
            pagination
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode="client"
            rowCount={rows.length}
            disableColumnFilter
            disableColumnSelector
            checkboxSelection
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
      gap: 2,
      mt: 2
    }}
    >  
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
       disabled={isDeletingInventory}
       >
        {
          isDeletingInventory
          ?
          <CircularProgress size={20}/>
          :
           `eliminar inventario`
        }
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