import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ isAuthenticated, user, setIsAuthenticated, setUser, logout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLoginRedirect = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleProfileEdit = () => {
    navigate("/profile-edit");
  };

  const getLinkStyle = (path) => {
    return location.pathname === path ? styles.activeLink : styles.link;
  };

  return (
    <header style={styles.header}>
      {/* Logo on the left */}
      <div style={styles.logo} onClick={() => navigate("/")}>
        🌊🏝 <span style={styles.title}>Trip Trek</span>
      </div>

      {/* Centered navigation links */}
      <nav style={styles.navCenter}>
        <Link to="/tours" style={getLinkStyle("/tours")}>All Tours</Link>
        <Link to="/bookmarks" style={getLinkStyle("/bookmarks")} onClick={handleLoginRedirect}>Bookmarks</Link>
        <Link to="/bookings" style={getLinkStyle("/bookings")} onClick={handleLoginRedirect}>My Bookings</Link>
        <Link to="/dashboard" style={getLinkStyle("/dashboard")} onClick={handleLoginRedirect}>Contribute</Link>
      </nav>

      {/* Right-aligned Register and Login (highlighted) */}
      {!isAuthPage && !isAuthenticated && (
        <nav style={styles.navRight}>
          <Link to="/register" style={getLinkStyle("/register")}>Register</Link>
          <Link to="/login" style={getLinkStyle("/login")}>Login</Link>
        </nav>
      )}

      {/* Profile photo and username */}
      {isAuthenticated && (
        <div style={styles.profileContainer}>
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg" // Placeholder image, replace with actual profile photo URL
            alt="Profile"
            style={styles.profilePhoto}
            onClick={toggleProfile}
          />
          {showProfile && (
            <div style={styles.profileDropdown}>
              <p style={styles.profileUsername}>{user.userName}</p>
              <p style={styles.profileEmail}>{user.email}</p>
              <button style={styles.changePasswordButton} onClick={handleChangePassword}>Change Password</button>
              <button style={styles.profileEditButton} onClick={handleProfileEdit}>Edit Profile</button>
              <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "97%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(to right, #0077be,rgb(240, 17, 240))",
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  title: {
    fontFamily: "'Pacifico', cursive",
    fontSize: "1.8rem",
  },
  navCenter: {
    display: "flex",
    gap: "20px",
    margin: "0 auto",
  },
  navRight: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    transition: "color 0.3s",
  },
  activeLink: {
    color: "#ffea00",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    transition: "color 0.3s",
  },
  profileContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  profilePhoto: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  },
  profileDropdown: {
    position: "absolute",
    top: "50px",
    right: "0",
    background: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "200px",
  },
  profileUsername: {
    margin: "5px 0",
    fontWeight: "bold",
    color: "#000",
  },
  profileEmail: {
    margin: "5px 0",
    fontSize: "0.9rem",
    color: "#555",
  },
  changePasswordButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  profileEditButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
  logoutButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
};

export default Header;