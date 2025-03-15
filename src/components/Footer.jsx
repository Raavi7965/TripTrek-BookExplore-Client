import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Left Section - Branding */}
        <div className="footer-branding">
          <h2 className="footer-title">Adventure Awaits!</h2>
          <p className="footer-subtitle">
            Plan your next great adventure with us.
          </p>
        </div>

        {/* Middle Section - Social Media Icons */}
        <div className="footer-social-icons">
          {[
            { href: "https://facebook.com", icon: <FaFacebook />, hover: "hover:text-blue-400" },
            { href: "https://twitter.com", icon: <FaTwitter />, hover: "hover:text-blue-400" },
            { href: "https://instagram.com", icon: <FaInstagram />, hover: "hover:text-pink-400" },
            { href: "https://linkedin.com", icon: <FaLinkedin />, hover: "hover:text-blue-500" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`footer-icon ${item.hover}`}
              aria-label="Social Media Link"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Right Section - Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button"
        >
          Go to Top🔝
        </button>
      </div>

      {/* Footer Text */}
      <p className="footer-text">
        &copy; {new Date().getFullYear()} <span className="footer-bold">TripTrek</span>: Book & Explore Adventure Planning Platform. 
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

// CSS styles
const styles = `
.footer-container {
position: "fixed",
    bottom: 0,
    left: 0,
  width: 100%;
  background: linear-gradient(to right, #0077be, #f011f0);
  color: white;
  padding: 12px 0;
  box-shadow: 0 50px 50px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 5000px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (min-width: 777px) {
  .footer-content {
    flex-direction: row;
  }
}

.footer-branding {
  text-align: center;
  margin-bottom: 30px;
}

@media (min-width: 777px) {
  .footer-branding {
    text-align: left;
    margin-bottom: 10px;
  }
}

.footer-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
}

.footer-subtitle {
  font-size: 14px;
  color: #ddd;
}

.footer-social-icons {
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
}

@media (min-width: 777px) {
  .footer-social-icons {
    margin-bottom: 10;
  }
}

.footer-icon {
  font-size: 30px;
  transition: transform 0.3s, color 0.3s;
}

.footer-icon:hover {
  transform: scale(1.5);
}

.scroll-to-top-button {
  background: white;
  color: #0077be;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: background 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.scroll-to-top-button:hover {
  background: #f0f0f0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.footer-text {
  font-size: 12px;
  color: #ddd;
  margin-top: 20px;
}

.footer-bold {
  font-weight: 900;
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);