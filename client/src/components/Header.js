import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { cart, toggleCart } = useContext(CartContext);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Saraswati Agro Industries</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin">Admin</Link>
          <button onClick={toggleCart} className="cart-btn">
            Cart ({cart.length})
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;