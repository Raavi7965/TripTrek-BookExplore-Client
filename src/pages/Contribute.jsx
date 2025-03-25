import React, { useState } from 'react';
import './Contribute.css';

const Contribute = () => {
  const [formData, setFormData] = useState({
    placeName: '',
    location: '',
    description: '',
    image: '',
    category: '',
    difficulty: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update image preview when image URL changes
    if (name === 'image' && value) {
      setPreviewImage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      placeName: '',
      location: '',
      description: '',
      image: '',
      category: '',
      difficulty: 'medium'
    });
    setPreviewImage('');
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  return (
    <div className="contribute-container">
      <div className="contribute-header">
        <h1>Contribute to AdvenTour</h1>
        <p>Share your local knowledge and help others discover amazing places!</p>
      </div>

      {!submitted ? (
        <div className="contribute-card">
          <div className="card-header">
            <h2>Add a New Place</h2>
            <p className="card-description">
              Fill out the form below to share your favorite spot with the community.
            </p>
          </div>
          
          <div className="card-content">
            <form className="contribute-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="placeName">Place Name</label>
                <input
                  type="text"
                  id="placeName"
                  name="placeName"
                  value={formData.placeName}
                  onChange={handleChange}
                  placeholder="Enter the name of the place"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <div className="input-with-icon">
                  <span className="input-icon">📍</span>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country or Coordinates"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <div className="input-with-icon">
                  <span className="input-icon">🏷️</span>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="nature">Nature & Outdoors</option>
                    <option value="historical">Historical Site</option>
                    <option value="food">Food & Dining</option>
                    <option value="cultural">Cultural Experience</option>
                    <option value="adventure">Adventure Activity</option>
                    <option value="hidden-gem">Hidden Gem</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Difficulty/Accessibility</label>
                <div className="radio-group">
                  <span className="input-icon"></span>
                  <div className="radio-options">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="easy"
                        name="difficulty"
                        value="easy"
                        checked={formData.difficulty === 'easy'}
                        onChange={handleChange}
                      />
                      <label htmlFor="easy">Easy</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="medium"
                        name="difficulty"
                        value="medium"
                        checked={formData.difficulty === 'medium'}
                        onChange={handleChange}
                      />
                      <label htmlFor="medium">Medium</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="challenging"
                        name="difficulty"
                        value="challenging"
                        checked={formData.difficulty === 'challenging'}
                        onChange={handleChange}
                      />
                      <label htmlFor="challenging">Challenging</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us what makes this place special..."
                  rows={5}
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <div className="input-with-icon">
                  <span className="input-icon">🖼️</span>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>
                
                {previewImage && (
                  <div className="image-preview-container">
                    <p className="preview-label">Image Preview:</p>
                    <div className="image-preview">
                      <img 
                        src={previewImage || "/placeholder.svg"} 
                        alt="Preview" 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x200?text=Image+Preview';
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="upload-hint">
                  <p>Or upload directly:</p>
                  <button type="button" className="upload-button">
                    Choose File
                  </button>
                  <p className="coming-soon">Coming soon: Direct file uploads</p>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="reset-button" onClick={handleReset}>
                  Reset Form
                </button>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Contribution"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="contribute-card">
          <div className="card-header">
            <div className="header-with-action">
              <h2>Submission Successful!</h2>
              <button className="back-button" onClick={handleBack}>
                ← Edit
              </button>
            </div>
            <p className="card-description">
              Thank you for contributing to AdvenTour! Your submission is being reviewed.
            </p>
          </div>
          
          <div className="card-content">
            <div className="submission-details">
              <div className="details-column">
                <div className="detail-item">
                  <h3>Place Name</h3>
                  <p className="detail-value">{formData.placeName}</p>
                </div>
                
                <div className="detail-item">
                  <h3>Location</h3>
                  <p className="detail-value">
                    <span className="detail-icon">📍</span>
                    {formData.location}
                  </p>
                </div>
                
                <div className="detail-item">
                  <h3>Category</h3>
                  <p className="detail-value">
                    <span className="detail-icon">🏷️</span>
                    {formData.category === 'nature' && 'Nature & Outdoors'}
                    {formData.category === 'historical' && 'Historical Site'}
                    {formData.category === 'food' && 'Food & Dining'}
                    {formData.category === 'cultural' && 'Cultural Experience'}
                    {formData.category === 'adventure' && 'Adventure Activity'}
                    {formData.category === 'hidden-gem' && 'Hidden Gem'}
                  </p>
                </div>
                
                <div className="detail-item">
                  <h3>Difficulty</h3>
                  <p className="detail-value">
                    <span className="detail-icon"></span>
                    {formData.difficulty.charAt(0).toUpperCase() + formData.difficulty.slice(1)}
                  </p>
                </div>
                
                <div className="detail-item">
                  <h3>Description</h3>
                  <p className="detail-description">{formData.description}</p>
                </div>
              </div>
              
              <div className="image-column">
                <h3>Image</h3>
                <div className="submitted-image-container">
                  <img 
                    src={formData.image || "/placeholder.svg"} 
                    alt={formData.placeName} 
                    className="submitted-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x200?text=Image';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-footer">
            <button className="add-another-button" onClick={() => {
              handleReset();
              setSubmitted(false);
            }}>
              Add Another Place
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contribute;
