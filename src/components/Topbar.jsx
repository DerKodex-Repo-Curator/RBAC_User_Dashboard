import { useContext } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ColorModeContext } from "../theme/ColorModeContext";
import { useAuth } from "../auth/AuthContext";
import { tokens } from "../theme/theme";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { currentUser, logout } = useAuth();

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="24px"
      py="10px"
      sx={{
        background: colors.glass.topbar,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${colors.glass.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Typography
        fontFamily="'Poppins', sans-serif"
        fontWeight="600"
        fontSize="0.95rem"
        color={colors.grey[300]}
      >
        {currentUser?.name ? `Welcome back, ${currentUser.name.split(" ")[0]}` : "Welcome"}
      </Typography>

      <Box display="flex" alignItems="center" gap="4px">
        <Tooltip title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            size="small"
            sx={{
              color: colors.grey[400],
              "&:hover": { color: colors.grey[100], backgroundColor: "rgba(255,255,255,0.06)" },
              transition: "all 0.2s",
            }}
          >
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon fontSize="small" />
            ) : (
              <DarkModeOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title={currentUser?.name || "User"}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: `linear-gradient(135deg, ${colors.blueAccent[600]}, ${colors.blueAccent[800]})`,
              fontSize: "0.78rem",
              fontWeight: 700,
              cursor: "default",
              mx: "4px",
              boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {initials}
          </Avatar>
        </Tooltip>

        <Tooltip title="Logout">
          <IconButton
            onClick={logout}
            size="small"
            sx={{
              color: colors.grey[400],
              "&:hover": { color: colors.redAccent[400], backgroundColor: "rgba(244,63,94,0.08)" },
              transition: "all 0.2s",
            }}
          >
            <LogoutOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
