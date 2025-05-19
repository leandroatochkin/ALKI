import React from 'react'
import { Dialog, DialogTitle, DialogContent, Box, Typography, Button, Divider } from '@mui/material'
import { useGetOrganizationMembersByOrganizationIdQuery } from '../../api/OrganizationsSlice'
import VerifiedIcon from '@mui/icons-material/Verified';

interface ViewOrganizationMembersDialogProps {
    open: boolean
    onClose: () => void
    organizationId: string
}

const ViewOrganizationMembersDialog: React.FC<ViewOrganizationMembersDialogProps> = ({open, onClose, organizationId}) => {
const { data } = useGetOrganizationMembersByOrganizationIdQuery(organizationId)

const members = data ?? []


  return (
    <Dialog
    open={open}
    onClose={onClose}
    >
        <DialogTitle>
            Ver/quitar miembros
        </DialogTitle>
        <DialogContent>
            <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
            >
                {
                    members.length > 0 &&
                    (
                        [...members]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((member, index) => (
                            <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                            key={index}
                            >
                                <Typography>
                                    {member.name}
                                </Typography>
                                <Divider orientation='vertical' flexItem />
                                <Typography>
                                    {member.email}
                                </Typography>
                                {
                                    member.acceptedInvite && <VerifiedIcon />
                                }
                                <Divider orientation='vertical' flexItem />
                                <Button
                                disabled={member.acceptedInvite}
                                >
                                    enviar invitación
                                </Button>
                                <Divider orientation='vertical' flexItem />
                                <Button>
                                    eliminar
                                </Button>
                            </Box>
                        ))
                    )
          
                }
            </Box>
        </DialogContent>
    </Dialog>
  )
}

export default ViewOrganizationMembersDialog