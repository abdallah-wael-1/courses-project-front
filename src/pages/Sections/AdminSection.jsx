import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Button,
  Stack,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Slide,
  CircularProgress,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Dashboard,
  People,
  School,
  TrendingUp,
  AttachMoney,
  MoreVert,
  Add,
  Refresh,
  FileDownload,
  Visibility,
  Edit,
  Delete,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Close,
  PersonAdd,
  SaveAlt,
} from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // State Management
  const [refreshing, setRefreshing] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [viewUserModal, setViewUserModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Student",
  });

  const stats = [
    {
      title: "Total Users",
      value: "12,458",
      change: "+12.5%",
      icon: <People />,
      color: "#667eea",
      trend: "up",
    },
    {
      title: "Active Courses",
      value: "324",
      change: "+8.2%",
      icon: <School />,
      color: "#f093fb",
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$84,200",
      change: "+23.1%",
      icon: <AttachMoney />,
      color: "#4facfe",
      trend: "up",
    },
    {
      title: "Growth Rate",
      value: "18.3%",
      change: "+2.4%",
      icon: <TrendingUp />,
      color: "#43e97b",
      trend: "up",
    },
  ];

  const [recentUsers, setRecentUsers] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      role: "Student",
      status: "active",
      joined: "2 hours ago",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Sara Mohamed",
      email: "sara.m@email.com",
      role: "Instructor",
      status: "active",
      joined: "5 hours ago",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Mohamed Ali",
      email: "mohamed.ali@email.com",
      role: "Student",
      status: "pending",
      joined: "1 day ago",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "Fatma Ibrahim",
      email: "fatma.i@email.com",
      role: "Manager",
      status: "active",
      joined: "2 days ago",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Omar Khaled",
      email: "omar.k@email.com",
      role: "Student",
      status: "inactive",
      joined: "3 days ago",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ]);

  const topCourses = [
    { name: "Web Development Bootcamp", students: 1245, revenue: "$24,900", progress: 85 },
    { name: "Python Programming", students: 892, revenue: "$17,840", progress: 72 },
    { name: "UI/UX Design Master", students: 756, revenue: "$15,120", progress: 68 },
    { name: "Data Science Fundamentals", students: 634, revenue: "$12,680", progress: 55 },
  ];

  const systemAlerts = [
    { type: "success", message: "System backup completed successfully", time: "10 min ago" },
    { type: "warning", message: "High server load detected", time: "1 hour ago" },
    { type: "error", message: "Payment gateway connection failed", time: "2 hours ago" },
  ];

  // Handlers
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setSuccessMessage("Dashboard data refreshed successfully!");
      setSuccessModal(true);
    }, 1500);
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      return;
    }
    
    const user = {
      id: recentUsers.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      joined: "Just now",
      avatar: `https://i.pravatar.cc/150?img=${recentUsers.length + 1}`,
    };

    setRecentUsers([user, ...recentUsers]);
    setAddUserModal(false);
    setNewUser({ name: "", email: "", role: "Student" });
    setSuccessMessage(`User "${user.name}" added successfully!`);
    setSuccessModal(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewUserModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUserModal(true);
  };

  const handleSaveEdit = () => {
    setRecentUsers(
      recentUsers.map((u) =>
        u.id === selectedUser.id ? selectedUser : u
      )
    );
    setEditUserModal(false);
    setSuccessMessage(`User "${selectedUser.name}" updated successfully!`);
    setSuccessModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setDeleteUserModal(true);
  };

  const handleConfirmDelete = () => {
    setRecentUsers(recentUsers.filter((u) => u.id !== selectedUser.id));
    setDeleteUserModal(false);
    setSuccessMessage(`User "${selectedUser.name}" deleted successfully!`);
    setSuccessModal(true);
  };

  const handleExport = () => {
    setSuccessMessage("User data exported successfully!");
    setSuccessModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#43e97b";
      case "pending":
        return "#f093fb";
      case "inactive":
        return "#ff6b6b";
      default:
        return "#ccc";
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle sx={{ color: "#43e97b", fontSize: { xs: 20, md: 24 } }} />;
      case "warning":
        return <Warning sx={{ color: "#f093fb", fontSize: { xs: 20, md: 24 } }} />;
      case "error":
        return <ErrorIcon sx={{ color: "#ff6b6b", fontSize: { xs: 20, md: 24 } }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 2, sm: 3, md: 6 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 6 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Box>
              <Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center" sx={{ mb: 1 }}>
                <Dashboard sx={{ fontSize: { xs: 32, md: 40 }, color: "primary.main" }} />
                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    background: isDark
                      ? "linear-gradient(135deg, #fff 0%, #ccc 100%)"
                      : "linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Admin Dashboard
                </Typography>
              </Stack>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ 
                  fontSize: { xs: "0.85rem", md: "1rem" },
                  display: { xs: "none", sm: "block" }
                }}
              >
                Welcome back, Administrator! Here's what's happening today.
              </Typography>
            </Box>

            <Stack direction="row" spacing={{ xs: 1, md: 2 }} sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Button
                variant="outlined"
                startIcon={refreshing ? <CircularProgress size={16} /> : <Refresh />}
                onClick={handleRefresh}
                disabled={refreshing}
                sx={{ 
                  fontWeight: 600,
                  fontSize: { xs: "0.8rem", md: "0.875rem" },
                  px: { xs: 2, md: 3 },
                  flex: { xs: 1, sm: "none" }
                }}
              >
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setAddUserModal(true)}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontWeight: 700,
                  fontSize: { xs: "0.8rem", md: "0.875rem" },
                  px: { xs: 2, md: 3 },
                  flex: { xs: 1, sm: "none" },
                  "&:hover": {
                    background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  },
                }}
              >
                Add User
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={6} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: { xs: 2, md: 3 },
                    background: isDark
                      ? alpha(theme.palette.background.paper, 0.6)
                      : "white",
                    border: `2px solid ${alpha(stat.color, 0.2)}`,
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 12px 40px ${alpha(stat.color, 0.3)}`,
                      borderColor: stat.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
                    <Stack 
                      direction="row" 
                      justifyContent="space-between" 
                      alignItems="flex-start"
                      spacing={1}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          gutterBottom
                          sx={{ 
                            fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
                            lineHeight: 1.2
                          }}
                        >
                          {stat.title}
                        </Typography>
                        <Typography 
                          variant="h4" 
                          fontWeight={800} 
                          sx={{ 
                            mb: 1,
                            fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" }
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Chip
                          label={stat.change}
                          size="small"
                          sx={{
                            bgcolor: alpha(stat.color, 0.15),
                            color: stat.color,
                            fontWeight: 700,
                            fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                            height: { xs: 20, md: 24 },
                            display: { xs: "none", sm: "inline-flex" }
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: { xs: 40, sm: 48, md: 56 },
                          height: { xs: 40, sm: 48, md: 56 },
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.7)} 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 8px 24px ${alpha(stat.color, 0.4)}`,
                          flexShrink: 0,
                        }}
                      >
                        <Box sx={{ 
                          color: "white", 
                          fontSize: { xs: 20, sm: 24, md: 28 } 
                        }}>
                          {stat.icon}
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={{ xs: 2, md: 4 }}>
          {/* Recent Users Table */}
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                borderRadius: { xs: 2, md: 3 },
                background: isDark
                  ? alpha(theme.palette.background.paper, 0.6)
                  : "white",
                border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack 
                  direction="row" 
                  justifyContent="space-between" 
                  alignItems="center" 
                  sx={{ mb: { xs: 2, md: 3 } }}
                >
                  <Typography 
                    variant="h6" 
                    fontWeight={700}
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    Recent Users ({recentUsers.length})
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<FileDownload />}
                    onClick={handleExport}
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", md: "0.875rem" }
                    }}
                  >
                    Export
                  </Button>
                </Stack>

                {/* Mobile View - Cards */}
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <Stack spacing={1.5}>
                    {recentUsers.map((user) => (
                      <Paper
                        key={user.id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: isDark
                            ? alpha("#fff", 0.03)
                            : alpha("#000", 0.02),
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                        }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40 }} />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.85rem" }}>
                              {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                              {user.email}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                              <Chip
                                label={user.role}
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: 600, fontSize: "0.65rem", height: 18 }}
                              />
                              <Chip
                                label={user.status}
                                size="small"
                                sx={{
                                  bgcolor: alpha(getStatusColor(user.status), 0.15),
                                  color: getStatusColor(user.status),
                                  fontWeight: 700,
                                  textTransform: "capitalize",
                                  fontSize: "0.65rem",
                                  height: 18
                                }}
                              />
                            </Stack>
                          </Box>
                          <Stack direction="row" spacing={0.5}>
                            <IconButton size="small" sx={{ p: 0.5 }} onClick={() => handleViewUser(user)}>
                              <Visibility sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton size="small" sx={{ p: 0.5 }} onClick={() => handleEditUser(user)}>
                              <Edit sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton size="small" sx={{ p: 0.5 }} onClick={() => handleDeleteUser(user)}>
                              <Delete sx={{ fontSize: 16, color: "error.main" }} />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Box>

                {/* Desktop View - Table */}
                <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Joined</TableCell>
                        <TableCell sx={{ fontWeight: 700 }} align="right">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow
                          key={user.id}
                          sx={{
                            "&:hover": {
                              bgcolor: isDark
                                ? alpha("#fff", 0.02)
                                : alpha("#000", 0.02),
                            },
                          }}
                        >
                          <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                              <Avatar src={user.avatar} alt={user.name} />
                              <Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {user.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {user.email}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.role}
                              size="small"
                              variant="outlined"
                              sx={{ fontWeight: 600 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.status}
                              size="small"
                              sx={{
                                bgcolor: alpha(getStatusColor(user.status), 0.15),
                                color: getStatusColor(user.status),
                                fontWeight: 700,
                                textTransform: "capitalize",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {user.joined}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={() => handleViewUser(user)}>
                              <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleEditUser(user)}>
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteUser(user)}>
                              <Delete fontSize="small" color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              {/* Top Courses */}
              <Card
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.6)
                    : "white",
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    Top Performing Courses
                  </Typography>
                  <Stack spacing={{ xs: 2, md: 2.5 }} sx={{ mt: { xs: 2, md: 3 } }}>
                    {topCourses.map((course, index) => (
                      <Box key={index}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 1 }}
                        >
                          <Typography 
                            variant="body2" 
                            fontWeight={600}
                            sx={{ 
                              fontSize: { xs: "0.85rem", md: "0.875rem" },
                              flex: 1,
                              pr: 1
                            }}
                          >
                            {course.name}
                          </Typography>
                          <IconButton size="small">
                            <MoreVert sx={{ fontSize: { xs: 18, md: 20 } }} />
                          </IconButton>
                        </Stack>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{ mb: 1 }}
                        >
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                          >
                            {course.students} students
                          </Typography>
                          <Typography 
                            variant="caption" 
                            fontWeight={700} 
                            color="primary"
                            sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                          >
                            {course.revenue}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={course.progress}
                          sx={{
                            height: { xs: 5, md: 6 },
                            borderRadius: 3,
                            bgcolor: isDark
                              ? alpha("#fff", 0.1)
                              : alpha("#000", 0.05),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.6)
                    : "white",
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant="h6" 
                    fontWeight={700} 
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    System Alerts
                  </Typography>
                  <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ mt: { xs: 2, md: 3 } }}>
                    {systemAlerts.map((alert, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: { xs: 1.5, md: 2 },
                          borderRadius: 2,
                          bgcolor: isDark
                            ? alpha("#fff", 0.03)
                            : alpha("#000", 0.02),
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                        }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                          {getAlertIcon(alert.type)}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                              variant="body2" 
                              fontWeight={600} 
                              gutterBottom
                              sx={{ 
                                fontSize: { xs: "0.8rem", md: "0.875rem" },
                                lineHeight: 1.4
                              }}
                            >
                              {alert.message}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                            >
                              {alert.time}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Add User Modal */}
      <Dialog
        open={addUserModal}
        TransitionComponent={Transition}
        onClose={() => setAddUserModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonAdd sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={700}>
              Add New User
            </Typography>
          </Stack>
          <IconButton
            onClick={() => setAddUserModal(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="e.g. Ahmed Hassan"
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="e.g. ahmed@example.com"
            />
            <TextField
              select
              fullWidth
              label="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Instructor">Instructor</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setAddUserModal(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleAddUser}
            variant="contained"
            startIcon={<Add />}
            disabled={!newUser.name || !newUser.email}
            sx={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
            }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* View User Modal */}
      <Dialog
        open={viewUserModal}
        TransitionComponent={Transition}
        onClose={() => setViewUserModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        {selectedUser && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight={700}>
                User Details
              </Typography>
              <IconButton
                onClick={() => setViewUserModal(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    src={selectedUser.avatar}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mb: 2,
                      border: "4px solid",
                      borderColor: "primary.main",
                    }}
                  />
                  <Typography variant="h6" fontWeight={700}>
                    {selectedUser.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedUser.email}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Role
                    </Typography>
                    <Chip
                      label={selectedUser.role}
                      size="small"
                      variant="outlined"
                      sx={{ mt: 0.5, fontWeight: 600 }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedUser.status}
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: alpha(getStatusColor(selectedUser.status), 0.15),
                        color: getStatusColor(selectedUser.status),
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Joined
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedUser.joined}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={() => setViewUserModal(false)} variant="outlined">
                Close
              </Button>
              <Button
                onClick={() => {
                  setViewUserModal(false);
                  handleEditUser(selectedUser);
                }}
                variant="contained"
                startIcon={<Edit />}
              >
                Edit User
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit User Modal */}
      <Dialog
        open={editUserModal}
        TransitionComponent={Transition}
        onClose={() => setEditUserModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        {selectedUser && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Edit sx={{ color: "primary.main" }} />
                <Typography variant="h6" fontWeight={700}>
                  Edit User
                </Typography>
              </Stack>
              <IconButton
                onClick={() => setEditUserModal(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
                <TextField
                  select
                  fullWidth
                  label="Role"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Instructor">Instructor</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Stack>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={() => setEditUserModal(false)} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                variant="contained"
                startIcon={<SaveAlt />}
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete User Modal */}
      <Dialog
        open={deleteUserModal}
        TransitionComponent={Transition}
        onClose={() => setDeleteUserModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
          }
        }}
      >
        {selectedUser && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Warning sx={{ color: "error.main", fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} color="error">
                  Delete User
                </Typography>
              </Stack>
            </DialogTitle>
            
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to delete this user?
              </Typography>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha("#ff6b6b", 0.1),
                  border: `1px solid ${alpha("#ff6b6b", 0.3)}`,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={selectedUser.avatar} />
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      {selectedUser.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                This action cannot be undone. All user data will be permanently deleted.
              </Typography>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={() => setDeleteUserModal(false)} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                color="error"
                startIcon={<Delete />}
              >
                Delete User
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={successModal}
        TransitionComponent={Transition}
        onClose={() => setSuccessModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
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
            <CheckCircle sx={{ fontSize: 48, color: "success.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="success.main">
            Success!
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="body1" color="text.secondary">
            {successMessage}
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
    </Box>
  );
}

export default AdminSection;