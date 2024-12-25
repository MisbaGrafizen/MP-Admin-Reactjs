import React, { useEffect, useState } from "react";
import loginimg from "../../../public/img/login.png";
import loginimgdesk from "../../../public/img/Login-Desktop.png";
import { useDispatch } from "react-redux";
import { loginAdminAction } from "../../redux/action/userMaster";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import { toast } from "../../helper";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  console.log("sadsad", isChecked);

  useEffect(() => {
    const name = Cookies.get("Name");
    const password = Cookies.get("Password");
    console.log(name, password);
    if (name !== undefined && password !== undefined) {
      setFormData({ name: name, password: password });
      setIsChecked(true);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = async () => {
    const { name, password } = formData;

    if (!name || !password) {
      alert("Please fill in both fields.");
      return;
    }
    if (isChecked && name && password) {
      Cookies.set("Name", name, { expires: 1 / 12 });
      Cookies.set("Password", password, { expires: 1 / 12 });
    }

    await dispatch(loginAdminAction(formData)).then((response) => {
      if (response.token !== undefined && response.token !== null) {
        if (!isChecked) {
          Cookies.remove("Name");
          Cookies.remove("Password");
        }
        Cookies.set("authToken", response.token);
        navigate("/dashboard");
      } else {
        console.log("dsfsdhdgfsh", response.message);
        if (response.message) {
          toast(response.message, "error");
        }
      }
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <div className="w-[100%] relative">
        <img
          className="w-[100%] absolute h-[100vh] flex z-[-20] 2xl:hidden"
          src={loginimg}
        />
        <img
          className="w-[100%] absolute h-[100vh] z-[-20] hidden 2xl:flex"
          src={loginimgdesk}
        />

        <div className="z-30 flex h-[100vh] justify-end items-center pt-[16%] mr-[12%]">
          <div className="flex flex-col gap-[30px] w-[400px]">
            <input
              className="w-[100%] h-[45px] rounded-[10px] px-[20px] text-[17px] outline-none"
              placeholder="Enter name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              // onKeyDown={handleKeyPress}
            />
            <input
              className="w-[100%] h-[45px] rounded-[10px] px-[20px] text-[17px] outline-none"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <label className="flex gap-[10px] px-[10px] text-[17px] cursor-pointer text-[#fff]">
              <input
                type="checkbox"
                id="custom-checkbox"
                style={{ display: "none" }}
                // checked={isChecked}
                onChange={handleCheckboxChange}
              />

              <span
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: isChecked ? "#ff8000" : "#fff",
                  borderRadius: "28%",
                  border: "1px solid #ccc",
                  display: "inline-block",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {isChecked && (
                  <span
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "5px",
                      width: "6px",
                      height: "10px",
                      border: "solid white",
                      borderWidth: "0 2px 2px 0",
                      transform: "rotate(45deg)",
                    }}
                  ></span>
                )}
              </span>

              <p>Remember my Preference</p>
            </label>

            <div
              className="text-white cursor-pointer text-[23px] font-bold bg-[#F28C28] flex justify-center items-center py-[8px] rounded-[10px] transition duration-300 ease-in-out transform hover:bg-[#e69900] hover:scale-20 active:scale-105"
              onClick={handleLogin}
            >
              <p>LOGIN</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
