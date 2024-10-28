import React, { useEffect, useState } from 'react'
import Header from '../../Components/header/Header'
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { addUserAction, getUserAction } from '../../redux/action/userMaster';
import { useDispatch, useSelector } from 'react-redux';
import { getDesignationAction, getKshetraAction, getPravrutiAction } from '../../redux/action/masterManagemnet';
import {
  Modal as NextUIModal,
  ModalBody,
  
} from "@nextui-org/react";

export default function CreateUser() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dispatch = useDispatch();

    const users = useSelector((state) => state?.userMasterState?.getUser);
    const pravruties = useSelector((state) => state?.mastermanagementState?.getPravruti);
    const kshetras = useSelector((state) => state?.mastermanagementState?.getKshetra);
    const designations = useSelector((state) => state?.mastermanagementState?.getDesignation);

    console.log('pravruties', pravruties);

    const [userData, setUserData] = useState({
        name: '',
        pravruti: '',
        kshetra: '',
        designation: '',
        phoneNumber: '',
        age: ''
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

        dispatch(addUserAction(userData));

        onOpenChange(false);


        setUserData({
            name: '',
            pravruti: '',
            kshetra: '',
            designation: '',
            phoneNumber: '',
            password: ''
        });
    };


    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
      <>
        <div className="w-[99%] h-[100vh]  relative overflow-hidden top-0 bottom-0  px-[40px] py-[48px] mx-auto   my-auto ">
          <div className="  mx-auto flex gap-[30px] h-[90vh] flex-col relative   rounded-[19px] border-[1px] border-[#FEAA00]">
            <div className="flex absolute left-[3%]  top-[5%]  text-[20px] font-[600]">
              <i className="fa-solid fa-angle-up fa-rotate-270"></i>
              <p> USERS MANAGEMENT</p>
            </div>
            <div
              className="border-t-[1.5px] font-[600] cursor-pointer  border-l-[1.5px] border-r-[1.5px] text-[#FEAA00] h-[45px] top-[50px]  active:bg-[#feaa00] active:text-[#fff] md150:top-[5.8%] right-[10%] w-[160px] flex items-center justify-center   rounded-tl-[10px]  absolute border-[#FEAA00] rounded-tr-[10px] ro"
              onClick={onOpen}
            >
              <p>Create a new user</p>
            </div>

            <div className="py-[90px] flex w-[97%]  gap-[20px]">
              <Header />
              <div className="  py-[20px] px-[20px]  md150:h-[70vh]  overflow-y-auto h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                <div className="flex justify-between w-full gap-[20px]">
                  <div className="w-full h-full mx-auto mb-3 scroll-d-none">
                    <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                      <div className="box-border w-full">
                        <div className="sticky top-0 flex bg-[#FEAA00] border-black w-full">
                          <div className="flex justify-center text-center py-[10px] border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                            <input type="checkbox" id="check-all" />
                            <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit">
                              Sr.
                            </p>
                          </div>

                          <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                            <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                              Name
                            </p>
                          </div>
                          <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                            <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                              Pravruti
                            </p>
                          </div>
                          <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                            <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                              Kshetra
                            </p>
                          </div>
                          <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[16%] max-w-[88%]">
                            <p className="text-[18px] font-[600] font-Outfit text-[#fff] ">
                              Designation
                            </p>
                          </div>
                          <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[16%] max-w-[88%]">
                            <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                              Phone no.
                            </p>
                          </div>
                          <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[8%] max-w-[8%]">
                            <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                              Age
                            </p>
                          </div>
                          <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[9%] max-w-[10%]">
                            <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                              Actions
                            </p>
                          </div>
                        </div>
                        {/* Data Rows */}

                        {Array.isArray(users) && users.length > 0 ? (
                          users.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <div className="flex justify-center items-center text-center py-[10px] border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                <input type="checkbox" id="check-all" />
                                <p className="font-[600] text-[17px]">1</p>
                                <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit"></p>
                              </div>

                              <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                                <p className="text-[18px] font-[300] font-Outfit ">
                                  {" "}
                                  {item?.name}
                                </p>
                              </div>
                              <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                                <p className="text-[18px] font-[300] font-Outfit ">
                                  {item?.pravruti?.name}
                                </p>
                              </div>
                              <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[15%] max-w-[88%]">
                                <p className="text-[18px] font-[300] font-Outfit">
                                  {item?.kshetra?.name}
                                </p>
                              </div>
                              <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[16%] max-w-[88%]">
                                <p className="text-[18px] font-[300] font-Outfit ">
                                  {item?.designation?.name}
                                </p>
                              </div>
                              <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[16%] max-w-[88%]">
                                <p className="text-[18px] font-[300] font-Outfit ">
                                  {item?.phoneNumber}
                                </p>
                              </div>
                              <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[8%] max-w-[8%]">
                                <p className="text-[18px] font-[300] font-Outfit ">
                                  {item?.age}
                                </p>
                              </div>
                              <div className="flex justify-center items-center gap-[15px] text-center py-2 border-b  border-black min-w-[9%] max-w-[10%]">
                                <img
                                  className="w-[20px]"
                                  src="../../public/img/Foodsection/edit.png"
                                />
                                <i className="text-[18px] mt-[1px] text-[#ff0b0b] fa-solid fa-trash-can"></i>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No users found</p>
                        )}
                      </div>
                      {/* Optional Pagination */}
                      <div className="absolute bottom-0 flex items-center w-full gap-3 end-0">
                        {/* Pagination and Select */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="w-[390px] h-[450px]">
                  {(onClose) => (
                    <>
                      <div className="relative ">
                        <div className="relative">
                          <div className="flex justify-center  p-[30px]">
                            <img
                              className="w-[90px]"
                              src="../../public/img/AdminSpalsh/user 3.png"
                            />
                          </div>
                          <div className="flex gap-[30px]  px-[30px]">
                            <div className="flex flex-col  gap-[10px]">
                              <div className="flex items-center  gap-[40px]">
                                <p className="text-[18px] font-[600]">Name:</p>
                              </div>
                              <div className="flex items-center  gap-[40px]">
                                <p className="text-[18px] font-[600]">
                                  Pravruti:
                                </p>
                              </div>
                              <div className="flex items-center  gap-[40px]">
                                <p className="text-[18px] font-[600]">
                                  Kshetra:
                                </p>
                              </div>
                              <div className="flex items-center  gap-[40px]">
                                <p className="text-[18px] font-[600]">
                                  Designation:
                                </p>
                              </div>
                              <div className="flex items-center  gap-[40px]">
                                <p className="text-[18px] font-[600]">
                                  Phone no:
                                </p>
                              </div>
                              {/* <div className='flex items-center  gap-[40px]'>
                                                            <p className='text-[18px] font-[600]'>Age:</p>
                                                        </div> */}
                              <div className="flex items-center  gap-[40px]">
                                <p className="text-[18px] font-[600]">
                                  Password
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col  gap-[15px]">
                              <div className="flex items-center  gap-[40px]">
                                <input
                                  className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
                                  type="text"
                                  name="name"
                                  value={userData?.name}
                                  onChange={handleChange}
                                />
                              </div>
                              {/* <div className='flex items-center  gap-[40px]'>
                                                            <input className='px-[5px] text-[14px] font-[400] outline-none border-b-[1px]'
                                                                type="text"
                                                                name="pravruti"
                                                                value={userData?.pravruti}
                                                                onChange={handleChange}
                                                            />
                                                        </div> */}
                              <div className="flex items-center gap-[40px]">
                                <select
                                  name="pravruti"
                                  value={userData.pravruti}
                                  onChange={handleChange}
                                  className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
                                >
                                  <option value="">Select Pravruti</option>
                                  {pravruties?.map((pravruti) => (
                                    <option
                                      key={pravruti?._id}
                                      value={pravruti?._id}
                                    >
                                      {pravruti?.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex items-center gap-[40px]">
                                <select
                                  name="kshetra"
                                  value={userData.kshetra}
                                  onChange={handleChange}
                                  className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
                                >
                                  <option value="">Select Kshetra</option>
                                  {kshetras?.map((kshetra) => (
                                    <option
                                      key={kshetra?._id}
                                      value={kshetra?._id}
                                    >
                                      {kshetra?.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex items-center gap-[40px]">
                                <select
                                  name="designation"
                                  value={userData.designation}
                                  onChange={handleChange}
                                  className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
                                >
                                  <option value="">Select Designation</option>
                                  {designations?.map((designation) => (
                                    <option
                                      key={designation?._id}
                                      value={designation?._id}
                                    >
                                      {designation?.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex items-center  gap-[40px]">
                                <input
                                  className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
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
                              {/* <div className='flex items-center  gap-[40px]'>
                                                            <p className='text-[18px] font-[600]'>Age:</p>
                                                        </div> */}
                              <div className="flex items-center gap-[10px]">
                                <input
                                  className="px-[5px] text-[14px] font-[400] outline-none border-b-[1px]"
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  value={userData.password}
                                  onChange={handleChange}
                                />
                                <i
                                  className={`fa-regular ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                  }`}
                                  onClick={togglePasswordVisibility}
                                  style={{
                                    cursor: "pointer",
                                    color: showPassword ? "#ff8000" : "inherit", // Change color when clicked
                                  }}
                                ></i>
                              </div>
                            </div>
                          </div>

                          <div
                            className=" bg-[#00984B] cursor-pointer font-[600] text-[18px] relative bottom-[-42px] w-[full] flex justify-center py-[10px] text-[white]"
                            onClickCapture={onClose}
                            onClick={handleSubmit}
                          >
                            <p>Click here to submit</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
        {/* <NextUIModal
          className="md:max-w-[300px]  max-w-[333px] relative  flex justify-center !py-0 mx-auto md:h-[35%] h-[300px]"
          isOpen={ispaymentModalOpen}
          backdrop={"blur"}
          onOpenChange={closePaymentModal}
        >
          <ModalContent className="relative ">
            <ModalBody className="!py-0">
              <div className="w-[100%] gap-[20px] flex flex-col absolute left-0 top- right-0 items-center ">
                <div className="  mt-[50px]">
                  <i className="fa-sharp fa-regular text-[100px] text-[green] fa-badge-check"></i>
                </div>
                <div className=" flex font-[600] text-[20px] mx-auto">
                  <p>asdfghjdff klsdf</p>
                </div>

                <div className=" w-[90%] mt-[20px] mx-auto flex items-center  ">
                  <div className=" bg-[red] rounded-tl-[10px]  rounded-bl-[10px] w-[50%] text-[white] font-[600] items-center flex justify-center text-center  py-[10px]">
                    {" "}
                    Cancel
                  </div>
                  <div className=" bg-[#00984B] rounded-tr-[10px]  rounded-br-[10px] w-[50%] text-[white] font-[600] items-center flex justify-center text-center  py-[10px]">
                    {" "}
                    Confirm
                  </div>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </NextUIModal> */}
      </>
    );
}
