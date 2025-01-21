// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post("http://localhost:5050/api/cart/add", {
        productId,
        quantity,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/cart/update/${productId}`,
        {
          productId,
          quantity,
        }
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/cart/remove/${productId}`
      );
      setCart(response.data);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5050/api/cart/clear");
      setCart({ items: [], totalPrice: 0 });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
