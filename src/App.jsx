import React, { useState } from 'react';
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
import Header from "./components/Header";
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header isAuthenticated={isAuthenticated} user={user} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;