import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <Box display="flex" height="100vh" overflow="hidden" sx={{ position: "relative" }}>
      <Sidebar />
      <Box display="flex" flexDirection="column" flex={1} overflow="hidden">
        <Topbar />
        <Box
          flex={1}
          overflow="auto"
          p="28px"
          sx={{
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(148,163,184,0.2)",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(148,163,184,0.4)",
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
