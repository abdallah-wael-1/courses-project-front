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
  LinearProgress,
  IconButton,
  Paper,
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
  ManageAccounts,
  School,
  People,
  Assignment,
  TrendingUp,
  Add,
  MoreVert,
  Edit,
  Visibility,
  CheckCircle,
  Schedule,
  Star,
  Close,
  Delete,
  PersonAdd,
  SaveAlt,
  Warning,
  Refresh,
} from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ManagerSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // State Management
  const [refreshing, setRefreshing] = useState(false);
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [viewCourseModal, setViewCourseModal] = useState(false);
  const [editCourseModal, setEditCourseModal] = useState(false);
  const [deleteCourseModal, setDeleteCourseModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [viewMemberModal, setViewMemberModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [newCourse, setNewCourse] = useState({
    title: "",
    instructor: "",
    status: "draft",
  });

  const [newMember, setNewMember] = useState({
    name: "",
    role: "Content Creator",
  });

  const stats = [
    {
      title: "Managed Courses",
      value: "24",
      change: "+3 this month",
      icon: <School />,
      color: "#667eea",
    },
    {
      title: "Team Members",
      value: "18",
      change: "+2 new",
      icon: <People />,
      color: "#f093fb",
    },
    {
      title: "Active Students",
      value: "1,247",
      change: "+145 this week",
      icon: <TrendingUp />,
      color: "#4facfe",
    },
    {
      title: "Pending Tasks",
      value: "12",
      change: "3 urgent",
      icon: <Assignment />,
      color: "#43e97b",
    },
  ];

  const [myCourses, setMyCourses] = useState([
    {
      id: 1,
      title: "Advanced JavaScript Programming",
      instructor: "Ahmed Hassan",
      students: 245,
      progress: 78,
      status: "active",
      rating: 4.8,
      revenue: "$4,900",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      title: "React Development Masterclass",
      instructor: "Sara Mohamed",
      students: 198,
      progress: 65,
      status: "active",
      rating: 4.9,
      revenue: "$3,960",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "Mohamed Ali",
      students: 312,
      progress: 92,
      status: "review",
      rating: 4.7,
      revenue: "$6,240",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      instructor: "Fatma Ibrahim",
      students: 167,
      progress: 45,
      status: "draft",
      rating: 4.6,
      revenue: "$3,340",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Lead Instructor",
      courses: 8,
      students: 456,
      avatar: "https://i.pravatar.cc/150?img=1",
      status: "online",
    },
    {
      id: 2,
      name: "Sara Mohamed",
      role: "Content Creator",
      courses: 5,
      students: 298,
      avatar: "https://i.pravatar.cc/150?img=2",
      status: "online",
    },
    {
      id: 3,
      name: "Mohamed Ali",
      role: "Technical Instructor",
      courses: 6,
      students: 389,
      avatar: "https://i.pravatar.cc/150?img=3",
      status: "busy",
    },
    {
      id: 4,
      name: "Fatma Ibrahim",
      role: "Design Instructor",
      courses: 4,
      students: 234,
      avatar: "https://i.pravatar.cc/150?img=4",
      status: "offline",
    },
  ]);

  const recentActivities = [
    {
      type: "course",
      message: "New course 'Advanced React Hooks' published",
      time: "2 hours ago",
      icon: <CheckCircle sx={{ color: "#43e97b" }} />,
    },
    {
      type: "review",
      message: "Course 'Python Basics' needs your review",
      time: "5 hours ago",
      icon: <Schedule sx={{ color: "#f093fb" }} />,
    },
    {
      type: "team",
      message: "Sara Mohamed joined your team",
      time: "1 day ago",
      icon: <People sx={{ color: "#4facfe" }} />,
    },
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

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.instructor) {
      return;
    }

    const course = {
      id: myCourses.length + 1,
      title: newCourse.title,
      instructor: newCourse.instructor,
      students: 0,
      progress: 0,
      status: newCourse.status,
      rating: 0,
      revenue: "$0",
      avatar: `https://i.pravatar.cc/150?img=${myCourses.length + 1}`,
    };

    setMyCourses([course, ...myCourses]);
    setAddCourseModal(false);
    setNewCourse({ title: "", instructor: "", status: "draft" });
    setSuccessMessage(`Course "${course.title}" added successfully!`);
    setSuccessModal(true);
  };

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setViewCourseModal(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setEditCourseModal(true);
  };

  const handleSaveCourseEdit = () => {
    setMyCourses(
      myCourses.map((c) =>
        c.id === selectedCourse.id ? selectedCourse : c
      )
    );
    setEditCourseModal(false);
    setSuccessMessage(`Course "${selectedCourse.title}" updated successfully!`);
    setSuccessModal(true);
  };

  const handleDeleteCourse = (course) => {
    setSelectedCourse(course);
    setDeleteCourseModal(true);
  };

  const handleConfirmDeleteCourse = () => {
    setMyCourses(myCourses.filter((c) => c.id !== selectedCourse.id));
    setDeleteCourseModal(false);
    setSuccessMessage(`Course "${selectedCourse.title}" deleted successfully!`);
    setSuccessModal(true);
  };

  const handleAddMember = () => {
    if (!newMember.name) {
      return;
    }

    const member = {
      id: teamMembers.length + 1,
      name: newMember.name,
      role: newMember.role,
      courses: 0,
      students: 0,
      avatar: `https://i.pravatar.cc/150?img=${teamMembers.length + 1}`,
      status: "online",
    };

    setTeamMembers([member, ...teamMembers]);
    setAddMemberModal(false);
    setNewMember({ name: "", role: "Content Creator" });
    setSuccessMessage(`Team member "${member.name}" added successfully!`);
    setSuccessModal(true);
  };

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setViewMemberModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#43e97b";
      case "review":
        return "#f093fb";
      case "draft":
        return "#ffa500";
      default:
        return "#ccc";
    }
  };

  const getOnlineStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#43e97b";
      case "busy":
        return "#ffa500";
      case "offline":
        return "#ccc";
      default:
        return "#ccc";
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
                <ManageAccounts sx={{ fontSize: { xs: 32, md: 40 }, color: "primary.main" }} />
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
                  Manager Dashboard
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
                Manage your courses, team, and track performance all in one place.
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
                onClick={() => setAddCourseModal(true)}
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontWeight: 700,
                  px: { xs: 2, md: 4 },
                  py: { xs: 1.2, md: 1.5 },
                  fontSize: { xs: "0.8rem", md: "0.875rem" },
                  flex: { xs: 1, sm: "none" },
                  "&:hover": {
                    background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                  },
                }}
              >
                Create Course
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
                            mb: 0.5,
                            fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2rem" }
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                            display: { xs: "none", sm: "block" }
                          }}
                        >
                          {stat.change}
                        </Typography>
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
          {/* My Courses */}
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
                    My Courses ({myCourses.length})
                  </Typography>
                  <Button 
                    size="small" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: "0.75rem", md: "0.875rem" }
                    }}
                  >
                    View All
                  </Button>
                </Stack>

                <Stack spacing={{ xs: 1.5, md: 2 }}>
                  {myCourses.map((course) => (
                    <Paper
                      key={course.id}
                      sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: 2,
                        background: isDark
                          ? alpha("#fff", 0.03)
                          : alpha("#000", 0.02),
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: { xs: "none", md: "translateX(8px)" },
                          boxShadow: isDark
                            ? "0 8px 24px rgba(0,0,0,0.3)"
                            : "0 8px 24px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Stack 
                        direction={{ xs: "column", sm: "row" }} 
                        spacing={{ xs: 1.5, md: 2 }} 
                        alignItems={{ xs: "flex-start", sm: "flex-start" }}
                      >
                        <Avatar
                          src={course.avatar}
                          sx={{ 
                            width: { xs: 48, md: 56 }, 
                            height: { xs: 48, md: 56 } 
                          }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            sx={{ mb: 1 }}
                          >
                            <Box sx={{ flex: 1, minWidth: 0, pr: 1 }}>
                              <Typography 
                                variant="h6" 
                                fontWeight={700} 
                                gutterBottom
                                sx={{ 
                                  fontSize: { xs: "0.95rem", md: "1.1rem" },
                                  lineHeight: 1.3
                                }}
                              >
                                {course.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.8rem", md: "0.875rem" } }}
                              >
                                by {course.instructor}
                              </Typography>
                            </Box>
                            <Stack 
                              direction="row" 
                              spacing={{ xs: 0.5, md: 1 }}
                              sx={{ display: { xs: "none", sm: "flex" } }}
                            >
                              <IconButton size="small" onClick={() => handleViewCourse(course)}>
                                <Visibility fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleEditCourse(course)}>
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={() => handleDeleteCourse(course)}>
                                <Delete fontSize="small" color="error" />
                              </IconButton>
                            </Stack>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={{ xs: 1, md: 2 }}
                            alignItems="center"
                            flexWrap="wrap"
                            sx={{ mb: 2, gap: 0.5 }}
                          >
                            <Chip
                              label={course.status}
                              size="small"
                              sx={{
                                bgcolor: alpha(getStatusColor(course.status), 0.15),
                                color: getStatusColor(course.status),
                                fontWeight: 700,
                                textTransform: "capitalize",
                                fontSize: { xs: "0.7rem", md: "0.75rem" },
                                height: { xs: 22, md: 24 }
                              }}
                            />
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                            >
                              {course.students} students
                            </Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Star sx={{ fontSize: { xs: 14, md: 16 }, color: "#ffa500" }} />
                              <Typography 
                                variant="body2" 
                                fontWeight={600}
                                sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                              >
                                {course.rating}
                              </Typography>
                            </Stack>
                            <Typography 
                              variant="body2" 
                              fontWeight={700} 
                              color="primary"
                              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                            >
                              {course.revenue}
                            </Typography>
                          </Stack>

                          <Box>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              sx={{ mb: 0.5 }}
                            >
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                              >
                                Course Progress
                              </Typography>
                              <Typography 
                                variant="caption" 
                                fontWeight={700}
                                sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                              >
                                {course.progress}%
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
                                  background: `linear-gradient(90deg, ${getStatusColor(course.status)} 0%, ${alpha(getStatusColor(course.status), 0.7)} 100%)`,
                                },
                              }}
                            />
                          </Box>

                          {/* Mobile Actions */}
                          <Stack 
                            direction="row" 
                            spacing={1}
                            sx={{ display: { xs: "flex", sm: "none" }, mt: 1.5 }}
                          >
                            <Button
                              size="small"
                              startIcon={<Visibility />}
                              onClick={() => handleViewCourse(course)}
                              sx={{ flex: 1, fontSize: "0.75rem" }}
                            >
                              View
                            </Button>
                            <Button
                              size="small"
                              startIcon={<Edit />}
                              onClick={() => handleEditCourse(course)}
                              sx={{ flex: 1, fontSize: "0.75rem" }}
                            >
                              Edit
                            </Button>
                          </Stack>
                        </Box>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              {/* Team Members */}
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
                      Team Members
                    </Typography>
                    <IconButton size="small" onClick={() => setAddMemberModal(true)}>
                      <PersonAdd fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Stack spacing={{ xs: 1.5, md: 2 }}>
                    {teamMembers.map((member) => (
                      <Box
                        key={member.id}
                        onClick={() => handleViewMember(member)}
                        sx={{
                          p: { xs: 1.5, md: 2 },
                          borderRadius: 2,
                          bgcolor: isDark
                            ? alpha("#fff", 0.03)
                            : alpha("#000", 0.02),
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                          cursor: "pointer",
                          transition: "all 0.3s",
                          "&:hover": {
                            bgcolor: isDark
                              ? alpha("#fff", 0.06)
                              : alpha("#000", 0.04),
                          },
                        }}
                      >
                        <Stack direction="row" spacing={{ xs: 1.5, md: 2 }} alignItems="center">
                          <Box sx={{ position: "relative" }}>
                            <Avatar 
                              src={member.avatar}
                              sx={{ 
                                width: { xs: 36, md: 40 }, 
                                height: { xs: 36, md: 40 } 
                              }}
                            />
                            <Box
                              sx={{
                                width: { xs: 10, md: 12 },
                                height: { xs: 10, md: 12 },
                                borderRadius: "50%",
                                bgcolor: getOnlineStatusColor(member.status),
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                border: "2px solid",
                                borderColor: "background.paper",
                              }}
                            />
                          </Box>
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                              variant="body2" 
                              fontWeight={700}
                              sx={{ 
                                fontSize: { xs: "0.85rem", md: "0.875rem" },
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {member.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                            >
                              {member.role}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: "right" }}>
                            <Typography 
                              variant="caption" 
                              fontWeight={700} 
                              color="primary"
                              sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                            >
                              {member.courses} courses
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              display="block"
                              sx={{ fontSize: { xs: "0.65rem", md: "0.7rem" } }}
                            >
                              {member.students} students
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Recent Activities */}
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
                    Recent Activities
                  </Typography>
                  <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ mt: { xs: 2, md: 3 } }}>
                    {recentActivities.map((activity, index) => (
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
                          <Box sx={{ fontSize: { xs: 20, md: 24 } }}>
                            {activity.icon}
                          </Box>
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
                              {activity.message}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontSize: { xs: "0.7rem", md: "0.75rem" } }}
                            >
                              {activity.time}
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

      {/* Add Course Modal */}
      <Dialog
        open={addCourseModal}
        TransitionComponent={Transition}
        onClose={() => setAddCourseModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Add sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={700}>
              Create New Course
            </Typography>
          </Stack>
          <IconButton
            onClick={() => setAddCourseModal(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              placeholder="e.g. Advanced JavaScript"
            />
            <TextField
              fullWidth
              label="Instructor"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              placeholder="e.g. Ahmed Hassan"
            />
            <TextField
              select
              fullWidth
              label="Status"
              value={newCourse.status}
              onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="active">Active</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setAddCourseModal(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleAddCourse}
            variant="contained"
            startIcon={<Add />}
            disabled={!newCourse.title || !newCourse.instructor}
            sx={{ background: "linear-gradient(45deg, #667eea, #764ba2)" }}
          >
            Create Course
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Course Modal */}
      <Dialog
        open={viewCourseModal}
        TransitionComponent={Transition}
        onClose={() => setViewCourseModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedCourse && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight={700}>
                Course Details
              </Typography>
              <IconButton
                onClick={() => setViewCourseModal(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Avatar
                    src={selectedCourse.avatar}
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
                    {selectedCourse.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    by {selectedCourse.instructor}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedCourse.status}
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: alpha(getStatusColor(selectedCourse.status), 0.15),
                        color: getStatusColor(selectedCourse.status),
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Students
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedCourse.students} enrolled
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Rating
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
                      <Star sx={{ fontSize: 18, color: "#ffa500" }} />
                      <Typography variant="body2" fontWeight={600}>
                        {selectedCourse.rating}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Revenue
                    </Typography>
                    <Typography variant="body2" fontWeight={700} color="primary" sx={{ mt: 0.5 }}>
                      {selectedCourse.revenue}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedCourse.progress}% complete
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={() => setViewCourseModal(false)} variant="outlined">
                Close
              </Button>
              <Button
                onClick={() => {
                  setViewCourseModal(false);
                  handleEditCourse(selectedCourse);
                }}
                variant="contained"
                startIcon={<Edit />}
              >
                Edit Course
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Edit Course Modal */}
      <Dialog
        open={editCourseModal}
        TransitionComponent={Transition}
        onClose={() => setEditCourseModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedCourse && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Edit sx={{ color: "primary.main" }} />
                <Typography variant="h6" fontWeight={700}>
                  Edit Course
                </Typography>
              </Stack>
              <IconButton
                onClick={() => setEditCourseModal(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Course Title"
                  value={selectedCourse.title}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="Instructor"
                  value={selectedCourse.instructor}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, instructor: e.target.value })}
                />
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={selectedCourse.status}
                  onChange={(e) => setSelectedCourse({ ...selectedCourse, status: e.target.value })}
                >
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="review">Review</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                </TextField>
              </Stack>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={() => setEditCourseModal(false)} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={handleSaveCourseEdit}
                variant="contained"
                startIcon={<SaveAlt />}
                sx={{ background: "linear-gradient(45deg, #667eea, #764ba2)" }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Course Modal */}
      <Dialog
        open={deleteCourseModal}
        TransitionComponent={Transition}
        onClose={() => setDeleteCourseModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedCourse && (
          <>
            <DialogTitle>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Warning sx={{ color: "error.main", fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} color="error">
                  Delete Course
                </Typography>
              </Stack>
            </DialogTitle>
            
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to delete this course?
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
                  <Avatar src={selectedCourse.avatar} />
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      {selectedCourse.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      by {selectedCourse.instructor}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                This action cannot be undone. All course data will be permanently deleted.
              </Typography>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={() => setDeleteCourseModal(false)} variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDeleteCourse}
                variant="contained"
                color="error"
                startIcon={<Delete />}
              >
                Delete Course
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Add Team Member Modal */}
      <Dialog
        open={addMemberModal}
        TransitionComponent={Transition}
        onClose={() => setAddMemberModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonAdd sx={{ color: "primary.main" }} />
            <Typography variant="h6" fontWeight={700}>
              Add Team Member
            </Typography>
          </Stack>
          <IconButton
            onClick={() => setAddMemberModal(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="e.g. Sara Mohamed"
            />
            <TextField
              select
              fullWidth
              label="Role"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
            >
              <MenuItem value="Lead Instructor">Lead Instructor</MenuItem>
              <MenuItem value="Content Creator">Content Creator</MenuItem>
              <MenuItem value="Technical Instructor">Technical Instructor</MenuItem>
              <MenuItem value="Design Instructor">Design Instructor</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setAddMemberModal(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleAddMember}
            variant="contained"
            startIcon={<PersonAdd />}
            disabled={!newMember.name}
            sx={{ background: "linear-gradient(45deg, #667eea, #764ba2)" }}
          >
            Add Member
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Team Member Modal */}
      <Dialog
        open={viewMemberModal}
        TransitionComponent={Transition}
        onClose={() => setViewMemberModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedMember && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight={700}>
                Team Member Details
              </Typography>
              <IconButton
                onClick={() => setViewMemberModal(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      src={selectedMember.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                        mx: "auto",
                        mb: 2,
                        border: "4px solid",
                        borderColor: "primary.main",
                      }}
                    />
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        bgcolor: getOnlineStatusColor(selectedMember.status),
                        position: "absolute",
                        bottom: 16,
                        right: 0,
                        border: "3px solid",
                        borderColor: "background.paper",
                      }}
                    />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    {selectedMember.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedMember.role}
                  </Typography>
                </Box>
                
                <Divider />
                
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Chip
                      label={selectedMember.status}
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: alpha(getOnlineStatusColor(selectedMember.status), 0.15),
                        color: getOnlineStatusColor(selectedMember.status),
                        fontWeight: 700,
                        textTransform: "capitalize",
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Courses
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedMember.courses} courses
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Students
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {selectedMember.students} students
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button onClick={() => setViewMemberModal(false)} variant="contained">
                Close
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
        PaperProps={{ sx: { borderRadius: 4 } }}
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

export default ManagerSection;