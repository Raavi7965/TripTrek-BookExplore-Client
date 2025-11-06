import React, { useState, useEffect } from "react";
import html2pdf from 'html2pdf.js';
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const cancelBooking = (id) => {
    // Remove the booking with the given ID
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const handleGenerateInvoice = async (booking) => {
    try {
      // Create invoice content with default values if needed
      const invoice = {
        invoiceNumber: `INV-${booking.id || Date.now()}`,
        date: new Date().toLocaleDateString(),
        customerName: booking.userName || localStorage.getItem('userName') || 'Guest',
        adventure: booking.name || 'Adventure Package',
        amount: Number(booking.price || booking.amount || 0).toLocaleString(),
        paymentMethod: booking.paymentMethod || 'Online Payment',
        paymentStatus: booking.status || 'Confirmed',
        bookingDate: new Date(booking.bookingDate || Date.now()).toLocaleDateString()
      };

      // Create invoice element
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <div style="text-align: center; border-bottom: 2px solid #0077be; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="color: #0077be; margin: 0 0 10px 0;">TripTrek Booking Invoice</h1>
            <p style="margin: 5px 0;">Invoice #: ${invoice.invoiceNumber}</p>
            <p style="margin: 5px 0;">Generated on: ${invoice.date}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <div style="margin-bottom: 10px;">
              <strong>Customer Name:</strong> ${invoice.customerName}
            </div>
            <div style="margin-bottom: 10px;">
              <strong>Adventure:</strong> ${invoice.adventure}
            </div>
            <div style="margin-bottom: 10px;">
              <strong>Booking Date:</strong> ${invoice.bookingDate}
            </div>
            <div style="margin-bottom: 10px;">
              <strong>Payment Method:</strong> ${invoice.paymentMethod}
            </div>
            <div style="margin-bottom: 10px;">
              <strong>Payment Status:</strong> ${invoice.paymentStatus}
            </div>
            <div style="font-size: 1.2em; color: #0077be;">
              <strong>Amount:</strong> ₹${invoice.amount}
            </div>
          </div>
          
          <div style="text-align: center; color: #666; margin-top: 30px;">
            <p style="margin: 5px 0;"><em>Thank you for choosing TripTrek!</em></p>
            <p style="font-size: 12px; margin: 5px 0;">This is a computer-generated invoice and does not require a signature.</p>
          </div>
        </div>
      `;

      // PDF generation options
      const opt = {
        margin: 1,
        filename: `TripTrek-Invoice-${booking.id || 'booking'}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          logging: false,
          useCORS: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        }
      };

      // Generate and download PDF
      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Unable to generate PDF. Please ensure you have a stable internet connection and try again.');
    }
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
                {booking.image && (
                  <img src={booking.image} alt={booking.name} style={{ maxWidth: '200px', borderRadius: '8px' }} />
                )}
                <p>Status: {booking.status}</p>
                <div className="booking-actions">
                  <button className="cancel-button" onClick={() => cancelBooking(booking.id)}>
                    Cancel Booking
                  </button>
                  <button className="invoice-button" onClick={() => handleGenerateInvoice(booking)}>
                    Download Invoice 🧾
                  </button>
                </div>
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