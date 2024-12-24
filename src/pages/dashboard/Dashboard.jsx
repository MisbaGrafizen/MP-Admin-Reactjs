import React from "react";
import Header from "../../Components/header/Header";
import Logout from "../../Components/logout/Logout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="w-[99%] md11:w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  md11:py-[34px] md150:py-[48px] md11:px-[30px] md150:px-[40px]  mx-auto   my-auto ">
        <div className="  mx-auto flex gap-[30px] w-[100%] md11:h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#F28C28]">
          <div className="flex absolute gap-[10px] left-[3%]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
            <i
              className="fa-solid fa-angle-up fa-rotate-270"
              onClick={handleBack}
            ></i>

            <div
              className=" font-Potua  flex items-center gap-[10px] cursor-pointer"
              onClick={handleBack}
            >
              <p>DASHBOARD</p>
              <p>MANAGEMENT</p>
            </div>
          </div>

          <Logout />
          <div className=" md11:py-[69px] md150:py-[90px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
            <Header />
            <div className="   py-[20px] px-[20px]  md150:h-[70vh] md11:h-[73vh]  items-center  h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
              <div className=" h-[100%] flex items-center justify-center flex-col">
                <p className="text-[40px] font-sans font-[600] text-center flex items-center justify-center ">
                  Dashboard design is under process.....
                </p>

                <p className="text-[20px] text-center">
                  Releasing on <b className="pl-[10px]">15 January</b>......{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
