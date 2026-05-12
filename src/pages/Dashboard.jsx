import { Box, Typography, Divider, useTheme } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useAuth } from "../auth/AuthContext";
import { dummyTasks } from "../data/dummyTasks";
import { dummyActivity } from "../data/dummyActivity";
import { permissionMatrix } from "../data/dummyPermissions";
import { tokens } from "../theme/theme";
import StatCard from "../components/StatCard";
import RoleBadge from "../components/RoleBadge";

const activityIcons = {
  task_completed: "✅",
  task_assigned: "📋",
  login: "🔐",
  profile_updated: "✏️",
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { currentUser } = useAuth();

  const userRole = currentUser?.role || "Developer";
  const userTasks = dummyTasks.filter((t) => t.assignedRole === userRole);
  const pendingTasks = userTasks.filter((t) => t.status !== "Completed").length;
  const permissions = permissionMatrix[userRole] || [];
  const allowedCount = permissions.filter((p) => p.read || p.write).length;
  const recentActivity = dummyActivity.slice(0, 3);
  const lastLogin = currentUser?.lastLogin ? formatDate(currentUser.lastLogin) : "—";

  return (
    <Box>
      <Box mb="28px">
        <Box display="flex" alignItems="center" gap="12px" mb="4px">
          <Typography variant="h3" fontWeight="700" color={colors.grey[100]} fontFamily="'Poppins', sans-serif">
            Dashboard
          </Typography>
          <RoleBadge role={userRole} />
        </Box>
        <Typography variant="body2" color={colors.grey[400]}>
          {currentUser?.department} · Last login: {lastLogin}
        </Typography>
      </Box>

      <Box display="flex" gap="20px" flexWrap="wrap" mb="32px">
        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          subtitle={`${userTasks.length} total assigned`}
          icon={<AssignmentOutlinedIcon />}
          color={colors.blueAccent[400]}
        />
        <StatCard
          title="Accessible Areas"
          value={allowedCount}
          subtitle={`Out of ${permissions.length} total areas`}
          icon={<LockOutlinedIcon />}
          color={colors.greenAccent[400]}
        />
        <StatCard
          title="Last Login"
          value={lastLogin}
          subtitle="Most recent session"
          icon={<LoginOutlinedIcon />}
          color={colors.redAccent[400]}
        />
      </Box>

      <Box
        sx={{
          background: colors.glass.card,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${colors.glass.border}`,
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "640px",
        }}
      >
        <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb="16px" fontFamily="'Poppins', sans-serif">
          Recent Activity
        </Typography>
        <Divider sx={{ borderColor: colors.glass.border, mb: "16px" }} />
        <Box display="flex" flexDirection="column" gap="14px">
          {recentActivity.map((item) => (
            <Box key={item.id} display="flex" alignItems="flex-start" gap="12px">
              <Typography fontSize="1.1rem" mt="1px">
                {activityIcons[item.type] || "🔔"}
              </Typography>
              <Box flex={1}>
                <Typography variant="body2" color={colors.grey[100]}>
                  {item.message}
                </Typography>
                <Typography variant="caption" color={colors.grey[500]}>
                  {formatDate(item.timestamp)}
                </Typography>
              </Box>
              <FiberManualRecordIcon
                sx={{ fontSize: 8, color: colors.greenAccent[400], mt: "6px" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
