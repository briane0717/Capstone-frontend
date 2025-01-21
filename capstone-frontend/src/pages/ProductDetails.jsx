import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    console.log("Button Clicked");
    try {
      const response = await axios.post("http://localhost:5050/api/cart/add", {
        productId: id,
        quantity: quantity,
      });
      setAddedToCart(true);
      // console.log("Added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.images?.[0]} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Available: {product.quantity}</p>
      <div>
        <input
          type="number"
          min="1"
          max={product.quantity}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.min(parseInt(e.target.value), product.quantity))
          }
        />
        <button onClick={handleAddToCart}>
          {addedToCart ? "Added!" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
