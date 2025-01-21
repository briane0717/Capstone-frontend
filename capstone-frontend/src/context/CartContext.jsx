import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
  });
  console.log("CartContext - cart state:", cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      return { ...prevCart, items: updatedItems };
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.productId !== productId
      );
      return { ...prevCart, items: updatedItems };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        setCart,
        setLoading,
        setError,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing cart context
export const useCart = () => {
  return useContext(CartContext);
};
