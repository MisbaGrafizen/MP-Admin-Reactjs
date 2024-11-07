import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/header/Header";
import userpng from "../../../public/img/AdminSpalsh/user 3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from "../../Components/logout/Logout";

export default function Feedback() {
  const navigate = useNavigate();
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
   const [dropdownOpen, setDropdownOpen] = useState(false);
  const paginationDropdownRef = useRef(null);
  const itemsPerPage = 5;

    const totalPages = Math.ceil(displayedData.length / itemsPerPage);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paginationDropdownRef.current &&
        !paginationDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close pagination dropdown on outside click
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDropdownOpen(false);
  };


    const currentPageData = displayedData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );





  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/all-feedbacks`
        );

        const fetchedData = response.data;

        setDisplayedData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      setCheckedItems(displayedData.map((_, index) => index));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(index)) {
        return prevCheckedItems.filter((item) => item !== index);
      } else {
        return [...prevCheckedItems, index];
      }
    });
  };

  return (
    <>
      <div className="    w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0      py-[34px] md150:py-[48px]     px-[30px] md150:px-[40px]  mx-auto   my-auto ">
        <div className="  mx-auto flex gap-[30px] w-[100%]     h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#F28C28]">
          <div className="flex absolute gap-[10px] left-[3%]      top-[4.1%]  md150:top-[5%] items-center        text-[18px] md150:text-[20px] font-[600]">
            <i
              className="cursor-pointer fa-solid fa-angle-up fa-rotate-270"
              onClick={handleBack}
            ></i>
            <div
              className="font-Potua  flex items-center gap-[10px] cursor-pointer"
              onClick={handleBack}
            >
              <p>FEEDBACK</p>
              <p>MANAGEMENT</p>
            </div>
          </div>

         <Logout />
          <div className="    py-[69px] md150:py-[90px] flex     w-[98%] md150:w-[97%]     gap-[15px]  md150:gap-[20px]">
            <Header />
            <div className="  md150:py-[20px] md150:px-[20px]     px-[15px]     py-[15px]  md150:h-[70vh]     h-[73vh]   bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
              <div className="flex justify-between w-full gap-[20px]">
                <div className="w-full h-full mx-auto mb-3 scroll-d-none">
                  <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                    <div className="box-border font-Poppins w-full">
                      <div className="sticky top-0 flex bg-[#F28C28] border-black w-full">
                        <div className="flex !font-Poppins  justify-center text-center py-[6px] items-center border-r border-b border-black gap-[3px] px-3 min-w-[4%] max-w-[4%]">
                          <input
                            type="checkbox"
                            id="check-all"
                            checked={checkAll}
                            onChange={handleCheckAll}
                            style={{ width: "10px", height: "10px" }}
                          />
                          <p className="w-fit md150:text-[16px] !pr-[-80px] text-[12px] font-[600] text-[#fff] font-Outfit">
                            Sr.
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[8%] max-w-[8%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Date
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[7%] max-w-[7%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Age
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Gender
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Order 
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Quality 
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Taste 
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Serving 
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Behaviour
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Cleanliness
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[10%] max-w-[10%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Contact 
                          </p>
                        </div>
                        <div className="flex justify-start items-center text-center py-[6px] border-r border-b border-black px-3 min-w-[10%] max-w-[10%]">
                          <p className="md150:text-[16px] text-[12px] font-[600] font-Outfit text-[#fff]">
                            Action
                          </p>
                        </div>
                      </div>
                      {Array.isArray(displayedData) &&
                      displayedData.length > 0 ? (
                        displayedData.map((item, index) => (
                          <div key={item._id} className="flex justify-between">
                            <div className="flex justify-center text-center py-[7px] items-center border-r border-b border-black gap-[7px] px-3 min-w-[4%] max-w-[4%]">
                              <input
                                type="checkbox"
                                id="check-all"
                                checked={checkedItems.includes(index)}
                                style={{ width: "10px", height: "10px" }}
                              />
                              <p className="w-fit md150:text-[15px] text-[13px] font-[500] text-[#000] font-Outfit">
                                {index + 1}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[8%] max-w-[8%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {formatDate(item.date)}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[7%] max-w-[7%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.age}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.gender}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.services?.orderMethod || "Not Rated"}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.services?.qualityFood || "Not Rated"}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.services?.tasteOfFood || "Not Rated"}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.services?.servingMethod || "Not Rated"}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.services?.staffBehaviour || "Not Rated"}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[9%] max-w-[9%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.services?.cleanliness || "Not Rated"}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[10%] max-w-[10%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]">
                                {item?.contact || "N/A"}
                              </p>
                            </div>
                            <div className="flex justify-start text-center py-[6px] border-r border-b border-black px-3 min-w-[8%] max-w-[8%]">
                              <p className="md150:text-[15px] text-[13px] font-[500] font-Outfit text-[#000]"></p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No feedback data available.</p>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex absolute bottom-3 right-6 font-Poppins items-center gap-[10px]"
                    ref={paginationDropdownRef}
                  >
                    <div>
                      <p className="text-[15px] font-[600] text-[#2565df]">
                        Total pages - {totalPages}
                      </p>
                    </div>
                    <div>
                      <div
                        className="flex justify-center border-[1.7px] border-[#000] cursor-pointer py-[5px] px-[24px] rounded-[10px] text-[14px] font-[600]"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <p>{currentPage}</p>
                      </div>
                    </div>
                    {dropdownOpen && (
                      <div className="border-[1.7px] flex flex-col bg-[#fff] min-h-[100%] overflow-y-auto right-[-19px] top-[40px] border-[#000] z-[100] w-[100px] rounded-[10px] absolute">
                        {Array.from({ length: totalPages }, (_, i) => (
                          <div
                            key={i + 1}
                            className={`w-[100%] text-[14px] border-b-[1.7px] rounded-[6px] border-[#847e7e] py-[6px] font-[600] flex justify-center items-center cursor-pointer 
                        ${
                          currentPage === i + 1
                            ? "bg-[#F28C28] text-[#fff]"
                            : "hover:bg-[#e1ab3e] hover:text-[#fff]"
                        }`}
                            onClick={() => goToPage(i + 1)}
                          >
                            <p>{i + 1}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
