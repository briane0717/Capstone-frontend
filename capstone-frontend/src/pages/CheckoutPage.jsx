import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    contactDetails: { email: "", phone: "" },
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that required fields are not empty
    if (
      !shippingInfo.contactDetails.email ||
      !shippingInfo.contactDetails.phone ||
      !shippingInfo.shippingAddress.street ||
      !shippingInfo.shippingAddress.city ||
      !shippingInfo.shippingAddress.state ||
      !shippingInfo.shippingAddress.postalCode ||
      !shippingInfo.shippingAddress.country
    ) {
      setError("Please fill out all required fields.");
      return;
    }
    try {
      const orderData = {
        customerInfo: {
          contactDetails: {
            email: shippingInfo.contactDetails.email,
            phone: shippingInfo.contactDetails.phone,
          },
          shippingAddress: {
            street: shippingInfo.shippingAddress.street,
            city: shippingInfo.shippingAddress.city,
            state: shippingInfo.shippingAddress.state,
            postalCode: shippingInfo.shippingAddress.postalCode,
            country: shippingInfo.shippingAddress.country,
          },
        },
        orderItems: cart.items.map((item) => ({
          product: item.productId._id,
          quantity: item.quantity,
          priceAtPurchase: item.price,
        })),
        paymentInfo: {
          method: "stripe",
          orderTotal: cart.totalPrice,
        },
        shippingDetails: {
          method: "standard",
          cost: 5.99,
          estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        },
      };

      // Send the order data to the backend
      await axios.post("/api/orders", orderData);

      // Clear the cart after submitting the order
      setCart({ items: [], totalPrice: 0 });
      navigate("/order-confirmation");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => {
      if (name.includes("contactDetails")) {
        return {
          ...prevInfo,
          contactDetails: {
            ...prevInfo.contactDetails,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevInfo,
          shippingAddress: {
            ...prevInfo.shippingAddress,
            [name]: value,
          },
        };
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Contact Information</h2>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={shippingInfo.contactDetails.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={shippingInfo.contactDetails.phone}
            onChange={handleChange}
            required
          />
        </label>

        <h3>Shipping Address</h3>
        <label>
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={shippingInfo.shippingAddress.street}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.shippingAddress.city}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingInfo.shippingAddress.state}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingInfo.shippingAddress.postalCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingInfo.shippingAddress.country}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
