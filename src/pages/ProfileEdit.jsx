import React, { useState, useEffect } from "react";

const ProfileEdit = ({ user }) => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    password: "", // Add password field
  });
  const [updatedProfile, setUpdatedProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        password: "", // Initialize password as empty
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://triptrek-bookexplore-server.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile Updated:", data);
        setUpdatedProfile(data);
        alert("Profile updated successfully!");
      } else {
        alert("Profile update failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (updatedProfile) {
    return (
      <div style={containerStyle}>
        <div style={backgroundStyle}></div>
        <div style={formContainerStyle}>
          <div style={formBoxStyle}>
            <h2 style={titleStyle}>Updated Profile</h2>
            <p><strong>User Name:</strong> {updatedProfile.userName}</p>
            <p><strong>First Name:</strong> {updatedProfile.firstName}</p>
            <p><strong>Last Name:</strong> {updatedProfile.lastName}</p>
            <p><strong>Email:</strong> {updatedProfile.email}</p>
            <p><strong>Phone Number:</strong> {updatedProfile.phoneNumber}</p>
            <p><strong>Gender:</strong> {updatedProfile.gender}</p>
            <p><strong>Date of Birth:</strong> {updatedProfile.dateOfBirth}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <div style={formContainerStyle}>
        <div style={formBoxStyle}>
          <h2 style={titleStyle}>Edit Profile</h2>
          <form onSubmit={handleSubmit} style={formStyle}>
            <label style={labelStyle}>
              User Name
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your username"
              />
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label style={{ ...labelStyle, flex: 1 }}>
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter first name"
                />
              </label>
              <label style={{ ...labelStyle, flex: 1 }}>
                Last Name
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter last name"
                />
              </label>
            </div>
            <label style={labelStyle}>
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter phone number"
              />
            </label>
            <label style={labelStyle}>
              Gender
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label style={labelStyle}>
              Date of Birth
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </label>
            <label style={labelStyle}>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your email"
              />
            </label>
            <label style={labelStyle}>
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="Enter your password"
              />
            </label>
            <div style={buttonGroupStyle}>
              <button type="submit" style={buttonStyle}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

const backgroundStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "url('https://www.newsilike.in/wp-content/uploads/karnala-bird-sanctuary-4.jpg') no-repeat center center/cover",
  zIndex: -1,
};

const formContainerStyle = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem",
};

const formBoxStyle = {
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  width: "100%",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "1.5rem",
  color: "#1a202c",
  fontFamily: "serif",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "bold",
  color: "#2d3748",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "0.75rem",
  backgroundColor: "#2d3748",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  marginRight: "0.5rem",
};

const buttonGroupStyle = { display: "flex", justifyContent: "space-between" };

export default ProfileEdit;