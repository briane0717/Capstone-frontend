import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const handleAddToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5050/api/cart/add", {
        productId,
        quantity: 1,
      });
      // TODO: Update UI to reflect the item was added to the cart
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  // Fetch the products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // empty dependency array means this runs once when the component mounts
  }, []);

  // Show loading state while fetching
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Show error message if there's an error
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>
        <h1>Products</h1>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product._id}>
                Name:{" "}
                <Link to={`/products/${product._id}`}>{product.name}</Link>
                <p>Price: {product.price}</p>
                <p>Stock Status: {product.stockStatus}</p>
                <button onClick={() => handleAddToCart(product._id)}>
                  Add To Cart
                </button>
              </li>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      </div>
      <div></div>
    </>
  );
};

export default Products;
