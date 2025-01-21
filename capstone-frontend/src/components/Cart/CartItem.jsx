import React from "react";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(item.productId._id, newQuantity);
    }
  };

  return (
    <li className="cart-item">
      <div className="item-details">
        <h3>{item.productId?.name || "Product"}</h3>
        <p>Price: ${item.price?.toFixed(2) || "0.00"}</p>
        <div className="quantity-control">
          <label htmlFor={`quantity-${item.productId._id}`}>Quantity:</label>
          <input
            type="number"
            id={`quantity-${item.productId._id}`}
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <p>
          Subtotal: ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
        </p>

        <button
          onClick={() => {
            console.log("Removing product:", item.productId._id);
            onRemoveItem(item.productId._id);
          }}
          className="remove-button"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
