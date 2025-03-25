import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AllTours.css";

const AllTours = ({ bookmarks = [], setBookmarks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tourRatings, setTourRatings] = useState({});
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: 0,
    maxPrice: 50000,
    rating: 0,
    groupSize: 1,
    tripDifficulty: "Easy",
    tripDuration: 1,
    allowedAgeGroups: [],
    adventureGenre: [],
  });
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
    { id: 18, name: 'Bungee Jumping in Rishikesh', location: 'Rishikesh, Uttarakhand, India', price: '₹4,500/-', rating: '4.7 (Excellent)', img: 'https://campgangavatika.com/imgart/bungee-jump-rishikesh.jpg' }
  ];

  const handleBookmark = (tour) => {
    if (bookmarks?.some((bookmark) => bookmark.id === tour.id)) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== tour.id));
    } else {
      setBookmarks([...bookmarks, tour]);
    }
  };

  const handleRating = (tourId, rating) => {
    setTourRatings((prevRatings) => ({
      ...prevRatings,
      [tourId]: rating
    }));
  };

  const renderStars = (tourId) => {
    const rating = tourRatings[tourId] || 0;
    return (
      <span className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "rated" : ""}`}
            onClick={() => handleRating(tourId, star)}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  // Filtering Tours Based on Search and Filter Criteria
  const filteredTours = tours.filter((tour) => {
    const tourPrice = parseInt(tour.price.replace(/[^0-9]/g, ''), 10);
    const tourRating = parseFloat(tour.rating.split(' ')[0]);

    return (
      (tour.name.toLowerCase().includes(searchTerm.toLowerCase()) || tour.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      tourPrice >= filterCriteria.minPrice &&
      tourPrice <= filterCriteria.maxPrice &&
      tourRating >= filterCriteria.rating &&
      (filterCriteria.groupSize === 1 || tour.groupSize >= filterCriteria.groupSize) &&
      (filterCriteria.tripDifficulty === "Easy" || tour.tripDifficulty === filterCriteria.tripDifficulty) &&
      (filterCriteria.tripDuration === 1 || tour.tripDuration >= filterCriteria.tripDuration) &&
      (filterCriteria.allowedAgeGroups.length === 0 || filterCriteria.allowedAgeGroups.some(ageGroup => tour.allowedAgeGroups.includes(ageGroup))) &&
      (filterCriteria.adventureGenre.length === 0 || filterCriteria.adventureGenre.some(genre => tour.adventureGenre.includes(genre)))
    );
  });

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

      <div className="content">
        {/* Filter Section */}
        <div className="filter-section">
          <h3>Filter Tours</h3>
          <label htmlFor="minPrice">Min Price:</label>
          <input 
            type="number" 
            id="minPrice" 
            value={filterCriteria.minPrice}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, minPrice: Number(e.target.value) })}
          />
          <label htmlFor="maxPrice">Max Price:</label>
          <input 
            type="number" 
            id="maxPrice" 
            value={filterCriteria.maxPrice}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, maxPrice: Number(e.target.value) })}
          />
          <label htmlFor="rating">Minimum Rating:</label>
          <select 
            id="rating" 
            value={filterCriteria.rating}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, rating: Number(e.target.value) })}
          >
            <option value={0}>All</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
          <label htmlFor="groupSize">Group Size:</label>
          <select 
            id="groupSize" 
            value={filterCriteria.groupSize}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, groupSize: Number(e.target.value) })}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4 and more</option>
          </select>
          <label htmlFor="tripDifficulty">Trip Difficulty:</label>
          <select 
            id="tripDifficulty" 
            value={filterCriteria.tripDifficulty}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, tripDifficulty: e.target.value })}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <label htmlFor="tripDuration">Trip Duration:</label>
          <select 
            id="tripDuration" 
            value={filterCriteria.tripDuration}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, tripDuration: Number(e.target.value) })}
          >
            <option value={1}>1 day</option>
            <option value={2}>2 days</option>
            <option value={3}>3 days</option>
            <option value={4}>4 and more</option>
          </select>
          <label htmlFor="allowedAgeGroups">Allowed Age Groups:</label>
          <select 
            id="allowedAgeGroups" 
            multiple
            value={filterCriteria.allowedAgeGroups}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, allowedAgeGroups: Array.from(e.target.selectedOptions, option => option.value) })}
          >
            <option value="Children">Children (0 - 11 years)</option>
            <option value="Teenagers">Teenagers (12 - 17 years)</option>
            <option value="Adults">Adults (18 - 64 years)</option>
            <option value="Seniors">Seniors (65+ years)</option>
          </select>
          <label htmlFor="adventureGenre">Select Adventure Genre:</label>
          <select 
            id="adventureGenre" 
            multiple
            value={filterCriteria.adventureGenre}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, adventureGenre: Array.from(e.target.selectedOptions, option => option.value) })}
          >
            <option value="Backpacking">Backpacking</option>
            <option value="Base Jumping">Base Jumping</option>
            <option value="Boating">Boating</option>
            <option value="Bungee Jumping">Bungee Jumping</option>
            <option value="Camping">Camping</option>
            <option value="Canoeing">Canoeing</option>
            <option value="Canyoning">Canyoning</option>
            <option value="Caving">Caving</option>
            <option value="Cross-Country Running">Cross-Country Running</option>
            <option value="Hang Gliding">Hang Gliding</option>
            <option value="Hiking">Hiking</option>
            <option value="Kayaking">Kayaking</option>
            <option value="Mountain Biking">Mountain Biking</option>
            <option value="Off-Roading">Off-Roading</option>
            <option value="Paragliding">Paragliding</option>
            <option value="Parkour">Parkour</option>
            <option value="Rafting">Rafting</option>
            <option value="Rock Climbing">Rock Climbing</option>
            <option value="Safari">Safari</option>
            <option value="Sailing">Sailing</option>
            <option value="Scuba Diving">Scuba Diving</option>
            <option value="Skiing">Skiing</option>
            <option value="Skydiving">Skydiving</option>
            <option value="Snorkeling">Snorkeling</option>
            <option value="Snowboarding">Snowboarding</option>
            <option value="Surfing">Surfing</option>
            <option value="Survival Training">Survival Training</option>
            <option value="Trekking">Trekking</option>
            <option value="Zip Lining">Zip Lining</option>
          </select>
          <label htmlFor="tourRating">Tour Rating:</label>
          <select 
            id="tourRating" 
            value={filterCriteria.rating}
            onChange={(e) => setFilterCriteria({ ...filterCriteria, rating: Number(e.target.value) })}
          >
            <option value={4}>4 & above</option>
            <option value={3}>3 & above</option>
            <option value={2}>2 & above</option>
            <option value={1}>1 & above</option>
          </select>
          <button onClick={() => setFilterCriteria({
            minPrice: 0,
            maxPrice: 50000,
            rating: 0,
            groupSize: 1,
            tripDifficulty: "Easy",
            tripDuration: 1,
            allowedAgeGroups: [],
            adventureGenre: [],
          })}>Clear all filters</button>
        </div>

        <div className="tours-grid">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
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
                  <p>{renderStars(tour.id)}</p>
                  <p>Starting from</p>
                  <p>₹{tour.price}/-</p>
                  <Link to={`/tours/${tour.id}`}>
                    <button className="view-details-button">View Details</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No tours found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTours;