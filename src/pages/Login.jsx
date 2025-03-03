import React, { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '90vw',
        backgroundImage: "url('https://www.makemebetter.net/wp-content/uploads/2022/11/travel-adv-min.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
          TripTrekBook&Explore Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#555' }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '16px',
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#555' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '16px',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2ecc71',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              transition: 'opacity 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.opacity = '0.8')}
            onMouseOut={(e) => (e.target.style.opacity = '1')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
