import React from "react";
import { Link } from "react-router-dom";
import "./bookmarks.css";

const Bookmarks = ({ bookmarks }) => {
  return (
    <div className="bookmarks-container">
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarks.map(tour => (
          <div key={tour.id} className="bookmark-card">
            <div className="bookmark-main-cover">
              <img src={tour.img} alt={tour.name} />
            </div>
            <div className="bookmark-details">
              <h3>{tour.name}</h3>
              <p>{tour.location}</p>
              <p>{tour.rating}</p>
              <p>Starting from</p>
              <p>{tour.price}</p>
              <Link to={`/tours/${tour.id}`}>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;