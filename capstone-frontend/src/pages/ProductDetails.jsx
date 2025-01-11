import React, { useState, useEffect } from "react";
import { useParams } from "react-router"; // To access the product ID from the URL
import axios from "axios"; // Import axios

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product data based on the ID using Axios
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/api/product/${id}`
        );
        setProduct(response.data); // Set the product data in the state
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
};

export default ProductDetails;
