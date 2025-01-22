import React, { useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useCart } from "../context/CartContext";
import CartItem from "../components/Cart/CartItem";
import "../styles/CartPage.css";

const CartPage = () => {
  const { cart, setCart, loading, setLoading, error, setError } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5050/api/cart");
        setCart(response.data || { items: [], totalPrice: 0 });
      } catch (err) {
        setError("Failed to load cart data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCart, setLoading, setError]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/cart/update/${productId}`,
        {
          productId,
          quantity: newQuantity,
        }
      );
      setCart(response.data);
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/cart/remove/${productId}`
      );
      setCart(response.data);
      setError(null);
    } catch (err) {
      console.error("Error details:", err.response?.data);
      setError("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5050/api/cart/clear"
      );
      setCart({ items: [], totalPrice: 0 });
      setError(null);
    } catch (err) {
      console.error("Error clearing cart:", err.response?.data);
      setError("Failed to clear cart");
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart?.items?.length) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {cart.items.map((item, index) => {
          if (!item.productId || !item.productId._id) {
            console.error(`Invalid product at index ${index}:`, item);
            return null;
          }
          return (
            <CartItem
              key={item.productId._id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          );
        })}
      </ul>
      <h2>Total: ${(cart.totalPrice || 0).toFixed(2)}</h2>

      <div className="cart-actions flex justify-between items-center">
        <button
          onClick={handleClearCart}
          className="clear-cart-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        <Link to="/checkout">
          <button className="checkout-button">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
