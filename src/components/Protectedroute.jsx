import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

/**
 * 
 * 
 *
 * 
 * @param {React.ReactNode} children 
 * @param {Array<string>} allowedRoles 
 * 
 * */
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
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    if (!normalizedAllowedRoles.includes(userRole)) {
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