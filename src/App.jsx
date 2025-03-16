import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import Bookmarks from "./pages/Bookmarks";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import AllTours from "./pages/AllTours";
import TourDetails from "./pages/TourDetails";
import IndexPage from "./pages/Index";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ChangePassword from "./pages/ChangePassword";
import Contribute from "./pages/Contribute";
import ProfileEdit from "./pages/ProfileEdit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PaymentForm from './pages/PaymentForm';
import ResetPassword from './pages/ResetPassword';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

    if (storedUser && storedIsAuthenticated) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header isAuthenticated={isAuthenticated} user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser} logout={logout} />
        <div className="routes-container">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<IndexPage />} />
            <Route path="/tours" element={<AllTours bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/change-password" element={<ChangePassword user={user} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/bookmarks" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Bookmarks bookmarks={bookmarks} />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/profile-edit" element={<ProfileEdit user={user} />} />
            <Route path="/payment" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PaymentForm />
              </ProtectedRoute>
            } />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;