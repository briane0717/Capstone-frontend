import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!email) {
        setError("Email is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5050/api/orders/${id}`,
          { params: { email } }
        );
        setOrder(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, email]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!order) return <div className="p-4">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        <p className="mb-2">Order ID: {order._id}</p>
        <p className="mb-2">Status: {order.orderStatus}</p>
        <p className="mb-2">
          Total: ${order.paymentInfo.orderTotal.toFixed(2)}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <p className="mb-2">{order.customerInfo.shippingAddress.street}</p>
        <p className="mb-2">
          {order.customerInfo.shippingAddress.city},{" "}
          {order.customerInfo.shippingAddress.state}{" "}
          {order.customerInfo.shippingAddress.postalCode}
        </p>
        <p className="mb-2">{order.customerInfo.shippingAddress.country}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <ul className="divide-y">
          {order.orderItems.map((item, index) => (
            <li key={index} className="py-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Product ID: {item.product}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  ${item.priceAtPurchase.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
