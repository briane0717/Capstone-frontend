import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center space-x-6">
        <Link
          to="/"
          className="text-3xl font-bold text-white hover:text-blue-200 transition-colors"
        >
          Gifted
        </Link>

        <div className="relative flex-grow max-w-lg">
          <input
            type="text"
            placeholder="Search gifts..."
            className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white border-transparent transition-shadow text-gray-800"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/products"
            className="text-white hover:text-blue-200 transition-colors"
          >
            Products
          </Link>

          <Link
            to="/orders"
            className="text-white hover:text-blue-200 transition-colors"
          >
            Orders
          </Link>

          <Link to="/cart" className="relative group">
            <span className="text-2xl text-white group-hover:text-blue-200 transition-colors">
              🛒
            </span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>

          <Link to="/account">
            <span className="text-2xl text-white hover:text-blue-200 transition-colors">
              👤
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
