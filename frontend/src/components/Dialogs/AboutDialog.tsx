import { Dialog, DialogTitle, DialogContent, Typography, Button, Divider } from "@mui/material";

interface AboutDialogProps {
    open: boolean;
    onClose: () => void
}

const AboutDialog: React.FC<AboutDialogProps> = ({open, onClose}) => {
  return (
     <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    >
        <DialogTitle>Sobre la app</DialogTitle>
        <DialogContent>
                <Typography>
                    Diseño y desarrollo
                </Typography>
                <Button
                onClick={
                () => window.open('https://leandroatochkin.vercel.app', '_blank')
            }
            sx={{
                mb: 2
            }}
                >
                    lna web development
                </Button>
                <Divider />
                <Typography>
                    Versión 1.0
                </Typography>
                <Typography>
                    Todos los derechos reservados © 2025
                </Typography>
        </DialogContent>

    </Dialog>
  )
}

export default AboutDialog