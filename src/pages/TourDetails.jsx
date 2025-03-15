import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TourDetails.css';

const mockTourData = {
  1: {
    id: 1,
    name: 'Rishikesh Adventure Tour',
    images: [
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg',
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961566/adventour-tour-images/8d203e605cfd5118_mlqx9r.jpg',
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961575/adventour-tour-images/ff2e6398f6ffdc99_wru1vu.jpg'
    ],
    description: 'Rishikesh is a popular destination for adventure sports...',
    price: '₹15,500',
    discountedPrice: '₹14,500',
    itinerary: ['Day 1: Arrival', 'Day 2: Rafting', 'Day 3: Trekking', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Tushar',
        rating: 5,
        type: 'Friends',
        title: 'A Thrilling 3-Day Journey',
        comment: 'Embark on an unforgettable 3-Day Rishikesh Adventure Tour...',
        date: '29 May 2024',
        images: [
          'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716974597/tour-review-images/6c5f9ff8ad594285_w0p393.jpg',
          'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716974597/tour-review-images/06ad944afe6f66e3_hp7log.jpg']
      }
    ]
  },
  2: {
    id: 2,
    name: 'Manali Snow Adventure',
    images: [
      'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg',
      'https://www.seawatersports.com/images/activies/slide/trekking-in-manali-package.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOE9bL1J7VU-hm07fCd2Bun59UcReXnQfUw&s'
    ],
    description: 'Experience the thrill of snow-clad mountains in Manali...',
    price: '₹18,000',
    discountedPrice: '₹16,500',
    itinerary: ['Day 1: Arrival', 'Day 2: Skiing', 'Day 3: Snow Trekking', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Adventurous',
        comment: 'Manali was breathtaking, and the skiing experience was unmatched!',
        date: '10 Jan 2024',
        images: []
      }
    ]
  },
  3: {
    id: 3,
    name: 'Netrani Island Scuba Diving',
    images: [
      'https://dtmag.com/wp-content/uploads/2015/09/iStock_000028077202_600.jpg',
      'https://b3619545.smushcdn.com/3619545/wp-content/uploads/2023/09/Deep-Dive-Dubai-kids-first-Nomad-dive-1024x683.jpg?lossy=2&strip=1&webp=1',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO6YE5QJl-OMDJWJHdj96ImRx-5_jRJ3WOPA&s'
    ],
    description: 'Dive into the crystal-clear waters of Netrani Island and explore vibrant marine life.',
    price: '₹18,000',
    discountedPrice: '₹16,500',
    itinerary: ['Day 1: Arrival', 'Day 2: Scuba Diving Training', 'Day 3: Deep Sea Dive', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Adventurous',
        comment: 'Manali was breathtaking, and the skiing experience was unmatched!',
        date: '10 Jan 2024',
        images: []
      }
    ]
  },
  4: {
    id: 4,
    name: 'Bangalore Trekking Adventure',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzKDuFYI3r2jlWU_S3-lip8iKZ_KGE3ruLgQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr2sN2GH2RHoTyj2fEmieGMU1EsrCL_2IQbF43DxMZwiHXOJ6MZN6Pm6MpiWf0EL5ApwY&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kCSAv9aQM1CMcwQ1Gb91W9-n7FN7GjgIKzpsRS9ujkriC7kO-k2DXM4QRKKohWvcHAQ&usqp=CAU'
    ],
    description: 'Embark on an exciting trek to Savandurga, one of the largest monolith hills in Asia. Experience breathtaking sunrise views, explore ancient temples, and trek through lush green trails surrounded by nature..',
    price: '₹18,000',
    discountedPrice: '₹16,500',
    itinerary: ['Day 1: Arrival', 'Day 2: base camp, briefing, and warm-up session', 'Day 3: Early morning trek to the peak, enjoy panoramic views.', 'Day 4: Departure'],
    reviews: [
      {
        user: 'Ravi',
        rating: 4,
        type: 'Couple',
        title: 'Romantic and Adventurous',
        comment: 'Manali was breathtaking, and the skiing experience was unmatched!',
        date: '10 Jan 2024',
        images: []
      }
    ]
  }
};

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const data = mockTourData[id];
        if (!data) {
          throw new Error('Tour not found');
        }
        setTour(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTourDetails();
  }, [id]);

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentImage('');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const handleBookNowClick = () => {
    navigate('/payment'); // Navigate to the payment page
  };

  return (
    <div className="tour-details-container">
      <h1 className="tour-title">{tour.name}</h1>
      <div className="tour-images">
        {tour.images.map((image, index) => (
          <img key={index} src={image} alt={`${tour.name} ${index + 1}`} className="tour-image" onClick={() => handleImageClick(image)} />
        ))}
      </div>
      <section className="tour-section">
        <h2>About</h2>
        <p>{tour.description}</p>
      </section>
      <section className="tour-section">
        <h2>Price</h2>
        <p>Starting from <span className="original-price">{tour.price}</span> <span className="discounted-price">{tour.discountedPrice}/person</span></p>
      </section>
      <section className="tour-section">
        <h2>Itinerary</h2>
        <ul>{tour.itinerary.map((item, index) => <li key={index}>{item}</li>)}</ul>
      </section>
      <section className="tour-section">
        <h2>Reviews</h2>
        <div className="reviews-container">
          {tour.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3>{review.title}</h3>
              <p>{review.comment}</p>
              <p>Written on {review.date}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="tour-section">
        <h2>Booking Information</h2>
        <button className="book-now-button" onClick={handleBookNowClick}>Book Now</button>
      </section>

      {isModalOpen && (
        <div className="modal" onClick={handleModalClose}>
          <img src={currentImage} alt="Enlarged" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default TourDetails;