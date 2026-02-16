import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Chip,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  School as SchoolIcon,
  Dashboard as DashboardIcon,
  Info as InfoIcon,
  ContactMail as ContactIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

// Helper function to get avatar URL
const getAvatarUrl = (avatar) => {
  if (!avatar || avatar === "uploads/default.png") {
    return null; // No avatar, show initials
  }

  // If avatar is a full URL (starts with http)
  if (avatar.startsWith("http")) {
    return avatar;
  }
  
  // If avatar is a relative path, prepend backend URL
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return `${BACKEND_URL}/${avatar}`;
};

  // Get user initials for fallback
  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const avatarUrl = getAvatarUrl(user?.avatar);
  const userInitials = getUserInitials();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
    navigate("/login");
  };

  // Navigation items - only show Dashboard if authenticated
  const navItems = [
    { title: "Home", path: "/", icon: <HomeIcon /> },
    { title: "Courses", path: "/courses", icon: <SchoolIcon /> },
    ...(isAuthenticated ? [{ title: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> }] : []),
    { title: "About", path: "/about", icon: <InfoIcon /> },
    { title: "Contact", path: "/contact", icon: <ContactIcon /> },
  ];

  const authItems = [
    { title: "Sign In", path: "/login", icon: <LoginIcon /> },
    { title: "Sign Up", path: "/register", icon: <RegisterIcon /> },
  ];

  const drawer = (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: 700,
          background: "linear-gradient(45deg, #6366f1, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        CoursesApp
      </Typography>

      {/* Theme Toggle */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <ThemeToggle />
      </Box>
      <Divider sx={{ mb: 2 }} />

      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                  "&:hover": { backgroundColor: "primary.main" },
                },
              }}
            >
              <Box sx={{ mr: 2, display: "flex" }}>{item.icon}</Box>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}

        {!isAuthenticated && (
          <>
            <Divider sx={{ my: 2 }} />
            {authItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                  sx={{ borderRadius: 2, mb: 0.5 }}
                >
                  <Box sx={{ mr: 2, display: "flex" }}>{item.icon}</Box>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}

        {isAuthenticated && (
          <>
            <Divider sx={{ my: 2 }} />
            <ListItem>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Avatar
                  src={avatarUrl}
                  sx={{
                    bgcolor: "primary.main",
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 1,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                  }}
                >
                  {!avatarUrl && userInitials}
                </Avatar>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {user?.email}
                </Typography>
                <Chip
                  label={user?.role?.toUpperCase() || "USER"}
                  size="small"
                  sx={{
                    mt: 1,
                    background: "linear-gradient(45deg, #6366f1, #f59e0b)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  handleLogout();
                }}
                sx={{
                  borderRadius: 2,
                  color: "error.main",
                  "&:hover": { backgroundColor: "error.light" },
                }}
              >
                <Box sx={{ mr: 2, display: "flex" }}>
                  <LogoutIcon />
                </Box>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 70 }}>
            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexGrow: isMobile ? 1 : 0,
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #6366f1 0%, #f59e0b 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 1.5,
                }}
              >
                <SchoolIcon sx={{ color: "white", fontSize: 24 }} />
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: "flex", ml: 6, gap: 0.5 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.title}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: location.pathname === item.path ? "primary.main" : "text.secondary",
                      fontWeight: location.pathname === item.path ? 600 : 500,
                      px: 2,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -16,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: location.pathname === item.path ? "60%" : "0%",
                        height: "3px",
                        background: "linear-gradient(90deg, #6366f1, #f59e0b)",
                        borderRadius: "2px 2px 0 0",
                        transition: "width 0.3s ease",
                      },
                      "&:hover": {
                        color: "primary.main",
                        backgroundColor: "transparent",
                        "&::after": { width: "60%" },
                      },
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>
            )}

            {/* Auth + Theme Toggle */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <ThemeToggle />

              {isAuthenticated ? (
                <>
                  <Chip
                    label={user?.role?.toUpperCase() || "USER"}
                    size="small"
                    sx={{
                      background: "linear-gradient(45deg, #6366f1, #f59e0b)",
                      color: "white",
                      fontWeight: 600,
                      display: { xs: "none", md: "flex" },
                    }}
                  />
                  <IconButton onClick={handleProfileMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={avatarUrl}
                      sx={{ 
                        bgcolor: "primary.main", 
                        width: 36, 
                        height: 36,
                        fontSize: "1rem",
                        fontWeight: 700,
                      }}
                    >
                      {!avatarUrl && userInitials}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 200,
                        borderRadius: 2,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <MenuItem disabled sx={{ opacity: 1, cursor: "default" }}>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {user?.email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Role: {user?.role?.toUpperCase() || "USER"}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      component={Link}
                      to="/dashboard"
                      onClick={handleCloseMenu}
                      sx={{ gap: 1.5 }}
                    >
                      <DashboardIcon fontSize="small" />
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleCloseMenu}
                      sx={{ gap: 1.5 }}
                    >
                      <PersonIcon fontSize="small" />
                      Profile
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        color: "error.main",
                        gap: 1.5,
                        "&:hover": { bgcolor: "error.light" },
                      }}
                    >
                      <LogoutIcon fontSize="small" />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                !isMobile && (
                  <>
                    <Button
                      component={Link}
                      to="/login"
                      startIcon={<LoginIcon />}
                      sx={{ color: "text.primary", "&:hover": { backgroundColor: "action.hover" } }}
                    >
                      Sign in
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      startIcon={<RegisterIcon />}
                      sx={{
                        background: "linear-gradient(45deg, #6366f1, #f59e0b)",
                        boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                        "&:hover": {
                          background: "linear-gradient(45deg, #4f46e5, #d97706)",
                          boxShadow: "0 6px 16px rgba(99,102,241,0.4)",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;