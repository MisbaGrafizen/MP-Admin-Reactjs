import React, { useState } from 'react';
import loginimg from '../../../public/img/login.png';
import loginimgdesk from '../../../public/img/Login-Desktop.png';

export default function Login() {

  const [isChecked, setIsChecked] = useState(false);


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
              placeholder="Enter email"
              type="text"
            />
            <input
              className="w-[100%] h-[45px] rounded-[10px] px-[20px] text-[17px] outline-none"
              placeholder="Password"
              type="password"
            />
            <label className="flex gap-[10px] px-[10px] text-[17px] cursor-pointer text-[#fff]">
              <input
                type="checkbox"
                id="custom-checkbox"
                style={{ display: "none" }}
                checked={isChecked}
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
              className="text-white cursor-pointer text-[23px] font-bold bg-[#FEAA00] flex justify-center items-center py-[8px] rounded-[10px] transition duration-300 ease-in-out transform hover:bg-[#e69900] hover:scale-20 active:scale-105"
              onClick={() => {
              }}
            >
              <p>LOGIN</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
