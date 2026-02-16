import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 * 
 * Protects routes based on authentication and user roles
 * 
 * @param {React.ReactNode} children - The component to render if authorized
 * @param {Array<string>} allowedRoles - Array of roles that can access this route (case-insensitive)
 * 
 * Usage:
 * <Route 
 *   path="/dashboard/admin" 
 *   element={
 *     <ProtectedRoute allowedRoles={['admin']}>
 *       <AdminSection />
 *     </ProtectedRoute>
 *   } 
 * />
 */
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Get user role (convert to lowercase for consistency)
  const userRole = user?.role?.toLowerCase();

  // Check if user has the required role
  if (allowedRoles.length > 0) {
    // Convert allowed roles to lowercase for case-insensitive comparison
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    
    if (!normalizedAllowedRoles.includes(userRole)) {
      // Redirect to unauthorized page
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and authorized
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;