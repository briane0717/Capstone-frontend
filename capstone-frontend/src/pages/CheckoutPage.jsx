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
