    import React, { useState } from 'react'
    import {
        Box,
        Typography,
        Button,
        Dialog,
        DialogTitle,
        DialogContent,
        TextField,
        FormLabel,
    } from '@mui/material'
    import { InventoryItem } from '../../api/InventoriesApiSlice'

    interface AddItemsToInventoryDialogProps {
        open: boolean
        onClose: (value: boolean) => void
    }
    
    const AddItemsToInventoryDialog: React.FC<AddItemsToInventoryDialogProps> = ({open, onClose}) => {
    const [newItems, setNewItems] = useState<InventoryItem[] | []>([])
    const [currentNewItem, setCurrentNewItem] = useState<InventoryItem | null>(null)
     
    


    const handleAddInventory = () => {
        if (!newItems.length) return
        console.log(newItems)
        setNewItems([])
        setCurrentNewItem(null)
        onClose(false)
      }
  
  

  
      return(
          <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          sx={{
            p: 2
          }}
          >
              <DialogTitle>Añadir artículos</DialogTitle>
              
              <DialogContent>
              {newItems.length > 0 && (
                  <Box sx={{ p: 2 }}>
                      <Typography variant="h6">Artículos añadidos:</Typography>
                      {newItems.map((item) => (
                          <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 1,
                            borderBottom: "1px solid #ccc",
                          }}
                          >
                            <Typography key={item.id}>{item.name}</Typography>
                            <Typography key={item.id}>{item.quantity}</Typography>
                          </Box>
                      ))}
                  </Box>
              )}
              <FormLabel htmlFor='articulos'>Seleccione los artículos a añadir</FormLabel>
              <Box sx={{ display: "flex", mt: 2, gap: 2, alignItems: 'center' }}>
  <TextField
    fullWidth
    id='itemName'
    placeholder="Nombre del artículo"
    value={currentNewItem?.name ?? ''}
    onChange={(e) => {
      const itemName = e.target.value
      setCurrentNewItem((prev) => ({
        ...prev,
        name: itemName,
        id: prev?.id || itemName.toLowerCase().replace(/\s/g, '-'), // Basic ID if not set
        quantity: prev?.quantity || 1,
      }))
    }}
  />
  <TextField
    type='number'
    id='itemQuantity'
    placeholder="Cantidad"
    value={currentNewItem?.quantity ?? ''}
    onChange={(e) => {
      const itemQuantity = parseInt(e.target.value)
      setCurrentNewItem((prev) => ({
        ...prev,
        quantity: itemQuantity,
        id: prev?.id || prev?.name?.toLowerCase().replace(/\s/g, '-') || '',
        name: prev?.name || '',
      }))
    }}
    sx={{ width: 100 }}
  />

  <Button
  variant="contained"
  onClick={() => {
    if (!currentNewItem?.name) return;

    const exists = newItems.find(item => item.name === currentNewItem.name)

    if (exists) {
      // Remove if already added
      setNewItems(prev => prev.filter(item => item.name !== currentNewItem.name))
    } else {
      // Add new item, let backend handle the real ID later
      setNewItems(prev => [...prev, currentNewItem])
    }
  }}
  sx={{ minWidth: 40, height: 56 }}
>
  {newItems.find(item => item.name === currentNewItem?.name) ? '−' : '+'}
</Button>

              </Box>

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
              onClick={handleAddInventory}
              variant='outlined'
              color='primary'
              disabled={!newItems.length}
              >
                  crear inventario
              </Button>         
                  <Button
              onClick={() => {
                onClose(false)
              }}
              variant='outlined'
              color='warning'
              >
                  volver
              </Button>  
              </Box>    
              </DialogContent>
              
          </Dialog>
      )
    }

    export default AddItemsToInventoryDialog