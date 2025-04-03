import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsAuthenticated, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedUser && storedIsAuthenticated) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
      navigate("/"); // Navigate to the home page
    }
  }, [setIsAuthenticated, setUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const user = await response.json();
        setMessage("Login successful!");
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", true);
        navigate("/"); // Navigate to the home page
      } else if (response.status === 401) {
        setMessage("Invalid password.");
      } else if (response.status === 404) {
        setMessage("User not found.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "90vw",
        backgroundImage:
          "url('https://www.makemebetter.net/wp-content/uploads/2022/11/travel-adv-min.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "1rem",
          }}
        >
          TripTrekBook&Explore Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
                fontSize: "16px",
              }}
            />
            <label style={{ display: "block", marginTop: "0.5rem" }}>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />{" "}
              Show Password
            </label>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#2ecc71",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              transition: "opacity 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Login
          </button>
        </form>
        {message && (
          <p style={{ textAlign: "center", color: "red", marginTop: "1rem" }}>
            {message}
          </p>
        )}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/reset-password" style={{ color: "#3498db" }}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;