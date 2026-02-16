import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Alert,
  InputAdornment,
  Chip,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Slide,
} from "@mui/material";
import {
  Person,
  Edit,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  LocationOn,
  Cake,
  Work,
  School,
  Lock,
  Delete,
  PhotoCamera,
  Warning,
  CheckCircleOutline,
  ErrorOutline,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utility/image";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const { user, updateProfile, updatePassword, deleteAccount, loading: authLoading } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  //  Modal States
  const [deleteAvatarModal, setDeleteAvatarModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [passwordSuccessModal, setPasswordSuccessModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Profile Data
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    dateOfBirth: "",
    occupation: "",
    education: "",
  });

  // Avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Password Change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        occupation: user.occupation || "",
        education: user.education || "",
      });
      setAvatarPreview(user.avatar ? getImageUrl(user.avatar) : null);
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setModalMessage("Please select an image file (JPG, PNG, etc.)");
        setErrorModal(true);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setModalMessage("Image size must be less than 5MB. Please choose a smaller file.");
        setErrorModal(true);
        return;
      }

      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //  Handle Delete Avatar Confirmation
  const handleDeleteAvatarConfirm = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setDeleteAvatarModal(false);
    setModalMessage("Avatar will be removed when you save your changes");
    setSuccessModal(true);
  };

  const handleSaveProfile = async () => {
    // Validation
    if (!profileData.firstName.trim() || !profileData.lastName.trim()) {
      setModalMessage("First name and last name are required");
      setErrorModal(true);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      Object.keys(profileData).forEach((key) => {
        if (profileData[key] !== user[key]) {
          formData.append(key, profileData[key]);
        }
      });

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      if (!avatarPreview && user.avatar) {
        formData.append("removeAvatar", "true");
      }

      const result = await updateProfile(formData);

      if (result.success) {
        setModalMessage("Your profile has been updated successfully!");
        setSuccessModal(true);
        setEditMode(false);
        setAvatarFile(null);
        setTimeout(() => {
          setAvatarPreview(result.data.avatar ? getImageUrl(result.data.avatar) : null);
        }, 100);
      } else {
        setModalMessage(result.message || "Failed to update profile. Please try again.");
        setErrorModal(true);
      }
    } catch (err) {
      setModalMessage(err.message || "Something went wrong. Please try again.");
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setModalMessage("Please fill in all password fields");
      setErrorModal(true);
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setModalMessage("New password must be at least 6 characters long");
      setErrorModal(true);
      setLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setModalMessage("New passwords do not match. Please check and try again.");
      setErrorModal(true);
      setLoading(false);
      return;
    }

    try {
      const result = await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        setPasswordSuccessModal(true);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setModalMessage(result.message || "Failed to change password. Please check your current password.");
        setErrorModal(true);
      }
    } catch (err) {
      setModalMessage(err.message || "Something went wrong. Please try again.");
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setAvatarFile(null);
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        occupation: user.occupation || "",
        education: user.education || "",
      });
      setAvatarPreview(user.avatar ? getImageUrl(user.avatar) : null);
    }
  };

  //  Handle Delete Account
  const handleDeleteAccountConfirm = async () => {
    if (confirmText !== "DELETE") {
      setModalMessage("Please type DELETE exactly as shown to confirm");
      setErrorModal(true);
      return;
    }

    setLoading(true);
    setError("");

    const result = await deleteAccount();

    if (result.success) {
      setDeleteAccountModal(false);
      navigate("/");
    } else {
      setModalMessage(result.message || "Failed to delete account. Please try again.");
      setErrorModal(true);
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: isDark ? "background.default" : "#fafafa",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              background: isDark
                ? "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)"
                : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 1,
            }}
          >
            My Profile
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: isDark ? "rgba(255, 255, 255, 0.7)" : "text.secondary" }}
          >
            Manage your account settings and preferences
          </Typography>
        </Box>

        {/* Main Profile Card */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            mb: 4,
          }}
        >
          {/* Header Section with Avatar */}
          <Box
            sx={{
              background: isDark
                ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
                : "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              p: 4,
              position: "relative",
              textAlign: "center",
            }}
          >
            {/* Avatar */}
            <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
                disabled={!editMode}
              />
              <Avatar
                src={avatarPreview}
                sx={{
                  width: 150,
                  height: 150,
                  border: "4px solid white",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  background: !avatarPreview
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "transparent",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                {!avatarPreview &&
                  (profileData.firstName?.[0] || user?.email?.[0] || "U").toUpperCase()}
              </Avatar>

              {editMode && (
                <>
                  {/* Upload Button */}
                  <IconButton
                    component="label"
                    htmlFor="avatar-upload"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>

                  {/* Delete Button */}
                  {avatarPreview && (
                    <IconButton
                      onClick={() => setDeleteAvatarModal(true)}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        bgcolor: "error.main",
                        color: "white",
                        "&:hover": { bgcolor: "error.dark" },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </>
              )}
            </Box>

            {/* User Name */}
            <Typography variant="h4" fontWeight={700} sx={{ color: "white", mb: 0.5 }}>
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 2 }}>
              {profileData.email}
            </Typography>
            <Chip
              label={user?.role?.toUpperCase() || "USER"}
              sx={{
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                color: "white",
                fontWeight: 700,
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            />
          </Box>

          {/* Profile Content */}
          <Box sx={{ p: 4 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Typography variant="h5" fontWeight={700}>
                Personal Information
              </Typography>
              {!editMode ? (
                <Button
                  startIcon={<Edit />}
                  variant="contained"
                  onClick={() => setEditMode(true)}
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #a855f7)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #4f46e5, #8b5cf6)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    startIcon={<Cancel />}
                    variant="outlined"
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    startIcon={<Save />}
                    variant="contained"
                    onClick={handleSaveProfile}
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(45deg, #6366f1, #a855f7)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #4f46e5, #8b5cf6)",
                      },
                    }}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </Stack>
              )}
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={profileData.email}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Cake />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  placeholder="e.g. Cairo, Egypt"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOn />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Occupation"
                  name="occupation"
                  value={profileData.occupation}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  placeholder="e.g. Software Engineer"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Work />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Education"
                  name="education"
                  value={profileData.education}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  placeholder="e.g. Bachelor's in Computer Science"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Security Card */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 4,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Lock sx={{ fontSize: 28, color: "primary.main" }} />
            <Typography variant="h5" fontWeight={700}>
              Security
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Ensure your account is using a strong password to stay secure
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                      >
                        {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                        }
                      >
                        {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                      >
                        {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleChangePassword}
                disabled={loading}
                sx={{
                  background: "linear-gradient(45deg, #6366f1, #a855f7)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #4f46e5, #8b5cf6)",
                  },
                }}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Danger Zone */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: alpha("#ff6b6b", 0.05),
              border: `1px solid ${alpha("#ff6b6b", 0.2)}`,
            }}
          >
            <Typography variant="h6" fontWeight={700} color="error" gutterBottom>
              ⚠️ Danger Zone
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Once you delete your account, there is no going back. All your data, courses,
              and progress will be permanently deleted.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setDeleteAccountModal(true)}
              disabled={loading}
              sx={{
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "error.main",
                  color: "white",
                },
              }}
            >
              Delete My Account
            </Button>
          </Box>
        </Paper>
      </Container>

      <Dialog
        open={successModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setSuccessModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "success.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <CheckCircleOutline sx={{ fontSize: 48, color: "success.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="success.main">
            Success!
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {modalMessage}
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button
            onClick={() => setSuccessModal(false)}
            variant="contained"
            color="success"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Great!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setErrorModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "error.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ErrorOutline sx={{ fontSize: 48, color: "error.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="error.main">
            Oops!
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {modalMessage}
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button
            onClick={() => setErrorModal(false)}
            variant="contained"
            color="error"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={passwordSuccessModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setPasswordSuccessModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pt: 4, pb: 2 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "success.lighter",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <Lock sx={{ fontSize: 48, color: "success.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="success.main">
            Password Updated!
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Your password has been changed successfully.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Make sure to remember your new password for future logins.
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button
            onClick={() => setPasswordSuccessModal(false)}
            variant="contained"
            color="success"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            Perfect!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteAvatarModal}
        TransitionComponent={Transition}
        onClose={() => setDeleteAvatarModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: 450,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Warning sx={{ color: "warning.main", fontSize: 28 }} />
            <Typography variant="h6" fontWeight={700}>
              Remove Profile Picture?
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove your profile picture? Your avatar will be reset
            to the default image with your initials.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setDeleteAvatarModal(false)} variant="outlined">
            Keep It
          </Button>
          <Button
            onClick={handleDeleteAvatarConfirm}
            variant="contained"
            color="warning"
            startIcon={<Delete />}
            sx={{
              fontWeight: 600,
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteAccountModal}
        TransitionComponent={Transition}
        onClose={() => !loading && setDeleteAccountModal(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Warning sx={{ color: "error.main", fontSize: 32 }} />
            <Typography variant="h5" fontWeight={700} color="error">
              Delete Account Permanently
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            ⚠️ <strong>This action cannot be undone!</strong>
            <br />
            <br />
            All your data will be permanently deleted:
          </DialogContentText>
          <Box component="ul" sx={{ pl: 3, mb: 3 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Profile information and settings
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              All enrolled courses and progress
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Certificates and achievements
            </Typography>
            <Typography component="li" variant="body2">
              Payment history and preferences
            </Typography>
          </Box>
          <DialogContentText sx={{ mb: 2, fontWeight: 600 }}>
            To confirm deletion, type{" "}
            <strong style={{ color: theme.palette.error.main }}>DELETE</strong> below:
          </DialogContentText>
          <TextField
            fullWidth
            placeholder="Type DELETE to confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "error.main",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button
            onClick={() => {
              setDeleteAccountModal(false);
              setConfirmText("");
            }}
            variant="outlined"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccountConfirm}
            variant="contained"
            color="error"
            startIcon={loading ? <CircularProgress size={20} /> : <Delete />}
            disabled={loading || confirmText !== "DELETE"}
            sx={{
              fontWeight: 600,
            }}
          >
            {loading ? "Deleting..." : "Delete Forever"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;