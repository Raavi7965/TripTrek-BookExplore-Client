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
      <header style={styles.header}>
        <p style={styles.subTitle}>SELECT TOURS FROM</p>
        <h1 style={styles.title}>30+ adventure activities</h1>
        <nav style={styles.nav}>
        </nav>
        <button style={styles.exploreBtn}>EXPLORE TOURS</button>
      </header>

      {/* Why Choose Adventour Section */}
      <section style={styles.section}>
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
    padding: "20px",
  },
  adventureSection: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    maxWidth: '600px',
    margin: '0 auto 30px',
    backgroundImage: 'url("https://example.com/your-image.jpg")',
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
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
};

export default IndexPage;