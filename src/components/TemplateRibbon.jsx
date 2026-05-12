import { Box, Tooltip } from "@mui/material";

const TemplateRibbon = () => {
  return (
    <Tooltip title="Use this template on GitHub" placement="left">
      <Box
        component="a"
        href="https://github.com/rajjitlai/RBAC_User_Dashboard"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          overflow: "hidden",
          zIndex: 9999,
          pointerEvents: "auto",
          textDecoration: "none",
          "&:hover .ribbon-inner": {
            background: "linear-gradient(135deg, #16A34A, #15803D)",
            boxShadow: "0 4px 20px rgba(22,163,74,0.5)",
          },
        }}
      >
        <Box
          className="ribbon-inner"
          sx={{
            position: "absolute",
            top: "24px",
            right: "-34px",
            width: "150px",
            padding: "6px 0",
            background: "linear-gradient(135deg, #22C55E, #16A34A)",
            boxShadow: "0 3px 12px rgba(34,197,94,0.4)",
            transform: "rotate(45deg)",
            textAlign: "center",
            fontSize: "0.65rem",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.06em",
            color: "#fff",
            textTransform: "uppercase",
            transition: "all 0.25s ease",
            userSelect: "none",
          }}
        >
          Template
        </Box>
      </Box>
    </Tooltip>
  );
};

export default TemplateRibbon;
