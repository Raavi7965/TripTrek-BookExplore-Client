import React from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <div style={styles.container}>
      {/* Adventure Tours Section */}
      <section style={styles.adventureSection}>
        <h1 style={styles.heading}>Connect with expert guides for</h1>
        <h2 style={styles.subHeading}>unforgettable tours.</h2>
        <div style={styles.discoverAdventures}>
          <p style={styles.discoverText}>Discover Adventures:</p>
          <p style={styles.journeyText}>Your Journey, Our Expertise!</p>
        </div>
        <div style={styles.searchContainer}>
          <input type="text" placeholder='Search for "Bengaluru"' style={styles.searchInput} />
          <button style={styles.searchButton}>Search</button>
        </div>
      </section>

      {/* Adventure Activities Section */}
      <header style={styles.header}>
        <p style={styles.subTitle}>SELECT TOURS FROM</p>
        <h1 style={styles.title}>30+ adventure activities</h1>
        <nav style={styles.nav}>
        </nav>
        <Link to="/tours">
          <button style={styles.exploreBtn}>EXPLORE TOURS</button>
        </Link>
      </header>

      {/* Why Choose Adventour Section */}
      <section style={styles.section}>
        <h2 style={styles.whyChoose}>WHY CHOOSE <span style={styles.brand}>Trip Trek?</span></h2>
        <div style={styles.cards}>
          <div style={{ ...styles.card, backgroundColor: "#e0f0ff" }}>
            <img src="https://adventour-explore.vercel.app/man.png" alt="Guide" style={styles.cardImage} />
            <h3 style={styles.cardTitle}>VERIFIED GUIDES</h3>
            <p style={styles.cardText}>Experience assurance, featuring exclusively verified guides and tours for a seamless journey.</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: "#fff3d4" }}>
            <img src="https://adventour-explore.vercel.app/climbing.png" alt="Curated Tours" style={styles.cardImage} />
            <h3 style={styles.cardTitle}>TOP CURATED TOURS</h3>
            <p style={styles.cardText}>Explore curated tours across 30+ categories with customizable filters for nearby adventures.</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: "#ffe5e5" }}>
            <img src="https://adventour-explore.vercel.app/fingerprint-scan.png" alt="Easy Cancellation" style={styles.cardImage} />
            <h3 style={styles.cardTitle}>EASY CANCELLATION</h3>
            <p style={styles.cardText}>Enjoy peace of mind with our easy cancellation policy—cancel up to 7 days in advance for a full refund.</p>
          </div>
        </div>
      </section>

      {/* Top Rated Adventure Tours Section */}
      <section style={styles.section}>
        <h2 style={styles.topRatedTitle}>Top Rated Adventure Tours</h2>
        <div style={styles.topRatedContainer}>
          <div style={styles.topRatedCard}>
            <img src="https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg" alt="Rishikesh Adventure Tour" style={styles.topRatedImage} />
            <h3 style={styles.topRatedCardTitle}>AdvenTour top-3 tours</h3>
            <p>Rishikesh Adventure Tour</p>
            <p>Rated 4.00 (5)</p>
            <p>Starting from ₹15,500</p>
            <button style={styles.bookNowButton}>Book Now</button>
          </div>
          <div style={styles.topRatedCard}>
            <img src="https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716400335/adventour-tour-images/fd2c1244899bedc2_tpyrmo.jpg" alt="Bangalore Trekking Adventure" style={styles.topRatedImage} />
            <h3 style={styles.topRatedCardTitle}>AdvenTour top-3 tours</h3>
            <p>Bangalore Trekking Adventure</p>
            <p>Rated 4.00 (1)</p>
            <p>Starting from ₹3,000</p>
            <button style={styles.bookNowButton}>Book Now</button>
          </div>
          <div style={styles.topRatedCard}>
            <img src="https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg" alt="Manali Adventure Expedition" style={styles.topRatedImage} />
            <h3 style={styles.topRatedCardTitle}>AdvenTour top-3 tours</h3>
            <p>Manali Adventure Expedition</p>
            <p>Rated 4.00 (1)</p>
            <p>Starting from ₹20,000</p>
            <button style={styles.bookNowButton}>Book Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f8fbff",
    padding: "20px",
  },
  adventureSection: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '0 auto 30px',
    backgroundImage: 'url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '2rem',
    color: '#555',
    marginBottom: '20px',
  },
  discoverAdventures: {
    marginBottom: '30px',
  },
  discoverText: {
    fontSize: '1.5rem',
    color: '#444',
    marginBottom: '10px',
  },
  journeyText: {
    fontSize: '1.2rem',
    color: '#666',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '70%',
    marginRight: '10px',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  header: {
    marginBottom: "30px",
  },
  subTitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    fontSize: "16px",
    color: "#aaa",
    marginBottom: "15px",
  },
  active: {
    color: "#27ae60",
    fontWeight: "bold",
    borderBottom: "2px solid #27ae60",
  },
  exploreBtn: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  section: {
    padding: "20px",
  },
  whyChoose: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  brand: {
    color: "#0084ff",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    width: "250px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  cardText: {
    color: "#000", // Set text color to black
  },
  cardImage: {
    width: "100px",
    height: "100px",
    marginBottom: "10px",
  },
  topRatedTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  topRatedContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  topRatedCard: {
    width: "250px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
    color: "#333", // Ensure text color is visible
  },
  topRatedImage: {
    width: "100%",
    height: "150px",
    marginBottom: "10px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  topRatedCardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  bookNowButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const cardHoverStyles = {
  transform: "scale(1.05)",
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

const addHoverEffect = (styles) => ({
  ...styles,
  ":hover": cardHoverStyles,
});

styles.card = addHoverEffect(styles.card);

export default IndexPage;