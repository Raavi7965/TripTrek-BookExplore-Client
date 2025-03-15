import React, { useState } from 'react';
import './Contribute.css';

const Contribute = () => {
  const [formData, setFormData] = useState({
    placeName: '',
    location: '',
    description: '',
    image: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contribute-container">
      <h1>Contribute to AdvenTour</h1>
      <p>Share your local knowledge and help others discover amazing places!</p>
      {!submitted ? (
        <form className="contribute-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="placeName">Place Name</label>
            <input
              type="text"
              id="placeName"
              name="placeName"
              value={formData.placeName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      ) : (
        <div className="report">
          <h2>Submitted Report</h2>
          <p><strong>Place Name:</strong> {formData.placeName}</p>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Image URL:</strong> {formData.image}</p>
          {formData.image && <img src={formData.image} alt={formData.placeName} className="submitted-image" />}
        </div>
      )}
    </div>
  );
};

export default Contribute;