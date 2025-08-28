import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa"; // For eye icon
import "./PaymentForm.css";

const PaymentForm = ({ trip }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Use trip prop or fallback to defaults
  const bookingTrip = trip || {
    name: "Trip to Rishikesh",
    date: "2025-04-10",
    image: "https://example.com/rishikesh.jpg",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent booking for past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tripDate = new Date(bookingTrip.date);
    tripDate.setHours(0, 0, 0, 0);
    if (tripDate < today) {
      alert("You cannot book a trip for a past date. Please select today or a future date.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      name: bookingTrip.name,
      date: bookingTrip.date,
      bookingDate: new Date().toLocaleDateString(),
      status: "Confirmed",
      image: bookingTrip.image,
    };

    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    storedBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(storedBookings));

    console.log("Payment data submitted:", { name, cardNumber, expiryDate, cvv });
    setPaymentSuccess(true);
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <div className="payment-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="payment-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="payment-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-logo" />
        </div>

        <h2 className="payment-title">Credit Card</h2>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <strong>Booking:</strong> {bookingTrip.name}
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <label>Cardholder Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />

          <label>Card Number</label>
          <div className="input-container">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="**** **** **** ****"
              required
            />
            <FaRegEye className="eye-icon" />
          </div>

          <div className="expiry-cvv">
            <div>
              <label>Expiration Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>

            <div>
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="***"
                required
              />
            </div>
          </div>

          <button type="submit" className="payment-button">Add Card</button>
        </form>

        {paymentSuccess && <div className="success-message">Payment Successful!</div>}
      </div>
    </div>
  );
};

export default PaymentForm;