import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" gap={2}>
      <Typography variant="h1" fontWeight="700">404</Typography>
      <Typography variant="h5">Page not found</Typography>
      <Button variant="contained" onClick={() => navigate("/dashboard")}>Go Home</Button>
    </Box>
  );
};

export default NotFound;
