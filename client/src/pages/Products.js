import React, { useEffect, useState, useContext } from 'react';
import { getProducts } from '../utils/api';
import { CartContext } from '../context/CartContext';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, []);

  useEffect(() => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(filtered);
  }, [category, search, products]);

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="products">
      <div className="container">
        <h1>Our Products</h1>
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">₹{product.price}</p>
              <div className="buttons">
                <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="btn btn-secondary">Buy Now</button>
                <a href={`https://wa.me/1234567890?text=Inquiry about ${product.name}`} className="btn">WhatsApp</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;