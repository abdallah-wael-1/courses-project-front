import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  AvatarGroup,
  Chip,
  Rating,
  Stack,
  Paper,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  TrendingUp,
  ArrowForward,
  People,
  School,
  EmojiEvents,
  ShowChart,
  Code,
  Palette,
  Psychology,
  BusinessCenter,
  Bolt,
  WorkspacePremium,
  Groups,
  AllInclusive,
  AutoAwesome,
  AccessTime,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import { useState, useEffect } from "react";
import { getAllCourses } from "../api/coursesApi";
import { getImageUrl } from "../utility/image";

// DATA //
const stats = [
  { icon: People, value: "850K+", label: "Active Learners", color: "#6366f1" },
  { icon: School, value: "15K+", label: "Expert Courses", color: "#a855f7" },
  {
    icon: EmojiEvents,
    value: "8K+",
    label: "Top Instructors",
    color: "#6366f1",
  },
  { icon: ShowChart, value: "98%", label: "Success Rate", color: "#a855f7" },
  {
    icon: WorkspacePremium,
    value: "12K+",
    label: "Certificates Issued",
    color: "#ec4899",
  },
];

const categories = [
  {
    icon: Code,
    name: "Programming",
    courses: "2,450",
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.1)",
  },
  {
    icon: Palette,
    name: "Design",
    courses: "1,230",
    color: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
  },
  {
    icon: Psychology,
    name: "AI & ML",
    courses: "890",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.1)",
  },
  {
    icon: BusinessCenter,
    name: "Business",
    courses: "1,650",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
  },
  {
    icon: School,
    name: "Marketing",
    courses: "1,120",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
  },
  {
    icon: ShowChart,
    name: "Data Science",
    courses: "980",
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.1)",
  },
  {
    icon: EmojiEvents,
    name: "Photography",
    courses: "650",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.1)",
  },
  {
    icon: WorkspacePremium,
    name: "Finance",
    courses: "780",
    color: "#14b8a6",
    bgColor: "rgba(20, 184, 166, 0.1)",
  },
];

const features = [
  {
    icon: Bolt,
    title: "Self-Paced Learning",
    description: "Study whenever and wherever works best for you",
    color: "#6366f1",
    bgColor: "rgba(99, 102, 241, 0.1)",
  },
  {
    icon: WorkspacePremium,
    title: "Industry Certificates",
    description: "Boost your career with recognized credentials",
    color: "#ec4899",
    bgColor: "rgba(236, 72, 153, 0.1)",
  },
  {
    icon: Groups,
    title: "Expert Mentorship",
    description: "Learn directly from industry leaders",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.1)",
  },
  {
    icon: AllInclusive,
    title: "Lifetime Access",
    description: "Get unlimited access to course materials",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.1)",
  },
  {
    icon: AutoAwesome,
    title: "Interactive Learning",
    description: "Hands-on projects and real-world case studies",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.1)",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics",
    color: "#8b5cf6",
    bgColor: "rgba(139, 92, 246, 0.1)",
  },
];

// COMPONENTS //
const HeroSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12, lg: 10 },
        position: "relative",
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
          : "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: 384,
          height: 384,

          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          right: "25%",
          width: 320,
          height: 320,
          // bgcolor: 'rgba(255,255,255,0.1)',
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
              <Chip
                icon={<TrendingUp sx={{ color: "white !important" }} />}
                label="Trusted by 850K+ Learners"
                sx={{
                  mb: 3,
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  backdropFilter: "blur(10px)",
                  px: 2,
                  py: 2.5,
                  "& .MuiChip-label": { fontSize: "0.875rem", fontWeight: 500 },
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    lg: "3.75rem",
                    xl: "4.5rem",
                  },
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.1,
                  mb: 3,
                }}
              >
                Transform Your Future With Expert Knowledge
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  mb: 4,
                  maxWidth: 560,
                  mx: { xs: "auto", lg: 0 },
                  fontWeight: 400,
                }}
              >
                Access world-class courses from industry experts. Learn at your
                own pace and achieve your career goals.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent={{ xs: "center", lg: "flex-start" }}
                sx={{ mb: 4 }}
              >
                <Button
                  href="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "white",
                    color: "#6366f1",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    px: 4,
                    py: 1.5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Start Learning Free
                </Button>
                <Button
                  href="/courses"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    borderWidth: 2,
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    px: 4,
                    py: 1.5,
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Explore Courses
                </Button>
              </Stack>
              {/* Social proof */}
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={{ xs: "center", lg: "flex-start" }}
              >
                <AvatarGroup max={4}>
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar
                      key={i}
                      src={`https://i.pravatar.cc/150?img=${i}`}
                      sx={{ width: 40, height: 40, border: "2px solid white" }}
                    />
                  ))}
                </AvatarGroup>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <People sx={{ color: "white", fontSize: 20 }} />
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    Join 850K+ happy learners
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          {/* Right Image */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
                  borderRadius: 4,
                  transform: "rotate(3deg) scale(1.05)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  borderRadius: 6,
                  filter: "blur(60px)",
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Students Learning"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  borderRadius: 4,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                  objectFit: "cover",
                  aspectRatio: "4/3",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const StatsSection = () => (
  <Container
    maxWidth="lg"
    sx={{
      mt: { xs: -4, md: -6 },
      position: "relative",
      zIndex: 10,
      mb: { xs: 6, md: 10 },
    }}
  >
    <Paper
      elevation={6}
      sx={{
        p: { xs: 2.5, sm: 3, md: 5 },
        borderRadius: 4,
        backdropFilter: "blur(10px)",
      }}
    >
      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
            <Box
              sx={{
                px: { xs: 2, md: 3 },
                textAlign: "center",
                py: { xs: 2, md: 3 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
                "&:hover .stat-icon": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Box
                className="stat-icon"
                sx={{
                  display: "inline-flex",
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "rgba(99, 102, 241, 0.1)",
                  mb: 2,
                  transition: "transform 0.3s",
                }}
              >
                <stat.icon sx={{ fontSize: 32, color: stat.color }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 400, mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography color="text.secondary" fontWeight={500}>
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  </Container>
);
const CategoriesSection = () => {
  return (
    <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 12 } }}>
      <SectionTitle
        title="Explore Top Categories"
        subtitle="Find the perfect course to advance your skills"
      />
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: { xs: 1.8, sm: 2.5, md: 3 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 6,
                  borderColor: category.color,
                  "& .category-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <Box
                className="category-icon"
                sx={{
                  width: { xs: 56, sm: 60, md: 64 },
                  height: { xs: 56, sm: 60, md: 64 },
                  borderRadius: "50%",
                  bgcolor: category.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: { xs: 1.5, md: 2 },
                  transition: "transform 0.3s",
                }}
              >
                <category.icon
                  sx={{
                    fontSize: { xs: 28, sm: 30, md: 32 },
                    color: category.color,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                  mb: 0.5,
                  fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                }}
              >
                {category.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.875rem" },
                }}
              >
                {category.courses} courses
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const CoursesSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('📤 Home.jsx - Fetching courses...');
        
        const result = await getAllCourses({ limit: 6, sort: "-createdAt" });
        
        console.log('📦 Home.jsx - Result:', result);

        if (result && result.success) {
          const coursesData = result.data?.data?.courses || [];
          
          
          setCourses(Array.isArray(coursesData) ? coursesData : []);
        } else {
          setCourses([]);
          setError(result?.message || "Failed to load courses");
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError("Something went wrong");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mb: { xs: 8, md: 12 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 6 }}
      >
        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: "2rem", md: "2.75rem", lg: "3.25rem" },
              background: isDark
                ? "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%)"
                : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Featured Courses
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "text.secondary",
            }}
          >
            Start your learning journey with top-rated courses
          </Typography>
        </Box>
        <Button
          href="/courses"
          variant="outlined"
          endIcon={<ArrowForward />}
          sx={{
            borderColor: isDark ? "#a78bfa" : "#6366f1",
            color: isDark ? "#a78bfa" : "#6366f1",
            "&:hover": {
              borderColor: isDark ? "#a78bfa" : "#6366f1",
              bgcolor: isDark
                ? "rgba(167, 139, 250, 0.1)"
                : "rgba(99, 102, 241, 0.05)",
              "& .MuiSvgIcon-root": { transform: "translateX(4px)" },
            },
            "& .MuiSvgIcon-root": { transition: "transform 0.3s" },
          }}
        >
          View All Courses
        </Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : courses.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No courses available yet. Check back soon!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course._id || course.id}>
              <Card
                sx={{
                  width: "340px",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                  "&:hover .course-image": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden" }}>
                  <CardMedia
                    component="img"
                    height="192"
                    image={getImageUrl(course.thumbnail)}
                    alt={course.title}
                    className="course-image"
                    sx={{ transition: "transform 0.5s" }}
                  />
                  <Chip
                    label={
                      course.category ||
                      (course.tags && course.tags[0]) ||
                      "General"
                    }
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      bgcolor: isDark ? "#8b5cf6" : "#6366f1",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label={course.level || "All Levels"}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      bgcolor: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      color: "#000",
                    }}
                  />
                </Box>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      mb: 1.5,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Avatar
                      src={`https://i.pravatar.cc/150?u=${course.instructor || "instructor"}`}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {course.instructor?.name ||
                        course.instructor ||
                        "Instructor"}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Rating
                        value={Number(course.rating) || 0}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography variant="body2" fontWeight={500}>
                        {course.rating || 0}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <People sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {course.studentsCount || course.students || 0}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AccessTime
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {course.duration || 0}h
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{ p: 2.5, pt: 0, justifyContent: "space-between" }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#a78bfa" : "#6366f1",
                    }}
                  >
                    ${course.price || 0}
                  </Typography>
                  <Button
                    component={Link}
                    to="/courses"
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: isDark ? "#8b5cf6" : "#6366f1",
                      fontWeight: 600,
                    }}
                  >
                    Enroll Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
const FeaturesSection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        mb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          title="Why Choose Us"
          subtitle="Experience the best online learning platform designed for your success"
        />
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: { xs: 2.5, sm: 3, md: 3.5 },
                  height: "100%",
                  width: "350px",
                  display: "flex",
                  flexDirection: "column",
                  minHeight: { xs: 200, sm: 220, md: 240 },
                  transition: "all 0.3s",
                  border: "2px solid transparent",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: isDark ? 8 : 6,
                    borderColor: feature.color,
                  },
                  "&:hover .feature-icon": {
                    transform: "scale(1.15) rotate(5deg)",
                    bgcolor: feature.color,
                  },
                  "&:hover .feature-icon-svg": {
                    color: "white !important",
                  },
                }}
              >
                <Box
                  className="feature-icon"
                  sx={{
                    width: { xs: 60, sm: 64, md: 70 },
                    height: { xs: 60, sm: 64, md: 70 },
                    borderRadius: 3,
                    bgcolor: feature.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5,
                    transition: "all 0.4s",
                  }}
                >
                  <feature.icon
                    className="feature-icon-svg"
                    sx={{
                      fontSize: { xs: 30, sm: 32, md: 36 },
                      color: feature.color,
                      transition: "color 0.4s",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    mb: 1.5,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.875rem" },
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
const CTASection = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Container maxWidth="lg" sx={{ mb: { xs: 10, md: 14 } }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Box
          sx={{
            background: isDark
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
              : "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            borderRadius: 5,
            p: { xs: 5, md: 10 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decorations */}
          <Box
            sx={{
              position: "absolute",
              top: "-50%",
              left: "-25%",
              width: 400,
              height: 400,
              bgcolor: "rgba(255,255,255,0.12)",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-50%",
              right: "-25%",
              width: 350,
              height: 350,
              bgcolor: "rgba(255,255,255,0.12)",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
          />

          <Box
            sx={{ position: "relative", zIndex: 1, maxWidth: 800, mx: "auto" }}
          >
            <Chip
              icon={<AutoAwesome sx={{ color: "white !important" }} />}
              label="Start your journey today"
              sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                backdropFilter: "blur(10px)",
                px: 2.5,
                py: 3,
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "white",
                mb: 3,
                fontSize: { xs: "2rem", md: "2.75rem", lg: "3.5rem" },
              }}
            >
              Ready to Transform Your Career?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.95)",
                mb: 5,
                maxWidth: 650,
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              Join millions of learners and start building the skills you need
              to succeed in today's competitive job market.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent="center"
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "white",
                  color: "#6366f1",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  px: 6,
                  py: 2.2,
                  borderRadius: 3,
                  textTransform: "none",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.95)",
                    transform: "translateY(-4px)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
                  },
                  transition: "all 0.4s ease",
                }}
              >
                Get Started Free
              </Button>
              <Button
                component={Link}
                to="/courses"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  borderWidth: 2,
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  px: 6,
                  py: 2.2,
                  borderRadius: 3,
                  textTransform: "none",
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.2)",
                    transform: "translateY(-4px)",
                  },
                  transition: "all 0.4s ease",
                }}
              >
                Browse Courses
              </Button>
            </Stack>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

const Home = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ bgcolor: isDark ? "background.default" : "#fafafa" }}>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <CoursesSection />
      <FeaturesSection />
      <CTASection />
    </Box>
  );
};

export default Home;
