// src/pages/UserSection.jsx - COMPLETE VERSION
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  alpha,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Paper,
  CircularProgress,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Person,
  MenuBook,
  EmojiEvents,
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Schedule,
  Star,
  ArrowForward,
  Timer,
  Refresh,
  Download,
} from "@mui/icons-material";

import { getUserDashboard } from "../../api/userApi";
import { getImageUrl } from "../../utility/image";
import CourseViewerModal from "../../components/Courses/CourseViewerModal";

function UserSection() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme.palette.mode === "dark";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Modal states
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const fetchDashboard = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    const result = await getUserDashboard();
    
    if (result.success) {
      setDashboardData(result.data);
      setError("");
    } else {
      setError(result.message);
    }
    
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, [location.key]); 

  // Handle course click
  const handleContinueCourse = (course) => {
    setSelectedCourse(course);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
    setSelectedCourse(null);
  };

  const handleProgressUpdate = () => {
    fetchDashboard(true); // Refresh with indicator
  };

  // Handle manual refresh
  const handleRefresh = () => {
    fetchDashboard(true);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="body1" color="text.secondary">
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert 
          severity="error" 
          onClose={() => setError("")}
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  // Stats from API
  const stats = [
    {
      title: "Courses Enrolled",
      value: dashboardData?.stats.totalEnrolled || 0,
      icon: <MenuBook />,
      color: "#667eea",
      subtitle: "Active enrollments"
    },
    {
      title: "Completed",
      value: dashboardData?.stats.completed || 0,
      icon: <CheckCircle />,
      color: "#43e97b",
      subtitle: "Finished courses"
    },
    {
      title: "Certificates",
      value: dashboardData?.stats.certificates || 0,
      icon: <EmojiEvents />,
      color: "#f093fb",
      subtitle: "Earned certificates"
    },
    {
      title: "Learning Hours",
      value: dashboardData?.stats.totalHours || 0,
      icon: <TrendingUp />,
      color: "#4facfe",
      subtitle: "Total study time"
    },
  ];

  // Enrolled courses from API
  const enrolledCourses = dashboardData?.enrollments?.map(enrollment => ({
    id: enrollment.courseId,
    title: enrollment.title,
    instructor: enrollment.instructor,
    image: getImageUrl(enrollment.thumbnail),
    progress: enrollment.progress,
    totalLessons: enrollment.totalLessons || 30,
    completedLessons: enrollment.completedLessons,
    rating: enrollment.rating,
    category: enrollment.category,
    duration: enrollment.duration,
    status: enrollment.status,
    lastAccessed: new Date(enrollment.lastAccessed).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
  })) || [];

  // Achievements with real data
  const achievements = [
    {
      title: "Fast Learner",
      description: "Complete 5 courses",
      icon: "🚀",
      earned: (dashboardData?.stats.completed || 0) >= 5,
      progress: `${Math.min(dashboardData?.stats.completed || 0, 5)}/5`
    },
    {
      title: "Dedicated Student",
      description: "Enroll in 3+ courses",
      icon: "🎯",
      earned: (dashboardData?.stats.totalEnrolled || 0) >= 3,
      progress: `${Math.min(dashboardData?.stats.totalEnrolled || 0, 3)}/3`
    },
    {
      title: "Top Performer",
      description: "Complete a course",
      icon: "⭐",
      earned: (dashboardData?.stats.certificates || 0) >= 1,
      progress: `${Math.min(dashboardData?.stats.certificates || 0, 1)}/1`
    },
    {
      title: "Course Master",
      description: "Complete 10 courses",
      icon: "🏆",
      earned: (dashboardData?.stats.completed || 0) >= 10,
      progress: `${Math.min(dashboardData?.stats.completed || 0, 10)}/10`
    },
  ];

  // Active courses (not completed)
  const activeCourses = enrolledCourses.filter(c => c.status !== 'completed');
  const upcomingDeadlines = activeCourses.slice(0, 3).map((course, index) => ({
    course: course.title,
    task: "Complete Course",
    progress: course.progress,
    dueDate: index === 0 ? "2 days" : index === 1 ? "1 week" : "2 weeks",
    priority: course.progress < 30 ? "high" : course.progress < 70 ? "medium" : "low",
  }));

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ff6b6b";
      case "medium": return "#ffa500";
      case "low": return "#43e97b";
      default: return "#ccc";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
          >
            <Box>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Person sx={{ fontSize: 40, color: "primary.main" }} />
                <Box>
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      background: isDark
                        ? "linear-gradient(135deg, #fff 0%, #ccc 100%)"
                        : "linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    My Learning Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Welcome back! Continue your learning journey.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Stack direction="row" spacing={2}>
              <Tooltip title="Refresh dashboard">
                <IconButton 
                  onClick={handleRefresh}
                  disabled={refreshing}
                  sx={{ 
                    bgcolor: 'action.hover',
                    '&:hover': { bgcolor: 'action.selected' }
                  }}
                >
                  <Refresh sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                </IconButton>
              </Tooltip>
              
              {enrolledCourses.length > 0 && (
                <Button
                  variant="contained"
                  startIcon={<PlayCircle />}
                  onClick={() => handleContinueCourse(enrolledCourses[0])}
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                    },
                  }}
                >
                  Continue Learning
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={6} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
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
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.7)} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        boxShadow: `0 8px 24px ${alpha(stat.color, 0.4)}`,
                      }}
                    >
                      <Box sx={{ color: "white", fontSize: 24 }}>{stat.icon}</Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.subtitle}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Enrolled Courses */}
          <Grid item xs={12} lg={8}>
            <Card
              sx={{
                borderRadius: 3,
                background: isDark
                  ? alpha(theme.palette.background.paper, 0.6)
                  : "white",
                border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
                mb: 4,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {enrolledCourses.length > 0 ? "Continue Learning" : "No Courses Yet"}
                  </Typography>
                  {enrolledCourses.length > 0 && (
                    <Button 
                      size="small" 
                      endIcon={<ArrowForward />} 
                      sx={{ fontWeight: 600 }}
                      onClick={() => navigate('/courses')}
                    >
                      Browse More
                    </Button>
                  )}
                </Stack>

                {enrolledCourses.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <MenuBook sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      You haven't enrolled in any courses yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Start your learning journey by exploring our courses
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate('/courses')}
                      sx={{ mt: 2 }}
                    >
                      Browse Courses
                    </Button>
                  </Box>
                ) : (
                  <Stack spacing={3}>
                    {enrolledCourses.map((course) => (
                      <Paper
                        key={course.id}
                        sx={{
                          borderRadius: 3,
                          overflow: "hidden",
                          background: isDark
                            ? alpha("#fff", 0.03)
                            : alpha("#000", 0.02),
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                          transition: "all 0.3s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: isDark
                              ? "0 12px 32px rgba(0,0,0,0.4)"
                              : "0 12px 32px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Stack direction={{ xs: "column", sm: "row" }}>
                          <Box
                            sx={{
                              width: { xs: "100%", sm: 200 },
                              height: { xs: 150, sm: 180 },
                              position: "relative",
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={course.image}
                              alt={course.title}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <Chip
                              label={course.category}
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 12,
                                color: "#000",
                                left: 12,
                                bgcolor: "white",
                                fontWeight: 700,
                                fontSize: "0.7rem",
                              }}
                            />
                            {course.status === 'completed' && (
                              <Chip
                                icon={<CheckCircle sx={{ fontSize: 16 }} />}
                                label="Completed"
                                size="small"
                                color="success"
                                sx={{
                                  position: "absolute",
                                  bottom: 12,
                                  left: 12,
                                  fontWeight: 700,
                                  fontSize: "0.7rem",
                                }}
                              />
                            )}
                          </Box>

                          <Box sx={{ p: 3, flex: 1 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                              {course.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              by {course.instructor}
                            </Typography>

                            <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <Star sx={{ fontSize: 16, color: "#ffa500" }} />
                                <Typography variant="body2" fontWeight={600}>
                                  {course.rating}
                                </Typography>
                              </Stack>
                              <Typography variant="body2" color="text.secondary">
                                {course.completedLessons}/{course.totalLessons} lessons
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Last: {course.lastAccessed}
                              </Typography>
                            </Stack>

                            <Box sx={{ mb: 2 }}>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                sx={{ mb: 0.5 }}
                              >
                                <Typography variant="caption" color="text.secondary">
                                  Progress
                                </Typography>
                                <Typography variant="caption" fontWeight={700} color="primary">
                                  {course.progress}%
                                </Typography>
                              </Stack>
                              <LinearProgress
                                variant="determinate"
                                value={course.progress}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  bgcolor: isDark
                                    ? alpha("#fff", 0.1)
                                    : alpha("#000", 0.05),
                                  "& .MuiLinearProgress-bar": {
                                    borderRadius: 4,
                                    background: course.progress >= 100
                                      ? "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)"
                                      : "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                                  },
                                }}
                              />
                            </Box>

                            <Button
                              variant="contained"
                              size="small"
                              startIcon={course.status === 'completed' ? <Download /> : <PlayCircle />}
                              onClick={() => handleContinueCourse(course)}
                              sx={{
                                background: course.status === 'completed'
                                  ? "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                fontWeight: 700,
                                "&:hover": {
                                  background: course.status === 'completed'
                                    ? "linear-gradient(135deg, #38f9d7 0%, #43e97b 100%)"
                                    : "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                                },
                              }}
                            >
                              {course.status === 'completed' ? 'View Certificate' : 'Continue Course'}
                            </Button>
                          </Box>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card
              sx={{
                borderRadius: 3,
                background: isDark
                  ? alpha(theme.palette.background.paper, 0.6)
                  : "white",
                border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Achievements
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {achievements.map((achievement, index) => (
                    <Grid item xs={6} sm={6} md={3} key={index}>
                      <Paper
                        sx={{
                          p: 2,
                          textAlign: "center",
                          borderRadius: 2,
                          background: isDark
                            ? alpha("#fff", 0.03)
                            : alpha("#000", 0.02),
                          border: achievement.earned
                            ? `2px solid #43e97b`
                            : `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                          opacity: achievement.earned ? 1 : 0.6,
                          filter: achievement.earned ? "none" : "grayscale(1)",
                          transition: "all 0.3s",
                          "&:hover": {
                            transform: achievement.earned ? "scale(1.05)" : "none",
                          },
                        }}
                      >
                        <Typography variant="h2" sx={{ mb: 1 }}>
                          {achievement.icon}
                        </Typography>
                        <Typography variant="body2" fontWeight={700} gutterBottom>
                          {achievement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                          {achievement.description}
                        </Typography>
                        <Chip 
                          label={achievement.progress}
                          size="small"
                          color={achievement.earned ? "success" : "default"}
                          sx={{ mt: 1, fontWeight: 600, fontSize: '0.7rem' }}
                        />
                        {achievement.earned && (
                          <CheckCircle
                            sx={{
                              fontSize: 20,
                              color: "#43e97b",
                              mt: 1,
                            }}
                          />
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Upcoming Deadlines */}
              {upcomingDeadlines.length > 0 && (
                <Card
                  sx={{
                    borderRadius: 3,
                    background: isDark
                      ? alpha(theme.palette.background.paper, 0.6)
                      : "white",
                    border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                      <Schedule sx={{ color: "primary.main" }} />
                      <Typography variant="h6" fontWeight={700}>
                        Active Courses
                      </Typography>
                    </Stack>
                    <Stack spacing={2}>
                      {upcomingDeadlines.map((deadline, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: isDark
                              ? alpha("#fff", 0.03)
                              : alpha("#000", 0.02),
                            border: `2px solid ${alpha(getPriorityColor(deadline.priority), 0.3)}`,
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                            <Chip
                              label={deadline.priority}
                              size="small"
                              sx={{
                                bgcolor: alpha(getPriorityColor(deadline.priority), 0.15),
                                color: getPriorityColor(deadline.priority),
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                textTransform: "capitalize",
                              }}
                            />
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <Timer sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">
                                {deadline.dueDate}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Typography variant="body2" fontWeight={700} gutterBottom>
                            {deadline.task}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            {deadline.course}
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={deadline.progress}
                            sx={{ 
                              height: 6, 
                              borderRadius: 3,
                              bgcolor: alpha("#000", 0.1),
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getPriorityColor(deadline.priority)
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              )}

              {/* Learning Goals */}
              <Card
                sx={{
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Monthly Goal
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                    Complete {dashboardData?.monthlyGoal?.target || 3} courses this month
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography variant="caption">Progress</Typography>
                      <Typography variant="caption" fontWeight={700}>
                        {dashboardData?.monthlyGoal?.completed || 0}/{dashboardData?.monthlyGoal?.target || 3} Completed
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={dashboardData?.monthlyGoal?.progress || 0}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: alpha("#fff", 0.2),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          bgcolor: "white",
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {(dashboardData?.monthlyGoal?.progress || 0) >= 100 
                      ? "🎉 Goal achieved! Fantastic work!" 
                      : "You're doing great! Keep it up!"}
                  </Typography>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card
                sx={{
                  borderRadius: 3,
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.6)
                    : "white",
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Quick Actions
                  </Typography>
                  <Stack spacing={1.5} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<MenuBook />}
                      fullWidth
                      onClick={() => navigate('/courses')}
                      sx={{ justifyContent: "flex-start", fontWeight: 600 }}
                    >
                      Browse Courses
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<EmojiEvents />}
                      fullWidth
                      sx={{ justifyContent: "flex-start", fontWeight: 600 }}
                    >
                      My Certificates ({dashboardData?.stats.certificates || 0})
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Person />}
                      fullWidth
                      onClick={() => navigate('/profile')}
                      sx={{ justifyContent: "flex-start", fontWeight: 600 }}
                    >
                      Edit Profile
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Course Viewer Modal */}
      <CourseViewerModal
        open={viewerOpen}
        onClose={handleCloseViewer}
        course={selectedCourse}
        onProgressUpdate={handleProgressUpdate}
      />
      
      {/* CSS for spin animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
}

export default UserSection;