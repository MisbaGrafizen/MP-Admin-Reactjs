import React, { useState } from 'react';
import Editimg from '../../../public/img/Foodsection/edit.png'

export default function PremvatiUser() {
    // const [users, setUsers] = useState([
    //     {
    //         name: 'John Doe',
    //         pravruti: { name: 'Activity A' },
    //         kshetra: { name: 'Region 1' },
    //         designation: { name: 'Manager' },
    //         phoneNumber: '123-456-7890',
    //     },
    //     {
    //         name: 'Jane Smith',
    //         pravruti: { name: 'Activity B' },
    //         kshetra: { name: 'Region 2' },
    //         designation: { name: 'Assistant' },
    //         phoneNumber: '987-654-3210',
    //     },
    // ]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    // const itemsPerPage = 1; // Example items per page
    // const totalPages = Math.ceil(users.length / itemsPerPage);
    // const [checkAll, setCheckAll] = useState(false);
    // const [checkedItems, setCheckedItems] = useState([]);

    // const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // const handleCheckAll = () => {
    //     setCheckAll(!checkAll);
    //     setCheckedItems(checkAll ? [] : users.map((_, index) => index));
    // };

    // const handleCheckboxChange = (index) => {
    //     if (checkedItems.includes(index)) {
    //         setCheckedItems(checkedItems.filter((i) => i !== index));
    //     } else {
    //         setCheckedItems([...checkedItems, index]);
    //     }
    // };

    // const goToPage = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    //     setDropdownOpen(false);
    // };

    // const handleDelete = (user) => {
    //     setUsers(users.filter((u) => u !== user));
    // };

    return (
        <div className="  py-[20px] px-[20px]  md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
        <div className="flex justify-between w-full gap-[20px]">
          <div className="w-full h-full mx-auto mb-3 scroll-d-none">
            <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
              <div className="box-border w-full">
                <div className="sticky top-0 flex bg-[#F28C28] border-black w-full">
                  <div className="flex justify-center text-center gap-[7px] py-[10px] border-r border-b border-black items-center px-3 min-w-[6%] max-w-[6%]">
                    <input
                      type="checkbox"
                      id="check-all"
                    //   checked={checkAll}
                    //   onChange={handleCheckAll}
                      style={{ width: "15px", height: "15px" }}
                    />
                    <p className="w-fit  md11:text-[14px] md150:text-[18px] font-[600] text-[#fff] font-Outfit">
                      Sr.
                    </p>
                  </div>

                  <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[30%] max-w-[30%]">
                    <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                      Name
                    </p>
                  </div>
               
                  <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[30%] max-w-[25%]">
                    <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                      Phone no.
                    </p>
                  </div>
                  <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[25%] max-w-[14%]">
                    <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                      Premvati
                    </p>
                  </div>
                  <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[10%] max-w-[10%]">
                    <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                      Actions
                    </p>
                  </div>
                </div>

                {/* {Array.isArray(users) && users.length > 0 ? (
                  paginatedUsers.map((item, index) => ( */}
                  <div className="flex justify-between">
                      <div className="flex justify-center items-center text-center py-[10px] border-r border-b border-black gap-[7px] px-3 min-w-[6%] max-w-[6%]">
                      
                      
                      </div>

                     
                  
                      <div className="flex justify-start md11:items-center text-center py-[5px] h-[50px]  border-r border-b border-black px-3 min-w-[30%] max-w-[88%]">
                        <input className='w-[100%] h-[100%] border-none h outline-none' type=' text' />
                      </div>
                      <div className="flex justify-start md11:items-center text-center  py-[5px] h-[50px]  border-r border-b border-black px-3 min-w-[30%] max-w-[15%]">
                      <input className='w-[100%] h-[100%] border-none h outline-none' type='tel' />
                      </div>
                      <div className="flex justify-start md11:items-center text-center  py-[5px] h-[50px]  border-r border-b border-black px-3 min-w-[25%] max-w-[11%]">
                      <input className='w-[100%] h-[100%] border-none h outline-none' type='text' />
                      </div>
                     
                      <div className="flex justify-center items-center gap-[15px] text-center py-2 border-b  border-black min-w-[10%] max-w-[9%]">
                       <i className='fa-paper-plane-top text-[25px] text-[#00984B] fa-solid '></i>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex justify-center items-center text-center py-[10px] border-r border-b border-black gap-[7px] px-3 min-w-[6%] max-w-[6%]">
                        <input
                          type="checkbox"
                        //   checked={checkedItems.includes(index)}
                        //   onChange={() => handleCheckboxChange(index + 1)}
                          style={{ width: "15px", height: "15px" }}
                          className="ml-[-25%]"
                        />
                        <p className="font-[600] md11:text-[15px] md150:text-[17px] md11:mt-[5%] md150:mt-[2%]">
                          {/* {index + 1 + (currentPage - 1) * itemsPerPage} */}
                          1
                        </p>
                      </div>

                     
                  
                      <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[30%] max-w-[88%]">
                        <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit">
                       
                        </p>
                      </div>
                      <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[30%] max-w-[15%]">
                        <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">
                     
                        </p>
                      </div>
                      <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[25%] max-w-[11%]">
                        <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">
                          
                        </p>
                      </div>
                     
                      <div className="flex justify-center items-center gap-[15px] text-center py-2 border-b  border-black min-w-[10%] max-w-[9%]">
                        <img
                         
                          className="w-[20px] cursor-pointer"
                          src={Editimg}
                        />
                        <i
                          className="text-[18px] mt-[1px] text-[#ff0b0b] cursor-pointer fa-solid fa-trash-can"
                         
                        ></i>
                      </div>
                    </div>
         
              </div>
            </div>
          </div>
          {/* <div
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
          </div> */}
        </div>
      </div>
    );
}
