import React, {useState, useMemo, useEffect} from 'react'
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
    Select,
    MenuItem,
    FormLabel,
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
import { propertiesList } from '../../api/PropertiesApiSlice'
import { Inventory, InventoryItem } from '../../api/InventoriesApiSlice'
import { mockInventories } from '../../api/InventoriesApiSlice'

const AddInventory = () => {
const [inventory, setInventory] = useState<Inventory | null>(null)
useEffect(() => {console.log(inventory)},[inventory])

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
  return (
    <Paper
    sx={{
        p: 2,
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
                const filteredInventory = mockInventories.find(inventory => inventory.propertyId === selectedProperty)
                if (filteredInventory) {
                    setInventory(filteredInventory)
                } else {
                    setInventory(null)
                }
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
    </Paper>
  )
}

export default AddInventory