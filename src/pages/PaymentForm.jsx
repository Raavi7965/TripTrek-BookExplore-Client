import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import "./PaymentForm.css";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(),
      name: "Paris Adventure",
      date: new Date().toLocaleDateString(),
      status: "Confirmed",
    };

    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...storedBookings, newBooking]));

    setPaymentSuccess(true);
    setTimeout(() => {
      navigate("/bookings");
    }, 2000);
  };

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        <div className="payment-box">
          <div className="payment-header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="payment-logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="payment-logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="payment-logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Google_Pay_Logo.svg" alt="Google Pay" className="payment-logo" />
          </div>

          <h2 className="payment-title">Choose a Payment Method</h2>

          <form className="payment-form" onSubmit={handleSubmit}>
            <label>Cardholder Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />

            <label>Card Number</label>
            <div className="input-container">
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="**** **** **** ****" required />
              <FaRegEye className="eye-icon" />
            </div>

            <div className="expiry-cvv">
              <div>
                <label>Expiration Date</label>
                <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="MM/YY" required />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="***" required />
              </div>
            </div>

            <button type="submit" className="payment-button">Pay Now</button>
          </form>

          {paymentSuccess && <div className="success-message">Payment Successful! Redirecting...</div>}

          {/* QR Code Payment Option */}
          <div className="qr-code-container">
            <p>Or pay via QR Code:</p>
            <img src="images/QRcode.jpg" alt="QR Code" className="qr-code" onError={(e) => e.target.style.display='none'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
