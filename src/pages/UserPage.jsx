import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./userpage.css"

const UserPage = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="user-page-container">
      <h2>{user.userName}'s Favorite Tours</h2>
      <div className="favorites-list">
        {user.favorites.length > 0 ? (
          user.favorites.map((tour, index) => (
            <div key={index} className="favorite-tour">
              {tour}
            </div>
          ))
        ) : (
          <p>No favorite tours selected.</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;