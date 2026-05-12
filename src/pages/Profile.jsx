import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  useTheme,
  Grid,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../auth/AuthContext";
import { tokens } from "../theme/theme";
import RoleBadge from "../components/RoleBadge";

const profileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string(),
  location: Yup.string(),
  bio: Yup.string().max(300, "Bio cannot exceed 300 characters"),
});

const InfoRow = ({ label, value, colors }) => (
  <Box>
    <Typography variant="caption" color={colors.grey[500]} fontWeight={600} textTransform="uppercase" letterSpacing="0.06em">
      {label}
    </Typography>
    <Typography variant="body1" color={colors.grey[100]} mt="2px">
      {value || "—"}
    </Typography>
  </Box>
);

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { currentUser, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);

  const initials = currentUser?.name
    ? currentUser.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  const joinedDate = currentUser?.joinedAt
    ? new Date(currentUser.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  return (
    <Box>
      <Box mb="28px">
        <Typography variant="h3" fontWeight="700" color={colors.grey[100]} fontFamily="'Poppins', sans-serif">
          My Profile
        </Typography>
        <Typography variant="body2" color={colors.grey[400]}>
          View and manage your personal information
        </Typography>
      </Box>

      <Box
        sx={{
          background: colors.glass.card,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1px solid ${colors.glass.border}`,
          borderRadius: "20px",
          padding: "32px",
          maxWidth: "720px",
        }}
      >
        <Box display="flex" alignItems="center" gap="20px" mb="28px">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: colors.blueAccent[600],
              fontSize: "1.8rem",
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="700" color={colors.grey[100]}>
              {currentUser?.name}
            </Typography>
            <Box display="flex" alignItems="center" gap="10px" mt="6px">
              <RoleBadge role={currentUser?.role} size="small" />
              <Typography variant="body2" color={colors.grey[400]}>
                {currentUser?.department}
              </Typography>
            </Box>
            <Typography variant="caption" color={colors.grey[500]} mt="4px" display="block">
              Member since {joinedDate}
            </Typography>
          </Box>
          {!editing && (
            <Button
              startIcon={<EditOutlinedIcon />}
              onClick={() => setEditing(true)}
              variant="outlined"
              size="small"
              sx={{ ml: "auto", borderColor: colors.blueAccent[500], color: colors.blueAccent[300] }}
            >
              Edit
            </Button>
          )}
        </Box>

        <Divider sx={{ borderColor: colors.glass.border, mb: "24px" }} />

        {editing ? (
          <Formik
            initialValues={{
              name: currentUser?.name || "",
              phone: currentUser?.phone || "",
              location: currentUser?.location || "",
              bio: currentUser?.bio || "",
            }}
            validationSchema={profileSchema}
            onSubmit={(values, { setSubmitting }) => {
              updateProfile(values);
              setEditing(false);
              setSubmitting(false);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
              <Form>
                <Box display="flex" flexDirection="column" gap="20px">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.bio && Boolean(errors.bio)}
                        helperText={touched.bio && errors.bio}
                        multiline
                        rows={3}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  <Box display="flex" gap="12px" mt="4px">
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SaveOutlinedIcon />}
                      disabled={isSubmitting}
                      sx={{ backgroundColor: colors.blueAccent[600], "&:hover": { backgroundColor: colors.blueAccent[500] } }}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CloseOutlinedIcon />}
                      onClick={() => setEditing(false)}
                      sx={{ borderColor: colors.grey[600], color: colors.grey[300] }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InfoRow label="Email" value={currentUser?.email} colors={colors} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoRow label="Phone" value={currentUser?.phone} colors={colors} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoRow label="Location" value={currentUser?.location} colors={colors} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InfoRow label="Department" value={currentUser?.department} colors={colors} />
            </Grid>
            <Grid item xs={12}>
              <InfoRow label="Bio" value={currentUser?.bio} colors={colors} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
