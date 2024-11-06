import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/header/Header'
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { addUserAction, DeleteUserMasterAction, editUserAction, getUserAction } from '../../redux/action/userMaster';
import { useDispatch, useSelector } from 'react-redux';
import { getDesignationAction, getKshetraAction, getPravrutiAction } from '../../redux/action/masterManagemnet';
import Editimg from '../../../public/img/Foodsection/edit.png'
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {

  const { isOpen, onOpen, onOpenChange,onClose } = useDisclosure();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isKshetraDropdownOpen, setIsKshetraDropdownOpen] = useState(false);
  const [isDesigDropdownOpen, setIsDesigDropdownOpen] = useState(false);
  const [selectedPravruti, setSelectedPravruti] = useState({ id: '', name: 'Select Pravruti' });
  const [selectedKshetra, setSelectedKshetra] = useState({ id: '', name: 'Select Kshetra' });
  const [selectedDesignation, setSelectedDesignation] = useState({ id: '', name: 'Select Designation' });
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const users = useSelector((state) => state?.userMasterState?.getUser) || [];
  const pravruties = useSelector((state) => state?.mastermanagementState?.getPravruti) || [];
  const kshetras = useSelector((state) => state?.mastermanagementState?.getKshetra) || [];
  const designations = useSelector((state) => state?.mastermanagementState?.getDesignation) || [];
  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [deleteRecordId,setDeleteRecordId] = useState();
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDropdownOpen(false);
  };
  const pravrutiRef = useRef(null);
  const kshetraRef = useRef(null);
  const designationRef = useRef(null);  

  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isEditData,setIsEditData] = useState(false)
  const handleDelete = (item) => {
    setDeleteRecordId(item?._id)
    setIsDelOpen(true);
  };
  const handelEdit = (item) =>{
    setIsEditData(true)
    setUserData(item)
    handleSelectPravruti(item?.pravruti)
    handleSelectKshetra(item?.kshetra)
    handleSelectDesignation(item?.designation)
  }
  const closeDeleteModal = () => {
    setIsDelOpen(false);
  };
 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleKhestraDropdown = () => {
    setIsKshetraDropdownOpen(!isKshetraDropdownOpen);
  };
  const toggleDesgnationDropdown = () => {
    setIsDesigDropdownOpen(!isDesigDropdownOpen);
  };


  const handleSelectPravruti = (pravruti) => {
    setSelectedPravruti({ id: pravruti?._id, name: pravruti.name });
    setUserData((prevData) => {
      const newData = { ...prevData, pravruti: pravruti._id };
      return newData;
    });
    setIsDropdownOpen(false);
  };
  

  const handleSelectKshetra = (kshetra) => {
    setSelectedKshetra({ id: kshetra?._id, name: kshetra.name });
    setUserData(prevData => ({ ...prevData, kshetra: kshetra._id })); 
    setIsKshetraDropdownOpen(false);
  };
  
  const handleSelectDesignation = (designation) => {
    setSelectedDesignation({ id: designation?._id, name: designation?.name });
    setUserData(prevData => ({ ...prevData, designation: designation._id })); 
    setIsDesigDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const [userData, setUserData] = useState({
    name: '',
    pravruti: '',
    kshetra: '',
    designation: '',
    phoneNumber: '',
    mondalName: '',
    password: ''
  });

  useEffect(() => {
    dispatch(getDesignationAction());
    dispatch(getKshetraAction());
    dispatch(getPravrutiAction());
    dispatch(getUserAction());
  }, [dispatch]);


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEditData && userData){
      dispatch(editUserAction(userData._id,userData))
    }else {
      dispatch(addUserAction(userData));
    }

    onOpenChange(false);


    setUserData({
      name: '',
      pravruti: '',
      kshetra: '',
      designation: '',
      phoneNumber: '',
      password: ''
    });

    setSelectedPravruti({ id: '', name: 'Select Pravruti' });
    setSelectedKshetra({ id: '', name: 'Select Kshetra' });
    setSelectedDesignation({ id: '', name: 'Select Designation' });
  };


  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleBack = () => {
    navigate(-1)
  }

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      setCheckedItems(pravruties.map((_, index) => index));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems(prevCheckedItems => {
      if (prevCheckedItems.includes(index)) {
        return prevCheckedItems.filter(item => item !== index);
      } else {
        return [...prevCheckedItems, index];
      }
    });
  };

  const handleDeleteRecord = async() =>{
    if (deleteRecordId) {
      await dispatch(DeleteUserMasterAction(deleteRecordId)).then((response)=>{
          setDeleteRecordId(""); 
         setIsDelOpen(false);

      })
  }
  }
  const handelAddData = async () =>{
    setIsEditData(false)
  }
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [users,totalPages]); 
  return (
    <>
      <div className="w-[99%] md11:w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  md11:py-[34px] md150:py-[48px] md11:px-[30px] md150:px-[40px]  mx-auto   my-auto ">
        <div className="  mx-auto flex gap-[30px] w-[100%] md11:h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#FEAA00]">
          <div className="flex absolute gap-[10px] left-[3%]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
            <i className="fa-solid fa-angle-up fa-rotate-270" onClick={handleBack}></i>

            <div className=' font-Potua  flex items-center gap-[10px] cursor-pointer' onClick={handleBack}>
              <p>
                USERS
              </p>
              <p>
                MANAGEMENT
              </p>
            </div>
          </div>
          <div
            className="border-t-[1.5px] font-[600] cursor-pointer  border-l-[1.5px] border-r-[1.5px] text-[#FEAA00] md11:h-[40px] md150:h-[45px] md11:top-[4.6%] top-[50px]  active:bg-[#feaa00] active:text-[#fff] md150:top-[5.8%] right-[8%] w-[160px] flex items-center justify-center   rounded-tl-[10px]  absolute border-[#FEAA00] rounded-tr-[10px] ro"
            onClick={() => {
              setIsEditData(false);
              setUserData({});
              setSelectedPravruti({ id: '', name: 'Select Pravruti' });
              setSelectedKshetra({ id: '', name: 'Select Kshetra' });
              setSelectedDesignation({ id: '', name: 'Select Designation' });
              onOpen(); 
            }}
          >
            <p>Create a new user</p>
          </div>

          <div className=" md11:py-[69px] md150:py-[90px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
            <Header />
            <div className="  py-[20px] px-[20px]  md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
              <div className="flex justify-between w-full gap-[20px]">
                <div className="w-full h-full mx-auto mb-3 scroll-d-none">
                  <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                    <div className="box-border w-full">
                      <div className="sticky top-0 flex bg-[#FEAA00] border-black w-full">
                        <div className="flex justify-center text-center gap-[7px] py-[10px] border-r border-b border-black items-center px-3 min-w-[6%] max-w-[6%]">
                          <input
                            type="checkbox"
                            id="check-all"
                            checked={checkAll}
                            onChange={handleCheckAll}
                            style={{ width: "15px", height: '15px' }}
                          />
                          <p className="w-fit  md11:text-[14px] md150:text-[18px] font-[600] text-[#fff] font-Outfit">Sr.</p>
                        </div>

                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                            Name
                          </p>
                        </div>
                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                            Pravruti
                          </p>
                        </div>
                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                            Kshetra
                          </p>
                        </div>
                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[15%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff] ">
                            Designation
                          </p>
                        </div>
                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[11%] max-w-[11%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                            Phone no.
                          </p>
                        </div>
                        <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[14%] max-w-[14%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                            Mondal name
                          </p>
                        </div>
                        <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[9%] max-w-[9%]">
                          <p className=" md11:text-[14px] md150:text-[18px] font-[600] font-Outfit text-[#fff]">
                            Actions
                          </p>
                        </div>
                      </div>

                      {Array.isArray(users) && users.length > 0 ? (
                        paginatedUsers.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <div className="flex justify-center items-center text-center py-[10px] border-r border-b border-black gap-[7px] px-3 min-w-[6%] max-w-[6%]">
                              <input
                                type="checkbox"
                                checked={checkedItems.includes(index)}
                                onChange={() => handleCheckboxChange(index + 1)}
                                style={{ width: "15px", height: '15px' }}
                                className='ml-[-25%]'
                              />
                              <p className="font-[600] md11:text-[15px] md150:text-[17px] md11:mt-[5%] md150:mt-[2%]">{index + 1 + (currentPage - 1) * itemsPerPage}</p>
                            </div>

                            <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                              <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">
                                {" "}
                                {item?.name}
                              </p>
                            </div>
                            <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                              <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">
                                {item?.pravruti?.name}
                              </p>
                            </div>
                            <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                              <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit">
                                {item?.kshetra?.name}
                              </p>
                            </div>
                            <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[15%]">
                              <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">
                                {item?.designation?.name}
                              </p>
                            </div>
                            <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[11%] max-w-[11%]">
                              <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">
                                {item?.phoneNumber}
                              </p>
                            </div>
                            <div className="flex justify-start md11:items-center text-center py-[10px] border-r border-b border-black px-3 min-w-[14%] max-w-[14%]">
                              <p className="md11:text-[14px] md150:text-[18px] font-[300] font-Outfit ">

                              </p>
                            </div>
                            <div className="flex justify-center items-center gap-[15px] text-center py-2 border-b  border-black min-w-[9%] max-w-[9%]">
                              <img onClick={() => {
                                onOpen(); 
                                handelEdit(item); 
                              }}
                                className="w-[20px] cursor-pointer"
                                src={Editimg}
                              />
                              <i className="text-[18px] mt-[1px] text-[#ff0b0b] cursor-pointer fa-solid fa-trash-can" onClick={() => handleDelete(item)}></i>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No users found</p>
                      )}
                    </div>

                  </div>
                </div>
                <div className='flex absolute bottom-3 right-6 font-Poppins items-center gap-[10px]' ref={dropdownRef}>
                  <div>
                    <p className='text-[15px] font-[600] text-[#2565df]'>
                      Total pages - {totalPages}
                    </p>
                  </div>
                  <div>
                    <div className='flex justify-center border-[1.7px] border-[#000] cursor-pointer py-[5px] px-[24px] rounded-[10px] text-[14px] font-[600]' onClick={() => setDropdownOpen(!dropdownOpen)}>
                      <p>{currentPage}</p>
                    </div>
                  </div>
                  {dropdownOpen && (
                    <div className='border-[1.7px] flex flex-col bg-[#fff] min-h-[90px] overflow-y-auto right-[-19px] top-[40px] border-[#000] z-[100] w-[100px] rounded-[10px] absolute'>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <div
                          key={i + 1}
                          className={`w-[100%] text-[14px] border-b-[1.7px] rounded-[6px] border-[#847e7e] py-[6px] font-[600] flex justify-center items-center cursor-pointer 
                        ${currentPage === i + 1 ? 'bg-[#feaa00] text-[#fff]' : 'hover:bg-[#e1ab3e] hover:text-[#fff]'}`}
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


            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent className="md150:w-[390px] md11:w-[360px]  relative md150:h-[510px] md11:h-[460px]">
                {(onClose) => (
                  <>
                    <div className="relative ">
                      <div className="relative">
                        <div className="flex justify-center md11:p-[25px] md150:p-[30px]">
                          <img
                            className="w-[90px]"
                            src="../../public/img/AdminSpalsh/user 3.png"
                          />
                        </div>
                        <div className="flex gap-[30px] relative  px-[30px]">
                          <div className="flex flex-col  gap-[10px]">
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] font-[600]">Name:</p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] font-[600]">
                                Pravruti:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] font-[600]">
                                Kshetra:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] mt-[2px] font-[600]">
                                Designation:
                              </p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px]   font-[600]">
                                Phone no:
                              </p>
                            </div>
                            <div className='flex items-center  gap-[40px]'>
                              <p className='md150:text-[18px] md11:text-[15px] font-[600]'>Mondal name :</p>
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <p className="md150:text-[18px] md11:text-[15px] mt-[3px] font-[600]">
                                Password :
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col md11:gap-[10px] md150:gap-[15px]">
                            <div className="flex items-center  md150:mt-[1px] gap-[40px]">
                              <input
                                className="px-[5px] relative md150:top-[5px] w-[100%] text-[15px] font-[400] outline-none border-b-[1px]"
                                type="text"
                                name="name"
                                value={userData?.name}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="flex relative   md150:mt-[4px] items-center gap-[40px]">
                              <div
                                className="px-[5px] flex justify-between items-center md11:text-[14px] md150:text-[16px] w-[100%] border-b-[1px] cursor-pointer"
                                onClick={toggleDropdown}
                              >
                                <p>{selectedPravruti.name}</p>
                                <i className={`fa-solid fa-angle-up ${isDropdownOpen ? 'fa-rotate-0' : 'fa-rotate-180'}`}></i>
                              </div>

                              {isDropdownOpen && (
                                <div className="border-[1.5px] w-[100%] md150:w-[110%] left-[-3px] z-[10] top-[29px] h-[100%] min-h-[180px] overflow-y-auto bg-white absolute rounded-[10px] py-[2px] flex flex-col">
                                  {pravruties?.map((pravruti) => (
                                    <div
                                      key={pravruti._id}
                                      onClick={() => handleSelectPravruti(pravruti)}
                                      className={`px-[8px] py-[5px] border-b-[1.7px] border-[#000] md11:text-[13px] md150:text-[16px] rounded-[5px]  cursor-pointer ${pravruti._id === selectedPravruti.id ? 'bg-[#feaa00] text-white' : 'hover:bg-[#f5e7ca]'
                                        }`}
                                    >
                                      <p>{pravruti.name}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex relative items-center gap-[40px]">
                              <div
                                className="px-[5px] flex justify-between items-center md11:text-[14px] md150:text-[16px] w-[100%] border-b-[1px] cursor-pointer"
                                onClick={toggleKhestraDropdown}
                              >
                                <p>{selectedKshetra.name}</p>
                                <i className={`fa-solid fa-angle-up ${isKshetraDropdownOpen ? 'fa-rotate-0' : 'fa-rotate-180'}`}></i>
                              </div>

                              {isKshetraDropdownOpen && (
                                <div className="border-[1.5px] w-[100%] md150:w-[110%] left-[-3px] z-[10] top-[29px] h-[100%] min-h-[150px] overflow-y-auto bg-white absolute rounded-[10px] py-[2px] flex flex-col">
                                  {kshetras?.map((kshetra) => (
                                    <div
                                      key={kshetra._id}
                                      onClick={() => handleSelectKshetra(kshetra)}
                                      className={`px-[8px] py-[5px] border-b-[1.7px] border-[#000] rounded-[5px] md11:text-[13px] md150:text-[16px]   cursor-pointer ${kshetra._id === selectedKshetra.id ? 'bg-[#feaa00] text-white' : 'hover:bg-[#f5e7ca]'
                                        }`}
                                    >
                                      <p>{kshetra.name}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex relative items-center gap-[40px]">
                              <div
                                className="px-[5px] flex justify-between items-center md11:text-[14px] md150:text-[16px] w-[100%] border-b-[1px] cursor-pointer"
                                onClick={toggleDesgnationDropdown}
                              >
                                <p>{selectedDesignation.name}</p>
                                <i className={`fa-solid fa-angle-up ${isDesigDropdownOpen ? 'fa-rotate-0' : 'fa-rotate-180'}`}></i>
                              </div>

                              {isDesigDropdownOpen && (
                                <div className="border-[1.5px] w-[110%] left-[-3px] z-[10] top-[29px] h-[100%] min-h-[130px] overflow-y-auto bg-white absolute rounded-[10px] py-[2px] flex flex-col">
                                  {designations?.map((designations) => (
                                    <div
                                      key={designations._id}
                                      onClick={() => handleSelectDesignation(designations)}
                                      className={`px-[8px] py-[5px] border-b-[1.7px] border-[#000] rounded-[5px] md11:text-[13px] md150:text-[16px]  cursor-pointer ${designations._id === selectedDesignation.id ? 'bg-[#feaa00] text-white' : 'hover:bg-[#f5e7ca]'
                                        }`}
                                    >
                                      <p>{designations.name}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center md11:mt-[3px] md150:mt-[0px]  gap-[40px]">
                              <input
                                className="px-[5px] text-[14px] w-[100%] font-[400] outline-none border-b-[1px]"
                                type="tel"
                                name="phoneNumber"
                                value={userData?.phoneNumber}
                                onChange={(e) => {
                                  const phoneNumber = e.target.value;
                                  if (/^\d{0,10}$/.test(phoneNumber)) {
                                    setUserData({ ...userData, phoneNumber });
                                  }
                                }}
                                minLength={10}
                                maxLength={10}
                                pattern="\d{10}"
                                required
                              />
                            </div>
                            <div className="flex items-center  gap-[40px]">
                              <input
                                className="px-[5px] w-[100%] text-[14px] font-[400] outline-none border-b-[1px]"
                                type="text"


                              />
                            </div>
                            <div className="flex items-center gap-[10px]">
                              <input
                                className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                              />
                              <i
                                className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"
                                  }`}
                                onClick={togglePasswordVisibility}
                                style={{
                                  cursor: "pointer",
                                  color: showPassword ? "#ff8000" : "inherit",
                                }}
                              ></i>
                            </div>
                          </div>
                        </div>


                      </div>

                    </div>
                    <div
                      className=" bg-[#00984B] cursor-pointer font-Poppins absolute bottom-0 w-[100%] font-[500] text-[18px]   flex justify-center py-[10px] text-[white]"
                      onClickCapture={onClose}
                      onClick={handleSubmit}
                    >
                      <p>Click here to submit</p>
                    </div>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>




      <Modal isOpen={isDelOpen} onOpenChange={setIsDelOpen}>
        <ModalContent className="md:max-w-[350px] max-w-[333px] relative  flex justify-center !py-0 mx-auto  h-[300px] shadow-delete ">
          {(onClose) => (
            <>
              <div className="relative w-[100%] h-[100%] ">
                <div className="relative  w-[100%] h-[100%]">
                  <div className='w-[100%] flex gap-7 flex-col'>
                    <div className='w-[100%] mt-[30px] p-[10px] mx-auto flex justify-center s'>
                      <i className=" text-[80px] text-[red] shadow-delete-icon rounded-full fa-solid fa-circle-xmark"></i>
                    </div>
                    <div className=' mx-auto justify-center flex text-[28px] font-[500] font-Poppins'>
                      <p>Are you sure ?</p>

                    </div>
                    <div className='absolute bottom-0 flex w-[100%]'>
                      <div className='w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[red] rounded-bl-[10px] text-[#fff] font-[600] font-Poppins text-[20px]' onClick={handleDeleteRecord}>
                        <p>
                          Delete
                        </p>
                      </div>
                      <div className='w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[#26b955] rounded-br-[10px] text-[#fff] font-[600] font-Poppins text-[20px]' onClick={closeDeleteModal}>
                        <p>
                          Cancel
                        </p>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
