import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      {/* Logo on the left */}
      <div style={styles.logo}>
        🌊🏝 <span style={styles.title}>Book and Explore</span>
      </div>

      {/* Centered navigation links */}
      <nav style={styles.navCenter}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/services" style={styles.link}>Services</a>
        <a href="/contact" style={styles.link}>Contact</a>
      </nav>

      {/* Right-aligned Register and Login (highlighted) */}
      <nav style={styles.navRight}>
        <a href="/register" style={styles.highlightedLink}>Register</a>
        <a href="/login" style={styles.highlightedLink}>Login</a>
      </nav>
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
  highlightedLink: {
    color: "#ffea00",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textDecoration: "none",
    padding: "5px 15px",
    borderRadius: "5px",
    background: "rgba(255, 255, 255, 0.2)",
    transition: "background 0.3s, color 0.3s",
  },
};

export default Header;