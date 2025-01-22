import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/products");
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5050/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Delete Products</h1>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  product.images?.[0]?.startsWith("http")
                    ? product.images[0]
                    : `http://localhost:5050${product.images?.[0]}` ||
                      "/api/placeholder/100/100"
                }
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
                onError={(e) => {
                  if (!e.target.src.includes("/api/placeholder")) {
                    e.target.src = "/api/placeholder/100/100";
                  }
                }}
              />
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No products available</p>
      )}
    </div>
  );
};

export default DeleteProduct;
