import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { setCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5050/api/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    setError(null);

    if (!product) {
      setError("Product not available");
      return;
    }

    if (product.quantity === 0) {
      setError("Product is out of stock");
      return;
    }

    if (quantity > product.quantity) {
      setError(`Only ${product.quantity} item(s) available`);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5050/api/cart/add", {
        productId: id,
        quantity: quantity,
      });

      setCart(response.data);
      setAddedToCart(true);

      setTimeout(() => {
        setAddedToCart(null);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add to cart. Please check product availability."
      );
    }
  };

  const handleQuantityChange = (e) => {
    const inputQuantity = parseInt(e.target.value);

    if (isNaN(inputQuantity)) {
      setQuantity(1);
    } else if (inputQuantity < 1) {
      setQuantity(1);
    } else if (product && inputQuantity > product.quantity) {
      setQuantity(product.quantity);
    } else {
      setQuantity(inputQuantity);
    }
  };

  if (loading) return <div className="p-4">Loading product details...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <div className="mb-6">
        <img
          src={
            product.images?.[0]?.startsWith("http")
              ? product.images[0]
              : `http://localhost:5050${product.images?.[0]}` ||
                "/api/placeholder/400/320"
          }
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
          onError={(e) => {
            if (!e.target.src.includes("/api/placeholder")) {
              e.target.src = "/api/placeholder/400/320";
            }
          }}
        />
      </div>
      {product.quantity === 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Out of Stock</strong> - This product is currently unavailable
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-semibold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
        <p
          className={`font-medium ${
            product.quantity === 0 ? "text-red-500" : "text-green-600"
          }`}
        >
          {product.quantity === 0
            ? "Out of Stock"
            : `Available: ${product.quantity} items`}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="1"
          max={product.quantity}
          value={quantity}
          onChange={handleQuantityChange}
          disabled={product.quantity === 0}
          className="w-20 p-2 border rounded"
        />

        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          className={`flex-grow p-3 rounded transition-colors ${
            product.quantity === 0
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : addedToCart
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {product.quantity === 0
            ? "Out of Stock"
            : addedToCart
            ? "Added to Cart!"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
