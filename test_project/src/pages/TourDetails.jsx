import React from 'react';
import { useParams } from 'react-router-dom';

const TourDetails = () => {
  const { id } = useParams();

  // Fetch tour details using the id
  // For now, we'll just display the id
  return (
    <div>
      <h1>Tour Details</h1>
      <p>Tour ID: {id}</p>
      {/* Display more details about the tour here */}
    </div>
  );
};

export default TourDetails;