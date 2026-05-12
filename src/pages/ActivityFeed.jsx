import { Box, Typography, Divider, useTheme } from "@mui/material";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { dummyActivity } from "../data/dummyActivity";
import { tokens } from "../theme/theme";

const typeConfig = {
  task_completed: {
    icon: <TaskAltOutlinedIcon fontSize="small" />,
    colorKey: "greenAccent",
    label: "Task Completed",
  },
  task_assigned: {
    icon: <AssignmentOutlinedIcon fontSize="small" />,
    colorKey: "blueAccent",
    label: "Task Assigned",
  },
  login: {
    icon: <LoginOutlinedIcon fontSize="small" />,
    colorKey: "grey",
    label: "Login",
  },
  profile_updated: {
    icon: <EditOutlinedIcon fontSize="small" />,
    colorKey: "redAccent",
    label: "Profile Updated",
  },
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const groupByDate = (items) => {
  const groups = {};
  items.forEach((item) => {
    const dateKey = new Date(item.timestamp).toDateString();
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(item);
  });
  return Object.entries(groups).sort(
    ([a], [b]) => new Date(b) - new Date(a)
  );
};

const ActivityFeed = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const grouped = groupByDate(dummyActivity);

  return (
    <Box>
      <Box mb="28px">
        <Typography variant="h3" fontWeight="700" color={colors.grey[100]} fontFamily="'Poppins', sans-serif">
          Activity Feed
        </Typography>
        <Typography variant="body2" color={colors.grey[400]}>
          Your recent actions and notifications
        </Typography>
      </Box>

      <Box maxWidth="680px" display="flex" flexDirection="column" gap="28px">
        {grouped.map(([dateKey, items]) => (
          <Box key={dateKey}>
            <Typography
              variant="caption"
              fontWeight={700}
              color={colors.grey[500]}
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              {formatDate(items[0].timestamp)}
            </Typography>
            <Divider sx={{ borderColor: colors.glass.border, my: "10px" }} />

            <Box
              sx={{
                background: colors.glass.card,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid ${colors.glass.border}`,
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {items.map((item, idx) => {
                const config = typeConfig[item.type] || {
                  icon: <NotificationsNoneOutlinedIcon fontSize="small" />,
                  colorKey: "grey",
                  label: "Notification",
                };
                const iconBg = colors[config.colorKey][700];
                const iconColor = colors[config.colorKey][300];

                return (
                  <Box
                    key={item.id}
                    display="flex"
                    alignItems="flex-start"
                    gap="16px"
                    px="20px"
                    py="16px"
                    sx={{
                      borderBottom:
                        idx < items.length - 1
                          ? `1px solid ${colors.glass.border}`
                          : "none",
                      "&:hover": { backgroundColor: colors.glass.cardHover },
                      transition: "background 0.15s",
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: iconColor,
                        flexShrink: 0,
                        mt: "2px",
                      }}
                    >
                      {config.icon}
                    </Box>

                    <Box flex={1}>
                      <Typography variant="body2" color={colors.grey[100]} fontWeight={500}>
                        {item.message}
                      </Typography>
                      <Typography variant="caption" color={colors.grey[500]} mt="2px" display="block">
                        {config.label} · {formatTime(item.timestamp)}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityFeed;
