import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Fetch the products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5050/api/product");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []); // empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            Name:
            <Link to={`/products/${product._id}`}> {product.name}</Link>
            <p>Price:{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
