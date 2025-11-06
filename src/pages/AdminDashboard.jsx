import React, { useEffect, useState } from "react";
import html2pdf from 'html2pdf.js';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try to fetch bookings with user details
        const res = await fetch('https://triptrek-bookexplore-server.onrender.com/bookings?_expand=user');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        setBookings(data || []);
      } catch (e) {
        // Fallback: try relative path (useful for local json-server) or use mock data
        try {
          const res2 = await fetch('/bookings?_expand=user');
          if (res2.ok) {
            const d2 = await res2.json();
            setBookings(d2 || []);
            setLoading(false);
            return;
          }
        } catch (e2) {
          // ignore
        }

        // final fallback: mock sample data
        const mock = [
          { 
            id: 1, 
            userName: "Durga Prasad",
            adventureName: "Goa Water Sports",
            paymentStatus: 'paid',
            bookingDate: '2025-11-05',
            amount: 3500
          },
          { 
            id: 2, 
            userName: "Srinivas N",
            adventureName: "Himalayan Trek",
            paymentStatus: 'pending',
            bookingDate: '2025-11-06',
            amount: 12000
          },
          { 
            id: 3, 
            userName: "Venkatesh K",
            adventureName: "Scuba Diving",
            paymentStatus: 'paid',
            bookingDate: '2025-11-06',
            amount: 8000
          }
        ];
        setBookings(mock);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const totalBookings = bookings.length;
  const totalAmount = bookings.reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const paymentCounts = bookings.reduce((acc, b) => {
    const key = (b.paymentStatus || b.payment || b.status || 'unknown').toString().toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  
  const paymentMethodCounts = bookings.reduce((acc, b) => {
    const method = (b.paymentMethod || 'unknown').toString().toLowerCase();
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const handleGenerateInvoice = async (booking) => {
    // Create invoice content
    const invoice = {
      invoiceNumber: `INV-${booking.id}-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      customerName: booking.userName || booking.user?.userName,
      adventure: booking.adventureName,
      amount: booking.amount,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      bookingDate: booking.bookingDate
    };

    // Create invoice HTML
    const invoiceHtml = `
      <div id="invoice" style="font-family: Arial; padding: 20px; max-width: 800px; margin: auto;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0077be; padding-bottom: 20px;">
          <h1 style="color: #0077be; margin-bottom: 10px;">TripTrek Booking Invoice</h1>
          <p style="margin: 5px;">Invoice #: ${invoice.invoiceNumber}</p>
          <p style="margin: 5px;">Generated on: ${invoice.date}</p>
        </div>
        <div style="margin-bottom: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px;"><strong>Customer Name:</strong></td>
              <td style="padding: 8px;">${invoice.customerName}</td>
              <td style="padding: 8px;"><strong>Booking Date:</strong></td>
              <td style="padding: 8px;">${invoice.bookingDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Adventure:</strong></td>
              <td style="padding: 8px;">${invoice.adventure}</td>
              <td style="padding: 8px;"><strong>Payment Status:</strong></td>
              <td style="padding: 8px;">${invoice.paymentStatus}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Payment Method:</strong></td>
              <td style="padding: 8px;">${invoice.paymentMethod}</td>
              <td style="padding: 8px;"><strong>Amount:</strong></td>
              <td style="padding: 8px; font-size: 18px; color: #0077be;">₹${invoice.amount.toLocaleString()}</td>
            </tr>
          </table>
        </div>
        <div style="margin-top: 40px; text-align: center; color: #666;">
          <p><em>Thank you for choosing TripTrek!</em></p>
          <p style="font-size: 12px;">This is a computer-generated invoice and does not require a signature.</p>
        </div>
      </div>
    `;

    // Create a container for the invoice
    const container = document.createElement('div');
    container.innerHTML = invoiceHtml;
    document.body.appendChild(container);

    // Configure pdf options
    const options = {
      margin: 10,
      filename: `TripTrek-Invoice-${booking.id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // Generate PDF
      const element = container.firstChild;
      await html2pdf().from(element).set(options).save();
      
      // Show success message
      alert('Invoice has been generated and downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      // Clean up
      document.body.removeChild(container);
    }
  };

  return (
    <div className="admin-dashboard-root">
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading booking data…</p>
      ) : (
        <div className="cards">
          <div className="card">
            <h3>Total bookings</h3>
            <p className="numeric">{totalBookings}</p>
          </div>
          <div className="card">
            <h3>Total revenue</h3>
            <p className="numeric">₹{totalAmount.toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Payment status</h3>
            <div className="list">
              {Object.keys(paymentCounts).map(k => (
                <div key={k} className="list-item"><strong>{k}</strong>: {paymentCounts[k]}</div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Payment methods</h3>
            <div className="list">
              {Object.keys(paymentMethodCounts).map(k => (
                <div key={k} className="list-item">
                  <strong>{k === 'agency' ? 'Agency Payment' : k === 'online' ? 'Online Payment' : k}</strong>: 
                  {paymentMethodCounts[k]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <h2>Recent bookings</h2>
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Name</th>
              <th>Adventure Place</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id || JSON.stringify(b)}>
                <td>{b.id}</td>
                <td>{b.userName || b.user?.userName || '-'}</td>
                <td>{b.adventureName || b.adventure?.name || '-'}</td>
                <td>{b.bookingDate || '-'}</td>
                <td>₹{(b.amount || 0).toLocaleString()}</td>
                <td>
                  <span className={`method-${b.paymentMethod?.toLowerCase() || 'unknown'}`}>
                    {b.paymentMethod === 'agency' ? 'Agency Payment' : 
                     b.paymentMethod === 'online' ? 'Online Payment' : 
                     b.paymentMethod || 'Unknown'}
                  </span>
                </td>
                <td>
                  <span className={`status-${b.paymentStatus?.toLowerCase() || 'unknown'}`}>
                    {b.paymentStatus || b.payment || b.status || 'unknown'}
                  </span>
                </td>
                <td>
                  <button 
                    className="invoice-btn"
                    onClick={() => handleGenerateInvoice(b)}
                    title="Generate Invoice"
                  >
                    🧾 Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
