import { useState } from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../auth/AuthContext";
import { dummyTasks } from "../data/dummyTasks";
import { tokens } from "../theme/theme";

const statusFilters = ["All", "Pending", "In Progress", "Completed"];

const priorityColors = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const statusChipColors = {
  Pending: { bg: "#3e4396", text: "#a4a9fc" },
  "In Progress": { bg: "#3d7c67", text: "#94e2cd" },
  Completed: { bg: "#2e5245", text: "#70d8bd" },
};

const MyTasks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { currentUser } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");

  const userRole = currentUser?.role || "Developer";
  const allTasks = dummyTasks.filter((t) => t.assignedRole === userRole);
  const filteredTasks =
    activeFilter === "All" ? allTasks : allTasks.filter((t) => t.status === activeFilter);

  const columns = [
    {
      field: "title",
      headerName: "Task",
      flex: 2,
      renderCell: ({ value }) => (
        <Typography variant="body2" color={colors.grey[100]} fontWeight={500}>
          {value}
        </Typography>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.8,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          color={priorityColors[value] || "default"}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => {
        const sc = statusChipColors[value] || {};
        return (
          <Chip
            label={value}
            size="small"
            sx={{
              backgroundColor: sc.bg || colors.primary[300],
              color: sc.text || colors.grey[100],
              fontWeight: 600,
              fontSize: "0.72rem",
            }}
          />
        );
      },
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 0.9,
      renderCell: ({ value }) => (
        <Typography variant="body2" color={colors.grey[400]}>
          {new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2.5,
      renderCell: ({ value }) => (
        <Typography variant="body2" color={colors.grey[400]} noWrap>
          {value}
        </Typography>
      ),
    },
  ];

  return (
    <Box>
      <Box mb="28px">
        <Typography variant="h3" fontWeight="700" color={colors.grey[100]} fontFamily="'Poppins', sans-serif">
          My Tasks
        </Typography>
        <Typography variant="body2" color={colors.grey[400]}>
          Tasks assigned to your role: <strong>{userRole}</strong> · {filteredTasks.length} shown
        </Typography>
      </Box>

      <Box display="flex" gap="10px" mb="20px" flexWrap="wrap">
        {statusFilters.map((f) => (
          <Chip
            key={f}
            label={f}
            onClick={() => setActiveFilter(f)}
            variant={activeFilter === f ? "filled" : "outlined"}
            sx={{
              fontWeight: 600,
              backgroundColor: activeFilter === f ? colors.blueAccent[700] : "transparent",
              color: activeFilter === f ? colors.blueAccent[100] : colors.grey[300],
              borderColor: "rgba(59,130,246,0.4)",
              "&:hover": { backgroundColor: "rgba(59,130,246,0.12)" },
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: `1px solid ${colors.glass.border}` },
          "& .MuiDataGrid-columnHeaders": {
            background: "rgba(59,130,246,0.15)",
            backdropFilter: "blur(10px)",
            borderBottom: `1px solid ${colors.glass.border}`,
            color: colors.grey[200],
          },
          "& .MuiDataGrid-virtualScroller": { background: colors.glass.card },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `1px solid ${colors.glass.border}`,
            background: "rgba(59,130,246,0.1)",
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[400]} !important` },
          "& .MuiDataGrid-row:hover": { background: colors.glass.cardHover },
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${colors.glass.border}`,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={filteredTasks}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          rowHeight={56}
        />
      </Box>
    </Box>
  );
};

export default MyTasks;
