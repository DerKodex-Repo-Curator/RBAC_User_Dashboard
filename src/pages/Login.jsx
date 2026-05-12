import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  useTheme,
  Paper,
  InputAdornment,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "../auth/AuthContext";
import { ColorModeContext } from "../theme/ColorModeContext";
import { tokens } from "../theme/theme";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    const success = login(values.email, values.password);
    if (success) {
      navigate("/dashboard");
    } else {
      setFieldError("password", "Invalid credentials");
    }
    setSubmitting(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #020617 0%, #0F172A 50%, #0A1525 100%)"
            : "linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 60%, #E0F2FE 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          top: "-200px",
          left: "-200px",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)",
          bottom: "-150px",
          right: "-150px",
          pointerEvents: "none",
        },
      }}
    >
      <Box position="absolute" top={16} right={16}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px 36px",
          borderRadius: "20px",
          background: colors.glass.card,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${colors.glass.border}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)"
              : "0 25px 50px rgba(15,23,42,0.1), 0 0 0 1px rgba(255,255,255,0.8)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb="28px" gap="10px">
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              backgroundColor: colors.blueAccent[700],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockOutlinedIcon sx={{ color: colors.blueAccent[300], fontSize: 26 }} />
          </Box>
          <Typography variant="h4" fontWeight="700" color={colors.grey[100]} fontFamily="'Poppins', sans-serif">
            Welcome back
          </Typography>
          <Typography variant="body2" color={colors.grey[400]} textAlign="center">
            Sign in to access your RBAC dashboard
          </Typography>
        </Box>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
            <Form>
              <Box display="flex" flexDirection="column" gap="20px">
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: "10px", background: colors.glass.input },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: "10px", background: colors.glass.input },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    background: `linear-gradient(135deg, ${colors.blueAccent[600]}, ${colors.blueAccent[700]})`,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    fontFamily: "'Poppins', sans-serif",
                    padding: "12px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 15px rgba(59,130,246,0.35)",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${colors.blueAccent[500]}, ${colors.blueAccent[600]})`,
                      boxShadow: "0 6px 20px rgba(59,130,246,0.45)",
                    },
                    transition: "all 0.2s ease",
                    mt: "4px",
                  }}
                >
                  {isSubmitting ? "Signing in…" : "Sign In"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          mt="20px"
          color={colors.grey[500]}
        >
          Enter any valid email and a password of 6+ characters to continue.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
