import React from "react";
import "../src/App.css";
import { Route, Routes } from "react-router-dom";

import MasterManege from "./pages/masterManage/MasterManege";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import CreateUser from "./pages/createUser/CreateUser";
import PremvatiMangment from "./pages/premvatiManegment/PremvatiMangment";
import ProductMangement from "./pages/ProductManagement/ProductMangement";
import OrderManagement from "./pages/OrderPage/Order";
import TransectionHistory from "./pages/TransectionHistory/TransectionHistory";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/splash-screen" element={<SplashScreen />} />
        <Route path="/master-management" element={<MasterManege />} />
        <Route path="/users-management" element={<CreateUser />} />
        <Route path="/premvati-management" element={<PremvatiMangment />} />
        <Route path="/product-management" element={<ProductMangement />} />
        <Route path="/orders-management" element={<OrderManagement />} />
        <Route path="/transection" element={<TransectionHistory />} />
      </Routes>
    </>
  );
}

export default App;
