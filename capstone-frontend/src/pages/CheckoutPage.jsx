import React from "react";

const CheckoutPage = () => {
  const [shippingInfo, setShippingInfo] = useState({
    contactDetails: { email: "", phone: "" },
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      postleCode: "",
      country: "",
    },
  });
  return <div></div>;
};

export default CheckoutPage;
