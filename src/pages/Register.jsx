import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Visibility,
  VisibilityOff,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setAvatarFile(file);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All required fields must be filled");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const registerData = new FormData();
      registerData.append("firstName", formData.firstName);
      registerData.append("lastName", formData.lastName);
      registerData.append("email", formData.email);
      registerData.append("password", formData.password);
      registerData.append("role", formData.role);

      if (avatarFile) {
        registerData.append("avatar", avatarFile);
      }

      const result = await register(registerData);

      if (result.success) {
        navigate("/login");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)"
              : "#ffffff",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            sx={{
              mx: "auto",
              mb: 2,
              width: 56,
              height: 56,
              background: "linear-gradient(45deg, #6366f1, #f59e0b)",
            }}
          >
            <PersonAddIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join CoursesApp and start learning today
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* Avatar Upload - Optional */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
              Profile Picture (Optional)
            </Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <Avatar
                src={avatarPreview}
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 1,
                  cursor: "pointer",
                  border: "3px dashed",
                  borderColor: avatarPreview ? "primary.main" : "grey.400",
                  bgcolor: "background.default",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "primary.dark",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {avatarPreview ? null : (
                  <UploadIcon sx={{ fontSize: 40, color: "text.secondary" }} />
                )}
              </Avatar>
            </label>
            <Typography variant="caption" color="text.secondary" display="block">
              {avatarPreview ? "Click to change" : "Click to upload (max 5MB)"}
            </Typography>
            {avatarPreview && (
              <Button
                size="small"
                onClick={handleRemoveAvatar}
                sx={{ mt: 1, fontSize: "0.75rem" }}
              >
                Remove
              </Button>
            )}
            <Typography
              variant="caption"
              color="success.main"
              display="block"
              sx={{ mt: 1, fontWeight: 600 }}
            >
              ✓ You can skip this and add it later from your profile
            </Typography>
          </Box>

          {/* First Name & Last Name */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
              />
            </Grid>
          </Grid>

          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            sx={{ mb: 2 }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            sx={{ mb: 2 }}
            helperText="At least 6 characters"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Role */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Role *</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role *"
              required
            >
              <MenuItem value="USER">User / Student</MenuItem>
              <MenuItem value="MANAGER">Manager</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              mb: 2,
              fontWeight: 700,
              fontSize: "1rem",
              background: "linear-gradient(45deg, #6366f1, #f59e0b)",
              "&:hover": {
                background: "linear-gradient(45deg, #4f46e5, #d97706)",
              },
              "&:disabled": {
                background: "linear-gradient(45deg, #9ca3af, #d1d5db)",
              },
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Login Link */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Typography
                component={Link}
                to="/login"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign In
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;