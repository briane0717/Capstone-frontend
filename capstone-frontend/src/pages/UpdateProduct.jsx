import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description,
        quantity: selectedProduct.quantity,
        category: selectedProduct.category || "",
      });
    }
  }, [selectedProduct]);

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

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const response = await axios.put(
        `http://localhost:5050/api/products/${selectedProduct._id}`,
        formData
      );

      const updatedProducts = products.map((p) =>
        p._id === selectedProduct._id ? response.data : p
      );

      setProducts(updatedProducts);
      setSelectedProduct(null);
      setFormData({
        name: "",
        price: "",
        description: "",
        quantity: "",
        category: "",
      });

      alert("Product updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
    }
  };

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Products</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Product List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select a Product</h2>
          {products.map((product) => (
            <div
              key={product._id}
              className={`border rounded-lg p-4 cursor-pointer ${
                selectedProduct?._id === product._id
                  ? "border-blue-500 bg-blue-50"
                  : ""
              }`}
              onClick={() => handleProductSelect(product)}
            >
              <div className="flex space-x-4">
                <img
                  src={
                    product.images?.[0]?.startsWith("http")
                      ? product.images[0]
                      : `http://localhost:5050${product.images?.[0]}` ||
                        "/api/placeholder/100/100"
                  }
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    if (!e.target.src.includes("/api/placeholder")) {
                      e.target.src = "/api/placeholder/100/100";
                    }
                  }}
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    Stock: {product.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Update Form */}
        {selectedProduct && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="drinkware">Drinkware</option>
                  <option value="apparel">Clothing</option>
                  <option value="trinkets">Trinkets</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
