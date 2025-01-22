// Orders.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailFilter, setEmailFilter] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!emailFilter) {
        setOrders([]);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:5050/api/orders", {
          params: { email: emailFilter },
        });
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [emailFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Orders History</h1>

      <div className="mb-6">
        <p className="mb-2 text-sm text-gray-600">Enter email to view orders</p>
        <input
          type="email"
          placeholder="Filter by email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          className="p-2 border rounded w-full max-w-md"
        />
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-4">
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

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>
                    Ship to: {order.customerInfo.shippingAddress.city},{" "}
                    {order.customerInfo.shippingAddress.state}
                  </p>
                  <p>Contact: {order.customerInfo.contactDetails.email}</p>
                </div>
                <Link
                  to={`/orders/${order._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
