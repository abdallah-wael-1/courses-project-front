import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/Protectedroute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CourseDetails from "./components/Courses/CourseDetails";
import CourseForm from "./components/Courses/CourseForm";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/unauthorized";
import Profile from "./pages/profile";
import Checkout from "./pages/Checkout"; 
import ScrollToTop from "./components/layout/ScrollToTop";

// Dashboards
import AdminSection from "./pages/Sections/AdminSection";
import ManagerSection from "./pages/Sections/ManagerSection";
import UserSection from "./pages/Sections/UserSection";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/checkout/:courseId"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/create"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <CourseForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <CourseForm />
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/manager"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerSection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserSection />
              </ProtectedRoute>
            }
          />

          {/* Error Pages */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    <ScrollToTop showAfter={250} />
    </Box>

  );
}

export default App;