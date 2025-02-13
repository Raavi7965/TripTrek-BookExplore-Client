import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold">Adventure Awaits!</h2>
        <p className="text-sm my-2">Plan your next great adventure with us.</p>
        <div className="flex justify-center space-x-4 my-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-xl">
            <FaLinkedin />
          </a>
        </div>
        <button onClick={scrollToTop} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Top
        </button>
        <p className="text-xs mt-4">&copy; {new Date().getFullYear()} TripTrek:Book&Explore Adventure Planning Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
