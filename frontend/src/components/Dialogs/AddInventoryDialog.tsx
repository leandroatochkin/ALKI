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
        CircularProgress,
        IconButton,
    } from '@mui/material'
    import { InventoryItem, NewItemsDTO } from '../../api/InventoriesApiSlice'
    import { usePostInventoryItemsMutation } from '../../api/InventoriesApiSlice'
    import { useDispatch } from 'react-redux';
    import { showToast } from '../../api/ToastSlice';
    import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

    interface AddItemsToInventoryDialogProps {
        open: boolean
        onClose: (value: boolean) => void
        propertyId: string
        refetch: () => void
        prevItems: number | undefined
    }


    
    const AddItemsToInventoryDialog: React.FC<AddItemsToInventoryDialogProps> = ({open, onClose, propertyId, refetch, prevItems}) => {
    const [newItems, setNewItems] = useState<NewItemsDTO>({
      propertyId: propertyId,
      items: [],
    })
    const [currentNewItem, setCurrentNewItem] = useState<InventoryItem | null>(null)

    const [postInventoryItems, { isLoading }] = usePostInventoryItemsMutation()
     
    const dispatch = useDispatch()


    const handleAddInventory = () => {
        if (!newItems.items.length) return
        try{
          postInventoryItems(newItems).unwrap()
          dispatch(showToast({message: 'Items añadidos.', severity: 'success'}))
          refetch()
          setNewItems({
            propertyId: '',
            items: [],
          })
          setCurrentNewItem(null)
          onClose(false)
        } catch (error) {
          dispatch(showToast({message: 'Error al añadir items.', severity: 'error'}))
          console.error('Error al añadir artículos al inventario', error)
        }
        
      }
  
  
  const handleDeleteItem = (item: InventoryItem) => {
    setNewItems(prev => ({
         ...prev,
         items: prev.items.filter(i => i.name !== item.name),
       }))
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
              {newItems.items.length > 0 && (
                  <Box sx={{ p: 2 }}>
                      <Typography variant="h6">Artículos añadidos:</Typography>
                      {newItems.items.map((item, index) => (
                          <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 1,
                            borderBottom: "1px solid #ccc",
                          }}
                          key={index}
                          >
                            <Typography>{item.name}</Typography>
                            <Typography >{item.quantity}</Typography>
                            <Typography>{`$${Number(item.declaredPrice).toFixed(2)}`}</Typography>
                            <IconButton
                            onClick={()=>handleDeleteItem(item)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </Box>
                      ))}
                  </Box>
              )}
              <FormLabel htmlFor='articulos'>Seleccione los artículos a añadir</FormLabel>
              <Box sx={{ display: "flex", mt: 2, gap: 2, alignItems: 'center' }}>
 <Box
 sx={{
  display: 'flex',
  flexDirection: {
    xs: 'column',
    sm: 'row',
  },
  gap: 1
 }}
 >
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
        quantity: prev?.quantity || 1,
      }))
    }}
  />
    <Box
    sx={{
      display: 'flex',
      gap: 1
    }}
    >
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

  />

  <TextField
    type='number'
    id='declaredPrice'
    placeholder="Valor declarado"
    value={currentNewItem?.declaredPrice ?? ''}
    onChange={(e) => {
      const itemPrice = parseInt(e.target.value)
      setCurrentNewItem((prev) => ({
        ...prev,
        declaredPrice: itemPrice,
        quantity: prev?.quantity || 1,
        id: prev?.id || prev?.name?.toLowerCase().replace(/\s/g, '-') || '',
        name: prev?.name || '',

      }))
    }}

  />
    </Box>
      <Button
  variant="contained"
  onClick={() => {
    if (!currentNewItem?.name) return;


      setNewItems(prev => ({
        ...prev,
        items: [...prev.items, currentNewItem],
      }))
      setCurrentNewItem(null)
  }}
  sx={{ width: {xs: 230, sm: 40}, height: {xs: 40, sm: 55} }}
>
  +
</Button>

 </Box>


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
              disabled={!newItems.items.length || isLoading}
              >
                  {
                    isLoading
                    ?
                    <CircularProgress size={20} />
                    :
                    (
                      !prevItems ? 'crear inventario' : 'añadir artículos'
                    )
                  }
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