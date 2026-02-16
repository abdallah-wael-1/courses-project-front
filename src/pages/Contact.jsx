import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  useTheme,
  Paper,
  Alert,
  Stack,
  Card,
  alpha,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle"; 
import {
  Email,
  Phone,
  LocationOn,
  Send,
  CheckCircle,
  AccessTime,
  SupportAgent,
} from "@mui/icons-material";

function Contact() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Form Data:", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);

      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: "Email Us",
      detail: "support@learningplatform.com",
      description: "We'll respond within 24 hours",
      color: "#667eea",
    },
    {
      icon: <Phone />,
      title: "Call Us",
      detail: "+20 123 456 7890",
      description: "Mon-Fri, 9AM-6PM EET",
      color: "#f093fb",
    },
    {
      icon: <LocationOn />,
      title: "Visit Us",
      detail: "Cairo, Egypt",
      description: "Schedule an appointment",
      color: "#4facfe",
    },
  ];

  const features = [
    {
      icon: <AccessTime />,
      title: "Quick Response",
      description: "Get replies within 24 hours",
    },
    {
      icon: <SupportAgent />,
      title: "Expert Support",
      description: "Dedicated support team",
    },
    {
      icon: <CheckCircle />,
      title: "Problem Solved",
      description: "We ensure your issues are resolved",
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          py: { xs: 10, md: 14 },
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <Chip
                label="Get in Touch"
                sx={{
                  mb: 3,
                  bgcolor: alpha("#fff", 0.2),
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              />
              <Typography
                variant="h1"
                fontWeight={800}
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  mb: 3,
                  lineHeight: 1.1,
                  color: "white",
                }}
              >
                Let's Start a Conversation
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  maxWidth: 700,
                  mx: "auto",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                Have questions? We'd love to hear from you. Send us a message and
                we'll respond as soon as possible.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, mb: { xs: 8, md: 12 }, position: "relative", zIndex: 2 }}>
        <Grid container spacing={3}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card
                  sx={{
                    p: 4,
                    textAlign: "center",
                    height: "100%",
                    width:"320px",
                    borderRadius: 3,
                    ml: { xs: 2, sm: 0 },
                    background: isDark
                      ? alpha(theme.palette.background.paper, 0.9)
                      : "white",
                    border: `2px solid ${alpha(info.color, 0.2)}`,
                    boxShadow: isDark
                      ? "0 20px 60px rgba(0,0,0,0.4)"
                      : "0 20px 60px rgba(0,0,0,0.1)",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 25px 70px ${alpha(info.color, 0.3)}`,
                      borderColor: info.color,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${info.color} 0%, ${alpha(info.color, 0.7)} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: `0 8px 24px ${alpha(info.color, 0.4)}`,
                    }}
                  >
                    <Box sx={{ color: "white", fontSize: 32 }}>{info.icon}</Box>
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {info.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ color: info.color, mb: 1 }}
                  >
                    {info.detail}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: 4,
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.6)
                    : "white",
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "none",
                  boxShadow: isDark
                    ? "0 20px 60px rgba(0,0,0,0.4)"
                    : "0 20px 60px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    mb: 3,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    background: isDark
                      ? "linear-gradient(135deg, #fff 0%, #ccc 100%)"
                      : "linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Send us a Message
                </Typography>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert
                      severity="success"
                      icon={<CheckCircle />}
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        "& .MuiAlert-icon": {
                          fontSize: 28,
                        },
                      }}
                      onClose={() => setSuccess(false)}
                    >
                      <Typography variant="body1" fontWeight={600}>
                        Message sent successfully!
                      </Typography>
                      <Typography variant="body2">
                        We'll get back to you within 24 hours.
                      </Typography>
                    </Alert>
                  </motion.div>
                )}

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "primary.main", borderWidth: 2 },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                      },
                    }}
                  />

                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "primary.main", borderWidth: 2 },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                      },
                    }}
                  />

                  <TextField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "primary.main", borderWidth: 2 },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                      },
                    }}
                  />

                  <TextField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    fullWidth
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": { borderColor: "primary.main", borderWidth: 2 },
                        "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={<Send />}
                    sx={{
                      mt: 1,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      py: 2,
                      borderRadius: 2,
                      boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 32px rgba(102, 126, 234, 0.5)",
                      },
                      "&:disabled": {
                        background: alpha(theme.palette.primary.main, 0.3),
                      },
                      transition: "all 0.3s",
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>

          {/* Why Contact Us */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  gutterBottom
                  sx={{
                    mb: 3,
                    background: isDark
                      ? "linear-gradient(135deg, #fff 0%, #ccc 100%)"
                      : "linear-gradient(135deg, #1a1a2e 0%, #667eea 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Why Reach Out?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4 }}>
                  Whether you have a question about courses, need technical support, or want to
                  explore partnership opportunities, our team is ready to help you succeed.
                </Typography>

                <Stack spacing={3}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: isDark
                            ? alpha(theme.palette.background.paper, 0.4)
                            : alpha(theme.palette.grey[50], 0.8),
                          border: isDark
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "1px solid rgba(0,0,0,0.05)",
                          transition: "all 0.3s",
                          "&:hover": {
                            transform: "translateX(8px)",
                            boxShadow: isDark
                              ? "0 8px 24px rgba(0,0,0,0.3)"
                              : "0 8px 24px rgba(0,0,0,0.08)",
                          },
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 2,
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                            }}
                          >
                            <Box sx={{ color: "white", fontSize: 24 }}>{feature.icon}</Box>
                          </Box>
                          <Box>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </Card>
                    </motion.div>
                  ))}
                </Stack>
              </Box>

              {/* Additional Info Card */}
              <Card
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: isDark
                    ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  mt: 4,
                }}
              >
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Need Immediate Help?
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.7 }}>
                  Check our comprehensive FAQ section or browse our knowledge base for
                  instant answers to common questions.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "white",
                    color: "#667eea",
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "#f8f8f8",
                    },
                  }}
                >
                  Visit Help Center
                </Button>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

<Box
  sx={{
    py: { xs: 8, md: 12 },
    background: isDark
      ? alpha(theme.palette.background.paper, 0.4)
      : alpha(theme.palette.grey[50], 0.5),
  }}
>
  <Container maxWidth="lg">
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <SectionTitle
        title="Visit Our Office"
        subtitle="We'd love to meet you in person"
      />
    </Box>

    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.4)"
          : "0 20px 60px rgba(0,0,0,0.1)",
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37706365341!2d31.235711599999997!3d30.0444196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1234567890123"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location"
      />
      
      {/* Info Overlay */}
      <Box
        sx={{
          p: 4,
          background: isDark
            ? alpha(theme.palette.background.paper, 0.95)
            : 'white',
          borderTop: `4px solid ${isDark ? '#667eea' : '#6366f1'}`,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LocationOn sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Address
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  Downtown, Cairo
                </Typography>
              </Box>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Phone sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Phone
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  +20 123 456 7890
                </Typography>
              </Box>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AccessTime sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Working Hours
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  9AM - 6PM
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  </Container>
</Box>
    </Box>
  );
}

export default Contact;