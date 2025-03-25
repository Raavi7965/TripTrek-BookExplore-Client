import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AllTours.css";

const AllTours = ({ bookmarks = [], setBookmarks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tourRatings, setTourRatings] = useState({});
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: 0,
    maxPrice: 50000,
    rating: 0,
    groupSize: 1,
    tripDifficulty: "All",
    tripDuration: 0,
    allowedAgeGroups: [],
    adventureGenre: [],
  });
  const location = useLocation();

  // Enhanced tour data with consistent properties for filtering
  const tours = [
    { id: 1, name: 'Rishikesh Adventure Tour', location: 'Rishikesh, Dehradun, Uttarakhand, India', price: 15500, displayPrice: '₹15,500/-', rating: 4.0, displayRating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg', groupSize: 6, tripDifficulty: "Medium", tripDuration: 3, allowedAgeGroups: ["Adults", "Teenagers"], adventureGenre: ["Rafting", "Camping", "Trekking"] },
    { id: 2, name: 'Manali Adventure Expedition', location: 'Manali, Himachal Pradesh, India', price: 20000, displayPrice: '₹20,000/-', rating: 4.0, displayRating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg', groupSize: 8, tripDifficulty: "Hard", tripDuration: 5, allowedAgeGroups: ["Adults"], adventureGenre: ["Skiing", "Trekking", "Camping"] },
    { id: 3, name: 'Netrani Island Scuba Diving', location: 'Uttara Kannada, Karnataka, India', price: 4500, displayPrice: '₹4,500/-', rating: 0, displayRating: 'Unrated', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716398172/adventour-tour-images/00d7dbc98ead7d8e_rmhoyj.jpg', groupSize: 4, tripDifficulty: "Medium", tripDuration: 1, allowedAgeGroups: ["Adults", "Teenagers"], adventureGenre: ["Scuba Diving", "Snorkeling"] },
    { id: 4, name: 'Bangalore Trekking Adventure', location: 'Savandurga, Bengaluru, Karnataka', price: 3000, displayPrice: '₹3,000/-', rating: 4.0, displayRating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716400335/adventour-tour-images/fd2c1244899bedc2_tpyrmo.jpg', groupSize: 10, tripDifficulty: "Easy", tripDuration: 1, allowedAgeGroups: ["Adults", "Teenagers", "Children"], adventureGenre: ["Trekking", "Hiking"] },
    { id: 5, name: 'Spiti Valley Trek', location: 'Spiti Valley, Himachal Pradesh, India', price: 8500, displayPrice: '₹8,500/-', rating: 4.0, displayRating: '4.0 (Good)', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716450029/adventour-tour-images/b31873046c47eaf0_cdnqzp.jpg', groupSize: 6, tripDifficulty: "Hard", tripDuration: 7, allowedAgeGroups: ["Adults"], adventureGenre: ["Trekking", "Camping", "Survival Training"] },
    { id: 6, name: 'Kodai Lake Boating', location: 'Kodaikanal, Dindigul, Tamil Nadu', price: 1500, displayPrice: '₹1,500/-', rating: 0, displayRating: 'Unrated', img: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716454849/adventour-tour-images/726ec4b34adf3b28_qihos0.jpg', groupSize: 4, tripDifficulty: "Easy", tripDuration: 1, allowedAgeGroups: ["Adults", "Teenagers", "Children", "Seniors"], adventureGenre: ["Boating"] },
    { id: 7, name: 'Ladakh Bike Tour', location: 'Leh-Ladakh, Jammu & Kashmir', price: 25000, displayPrice: '₹25,000/-', rating: 4.7, displayRating: '4.7 (Excellent)', img: 'https://thedreamridersgroup.com/listing/9/Explore%20Ladakh%20on%20two%20wheels,Morey%20Plains.jpg', groupSize: 8, tripDifficulty: "Hard", tripDuration: 10, allowedAgeGroups: ["Adults"], adventureGenre: ["Mountain Biking", "Off-Roading"] },
    { id: 8, name: 'Goa Water Sports', location: 'Goa, India', price: 3500, displayPrice: '₹3,500/-', rating: 4.3, displayRating: '4.3 (Very Good)', img: 'https://goaexplocation.com/admin/images/activities/125245011644banana_ride_in_goa.jpeg', groupSize: 2, tripDifficulty: "Easy", tripDuration: 1, allowedAgeGroups: ["Adults", "Teenagers"], adventureGenre: ["Surfing", "Boating", "Sailing"] },
    { id: 9, name: 'Meghalaya Caving Adventure', location: 'Cherrapunji, Meghalaya, India', price: 7500, displayPrice: '₹7,500/-', rating: 4.2, displayRating: '4.2 (Very Good)', img: 'https://natureworldwide.in/wp-content/uploads/2023/10/Nohkalikai-Fall-1024x1281.jpg', groupSize: 6, tripDifficulty: "Medium", tripDuration: 3, allowedAgeGroups: ["Adults"], adventureGenre: ["Caving", "Trekking"] },
    { id: 10, name: 'Sand Dune Safari & Camping', location: 'Jaisalmer, Rajasthan, India', price: 9000, displayPrice: '₹9,000/-', rating: 4.1, displayRating: '4.1 (Good)', img: 'https://travelogyindia.b-cdn.net/storage/app/upload/lodhruva.jpg', groupSize: 10, tripDifficulty: "Easy", tripDuration: 2, allowedAgeGroups: ["Adults", "Teenagers", "Children", "Seniors"], adventureGenre: ["Safari", "Camping"] },
    { id: 11, name: 'White Water Rafting', location: 'Teesta River, Sikkim, India', price: 4200, displayPrice: '₹4,200/-', rating: 4.3, displayRating: '4.3 (Very Good)', img: 'https://images.wanderon.in/blogs/new/2024/08/sikkim.jpg', groupSize: 8, tripDifficulty: "Medium", tripDuration: 1, allowedAgeGroups: ["Adults", "Teenagers"], adventureGenre: ["Rafting"] },
    { id: 12, name: 'Coorg Coffee Plantation Trek', location: 'Coorg, Karnataka, India', price: 3800, displayPrice: '₹3,800/-', rating: 4.2, displayRating: '4.2 (Very Good)', img: 'https://media1.thrillophilia.com/filestore/579zkkgxgbpywvssd8k8a8zo13c4_coorg-glenlorna-tea-estate.jpeg', groupSize: 12, tripDifficulty: "Easy", tripDuration: 2, allowedAgeGroups: ["Adults", "Teenagers", "Seniors"], adventureGenre: ["Trekking", "Hiking"] },
    { id: 13, name: 'Zanskar Frozen River Trek', location: 'Ladakh, Jammu & Kashmir, India', price: 12000, displayPrice: '₹12,000/-', rating: 4.8, displayRating: '4.8 (Excellent)', img: 'https://nomadsofindia.com/wp-content/uploads/2023/08/Birds-Eye-View-of-The-Chadar-Trek-819x1024.jpg', groupSize: 6, tripDifficulty: "Hard", tripDuration: 9, allowedAgeGroups: ["Adults"], adventureGenre: ["Trekking", "Survival Training"] },
    { id: 14, name: 'Munnar Tea Estate Walk', location: 'Munnar, Kerala, India', price: 2500, displayPrice: '₹2,500/-', rating: 4.1, displayRating: '4.1 (Good)', img: 'https://www.sotc.in/blog/wp-content/uploads/2023/09/munnar-tea-garden.jpg', groupSize: 15, tripDifficulty: "Easy", tripDuration: 1, allowedAgeGroups: ["Adults", "Teenagers", "Children", "Seniors"], adventureGenre: ["Hiking"] },
    { id: 15, name: 'Mahabaleshwar Paragliding', location: 'Mahabaleshwar, Maharashtra, India', price: 6500, displayPrice: '₹6,500/-', rating: 4.6, displayRating: '4.6 (Very Good)', img: 'https://tripxl.com/blog/wp-content/uploads/2024/10/Advanced-Paragliding.jpg', groupSize: 1, tripDifficulty: "Medium", tripDuration: 1, allowedAgeGroups: ["Adults"], adventureGenre: ["Paragliding"] },
    { id: 16, name: 'Andaman Scuba Diving', location: 'Havelock Island, Andaman & Nicobar, India', price: 55500, displayPrice: '₹55,500/-', rating: 4.5, displayRating: '4.5 (Very Good)', img: 'https://cdn.experienceandamans.com/images/scuba-diving-andaman-islands.jpg', groupSize: 4, tripDifficulty: "Medium", tripDuration: 5, allowedAgeGroups: ["Adults", "Teenagers"], adventureGenre: ["Scuba Diving", "Snorkeling"] },
    { id: 17, name: 'Ooty Nilgiri Toy Train Ride', location: 'Ooty, Tamil Nadu, India', price: 1200, displayPrice: '₹1,200/-', rating: 4.4, displayRating: '4.4 (Very Good)', img: 'https://5.imimg.com/data5/SELLER/Default/2023/6/317474042/KG/OY/WB/61387680/12-1--500x500.jpg', groupSize: 20, tripDifficulty: "Easy", tripDuration: 1, allowedAgeGroups: ["Adults", "Teenagers", "Children", "Seniors"], adventureGenre: ["Sightseeing"] },
    { id: 18, name: 'Bungee Jumping in Rishikesh', location: 'Rishikesh, Uttarakhand, India', price: 4500, displayPrice: '₹4,500/-', rating: 4.7, displayRating: '4.7 (Excellent)', img: 'https://campgangavatika.com/imgart/bungee-jump-rishikesh.jpg', groupSize: 1, tripDifficulty: "Hard", tripDuration: 1, allowedAgeGroups: ["Adults"], adventureGenre: ["Bungee Jumping"] }
  ];

  // Extract unique values for filter options
  const difficulties = ["All", ...new Set(tours.map(tour => tour.tripDifficulty))];
  const durations = [0, ...new Set(tours.map(tour => tour.tripDuration))].sort((a, b) => a - b);
  const ageGroups = ["Children", "Teenagers", "Adults", "Seniors"];
  const genres = [...new Set(tours.flatMap(tour => tour.adventureGenre))].sort();
  const maxPriceValue = Math.max(...tours.map(tour => tour.price));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

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

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const clearAllFilters = () => {
    setFilterCriteria({
      minPrice: 0,
      maxPrice: maxPriceValue,
      rating: 0,
      groupSize: 1,
      tripDifficulty: "All",
      tripDuration: 0,
      allowedAgeGroups: [],
      adventureGenre: [],
    });
  };

  const toggleAgeGroup = (ageGroup) => {
    setFilterCriteria(prev => {
      if (prev.allowedAgeGroups.includes(ageGroup)) {
        return {
          ...prev,
          allowedAgeGroups: prev.allowedAgeGroups.filter(ag => ag !== ageGroup)
        };
      } else {
        return {
          ...prev,
          allowedAgeGroups: [...prev.allowedAgeGroups, ageGroup]
        };
      }
    });
  };

  const toggleGenre = (genre) => {
    setFilterCriteria(prev => {
      if (prev.adventureGenre.includes(genre)) {
        return {
          ...prev,
          adventureGenre: prev.adventureGenre.filter(g => g !== genre)
        };
      } else {
        return {
          ...prev,
          adventureGenre: [...prev.adventureGenre, genre]
        };
      }
    });
  };

  // Filtering Tours Based on Search and Filter Criteria
  const filteredTours = tours.filter((tour) => {
    // Search term filter
    const matchesSearch = 
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price range filter
    const matchesPrice = 
      tour.price >= filterCriteria.minPrice && 
      tour.price <= filterCriteria.maxPrice;
    
    // Rating filter
    const matchesRating = tour.rating >= filterCriteria.rating;
    
    // Group size filter
    const matchesGroupSize = 
      filterCriteria.groupSize === 1 || 
      tour.groupSize >= filterCriteria.groupSize;
    
    // Trip difficulty filter
    const matchesDifficulty = 
      filterCriteria.tripDifficulty === "All" || 
      tour.tripDifficulty === filterCriteria.tripDifficulty;
    
    // Trip duration filter
    const matchesDuration = 
      filterCriteria.tripDuration === 0 || 
      tour.tripDuration >= filterCriteria.tripDuration;
    
    // Age groups filter
    const matchesAgeGroups = 
      filterCriteria.allowedAgeGroups.length === 0 || 
      filterCriteria.allowedAgeGroups.some(ageGroup => 
        tour.allowedAgeGroups.includes(ageGroup)
      );
    
    // Adventure genre filter
    const matchesGenre = 
      filterCriteria.adventureGenre.length === 0 || 
      filterCriteria.adventureGenre.some(genre => 
        tour.adventureGenre.includes(genre)
      );
    
    return matchesSearch && matchesPrice && matchesRating && 
           matchesGroupSize && matchesDifficulty && matchesDuration && 
           matchesAgeGroups && matchesGenre;
  });

  // Render star rating component
  const renderStars = (tourId) => {
    const rating = tourRatings[tourId] || 0;
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "rated" : ""}`}
            onClick={() => handleRating(tourId, star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filterCriteria.minPrice > 0) count++;
    if (filterCriteria.maxPrice < maxPriceValue) count++;
    if (filterCriteria.rating > 0) count++;
    if (filterCriteria.groupSize > 1) count++;
    if (filterCriteria.tripDifficulty !== "All") count++;
    if (filterCriteria.tripDuration > 0) count++;
    if (filterCriteria.allowedAgeGroups.length > 0) count++;
    if (filterCriteria.adventureGenre.length > 0) count++;
    return count;
  };

  return (
    <div className="all-tours-container">
      <div className="header-with-search">
        <div className="header-top">
          <h2 className="page-title">Explore Tours</h2>
          <div className="filter-toggle-mobile">
            <button onClick={toggleFilter} className="filter-toggle-button">
              {isFilterVisible ? "Hide Filters" : "Show Filters"} 
              {getActiveFilterCount() > 0 && <span className="filter-badge">{getActiveFilterCount()}</span>}
            </button>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for places...🔎"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search-button"
              onClick={() => setSearchTerm("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="content">
        {/* Filter Section */}
        {isFilterVisible && (
          <div className="filter-section">
            <div className="filter-header">
              <h3>Filter Tours</h3>
              {getActiveFilterCount() > 0 && (
                <button 
                  className="clear-filters-button"
                  onClick={clearAllFilters}
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="filter-group">
              <label htmlFor="minPrice">Price Range</label>
              <div className="price-range-inputs">
                <div className="price-input-group">
                  <span className="price-symbol">₹</span>
                  <input 
                    type="number" 
                    id="minPrice" 
                    value={filterCriteria.minPrice}
                    onChange={(e) => setFilterCriteria({ ...filterCriteria, minPrice: Number(e.target.value) })}
                    placeholder="Min"
                    className="price-input"
                  />
                </div>
                <span className="price-range-separator">to</span>
                <div className="price-input-group">
                  <span className="price-symbol">₹</span>
                  <input 
                    type="number" 
                    id="maxPrice" 
                    value={filterCriteria.maxPrice}
                    onChange={(e) => setFilterCriteria({ ...filterCriteria, maxPrice: Number(e.target.value) })}
                    placeholder="Max"
                    className="price-input"
                  />
                </div>
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="rating">Minimum Rating</label>
              <select 
                id="rating" 
                value={filterCriteria.rating}
                onChange={(e) => setFilterCriteria({ ...filterCriteria, rating: Number(e.target.value) })}
              >
                <option value={0}>Any Rating</option>
                <option value={3}>3+ Stars</option>
                <option value={3.5}>3.5+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="tripDifficulty">Trip Difficulty</label>
              <select 
                id="tripDifficulty" 
                value={filterCriteria.tripDifficulty}
                onChange={(e) => setFilterCriteria({ ...filterCriteria, tripDifficulty: e.target.value })}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === "All" ? "Any Difficulty" : difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="tripDuration">Trip Duration</label>
              <select 
                id="tripDuration" 
                value={filterCriteria.tripDuration}
                onChange={(e) => setFilterCriteria({ ...filterCriteria, tripDuration: Number(e.target.value) })}
              >
                <option value={0}>Any Duration</option>
                <option value={1}>1 Day</option>
                <option value={2}>2+ Days</option>
                <option value={3}>3+ Days</option>
                <option value={5}>5+ Days</option>
                <option value={7}>7+ Days</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="groupSize">Group Size</label>
              <select 
                id="groupSize" 
                value={filterCriteria.groupSize}
                onChange={(e) => setFilterCriteria({ ...filterCriteria, groupSize: Number(e.target.value) })}
              >
                <option value={1}>Any Size</option>
                <option value={2}>2+ People</option>
                <option value={4}>4+ People</option>
                <option value={6}>6+ People</option>
                <option value={10}>10+ People</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Age Groups</label>
              <div className="checkbox-group">
                {ageGroups.map(ageGroup => (
                  <div key={ageGroup} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id={`age-${ageGroup}`} 
                      checked={filterCriteria.allowedAgeGroups.includes(ageGroup)}
                      onChange={() => toggleAgeGroup(ageGroup)}
                    />
                    <label htmlFor={`age-${ageGroup}`}>{ageGroup}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>Adventure Type</label>
              <div className="checkbox-group scrollable">
                {genres.map(genre => (
                  <div key={genre} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      id={`genre-${genre}`} 
                      checked={filterCriteria.adventureGenre.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                    />
                    <label htmlFor={`genre-${genre}`}>{genre}</label>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={clearAllFilters} className="clear-all-button">
              Clear all filters
            </button>
          </div>
        )}

        <div className="tours-grid">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <div key={tour.id} className="tour-card">
                <div className="tour-main-cover">
                  <img src={tour.img || "/placeholder.svg"} alt={tour.name} />
                  <div
                    className={`heart-icon ${bookmarks?.some((bookmark) => bookmark.id === tour.id) ? "active" : ""}`}
                    onClick={() => handleBookmark(tour)}
                  >
                    ♥
                  </div>
                  {tour.tripDifficulty && (
                    <div className={`difficulty-badge ${tour.tripDifficulty.toLowerCase()}`}>
                      {tour.tripDifficulty}
                    </div>
                  )}
                  {tour.tripDuration && (
                    <div className="duration-badge">
                      {tour.tripDuration === 1 ? "1 Day" : `${tour.tripDuration} Days`}
                    </div>
                  )}
                </div>
                <div className="tour-details">
                  <h3>{tour.name}</h3>
                  <p className="tour-location">{tour.location}</p>
                  <div className="tour-rating">
                    {tour.rating > 0 ? (
                      <div className="stars-display">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={`star ${star <= tour.rating ? "filled" : ""}`}>
                            ★
                          </span>
                        ))}
                        <span className="rating-text">{tour.rating.toFixed(1)}</span>
                      </div>
                    ) : (
                      <span className="unrated">Unrated</span>
                    )}
                  </div>
                  <div className="user-rating">
                    {renderStars(tour.id)}
                  </div>
                  <div className="tour-genres">
                    {tour.adventureGenre.slice(0, 2).map(genre => (
                      <span key={genre} className="genre-tag">{genre}</span>
                    ))}
                    {tour.adventureGenre.length > 2 && (
                      <span className="genre-tag more">+{tour.adventureGenre.length - 2}</span>
                    )}
                  </div>
                  <p className="price-label">Starting from</p>
                  <p className="tour-price">{tour.displayPrice}</p>
                  <Link to={`/tours/${tour.id}`}>
                    <button className="view-details-button">View Details</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results-container">
              <div className="no-results-icon">🔍</div>
              <p className="no-results">No tours found</p>
              <p className="no-results-message">Try adjusting your filters or search criteria</p>
              <button onClick={clearAllFilters} className="reset-filters-button">
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllTours;
