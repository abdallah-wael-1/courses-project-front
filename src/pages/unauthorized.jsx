import { Box, Container, Typography, Button, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Login, Block, ContactSupport } from "@mui/icons-material";

function Unauthorized() {
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
          : "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #fd868c 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? "radial-gradient(circle at 30% 50%, rgba(240, 147, 251, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(245, 87, 108, 0.15) 0%, transparent 50%)"
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
            {/* Lock Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
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
                <Block sx={{ fontSize: { xs: 60, md: 80 }, color: "white" }} />
              </Box>
            </motion.div>

            {/* 403 Text */}
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
              403
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
              Access Denied
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
              Sorry, you don't have permission to access this page. This area is restricted
              to authorized users only. Please check your credentials or contact support.
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
                  color: "#f5576c",
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
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                startIcon={<Login />}
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
                Sign In
              </Button>
            </Box>

            {/* Help Section */}
            <Box
              sx={{
                mt: 6,
                p: 4,
                borderRadius: 3,
                bgcolor: alpha("#fff", 0.1),
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              <ContactSupport sx={{ fontSize: 40, color: "white", mb: 2 }} />
              <Typography
                variant="h6"
                sx={{ color: "white", mb: 1, fontWeight: 700 }}
              >
                Need Help?
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", mb: 3, lineHeight: 1.7 }}
              >
                If you believe you should have access to this page, please contact our
                support team for assistance.
              </Typography>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#f5576c",
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "#f8f8f8",
                  },
                }}
              >
                Contact Support
              </Button>
            </Box>

            {/* Additional Info */}
            <Typography
              variant="body2"
              sx={{
                mt: 4,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.9rem",
              }}
            >
              Error Code: 403 - Forbidden Access
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Unauthorized;