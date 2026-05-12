import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Tooltip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useAuth } from "../auth/AuthContext";
import { permissionMatrix } from "../data/dummyPermissions";
import { tokens } from "../theme/theme";
import RoleBadge from "../components/RoleBadge";

const PermIcon = ({ allowed, colors }) =>
  allowed ? (
    <CheckCircleOutlineIcon sx={{ color: colors.greenAccent[400], fontSize: 20 }} />
  ) : (
    <CancelOutlinedIcon sx={{ color: colors.redAccent[400], fontSize: 20 }} />
  );

const MyPermissions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { currentUser } = useAuth();

  const userRole = currentUser?.role || "Developer";
  const permissions = permissionMatrix[userRole] || [];

  const readCount = permissions.filter((p) => p.read).length;
  const writeCount = permissions.filter((p) => p.write).length;
  const deleteCount = permissions.filter((p) => p.delete).length;

  return (
    <Box>
      <Box mb="28px">
        <Box display="flex" alignItems="center" gap="12px" mb="4px">
          <Typography variant="h3" fontWeight="700" color={colors.grey[100]} fontFamily="'Poppins', sans-serif">
            My Permissions
          </Typography>
          <RoleBadge role={userRole} />
        </Box>
        <Typography variant="body2" color={colors.grey[400]}>
          Access rights granted to your role across all areas
        </Typography>
      </Box>

      <Box display="flex" gap="16px" flexWrap="wrap" mb="28px">
        {[
          { label: "Read Access", count: readCount, color: colors.greenAccent[400] },
          { label: "Write Access", count: writeCount, color: colors.blueAccent[400] },
          { label: "Delete Access", count: deleteCount, color: colors.redAccent[400] },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              background: colors.glass.card,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${colors.glass.border}`,
              borderRadius: "14px",
              padding: "16px 24px",
              minWidth: "150px",
            }}
          >
            <Typography variant="h4" fontWeight="700" color={item.color}>
              {item.count}/{permissions.length}
            </Typography>
            <Typography variant="body2" color={colors.grey[400]}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <TableContainer
        sx={{
          background: colors.glass.card,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${colors.glass.border}`,
          borderRadius: "16px",
          maxWidth: "760px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: "rgba(59,130,246,0.18)", backdropFilter: "blur(8px)" }}>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 700, fontSize: "0.85rem" }}>
                Resource / Area
              </TableCell>
              <TableCell align="center" sx={{ color: colors.grey[100], fontWeight: 700 }}>
                Read
              </TableCell>
              <TableCell align="center" sx={{ color: colors.grey[100], fontWeight: 700 }}>
                Write
              </TableCell>
              <TableCell align="center" sx={{ color: colors.grey[100], fontWeight: 700 }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((perm, idx) => (
              <TableRow
                key={perm.area}
                sx={{
                  background:
                    idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                  "&:last-child td": { border: 0 },
                }}
              >
                <TableCell sx={{ color: colors.grey[100], borderBottom: `1px solid ${colors.glass.border}` }}>
                  {perm.area}
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: `1px solid ${colors.glass.border}` }}>
                  <PermIcon allowed={perm.read} colors={colors} />
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: `1px solid ${colors.glass.border}` }}>
                  <PermIcon allowed={perm.write} colors={colors} />
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: `1px solid ${colors.glass.border}` }}>
                  <PermIcon allowed={perm.delete} colors={colors} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyPermissions;
