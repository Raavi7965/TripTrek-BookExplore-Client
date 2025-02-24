import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 shadow-lg rounded-xl bg-white">
          <h2 className="text-2xl font-semibold text-center mb-4">
            TripTrekBook&Explore
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Sign Up
            </button>
          </form>
          <div className="text-center my-4">OR</div>
          <GoogleLogin
            onSuccess={(response) => console.log(response)}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Registration;
