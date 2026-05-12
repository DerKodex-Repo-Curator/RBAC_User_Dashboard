import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme/theme";

const StatCard = ({ title, value, subtitle, icon, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        background: colors.glass.card,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${colors.glass.border}`,
        borderRadius: "16px",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flex: 1,
        minWidth: "180px",
        cursor: "default",
        transition: "all 0.25s ease",
        "&:hover": {
          background: colors.glass.cardHover,
          border: `1px solid ${colors.glass.borderHover}`,
          transform: "translateY(-2px)",
          boxShadow: `0 12px 32px rgba(0,0,0,0.2)`,
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color={colors.grey[300]}>
          {title}
        </Typography>
        {icon && (
          <Box sx={{ color: color || colors.greenAccent[500] }}>{icon}</Box>
        )}
      </Box>
      <Typography variant="h3" fontWeight="700" color={color || colors.greenAccent[500]}>
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color={colors.grey[400]}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default StatCard;
