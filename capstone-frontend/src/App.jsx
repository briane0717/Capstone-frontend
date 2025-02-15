// App.jsx
import { Routes, Route } from "react-router";
import Navbar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import OrderConfirmation from "./pages/OrderConfirmation";
import CreateProduct from "./pages/CreateProduct";
import DeleteProduct from "./pages/DeleteProduct";
import UpdateProduct from "./pages/UpdateProduct";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/delete" element={<DeleteProduct />} />
        <Route path="/products/update" element={<UpdateProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
