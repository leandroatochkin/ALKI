import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"

interface UserProfileCardProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

const UserCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  avatarUrl,
  onSettingsClick,
  onLogoutClick,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={2}
      borderRadius={2}
      boxShadow={2}
      bgcolor="linear-gradient(to right, #0ea5e9, #38bdf8)" // Approx Tailwind `from-sky-500 to-sky-300`
      sx={{
        background: "linear-gradient(to right, #0ea5e9, #38bdf8)",
        width: '96%',
        mb: 1,
        ml: 1
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src={avatarUrl || "/placeholder.svg"}
          sx={{ width: 36, height: 36, border: "2px solid white", bgcolor: "#0369a1" }}
        >
          {initials}
        </Avatar>
        <Box>
          <Typography variant="body2" color="white" fontWeight={500}>
            {name}
          </Typography>
          {email && (
            <Typography variant="caption" color="white">
              {email}
            </Typography>
          )}
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip title="Settings">
          <IconButton size="small" onClick={handleMenuOpen} sx={{ color: "white" }}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Log out">
          <IconButton size="small" onClick={onLogoutClick} sx={{ color: "white" }}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Typography variant="subtitle2" sx={{ px: 2, pt: 1 }}>
            My Account
          </Typography>
          <Divider />
          <MenuItem
            onClick={() => {
              onSettingsClick?.();
              handleMenuClose();
            }}
          >
            <SettingsIcon  sx={{ marginRight: 8 }} />
            Ajustes
          </MenuItem>
          <MenuItem
            onClick={() => {
              onLogoutClick?.();
              handleMenuClose();
            }}
          >
            <LogoutIcon  sx={{ marginRight: 8 }} />
            Salir
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default UserCard