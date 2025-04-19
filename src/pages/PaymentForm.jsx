import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa"; // For eye icon
import "./PaymentForm.css";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate booking details
    const newBooking = {
      id: Date.now(), // Unique ID for the booking
      name: "Trip to Rishikesh", // Example trip name
      date: "2025-04-10", // Example trip booking date
      bookingDate: new Date().toLocaleDateString(), // Current date (when the booking is made)
      status: "Confirmed", // Booking status
      image: "https://example.com/rishikesh.jpg", // Example trip image
    };

    // Save booking to localStorage
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