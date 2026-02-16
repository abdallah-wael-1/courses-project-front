import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  Avatar,
  Stack,
  useTheme,
  alpha,
  Chip,
  IconButton,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import {
  AutoStories,
  Lightbulb,
  Verified,
  EmojiEvents,
  TrendingUp,
  Speed,
  Groups,
  ArrowForward,
  LinkedIn,
  GitHub,
  Language,
  School,
  Psychology,
  Rocket,
  Security,
  Public,
  Star,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const missionPoints = [
    {
      icon: <AutoStories />,
      title: "Accessible Education",
      description:
        "Breaking barriers to world-class learning, making quality education available to everyone, everywhere.",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: <Lightbulb />,
      title: "Future-Ready Skills",
      description:
        "Industry-aligned courses designed by experts to prepare you for tomorrow's challenges.",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: <Verified />,
      title: "Certified Excellence",
      description:
        "Earn recognized credentials that open doors and advance your professional journey.",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Ahmed",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Visionary leader with 10+ years building education technology platforms.",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        website: "https://example.com",
      },
    },
    {
      name: "Mohamed Khaled",
      role: "Head of Content",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      bio: "Former senior instructor at top coding bootcamps worldwide.",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        website: "https://example.com",
      },
    },
    {
      name: "Lina Mourad",
      role: "Lead Learning Designer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      bio: "Expert in creating engaging and effective learning experiences.",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        website: "https://example.com",
      },
    },
    {
      name: "Ahmed Hassan",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      bio: "Technology innovator specializing in scalable learning platforms.",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        website: "https://example.com",
      },
    },
  ];

  const stats = [
    {
      value: "850K+",
      label: "Active Learners",
      icon: <Groups />,
      color: "#667eea",
    },
    {
      value: "15K+",
      label: "Expert Courses",
      icon: <AutoStories />,
      color: "#f093fb",
    },
    {
      value: "195+",
      label: "Countries Reached",
      icon: <Public />,
      color: "#4facfe",
    },
    {
      value: "4.9/5",
      label: "Average Rating",
      icon: <Star />,
      color: "#43e97b",
    },
  ];

  const values = [
    {
      icon: <Speed />,
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge technology",
      color: "#667eea",
    },
    {
      icon: <Groups />,
      title: "Community",
      description: "Building a supportive global network of learners and mentors",
      color: "#f093fb",
    },
    {
      icon: <EmojiEvents />,
      title: "Excellence",
      description: "Maintaining the highest standards in education quality",
      color: "#4facfe",
    },
    {
      icon: <TrendingUp />,
      title: "Growth",
      description: "Empowering continuous personal and professional development",
      color: "#43e97b",
    },
  ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box sx={{ bgcolor: "background.default", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 10, sm: 12, md: 16, lg: 13  },
          background: isDark
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark
              ? "radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(240, 147, 251, 0.15) 0%, transparent 50%)"
              : "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <Chip
                label="About Us"
                sx={{
                  mb: { xs: 2, md: 3 },
                  bgcolor: alpha("#fff", 0.2),
                  color: "white",
                  fontWeight: 700,
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  px: { xs: 2, md: 3 },
                  py: { xs: 2, md: 2.5 },
                }}
              />
              <Typography
                variant="h1"
                fontWeight={800}
                sx={{
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem", lg: "4.5rem" },
                  mb: { xs: 2, md: 3 },
                  lineHeight: 1.1,
                  color: "white",
                  px: { xs: 2, sm: 0 },
                }}
              >
                Transforming Lives Through
                <br />
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #fff, rgba(255,255,255,0.8))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Quality Education
                </Box>
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  maxWidth: { xs: "100%", md: 800 },
                  mx: "auto",
                  mb: { xs: 4, md: 5 },
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                  px: { xs: 2, sm: 3, md: 0 },
                }}
              >
                We're on a mission to democratize world-class education, making it accessible,
                affordable, and practical for ambitious learners worldwide.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                sx={{ px: { xs: 2, sm: 0 } }}
              >
                <Button
                  component={Link}
                  to="/courses"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "white",
                    color: "#667eea",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 700,
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    "&:hover": {
                      bgcolor: "#f8f8f8",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Explore Courses
                </Button>

                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 700,
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    borderWidth: 2,
                    backdropFilter: "blur(10px)",
                    bgcolor: alpha("#fff", 0.1),
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: alpha("#fff", 0.2),
                      transform: "translateY(-4px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {stats.map((stat, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    textAlign: "center",
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
                  <Box
                    sx={{
                      width: { xs: 50, md: 60 },
                      height: { xs: 50, md: 60 },
                      borderRadius: "50%",
                      bgcolor: alpha(stat.color, 0.15),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: { xs: 1.5, md: 2 },
                    }}
                  >
                    <Box sx={{ color: stat.color, fontSize: { xs: 24, md: 28 } }}>
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography
                    variant="h3"
                    fontWeight={900}
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                      background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(
                        stat.color,
                        0.7
                      )} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: { xs: 0.5, md: 1 },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ fontSize: { xs: "0.85rem", md: "1rem" } }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                label="Our Mission"
                sx={{
                  mb: { xs: 2, md: 3 },
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: { xs: "0.8rem", md: "0.9rem" },
                }}
              />
              <Typography
                variant="h2"
                fontWeight={800}
                gutterBottom
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
                  background: isDark
                    ? "linear-gradient(135deg, #fff 0%, #ccc 100%)"
                    : "linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: { xs: 2, md: 3 },
                }}
              >
                Empowering Every Learner
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  lineHeight: 1.8,
                  mb: { xs: 2, md: 3 },
                }}
              >
                We believe education is the key to unlocking human potential. Our platform
                breaks down traditional barriers, offering accessible, high-quality learning
                experiences that prepare you for real-world success.
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  lineHeight: 1.8,
                }}
              >
                Whether you're starting your career, switching fields, or advancing your
                expertise, we're here to support your journey with expert-led courses and a
                global community.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "-5%",
                    left: "-5%",
                    width: "110%",
                    height: "110%",
                    background: isDark
                      ? "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(240, 147, 251, 0.2) 100%)"
                      : "linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(240, 147, 251, 0.15) 100%)",
                    borderRadius: { xs: 3, md: 4 },
                    transform: "rotate(-3deg)",
                    zIndex: 0,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                  alt="Team collaboration"
                  sx={{
                    width: "100%",
                    borderRadius: { xs: 3, md: 4 },
                    boxShadow: isDark
                      ? "0 25px 80px rgba(0,0,0,0.6)"
                      : "0 25px 80px rgba(0,0,0,0.2)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Core Values */}
      <Box
        sx={{
          py: { xs: 6, md: 12 },
          background: isDark
            ? alpha(theme.palette.background.paper, 0.4)
            : alpha(theme.palette.grey[50], 0.5),
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
                    <SectionTitle 
                      title="What Drives Us"
                      subtitle= "Our core values shape everything we do"
                    />
            </Box>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {missionPoints.map((point, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        height: "100%",
                        p: { xs: 3, md: 4 },
                        borderRadius: { xs: 2, md: 3 },
                        background: isDark
                          ? alpha(theme.palette.background.paper, 0.6)
                          : "white",
                        border: isDark
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "1px solid rgba(0,0,0,0.05)",
                        transition: "all 0.4s",
                        "&:hover": {
                          transform: "translateY(-12px)",
                          boxShadow: isDark
                            ? "0 20px 60px rgba(0,0,0,0.6)"
                            : "0 20px 60px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 70, md: 80 },
                          height: { xs: 70, md: 80 },
                          borderRadius: "50%",
                          background: point.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: { xs: 2, md: 3 },
                          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                        }}
                      >
                        <Box sx={{ color: "white", fontSize: { xs: 32, md: 36 } }}>
                          {point.icon}
                        </Box>
                      </Box>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        gutterBottom
                        sx={{
                          mb: { xs: 1.5, md: 2 },
                          fontSize: { xs: "1.15rem", md: "1.35rem" },
                        }}
                      >
                        {point.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.8,
                          fontSize: { xs: "0.95rem", md: "1rem" },
                        }}
                      >
                        {point.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      
      {/* Our Values */}
      <Box sx={{ py: { xs: 6, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <SectionTitle 
              title="Our Core Values"  
              subtitle="The principles that guide our mission every day"
            />
          </Box>

          <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
            {values.map((value, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      p: { xs: 3.5, md: 4.5 },
                      borderRadius: { xs: 3, md: 4 },
                      background: isDark
                        ? alpha(theme.palette.background.paper, 0.6)
                        : "white",
                      border: `2px solid ${alpha(value.color, 0.15)}`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: `linear-gradient(90deg, ${value.color}, ${alpha(value.color, 0.5)})`,
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      },
                      "&:hover": {
                        transform: "translateY(-16px)",
                        boxShadow: isDark
                          ? `0 24px 64px ${alpha(value.color, 0.35)}`
                          : `0 24px 64px ${alpha(value.color, 0.25)}`,
                        borderColor: value.color,
                        "&::before": {
                          transform: "scaleX(1)",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 80, md: 90 },
                        height: { xs: 80, md: 90 },
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${alpha(value.color, 0.2)} 0%, ${alpha(value.color, 0.1)} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: { xs: 2.5, md: 3.5 },
                        boxShadow: `0 8px 32px ${alpha(value.color, 0.25)}`,
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          inset: -2,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${value.color}, ${alpha(value.color, 0.5)})`,
                          zIndex: -1,
                          opacity: 0,
                          transition: "opacity 0.4s",
                        },
                        ".MuiCard-root:hover &::after": {
                          opacity: 0.15,
                        },
                      }}
                    >
                      <Box sx={{ color: value.color, fontSize: { xs: 36, md: 40 } }}>
                        {value.icon}
                      </Box>
                    </Box>
                    
                    <Typography
                      variant="h5"
                      fontWeight={800}
                      gutterBottom
                      sx={{ 
                        fontSize: { xs: "1.2rem", md: "1.35rem" },
                        mb: { xs: 1.5, md: 2 },
                        background: isDark
                          ? `linear-gradient(135deg, ${value.color} 0%, ${alpha(value.color, 0.8)} 100%)`
                          : "inherit",
                        WebkitBackgroundClip: isDark ? "text" : "inherit",
                        WebkitTextFillColor: isDark ? "transparent" : "inherit",
                        color: isDark ? "transparent" : "text.primary",
                      }}
                    >
                      {value.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.8,
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        fontWeight: 500,
                      }}
                    >
                      {value.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team */}
      <Box
        sx={{
          py: { xs: 6, md: 12 },
          background: isDark
            ? alpha(theme.palette.background.paper, 0.4)
            : alpha(theme.palette.grey[50], 0.5),
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 8 } }}>
            <SectionTitle
              title="Meet Our Leadership Team"
              subtitle="Passionate experts dedicated to transforming education"
            />
          </Box>

          <Grid container spacing={{ xs: 3, sm: 3, md: 4 }} justifyContent="center">
            {teamMembers.map((member, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{ height: "100%" }}
                >
                  <Card
                    sx={{
                      p: { xs: 3, md: 3.5 },
                      textAlign: "center",
                      borderRadius: { xs: 3, md: 4 },
                      background: isDark
                        ? alpha(theme.palette.background.paper, 0.6)
                        : "white",
                      border: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(0,0,0,0.08)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb)",
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      },
                      "&:hover": {
                        transform: "translateY(-16px) scale(1.02)",
                        boxShadow: isDark
                          ? "0 24px 64px rgba(0,0,0,0.7)"
                          : "0 24px 64px rgba(102, 126, 234, 0.2)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(102, 126, 234, 0.3)",
                        "&::before": {
                          transform: "scaleX(1)",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        mb: { xs: 2, md: 2.5 },
                      }}
                    >
                      <Avatar
                        src={member.image}
                        alt={member.name}
                        sx={{
                          width: { xs: 110, md: 130 },
                          height: { xs: 110, md: 130 },
                          border: "4px solid",
                          borderColor: "primary.main",
                          boxShadow: "0 12px 32px rgba(102, 126, 234, 0.3)",
                          transition: "all 0.4s",
                          ".MuiCard-root:hover &": {
                            transform: "scale(1.08)",
                            boxShadow: "0 16px 48px rgba(102, 126, 234, 0.4)",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: -8,
                          right: -8,
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          bgcolor: "#43e97b",
                          border: "3px solid",
                          borderColor: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 12px rgba(67, 233, 123, 0.4)",
                        }}
                      >
                        <Verified sx={{ fontSize: 18, color: "white" }} />
                      </Box>
                    </Box>

                    <Typography
                      variant="h6"
                      fontWeight={800}
                      gutterBottom
                      sx={{ 
                        fontSize: { xs: "1.1rem", md: "1.2rem" },
                        mb: 0.5,
                      }}
                    >
                      {member.name}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontWeight: 700,
                        fontSize: { xs: "0.9rem", md: "0.95rem" },
                        mb: { xs: 1.5, md: 2 },
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {member.role}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: { xs: 2, md: 2.5 },
                        lineHeight: 1.7,
                        minHeight: { xs: 56, md: 64 },
                        fontSize: { xs: "0.9rem", md: "0.95rem" },
                        fontWeight: 500,
                      }}
                    >
                      {member.bio}
                    </Typography>
                    
                    <Stack 
                      direction="row" 
                      spacing={1.5} 
                      justifyContent="center"
                      sx={{ pt: 1.5, borderTop: 1, borderColor: "divider" }}
                    >
                      <IconButton
                        component="a"
                        href={member.social.linkedin}
                        target="_blank"
                        size="small"
                        sx={{
                          bgcolor: alpha("#0077b5", 0.1),
                          transition: "all 0.3s",
                          "&:hover": {
                            bgcolor: "#0077b5",
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 16px rgba(0, 119, 181, 0.3)",
                            "& svg": { color: "white" },
                          },
                        }}
                      >
                        <LinkedIn sx={{ fontSize: 20, color: "#0077b5" }} />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={member.social.github}
                        target="_blank"
                        size="small"
                        sx={{
                          bgcolor: alpha("#333", 0.1),
                          transition: "all 0.3s",
                          "&:hover": {
                            bgcolor: "#333",
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 16px rgba(51, 51, 51, 0.3)",
                            "& svg": { color: "white" },
                          },
                        }}
                      >
                        <GitHub sx={{ fontSize: 20, color: "#333" }} />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={member.social.website}
                        target="_blank"
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          transition: "all 0.3s",
                          "&:hover": {
                            bgcolor: "primary.main",
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)",
                            "& svg": { color: "white" },
                          },
                        }}
                      >
                        <Language sx={{ fontSize: 20, color: "primary.main" }} />
                      </IconButton>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: isDark
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark
              ? "radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(240, 147, 251, 0.15) 0%, transparent 50%)"
              : "radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)",
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                px: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant="h2"
                fontWeight={800}
                gutterBottom
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem" },
                  color: "white",
                  lineHeight: 1.2,
                  mb: { xs: 2, md: 3 },
                }}
              >
                Join Our Learning Revolution
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: { xs: 4, md: 5 },
                  color: "rgba(255,255,255,0.9)",
                  maxWidth: { xs: "100%", md: 680 },
                  mx: "auto",
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" },
                }}
              >
                Be part of a global community of 850,000+ learners transforming their
                careers and achieving their dreams.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
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
                    color: "#667eea",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 700,
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    "&:hover": {
                      bgcolor: "#f8f8f8",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Start Learning Free
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 700,
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    borderWidth: 2,
                    backdropFilter: "blur(10px)",
                    bgcolor: alpha("#fff", 0.1),
                    "&:hover": {
                      borderWidth: 2,
                      bgcolor: alpha("#fff", 0.2),
                      transform: "translateY(-4px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}

export default About;