import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Gifted
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/products"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/orders"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Orders
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <span className="text-2xl text-gray-600 group-hover:text-blue-600 transition-colors">
                🛒
              </span>
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Account */}
            <Link to="/account">
              <span className="text-2xl text-gray-600 hover:text-blue-600 transition-colors">
                👤
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
