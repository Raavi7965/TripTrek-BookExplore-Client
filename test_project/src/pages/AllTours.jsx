import React from "react";
import { Link } from "react-router-dom";
import './AllTours.css';

const AllTours = () => {
  const tours = [
    { id: 1, name: 'Spiti Valley Trek', location: 'Spiti Valley, Himachal Pradesh, India', price: '₹8,500/-', rating: '4.0 (Good)', img: 'https://via.placeholder.com/300x200' },
    { id: 2, name: 'Kodai Lake Boating', location: 'Kodaikanal, Dindigul, Tamil Nadu', price: '₹1,500/-', rating: 'Unrated', img: 'https://via.placeholder.com/300x200' },
    // Add more tours here
  ];

  return (
    <div className="all-tours-container">
      <div className="filters">
        <h2>Filters</h2>
        <button className="clearButton">Clear all filters</button>
        <div className="filterSection">
          <h3>Trip difficulty</h3>
          <label><input type="checkbox" /> Easy</label>
          <label><input type="checkbox" /> Medium</label>
          <label><input type="checkbox" /> Hard</label>
        </div>
        <div className="filterSection">
          <h3>Tour price per individual</h3>
          <label>Price ₹700 – ₹30,000</label>
        </div>
        <div className="filterSection">
          <h3>Trip duration</h3>
          <label><input type="checkbox" /> 1 day</label>
          <label><input type="checkbox" /> 2 days</label>
          <label><input type="checkbox" /> 3 days</label>
          <label><input type="checkbox" /> 4 & more</label>
        </div>
        <div className="filterSection">
          <h3>Allowed age groups</h3>
          <label><input type="checkbox" /> Children (0 - 11 years)</label>
          <label><input type="checkbox" /> Teenagers (12 - 17 years)</label>
          <label><input type="checkbox" /> Adults (18 - 64 years)</label>
          <label><input type="checkbox" /> Seniors (65+ years)</label>
        </div>
        <div className="filterSection">
          <h3>Select adventure genre</h3>
          <div className="checkbox-grid">
            <label><input type="checkbox" /> Backpacking</label>
            <label><input type="checkbox" /> Base Jumping</label>
            <label><input type="checkbox" /> Boating</label>
            <label><input type="checkbox" /> Bungee Jumping</label>
            <label><input type="checkbox" /> Camping</label>
            <label><input type="checkbox" /> Canoeing</label>
            <label><input type="checkbox" /> Caving</label>
            <label><input type="checkbox" /> Climbing</label>
            <label><input type="checkbox" /> Cycling</label>
            <label><input type="checkbox" /> Diving</label>
            <label><input type="checkbox" /> Fishing</label>
            <label><input type="checkbox" /> Hiking</label>
            <label><input type="checkbox" /> Kayaking</label>
            <label><input type="checkbox" /> Paragliding</label>
            <label><input type="checkbox" /> Rafting</label>
            <label><input type="checkbox" /> Rock Climbing</label>
            <label><input type="checkbox" /> Sailing</label>
            <label><input type="checkbox" /> Scuba Diving</label>
            <label><input type="checkbox" /> Skiing</label>
            <label><input type="checkbox" /> Skydiving</label>
            <label><input type="checkbox" /> Snorkeling</label>
            <label><input type="checkbox" /> Surfing</label>
            <label><input type="checkbox" /> Trekking</label>
            <label><input type="checkbox" /> Windsurfing</label>
          </div>
        </div>
      </div>
      <div className="tours">
        {tours.map(tour => (
          <div key={tour.id} className="tour">
            <div className="tourCover">
              <img src={tour.img} alt={tour.name} />
            </div>
            <div className="tourDetails">
              <h3>{tour.name}</h3>
              <p>{tour.location}</p>
              <p>Rating: {tour.rating}</p>
              <p>Starting from {tour.price}</p>
              <Link to={`/tours/${tour.id}`}>
                <button className="viewDetailsButton">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTours;