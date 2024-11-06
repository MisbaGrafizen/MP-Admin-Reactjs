import React from "react";
import "../src/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MasterManege from "./pages/masterManage/MasterManege";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import CreateUser from "./pages/createUser/CreateUser";
import PremvatiMangment from "./pages/premvatiManegment/PremvatiMangment";
import ProductMangement from "./pages/ProductManagement/ProductMangement";
import OrderManagement from "./pages/OrderPage/Order";
import TransectionHistory from "./pages/TransectionHistory/TransectionHistory";
import Login from "./pages/login/Login";
import Cookies from "js-cookie";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const token = Cookies.get("authToken");
  return (
    <>
<Routes>
  <Route
    path="/"
    element={token ? <Navigate to="/master-management" /> : <Login />}
  />

  {/* Protected routes */}
  <Route
    path="/splash-screen"
    element={
      <ProtectedRoute>
        <SplashScreen />
      </ProtectedRoute>
    }
  />
  <Route
    path="/master-management"
    element={
      <ProtectedRoute>
        <MasterManege />
      </ProtectedRoute>
    }
  />
  <Route
    path="/users-management"
    element={
      <ProtectedRoute>
        <CreateUser />
      </ProtectedRoute>
    }
  />
  <Route
    path="/premvati-management"
    element={
      <ProtectedRoute>
        <PremvatiMangment />
      </ProtectedRoute>
    }
  />
  <Route
    path="/product-management"
    element={
      <ProtectedRoute>
        <ProductMangement />
      </ProtectedRoute>
    }
  />
  <Route
    path="/orders-management"
    element={
      <ProtectedRoute>
        <OrderManagement />
      </ProtectedRoute>
    }
  />
  <Route
    path="/transection"
    element={
      <ProtectedRoute>
        <TransectionHistory />
      </ProtectedRoute>
    }
  />
</Routes>
</>
  );
}

export default App;
