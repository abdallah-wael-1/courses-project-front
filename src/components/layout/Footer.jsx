import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import { LinkedIn, GitHub, Facebook, Language , School } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: (theme) =>
          theme.palette.mode === "light" ? "#f9fafb" : "#0a0a0a",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
                <School sx={{ color: "white", fontSize: 24 }} />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Empowering learners worldwide with quality online education.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Courses", "About", "Contact", "Dashboard"].map((link) => (
                <Link
                  key={link}
                  component={RouterLink}
                  to={`/${link.toLowerCase()}`}
                  color="text.secondary"
                  underline="hover"
                  sx={{
                    fontSize: "0.9rem",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Connect
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                component={Link}
                href="https://www.linkedin.com/in/abdallah-wael-56a215357/"
                target="_blank"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "#0077b5",
                    color: "#0077b5",
                  },
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                component={Link}
                href="https://github.com/abdallah-wael-1"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "#333",
                    color: "#333",
                  },
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                component={Link}
                href="#"
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "#1877f2",
                    color: "#1877f2",
                  },
                }}
              >
                <Facebook />
              </IconButton>
            <IconButton
              component="a"
              href="https://guileless-chebakia-02a77a.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "#6366f1",
                  color: "#6366f1",
                },
              }}
            >
              <Language />
            </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 3 }}
        >
          &copy; {new Date().getFullYear()} CoursesApp. Made with  by{" "}
          <Link
            href="https://www.linkedin.com/in/abdallah-wael-56a215357/"
            target="_blank"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #6366f1, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Eng: Abdallah Wael
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}