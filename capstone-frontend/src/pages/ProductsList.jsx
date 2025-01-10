import React from "react";

const ProductsList = () => {
  const products = ["Sneakers", "Jackets", "Jeans", "Shirts"];
  return (
    <ul>
      {products.map((product) => (
        <li key={product}>{product}</li>
      ))}
    </ul>
  );
};
export default ProductsList;
