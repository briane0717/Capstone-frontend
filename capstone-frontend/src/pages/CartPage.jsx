import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router";

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

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

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:5050/api/cart/update/${productId}`, {
        productId,
        quantity,
      });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5050/api/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Cart</h1>
      {cart.items.length > 0 ? (
        <>
          {cart.items.map((item) => (
            <div key={item.productId._id}>
              <h3>{item.productId.name}</h3>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.productId._id, parseInt(e.target.value))
                }
              />
              <button onClick={() => removeItem(item.productId._id)}>
                Remove
              </button>
            </div>
          ))}
          <div>
            <h3>Total: ${cart.totalPrice}</h3>
            <button onClick={() => navigate("/checkout")}>Checkout</button>
          </div>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};
export default CartPage;
