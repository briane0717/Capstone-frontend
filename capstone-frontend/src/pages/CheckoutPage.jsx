import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

import axios from "axios";

const CheckoutPage = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contactDetails: {
      email: "",
      phone: "",
    },
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const validateForm = () => {
    const { contactDetails, shippingAddress } = formData;
    if (!contactDetails.email || !contactDetails.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!contactDetails.phone || contactDetails.phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (!Object.values(shippingAddress).every((value) => value.trim())) {
      setError("Please fill in all shipping address fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const shippingCost = 5.99;
      const totalWithShipping = cart.totalPrice + shippingCost;

      const orderData = {
        customerInfo: {
          name: formData.name,
          contactDetails: formData.contactDetails,
          shippingAddress: formData.shippingAddress,
        },
        orderItems: cart.items.map((item) => ({
          product: item.productId._id,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        })),
        paymentInfo: {
          method: "card",
          orderTotal: totalWithShipping,
        },
        shippingDetails: {
          method: "standard",
          cost: shippingCost,
          estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        },
      };

      const response = await axios.post(
        "http://localhost:5050/api/orders",
        orderData
      );

      if (response.data) {
        await axios.delete("http://localhost:5050/api/cart/clear");
        setCart({ items: [], totalPrice: 0 });
        navigate("/order-confirmation", {
          state: {
            orderId: response.data._id,
            orderTotal: response.data.paymentInfo.orderTotal,
            email: formData.contactDetails.email, // Add this
          },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to process order");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name.includes(".")) {
        const [section, field] = name.split(".");
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  if (!cart?.items?.length) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="email"
              name="contactDetails.email"
              placeholder="Email"
              value={formData.contactDetails.email}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="tel"
              name="contactDetails.phone"
              placeholder="Phone"
              value={formData.contactDetails.phone}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="shippingAddress.street"
              placeholder="Street Address"
              value={formData.shippingAddress.street}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="shippingAddress.city"
                placeholder="City"
                value={formData.shippingAddress.city}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="shippingAddress.state"
                placeholder="State"
                value={formData.shippingAddress.state}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="shippingAddress.postalCode"
                placeholder="Postal Code"
                value={formData.shippingAddress.postalCode}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="shippingAddress.country"
                placeholder="Country"
                value={formData.shippingAddress.country}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cart.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${(cart.totalPrice + 5.99).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
