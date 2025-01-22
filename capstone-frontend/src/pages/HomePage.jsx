import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/api/products?limit=3"
        );
        setFeaturedProducts(response.data.products);
      } catch (err) {
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="font-bold text-xl">
              Gifted
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/products" className="hover:text-blue-600">
                Products
              </Link>
              <Link to="/cart" className="hover:text-blue-600">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Gifted
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Exceptional Gifts for Extraordinary Moments
            </p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Featured Products
        </h2>
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="aspect-w-1 aspect-h-1 mb-4">
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
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <Link
                  to={`/products/${product._id}`}
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            to="/products"
            className="bg-white text-gray-900 px-8 py-3 text-xl font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Shop Now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
