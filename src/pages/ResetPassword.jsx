import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://triptrek-bookexplore-server.onrender.com/users");
      const users = await response.json();

      const user = users.find((user) => user.email === email);

      if (user) {
        // Update the user's password
        const updatedUser = { ...user, password: newPassword };

        // Send the updated user data to the server
        await fetch(`https://triptrek-bookexplore-server.onrender.com/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });

        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage("Email not found.");
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
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword}>
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
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            Reset Password
          </button>
        </form>
        {message && (
          <p style={{ textAlign: "center", color: "red", marginTop: "1rem" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;