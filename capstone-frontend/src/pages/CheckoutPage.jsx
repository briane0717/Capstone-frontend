import React from "react";

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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>

        <label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={shippingInfo.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={shippingInfo.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <h3>Shipping Address</h3>

        <label>
          <input
            type="text"
            name="street"
            placeholder="Address"
            value={shippingInfo.street}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={shippingInfo.country}
            onChange={handleChange}
            required
          />
        </label>
      </form>
    </div>
  );
};

export default CheckoutPage;
