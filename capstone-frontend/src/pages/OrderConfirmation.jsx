import React from "react";
import { useLocation, Link } from "react-router";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, orderTotal } = location.state || {};

  if (!orderId) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p>Please return to the shop and try again.</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <div className="text-6xl text-green-500 mx-auto mb-4">✓</div>
      <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
      <p className="mb-2">Thank you for your order.</p>
      <p className="mb-4">Order ID: {orderId}</p>
      <p className="text-xl mb-6">Total: ${orderTotal?.toFixed(2)}</p>

      <div className="space-y-4">
        <Link
          to={`/orders/${orderId}?email=${encodeURIComponent(
            location.state.email
          )}`}
          className="block w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          View Order Details
        </Link>
        <Link
          to="/products"
          className="block w-full bg-gray-200 text-gray-800 p-3 rounded hover:bg-gray-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
