import React from "react";

// ProtectedRoute now supports optional role-based protection via `allowedRoles` and a `user` prop.
const ProtectedRoute = ({ isAuthenticated, user, allowedRoles, children }) => {
  if (!isAuthenticated) {
    return <div style={styles.message}>Please log in to view this content.</div>;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    // If there is no user or the user's role is not included, deny access
    const role = user && (user.role || user.userRole || user.roleName);
    if (!role || !allowedRoles.includes(role)) {
      return <div style={styles.message}>You do not have permission to view this page.</div>;
    }
  }

  return children;
};

const styles = {
  message: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "18px",
    color: "#ff0000",
  },
};

export default ProtectedRoute;