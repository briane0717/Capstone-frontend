import React, { useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!orderId || !email) {
      setError("Please enter both order ID and email");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5050/api/orders", {
        params: { orderId, email },
      });
      setOrder(response.data[0]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order Lookup</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="p-2 border rounded w-full max-w-md mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded w-full max-w-md mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {error && <div className="p-4 mb-4 text-red-500">Error: {error}</div>}

      {loading ? (
        <div className="p-4">Loading...</div>
      ) : order ? (
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold">Order ID: {order._id}</p>
              <p className="text-sm text-gray-600">
                Placed on: {formatDate(order.createdAt)}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          <div className="mb-4">
            <p>Items: {order.orderItems.length}</p>
            <p>Total: ${order.paymentInfo.orderTotal.toFixed(2)}</p>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              Ship to: {order.customerInfo.shippingAddress.city},{" "}
              {order.customerInfo.shippingAddress.state}
            </p>
            <p>Contact: {order.customerInfo.contactDetails.email}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
