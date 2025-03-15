import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(null);

  const handleApprove = (orderData) => {
    console.log("Order Approved: ", orderData);
    setSuccess(true);
    setOrderID(orderData.id);
  };

  const handleError = (error) => {
    console.error("PayPal Error: ", error);
    setErrorMessage("Payment failed. Please try again.");
  };

  return (
    <div className="payment-container">
      <h2>Secure Payment</h2>
      <p>Complete your booking by making a payment.</p>

      <PayPalScriptProvider options={{ "client-id": "AVBrSqvs05pv2BY5nSURePwVjBLCMGCLTot4ikN7m9AX7IbGcTLzOZImWYxwDeC_o4NGIzFjWOydofVt" }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: "50.00" }, // Adjust price dynamically
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(handleApprove);
          }}
          onError={handleError}
        />
      </PayPalScriptProvider>

      {success && <div className="success-message">Payment Successful! Order ID: {orderID}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default PaymentForm;
