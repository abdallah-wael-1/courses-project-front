import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }

    const userRole = user?.role?.toLowerCase();

    // Redirect based on user role
    switch (userRole) {
      case "admin":
        navigate("/dashboard/admin", { replace: true });
        break;
      case "manager":
        navigate("/dashboard/manager", { replace: true });
        break;
      case "user":
      case "student":
        navigate("/dashboard/user", { replace: true });
        break;
      default:
        // Unknown role - redirect to unauthorized
        navigate("/unauthorized", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Loading your dashboard...
      </Typography>
    </Box>
  );
}

export default Dashboard;