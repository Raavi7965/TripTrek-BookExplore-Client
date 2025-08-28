import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa"; // For eye icon
import "./PaymentForm.css";

const PaymentForm = ({ trip }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dropdown menu of all trips for selection
  const allTours = [
    { id: 1, name: 'Rishikesh Adventure Tour', date: '2025-04-10', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg' },
    { id: 2, name: 'Manali Adventure Expedition', date: '2025-05-15', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg' },
    { id: 3, name: 'Netrani Island Scuba Diving', date: '2025-06-01', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716398172/adventour-tour-images/00d7dbc98ead7d8e_rmhoyj.jpg' },
    { id: 4, name: 'Bangalore Trekking Adventure', date: '2025-06-10', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716400335/adventour-tour-images/fd2c1244899bedc2_tpyrmo.jpg' },
    { id: 5, name: 'Spiti Valley Trek', date: '2025-07-01', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716450029/adventour-tour-images/b31873046c47eaf0_cdnqzp.jpg' },
    { id: 6, name: 'Kodai Lake Boating', date: '2025-07-15', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716454849/adventour-tour-images/726ec4b34adf3b28_qihos0.jpg' },
    { id: 7, name: 'Ladakh Bike Tour', date: '2025-08-01', image: 'https://thedreamridersgroup.com/listing/9/Explore%20Ladakh%20on%20two%20wheels,Morey%20Plains.jpg' },
    { id: 8, name: 'Goa Water Sports', date: '2025-08-10', image: 'https://goaexplocation.com/admin/images/activities/125245011644banana_ride_in_goa.jpeg' },
    { id: 9, name: 'Meghalaya Caving Adventure', date: '2025-09-01', image: 'https://natureworldwide.in/wp-content/uploads/2023/10/Nohkalikai-Fall-1024x1281.jpg' },
    { id: 10, name: 'Sand Dune Safari & Camping', date: '2025-09-15', image: 'https://travelogyindia.b-cdn.net/storage/app/upload/lodhruva.jpg' }
  ];
  const [selectedTourId, setSelectedTourId] = useState(allTours[0].id);
  const bookingTrip = allTours.find(t => t.id === selectedTourId);

  const handleSubmit = (e) => {
    e.preventDefault();

    

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
          <label>
            <strong>Select Trip to Book: </strong>
            <select
              value={selectedTourId}
              onChange={e => setSelectedTourId(Number(e.target.value))}
              style={{ marginLeft: 8 }}
            >
              {allTours.map(tour => (
                <option value={tour.id} key={tour.id}>{tour.name}</option>
              ))}
            </select>
          </label>
        </div>
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