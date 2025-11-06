import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa"; // For eye icon
import "./PaymentForm.css";

const PaymentForm = ({ trip }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'agency'
  const [selectedAgency, setSelectedAgency] = useState('Main Office');

  // Dropdown menu of all trips for selection
  const allTours = [
    { id: 1, name: 'Rishikesh Adventure Tour', date: '2025-04-10', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1706961565/adventour-tour-images/7c8b56c65a2bf64c_snkwfa.jpg', price: 4500 },
    { id: 2, name: 'Manali Adventure Expedition', date: '2025-05-15', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716286536/adventour-tour-images/53cb901e908965cb_okybzk.jpg', price: 6000 },
    { id: 3, name: 'Netrani Island Scuba Diving', date: '2025-06-01', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716398172/adventour-tour-images/00d7dbc98ead7d8e_rmhoyj.jpg', price: 8000 },
    { id: 4, name: 'Bangalore Trekking Adventure', date: '2025-06-10', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716400335/adventour-tour-images/fd2c1244899bedc2_tpyrmo.jpg', price: 3500 },
    { id: 5, name: 'Spiti Valley Trek', date: '2025-07-01', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716450029/adventour-tour-images/b31873046c47eaf0_cdnqzp.jpg', price: 12000 },
    { id: 6, name: 'Kodai Lake Boating', date: '2025-07-15', image: 'https://res.cloudinary.com/dyjbjmpqy/image/upload/v1716454849/adventour-tour-images/726ec4b34adf3b28_qihos0.jpg', price: 2500 },
    { id: 7, name: 'Ladakh Bike Tour', date: '2025-08-01', image: 'https://thedreamridersgroup.com/listing/9/Explore%20Ladakh%20on%20two%20wheels,Morey%20Plains.jpg', price: 15000 },
    { id: 8, name: 'Goa Water Sports', date: '2025-08-10', image: 'https://goaexplocation.com/admin/images/activities/125245011644banana_ride_in_goa.jpeg', price: 3500 },
    { id: 9, name: 'Meghalaya Caving Adventure', date: '2025-09-01', image: 'https://natureworldwide.in/wp-content/uploads/2023/10/Nohkalikai-Fall-1024x1281.jpg', price: 7000 },
    { id: 10, name: 'Sand Dune Safari & Camping', date: '2025-09-15', image: 'https://travelogyindia.b-cdn.net/storage/app/upload/lodhruva.jpg', price: 5000 }
  ];
  const [selectedTourId, setSelectedTourId] = useState(allTours[0].id);
  const bookingTrip = allTours.find(t => t.id === selectedTourId);

  const handleSubmit = (e) => {
    e && e.preventDefault();

    // create booking object depending on payment method
    const user = JSON.parse(localStorage.getItem('user')) || { userName: 'Guest' };
    const newBooking = {
      id: Date.now(),
      userName: user.userName || user.username || user.user || 'Guest',
      name: bookingTrip.name,
      date: bookingTrip.date,
      bookingDate: new Date().toLocaleDateString(),
      status: paymentMethod === 'online' ? 'Confirmed' : 'Pending',
      image: bookingTrip.image,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending',
      amount: bookingTrip.price || bookingTrip.amount || 0,
      agency: paymentMethod === 'agency' ? selectedAgency : undefined
    };

    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    storedBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(storedBookings));

    if (paymentMethod === 'online') {
      console.log("Online payment data submitted:", { name, cardNumber, expiryDate, cvv });
      setPaymentSuccess(true);
      // In a real app you'd call your payment API here.
    } else {
      // Offline / agency payment: just save the booking
      setPaymentSuccess(true);
    }
  };

  // Removed generateInvoice function as invoices are now only available in MyBookings

  return (
    <div className="payment-container">
      <div className="payment-box">
        <div className="payment-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="payment-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="payment-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-logo" />
        </div>

        <h2 className="payment-title">Payment</h2>
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

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: 12 }}>
            <input type="radio" name="paymentMethod" value="online" checked={paymentMethod==='online'} onChange={() => setPaymentMethod('online')} /> Online Payment
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="agency" checked={paymentMethod==='agency'} onChange={() => setPaymentMethod('agency')} /> Pay at Agency (Offline)
          </label>
        </div>

        {paymentMethod === 'online' && (
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

            <button type="submit" className="payment-button">Pay Online</button>
          </form>
        )}

        {paymentMethod === 'agency' && (
          <div style={{ textAlign: 'center' }}>
            <p>Select an agency location to pay in person and pick up your tickets.</p>
            <select value={selectedAgency} onChange={e => setSelectedAgency(e.target.value)}>
              <option>Main Office</option>
              <option>City Branch</option>
              <option>Airport Desk</option>
            </select>
            <div style={{ marginTop: 12 }}>
              <button className="payment-button" onClick={handleSubmit}>Confirm Booking (Pay at Agency)</button>
            </div>
          </div>
        )}

        {paymentSuccess && (
          <div className="success-message">
            Booking created successfully! You can download your invoice from the My Bookings page.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
