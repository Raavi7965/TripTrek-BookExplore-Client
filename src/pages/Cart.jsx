import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePay = () => {
    // For demo: just clear cart and redirect to payment
    navigate("/payment");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: 16 }}>
                <img src={item.image} alt={item.name} style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8, marginRight: 12 }} />
                <span style={{ fontWeight: "bold" }}>{item.name}</span> - {item.date || ""}
                <button style={{ marginLeft: 16 }} onClick={() => handleRemove(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handlePay} style={{ marginTop: 20, background: '#2ecc71', color: 'white', border: 'none', borderRadius: 5, padding: '10px 20px', cursor: 'pointer' }}>Pay Now</button>
        </>
      )}
    </div>
  );
};

export default Cart;
