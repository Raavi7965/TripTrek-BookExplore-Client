import React from "react";

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
      <section style={styles.activitiesSection}>
        <h2 style={styles.title}>SELECT TOURS FROM 30+ ADVENTURE ACTIVITIES</h2>
        <button style={styles.exploreBtn}>EXPLORE TOURS</button>
      </section>

      {/* Why Choose Adventour Section */}
      <section style={styles.whyChooseSection}>
        <h2 style={styles.whyChoose}>WHY CHOOSE <span style={styles.brand}>ADVENTOUR?</span></h2>
        <div style={styles.cards}>
          <div style={{ ...styles.card, backgroundColor: "#e0f0ff" }}>
            <img src="https://via.placeholder.com/50" alt="Guide" />
            <h3 style={styles.cardTitle}>VERIFIED GUIDES</h3>
            <p>Experience assurance, featuring exclusively verified guides and tours for a seamless journey.</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: "#fff3d4" }}>
            <img src="https://via.placeholder.com/50" alt="Curated Tours" />
            <h3 style={styles.cardTitle}>TOP CURATED TOURS</h3>
            <p>Explore curated tours across 30+ categories with customizable filters for nearby adventures.</p>
          </div>
          <div style={{ ...styles.card, backgroundColor: "#ffe5e5" }}>
            <img src="https://via.placeholder.com/50" alt="Easy Cancellation" />
            <h3 style={styles.cardTitle}>EASY CANCELLATION</h3>
            <p>Enjoy peace of mind with our easy cancellation policy—cancel up to 7 days in advance for a full refund.</p>
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
    padding: "80px 20px 20px", // Adjusted padding to account for fixed header
  },
  adventureSection: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '0 auto 30px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
  activitiesSection: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
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
  whyChooseSection: {
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
    flexWrap: "wrap",
  },
  card: {
    width: "250px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
};

export default IndexPage;