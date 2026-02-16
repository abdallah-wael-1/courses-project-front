import { Box, Container, Typography, Button, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowBack, SearchOff } from "@mui/icons-material";

function NotFound() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
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
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            {/* 404 Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Box
                sx={{
                  width: { xs: 120, md: 150 },
                  height: { xs: 120, md: 150 },
                  borderRadius: "50%",
                  background: alpha("#fff", 0.2),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 4,
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                <SearchOff sx={{ fontSize: { xs: 60, md: 80 }, color: "white" }} />
              </Box>
            </motion.div>

            {/* 404 Text */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
                fontWeight: 900,
                lineHeight: 1,
                mb: 2,
                background: "linear-gradient(to right, #fff, rgba(255,255,255,0.7))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 80px rgba(255,255,255,0.3)",
              }}
            >
              404
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                fontWeight: 800,
                mb: 3,
                color: "white",
              }}
            >
              Page Not Found
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", md: "1.3rem" },
                mb: 5,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Oops! The page you're looking for doesn't exist. It might have been moved
              or deleted, or you may have mistyped the URL.
            </Typography>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
                maxWidth: 500,
                mx: "auto",
              }}
            >
              <Button
                component={Link}
                to="/"
                variant="contained"
                size="large"
                startIcon={<Home />}
                sx={{
                  bgcolor: "white",
                  color: "#667eea",
                  fontWeight: 700,
                  px: 4,
                  py: 1.8,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  "&:hover": {
                    bgcolor: "#f8f8f8",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s",
                }}
              >
                Back to Home
              </Button>

              <Button
                onClick={() => window.history.back()}
                variant="outlined"
                size="large"
                startIcon={<ArrowBack />}
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontWeight: 700,
                  px: 4,
                  py: 1.8,
                  fontSize: "1.1rem",
                  borderRadius: 2,
                  borderWidth: 2,
                  backdropFilter: "blur(10px)",
                  bgcolor: alpha("#fff", 0.1),
                  "&:hover": {
                    borderWidth: 2,
                    bgcolor: alpha("#fff", 0.2),
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s",
                }}
              >
                Go Back
              </Button>
            </Box>

            {/* Helpful Links */}
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 2, fontSize: "0.95rem" }}
              >
                Quick Links:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { label: "Courses", path: "/courses" },
                  { label: "About Us", path: "/about" },
                  { label: "Contact", path: "/contact" },
                ].map((link) => (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: "white",
                      textTransform: "none",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: alpha("#fff", 0.1),
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default NotFound;