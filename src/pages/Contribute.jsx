import React from 'react';
import './Contribute.css';

const Contribute = () => {
  return (
    <div className="contribute-container">
      <h1>Contribute to AdvenTour</h1>
      <p>Share your local knowledge and help others discover amazing places!</p>
      <form className="contribute-form">
        <div className="form-group">
          <label htmlFor="placeName">Place Name</label>
          <input type="text" id="placeName" name="placeName" required />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input type="text" id="image" name="image" required />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Contribute;