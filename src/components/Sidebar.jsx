import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, Avatar, Divider, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../theme/theme";
import { useAuth } from "../auth/AuthContext";
import RoleBadge from "./RoleBadge";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardOutlinedIcon /> },
  { label: "My Profile", path: "/profile", icon: <PersonOutlinedIcon /> },
  { label: "My Tasks", path: "/tasks", icon: <AssignmentOutlinedIcon /> },
  { label: "Permissions", path: "/permissions", icon: <LockOutlinedIcon /> },
  { label: "Activity Feed", path: "/activity", icon: <NotificationsNoneOutlinedIcon /> },
];

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <ProSidebar
      collapsed={collapsed}
      backgroundColor="transparent"
      rootStyles={{
        borderRight: `1px solid ${colors.glass.border}`,
        height: "100%",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: colors.glass.sidebar,
        flexShrink: 0,
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: active
              ? "rgba(59, 130, 246, 0.15)"
              : "transparent",
            color: active ? colors.blueAccent[300] : colors.grey[300],
            borderLeft: active
              ? `3px solid ${colors.blueAccent[500]}`
              : "3px solid transparent",
            borderRadius: "0 8px 8px 0",
            margin: "2px 8px 2px 0",
            "&:hover": {
              backgroundColor: "rgba(59, 130, 246, 0.08)",
              color: colors.grey[100],
            },
            transition: "all 0.2s ease",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "0.875rem",
          }),
          icon: ({ active }) => ({
            color: active ? colors.blueAccent[400] : colors.grey[400],
          }),
        }}
      >
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ margin: "12px 0 8px" }}
        >
          {!collapsed && (
            <Typography
              fontFamily="'Poppins', sans-serif"
              fontWeight="700"
              fontSize="1rem"
              sx={{
                background: `linear-gradient(90deg, ${colors.blueAccent[300]}, ${colors.greenAccent[400]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              RBAC Dashboard
            </Typography>
          )}
        </MenuItem>

        {!collapsed && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="8px"
            my="20px"
            mx="12px"
            px="12px"
            py="16px"
            sx={{
              background: colors.glass.card,
              backdropFilter: "blur(10px)",
              border: `1px solid ${colors.glass.border}`,
              borderRadius: "12px",
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: `linear-gradient(135deg, ${colors.blueAccent[600]}, ${colors.blueAccent[800]})`,
                fontSize: "1.25rem",
                fontWeight: 700,
                boxShadow: `0 4px 15px rgba(59,130,246,0.3)`,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {initials}
            </Avatar>
            <Typography
              fontFamily="'Poppins', sans-serif"
              fontWeight="600"
              fontSize="0.9rem"
              color={colors.grey[100]}
            >
              {currentUser?.name}
            </Typography>
            {currentUser?.role && <RoleBadge role={currentUser.role} size="small" />}
            <Typography variant="caption" color={colors.grey[500]}>
              {currentUser?.department}
            </Typography>
          </Box>
        )}

        <Divider sx={{ borderColor: colors.glass.border, my: "8px", mx: "16px" }} />

        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            icon={item.icon}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </ProSidebar>
  );
};

export default Sidebar;
