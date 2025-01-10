import React from "react";
import { useParams } from "react-router";
const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>"You are viewing product {id} ".</h1>
    </div>
  );
};

export default ProductDetails;
