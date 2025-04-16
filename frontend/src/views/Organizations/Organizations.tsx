import React,{useMemo, useState, useEffect} from 'react'
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
  import { useGetPropertiesByUserIdQuery, useDeletePropertyMutation } from '../../api/PropertiesApiSlice'
import { 
    Organization, 
    useGetOrganizationsByUserIdQuery, 
    useCreateOrganizationMutation, 
    useUpdateOrganizationMutation, 
    useDeleteOrganizationMutation,
    mockOrganizations, 
    Member
} from '../../api/OrganizationsSlice'
import { useAppSelector } from '../../api/store/hooks'
import { UserPreview } from '../../api/UsersSlice'
import NewOrganizationDialog from '../../components/Dialogs/NewOrganizationDialog'
  

const Organizations = () => {
    const [organizations, setOrganizations] = useState<Organization[] | []>([])
    const [openCreateOrganizationDialog, setOpenCreateOrganizationDialog] = useState<boolean>(false)
    const [openUpdateOrganizationDialog, setOpenUpdateOrganizationDialog] = useState<boolean>(false)
    const [openViewMembersDialog, setOpenViewMembersDialog] = useState<Member[] | null>(null)
    const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null)
     const userData: UserPreview = useAppSelector(
        state => state.dashboard.userData,
      )

const {data: organizationData, isLoading: isLoadingOrganizations, isError: isErrorLoadingOrganizations} = useGetOrganizationsByUserIdQuery(userData.id)
const [deleteOrganization, {isLoading: isDeleting, isError: isErrorDeleting}] = useDeleteOrganizationMutation()
    
        
        useEffect(() => {
          if (!isLoadingOrganizations && !isErrorLoadingOrganizations && organizationData) {
            setOrganizations(mockOrganizations)
          } else if (!isLoadingOrganizations && isErrorLoadingOrganizations) {
            setOrganizations(mockOrganizations)
          }
      }, [organizationData, isLoadingOrganizations, isErrorLoadingOrganizations])

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
            field: "description",
            headerName: "descripción",
            width: 120,
            editable: false,
          },
          {
            field: "members",
            headerName: "miembros",
            width: 120,
            editable: false,
          },
        ],
        [],
      )

      const rows = useMemo(
        () =>
          (organizations ?? []).map((organization: Organization, index: number) => ({
            id: index,
            organizationId: organization.organizationId,
            name: organization.name,
            description: organization.description,
            members: organization.members.length,
          })), 
        [],
      )

        const handleRowSelection = (selection: GridRowSelectionModel) => {
            const selectedData = selection.map(
              selectedRowId => rows[Number(selectedRowId)]
            )
        
            const selectedPropertyId = selectedData.flatMap(row =>
              row?.organizationId ? [row.organizationId] : [],
            )
        
            setSelectedOrganization(selectedPropertyId[0] ?? null)
          }

          const handleDeleteOrganization = () => {
            if(confirm("¿Está seguro de que desea eliminar esta organización?")) {
              try{
                if (selectedOrganization) {
                  deleteOrganization(selectedOrganization).unwrap()
                  setSelectedOrganization(null)
                }
              } catch (error) {
                console.error("Error deleting property:", error)
              }
            } return

          }

          


  return (
    <>
    {
        openUpdateOrganizationDialog &&
        <NewOrganizationDialog
            open={Boolean(openUpdateOrganizationDialog)}
            onClose={() => setOpenUpdateOrganizationDialog(false)}
            organization={organizations.find(o => o.organizationId === selectedOrganization)!}
            isNew={false}
/>
    }
    {
        openCreateOrganizationDialog &&
        <NewOrganizationDialog
            open={Boolean(openCreateOrganizationDialog)}
            onClose={() => setOpenCreateOrganizationDialog(false)}
            isNew={true}
/>
    }
    <Paper
    sx={{
        p: 2,
        mt: 2
    }}
    >
    <Typography variant="h4" gutterBottom>
        Crear o modificar organizaciones
    </Typography>
         {
          !isLoadingOrganizations
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
            disableMultipleRowSelection
            onRowSelectionModelChange={handleRowSelection}
            loading={
                isLoadingOrganizations
            }
            sx={{
              opacity: isLoadingOrganizations ? 0.7 : 1,
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
          <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenCreateOrganizationDialog(true)}
          >
              agregar organización
          </Button>
          <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpenUpdateOrganizationDialog(true)}
          disabled={!selectedOrganization}
          >
              modificar organización
          </Button>
          <Button
          variant="outlined"
          color="primary"
          onClick={handleDeleteOrganization}
          disabled={!selectedOrganization || isDeleting}
          >
              eliminar organización
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

export default Organizations