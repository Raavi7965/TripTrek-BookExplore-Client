import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AllTours.css";

const AllTours = ({ bookmarks = [], setBookmarks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  const tours = [
    { id: 1, name: 'Rishikesh Adventure Tour', location: 'Rishikesh, Dehradun, Uttarakhand, India', price: '₹15,500/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg' },
    { id: 2, name: 'Manali Adventure Expedition', location: 'Manali, Himachal Pradesh, India', price: '₹20,000/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg' },
    { id: 3, name: 'Netrani Island Scuba Diving', location: 'Uttara Kannada, Karnataka, India', price: '₹4,500/-', rating: 'Unrated', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716398172/adventour-tour-images/00d7dbc98ead7d8e_rmhoyj.jpg' },
    { id: 4, name: 'Bangalore Trekking Adventure', location: 'Savandurga, Bengaluru, Karnataka', price: '₹3,000/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716400335/adventour-tour-images/fd2c1244899bedc2_tpyrmo.jpg' },
    { id: 5, name: 'Spiti Valley Trek', location: 'Spiti Valley, Himachal Pradesh, India', price: '₹8,500/-', rating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716450029/adventour-tour-images/b31873046c47eaf0_cdnqzp.jpg' },
    { id: 6, name: 'Kodai Lake Boating', location: 'Kodaikanal, Dindigul, Tamil Nadu', price: '₹1,500/-', rating: 'Unrated', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716454849/adventour-tour-images/726ec4b34adf3b28_qihos0.jpg' },
    { id: 7, name: 'Ladakh Bike Tour', location: 'Leh-Ladakh, Jammu & Kashmir', price: '₹25,000/-', rating: '4.7 (Excellent)', img: 'https://thedreamridersgroup.com/listing/9/Explore%20Ladakh%20on%20two%20wheels,Morey%20Plains.jpg' },
    { id: 8, name: 'Goa Water Sports', location: 'Goa, India', price: '₹3,500/-', rating: '4.3 (Very Good)', img: 'https://goaexplocation.com/admin/images/activities/125245011644banana_ride_in_goa.jpeg' },
    { id: 9, name: 'Meghalaya Caving Adventure', location: 'Cherrapunji, Meghalaya, India', price: '₹7,500/-', rating: '4.2 (Very Good)', img: 'https://natureworldwide.in/wp-content/uploads/2023/10/Nohkalikai-Fall-1024x1281.jpg' },
    { id: 10, name: 'Sand Dune Safari & Camping', location: 'Jaisalmer, Rajasthan, India', price: '₹9,000/-', rating: '4.1 (Good)', img: 'https://travelogyindia.b-cdn.net/storage/app/upload/lodhruva.jpg' },
    { id: 11, name: 'White Water Rafting', location: 'Teesta River, Sikkim, India', price: '₹4,200/-', rating: '4.3 (Very Good)', img: 'https://images.wanderon.in/blogs/new/2024/08/sikkim.jpg' },
    { id: 12, name: 'Coorg Coffee Plantation Trek', location: 'Coorg, Karnataka, India', price: '₹3,800/-', rating: '4.2 (Very Good)', img: 'https://media1.thrillophilia.com/filestore/579zkkgxgbpywvssd8k8a8zo13c4_coorg-glenlorna-tea-estate.jpeg' },
    { id: 13, name: 'Zanskar Frozen River Trek', location: 'Ladakh, Jammu & Kashmir, India', price: '₹12,000/-', rating: '4.8 (Excellent)', img: 'https://nomadsofindia.com/wp-content/uploads/2023/08/Birds-Eye-View-of-The-Chadar-Trek-819x1024.jpg' },
    { id: 14, name: 'Munnar Tea Estate Walk', location: 'Munnar, Kerala, India', price: '₹2,500/-', rating: '4.1 (Good)', img: 'https://www.sotc.in/blog/wp-content/uploads/2023/09/munnar-tea-garden.jpg' },
    { id: 15, name: 'Mahabaleshwar Paragliding', location: 'Mahabaleshwar, Maharashtra, India', price: '₹6,500/-', rating: '4.6 (Very Good)', img: 'https://tripxl.com/blog/wp-content/uploads/2024/10/Advanced-Paragliding.jpg' },
    { id: 16, name: 'Andaman Scuba Diving', location: 'Havelock Island, Andaman & Nicobar, India', price: '₹55,500/-', rating: '4.5 (Very Good)', img: 'https://cdn.experienceandamans.com/images/scuba-diving-andaman-islands.jpg' },
    { id: 17, name: 'Ooty Nilgiri Toy Train Ride', location: 'Ooty, Tamil Nadu, India', price: '₹1,200/-', rating: '4.4 (Very Good)', img: 'https://5.imimg.com/data5/SELLER/Default/2023/6/317474042/KG/OY/WB/61387680/12-1--500x500.jpg' },
    { id: 20, name: 'Bungee Jumping in Rishikesh', location: 'Rishikesh, Uttarakhand, India', price: '₹4,500/-', rating: '4.7 (Excellent)', img: 'https://campgangavatika.com/imgart/bungee-jump-rishikesh.jpg' }
];


  const handleBookmark = (tour) => {
    if (bookmarks?.some((bookmark) => bookmark.id === tour.id)) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== tour.id));
    } else {
      setBookmarks([...bookmarks, tour]);
    }
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-tours-container">
      <div className="header-with-search">
        <h2 className="page-title">Explore Tours</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for places...🔎"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="tours-grid">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <div className="tour-main-cover">
              <img src={tour.img} alt={tour.name} />
              <div
                className={`heart-icon ${bookmarks?.some((bookmark) => bookmark.id === tour.id) ? "active" : ""}`}
                onClick={() => handleBookmark(tour)}
              >
                ♥
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
    </div>
  );
};

export default AllTours;
