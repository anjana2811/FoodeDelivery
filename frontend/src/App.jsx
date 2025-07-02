import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerHome from "./pages/CustomerHome";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddRestaurantForm from "./pages/AddRestaurantForm";
import AddFoodForm from "./pages/AddFoodForm";
import FoodList from "./pages/FoodList";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import OwnerFoods from "./pages/owner/OwnerFoods";
import OwnerOrders from "./pages/owner/OwnerOrders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/customer" element={<CustomerHome />} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/owner" element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>} />
              <Route path="/add-restaurant" element={<ProtectedRoute role="owner"><AddRestaurantForm /></ProtectedRoute>} />
              <Route path="/add-food" element={<ProtectedRoute role="owner"><AddFoodForm /></ProtectedRoute>} />
              <Route path="/foods/:restaurantId" element={<FoodList />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/owner/foods/:restaurantId" element={<ProtectedRoute role="owner"><OwnerFoods /></ProtectedRoute>} />
              <Route path="/owner/orders/:restaurantId" element={<ProtectedRoute role="owner"><OwnerOrders /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App; 