import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../utils/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setFeaturedProducts(res.data.slice(0, 6)));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Welcome to Saraswati Agro Industries</h1>
          <p>Leading manufacturer of dairy equipment and agro machinery</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn">View Products</Link>
            <a href="#contact" className="btn btn-secondary">Get Quote</a>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="founder fade-in">
        <div className="container">
          <h2>Meet Our Founder</h2>
          <p>Sandip Bhausaheb Avhad - 20+ years experience in dairy automation</p>
          <p>Vision: To revolutionize dairy farming with innovative, affordable equipment</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about fade-in">
        <div className="container">
          <h2>About Us</h2>
          <p>Established in 2002, Saraswati Agro Industries is a leading manufacturer of dairy equipment and agro machinery located in Sangamner, Maharashtra, India.</p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="categories fade-in">
        <div className="container">
          <h2>Product Categories</h2>
          <div className="category-grid">
            <div>Milking Machines</div>
            <div>Vacuum Systems</div>
            <div>Dairy Accessories</div>
            <div>Spare Parts</div>
            <div>Chaff Cutters</div>
            <div>Animal Care Equipment</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured fade-in">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="product-grid">
            {featuredProducts.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose fade-in">
        <div className="container">
          <h2>Why Choose Us</h2>
          <ul>
            <li>20+ years of experience</li>
            <li>Affordable pricing</li>
            <li>Easy maintenance</li>
            <li>Extensive dealer network</li>
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="stats fade-in">
        <div className="container">
          <div className="stat">5000+ Machines Sold</div>
          <div className="stat">20+ Years Experience</div>
          <div className="stat">100+ Dealers</div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials fade-in">
        <div className="container">
          <h2>Testimonials</h2>
          <p>"Excellent quality products and great service!" - Farmer A</p>
          <p>"Reliable equipment for our dairy farm." - Farmer B</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta fade-in">
        <div className="container">
          <h2>Ready to Upgrade Your Dairy Farm?</h2>
          <Link to="/contact" className="btn">Contact Us Today</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;