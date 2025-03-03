import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Login from "./pages/Login";
import IndexPage from "./pages/Index";
import Registration from "./pages/Registration";
import Footer from './components/Footer';
import ProtectedRoute from "./components/ProtectedRoute";
import Bookmarks from "./pages/Bookmarks";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import AllTours from "./pages/AllTours";
import TourDetails from "./pages/TourDetails";

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <div className="routes-container">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<IndexPage />} />
            <Route path="/tours" element={<AllTours />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/bookmarks" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Bookmarks />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyBookings />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <FooterWrapper />
      </div>
    </BrowserRouter>
  );
};

const FooterWrapper = () => {
  const location = useLocation();
  return location.pathname === '/' ? <Footer /> : null;
};

export default App;