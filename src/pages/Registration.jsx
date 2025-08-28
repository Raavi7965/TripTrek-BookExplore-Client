import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const tours = [
  'Rishikesh Adventure Tour',
  'Manali Adventure Expedition',
  'Netrani Island Scuba Diving',
  'Bangalore Trekking Adventure',
  'Spiti Valley Trek',
  'Kodai Lake Boating',
  'Ladakh Bike Tour',
  'Goa Water Sports',
  'Meghalaya Caving Adventure',
  'Sand Dune Safari & Camping'
];

const Registration = ({ setUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    favorites: []
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFavoriteChange = (tour) => {
    setFormData((prevData) => ({
      ...prevData,
      favorites: prevData.favorites.includes(tour)
        ? prevData.favorites.filter((fav) => fav !== tour)
        : [...prevData.favorites, tour]
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if user already exists (by email)
      const checkRes = await fetch(`http://localhost:3000/users?email=${encodeURIComponent(formData.email)}`);
      const existingUsers = await checkRes.json();
      if (existingUsers.length > 0) {
        alert("A user with this email already exists.");
        return;
      }
      // Register new user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        setUser(data);
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <GoogleOAuthProvider clientId="570232729613-l2rgql5g6pbocu2d4mir54rtn7efpomf.apps.googleusercontent.com">
      <div style={containerStyle}>
        <div style={backgroundStyle}></div>
        <div style={formContainerStyle}>
          <div style={formBoxStyle}>
            <h2 style={titleStyle}>TripTrekBook&Explore</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
              {step === 1 && (
                <>
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
                  <button type="button" onClick={nextStep} style={buttonStyle}>
                    Next
                  </button>
                </>
              )}
              {step === 2 && (
                <>
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
                  <div style={buttonGroupStyle}>
                    <button type="button" onClick={prevStep} style={buttonStyle}>
                      Back
                    </button>
                    <button type="button" onClick={nextStep} style={buttonStyle}>
                      Next
                    </button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
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
                  <div style={buttonGroupStyle}>
                    <button type="button" onClick={prevStep} style={buttonStyle}>
                      Back
                    </button>
                    <button type="button" onClick={nextStep} style={buttonStyle}>
                      Next
                    </button>
                  </div>
                </>
              )}
              {step === 4 && (
                <>
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
                    <button type="button" onClick={prevStep} style={buttonStyle}>
                      Back
                    </button>
                    <button type="button" onClick={nextStep} style={buttonStyle}>
                      Next
                    </button>
                  </div>
                </>
              )}
              {step === 5 && (
                <>
                  <h3>Select Your Favorite Tours</h3>
                  <div className="favorites-selection" style={favoritesSelectionStyle}>
                    {tours.map((tour) => (
                      <label key={tour} style={labelStyle}>
                        <input
                          type="checkbox"
                          value={tour}
                          checked={formData.favorites.includes(tour)}
                          onChange={() => handleFavoriteChange(tour)}
                        />
                        {tour}
                      </label>
                    ))}
                  </div>
                  <div style={buttonGroupStyle}>
                    <button type="button" onClick={prevStep} style={buttonStyle}>
                      Back
                    </button>
                    <button type="submit" style={buttonStyle}>
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </form>
            <div style={dividerStyle}>OR</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin
                onSuccess={(response) => console.log("Google Auth Success:", response)}
                onError={() => console.log("Google Login Failed")}
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
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
const dividerStyle = { textAlign: "center", margin: "1.5rem 0", color: "#2d3748", fontSize: "1.2rem" };
const favoritesSelectionStyle = { display: "flex", flexWrap: "wrap", gap: "10px" };

export default Registration;