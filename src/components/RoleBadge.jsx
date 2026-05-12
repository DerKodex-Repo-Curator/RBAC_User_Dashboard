import { Chip } from "@mui/material";

const roleConfig = {
  Developer: { bg: "rgba(59,130,246,0.18)", border: "rgba(59,130,246,0.35)", text: "#93C5FD" },
  Designer:  { bg: "rgba(34,197,94,0.15)",  border: "rgba(34,197,94,0.32)",  text: "#86EFAC" },
  Analyst:   { bg: "rgba(244,63,94,0.15)",  border: "rgba(244,63,94,0.3)",   text: "#FDA4AF" },
};

const RoleBadge = ({ role, size = "medium" }) => {
  const config = roleConfig[role] || roleConfig.Developer;

  return (
    <Chip
      label={role}
      size={size}
      sx={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        fontWeight: 600,
        fontFamily: "'Open Sans', sans-serif",
        fontSize: size === "small" ? "0.7rem" : "0.8rem",
        borderRadius: "6px",
        backdropFilter: "blur(8px)",
        letterSpacing: "0.02em",
      }}
    />
  );
};

export default RoleBadge;
