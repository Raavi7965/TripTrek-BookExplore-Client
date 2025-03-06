import React from "react";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <div style={styles.message}>Please log in to view this content.</div>;
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