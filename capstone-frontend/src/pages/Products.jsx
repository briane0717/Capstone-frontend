import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Products = () => {
  const { setCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post("http://localhost:5050/api/cart/add", {
        productId,
        quantity: 1,
      });

      setCart(response.data);
      setAddedToCart(productId);

      setTimeout(() => {
        setAddedToCart(null);
      }, 2000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: currentPage,
          ...filters,
        });
        const response = await axios.get(
          `http://localhost:5050/api/products?${params}`
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, filters]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="mb-6">
        <div className="flex gap-4 flex-wrap">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
            }
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
            className="border p-2 rounded"
          />

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
            className="border p-2 rounded"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className={`border rounded-lg p-4 shadow ${
              product.quantity === 0 ? "opacity-50" : ""
            }`}
          >
            <Link to={`/products/${product._id}`} className="block mb-2">
              {product.images?.[0] ? (
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
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
              )}
              <h2 className="text-xl font-semibold">{product.name}</h2>
            </Link>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p
              className={`text-sm mb-4 ${
                product.quantity === 0 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {product.quantity === 0
                ? "Out of Stock"
                : `Stock: ${product.quantity}`}
            </p>
            <button
              onClick={() => handleAddToCart(product._id)}
              disabled={product.quantity === 0}
              className={`w-full p-2 rounded ${
                product.quantity === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : addedToCart === product._id
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {product.quantity === 0
                ? "Out of Stock"
                : addedToCart === product._id
                ? "Added!"
                : "Add To Cart"}
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
