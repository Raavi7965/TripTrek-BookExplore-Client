import React, { useState, useEffect } from "react";
import "./mybookings.css"

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const cancelBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>

      <section className="bookings-section">
        {bookings.length > 0 ? (
          <ul className="booking-list">
            {bookings.map((booking) => (
              <li key={booking.id} className="booking-item">
                <h3>{booking.name}</h3>
                <p>Date: {booking.date}</p>
                <p>Status: {booking.status}</p>
                <button className="cancel-button" onClick={() => cancelBooking(booking.id)}>
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-results">
            <h2>No bookings found!</h2>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-booking-flight-ticket-illustration-download-in-svg-png-gif-file-formats--online-plane-business-and-travel-pack-illustrations-5638227.png?f=webp" alt="No bookings found" />
          </div>
        )}
      </section>
    </div>
  );
};

export default MyBookings;
