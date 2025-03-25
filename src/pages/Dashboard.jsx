import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleContribute = () => {
    navigate('/contribute');
  };

  return (
    <div className="dashboard-container">
      <h1>Explore, guide, and be a part of our vibrant community!</h1>
      <p>Contribute your local places with us...</p>
      <button className="contribute-button" onClick={handleContribute}>
        Contribute to AdvenTour
      </button>
    </div>
  );
};

export default Dashboard;