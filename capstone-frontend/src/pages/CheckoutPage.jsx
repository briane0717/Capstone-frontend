import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import CartItem from "../components/Cart/CartItem"; // Assuming CartItem component exists

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5050/api/cart");
        setCart(response.data);
      } catch (err) {
        setError("Failed to load cart data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      // Example: Call to checkout API endpoint
      await axios.post("http://localhost:5050/api/checkout", { cart });
      alert("Checkout successful!");
      // Redirect or clear the cart after successful checkout
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("An error occurred during checkout.");
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </ul>
          <h2>Total: ${calculateTotalPrice()}</h2>
          <button onClick={handleCheckout} className="checkout-button">
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Link to="/cart">
        <button className="back-to-cart-button">Back to Cart</button>
      </Link>
    </div>
  );
};

export default CheckoutPage;
