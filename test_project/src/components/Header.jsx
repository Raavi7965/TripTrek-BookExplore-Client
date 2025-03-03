import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = ({ isAuthenticated, user }) => {
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
        <Link to="/dashboard" style={getLinkStyle("/dashboard")} onClick={handleLoginRedirect}>Dashboard</Link>
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
            src="https://via.placeholder.com/40" // Placeholder image, replace with actual profile photo URL
            alt="Profile"
            style={styles.profilePhoto}
            onClick={toggleProfile}
          />
          {showProfile && (
            <div style={styles.profileDropdown}>
              <p style={styles.profileUsername}>{user.username}</p>
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
    width: "95%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(to right, #0077be, #00aaff)",
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
  },
  profileUsername: {
    margin: 0,
    fontWeight: "bold",
  },
};

export default Header;