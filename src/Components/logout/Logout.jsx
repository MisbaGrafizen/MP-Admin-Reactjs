import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove the token
    navigate("/"); // Redirect to the login page
  };

  return (
    <div
      className="absolute bottom-[14px] right-[15px] text-[#fff] rounded-[7px] w-[100px] font-[500] font-Poppins text-center py-[7px] text-[16px] bg-[#ff0000] cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#cc0000] active:scale-95"
      onClick={handleLogout}
    >
      <p>Logout</p>
    </div>
  );
}
