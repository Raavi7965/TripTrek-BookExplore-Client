import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full fixed bottom-0 bg-gradient-to-r from-[#0077be] to-[#f011f0] text-white py-6 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Left Section - Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Adventure Awaits!</h2>
          <p className="text-sm mt-1 text-gray-200">
            Plan your next great adventure with us.
          </p>
        </div>

        {/* Middle Section - Social Media Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
             className="text-white text-2xl hover:text-blue-300 transition-transform transform hover:scale-110" 
             aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
             className="text-white text-2xl hover:text-blue-300 transition-transform transform hover:scale-110" 
             aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
             className="text-white text-2xl hover:text-pink-400 transition-transform transform hover:scale-110" 
             aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
             className="text-white text-2xl hover:text-blue-500 transition-transform transform hover:scale-110" 
             aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>

        {/* Right Section - Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="mt-4 md:mt-0 bg-white text-blue-600 hover:bg-gray-200 font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go to Top
        </button>
      </div>

      {/* Footer Text */}
      <p className="text-xs text-center mt-4 text-gray-200">
        &copy; {new Date().getFullYear()} TripTrek: Book & Explore Adventure Planning Platform. 
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
