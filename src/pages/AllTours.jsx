import React from "react";
import { Link } from "react-router-dom";
import './AllTours.css';

const AllTours = ({ bookmarks, setBookmarks }) => {
  const tours = [
    { id: 1, name: 'Rishikesh Adventure Tour', location: 'Rishikesh, Dehradun, Uttarakhand, India', price: '₹15,500/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg' },
    { id: 2, name: 'Manali Adventure Expedition', location: 'Manali, Himachal Pradesh, India', price: '₹20,000/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg' },
    { id: 3, name: 'Netrani Island Scuba Diving', location: 'Uttara Kannada, Karnataka, India', price: '₹4,500/-', rating: 'Unrated', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716398172/adventour-tour-images/00d7dbc98ead7d8e_rmhoyj.jpg' },
    { id: 4, name: 'Bangalore Trekking Adventure', location: 'Savandurga, Bengaluru, Karnataka', price: '₹3,000/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716400335/adventour-tour-images/fd2c1244899bedc2_tpyrmo.jpg' },
    { id: 5, name: 'Spiti Valley Trek', location: 'Spiti Valley, Himachal Pradesh, India', price: '₹8,500/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716450029/adventour-tour-images/b31873046c47eaf0_cdnqzp.jpg' },
    { id: 6, name: 'Kodai Lake Boating', location: 'Kodaikanal, Dindigul, Tamil Nadu', price: '₹1,500/-', rating: 'Unrated', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716454849/adventour-tour-images/726ec4b34adf3b28_qihos0.jpg' },
  ];

  const handleBookmark = (tour) => {
    if (bookmarks.some(bookmark => bookmark.id === tour.id)) {
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== tour.id));
    } else {
      setBookmarks([...bookmarks, tour]);
    }
  };

  return (
    <div className="all-tours-container">
      {tours.map(tour => (
        <div key={tour.id} className="tour-card">
          <div className="tour-main-cover">
            <img src={tour.img} alt={tour.name} />
            <div
              className={`heart-icon ${bookmarks.some(bookmark => bookmark.id === tour.id) ? 'active' : ''}`}
              onClick={() => handleBookmark(tour)}
            >
              ❤️
            </div>
          </div>
          <div className="tour-details">
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
      ))}
    </div>
  );
};

export default AllTours;