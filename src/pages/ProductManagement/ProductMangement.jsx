
import React, { useEffect, useState } from 'react';
import Header from '../../Components/header/Header';
import SelfServingManage from '../../Components/Product/SelfServingManage';
import ServingMethod from '../../Components/Product/ServingMethod';
import PrePackged from '../../Components/Product/PrePackged';
import { useNavigate } from 'react-router-dom';

export default function ProductMangement() {

    const [activeForm, setActiveForm] = useState('SELF');
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }

    const handleActiveFormChange = (formType) => {
        console.log("formTypes",formType)
        setActiveForm(formType);
       
      }
    const renderForm = () => {
        if (activeForm === 'SELF' ) {
            return (
                <div className="flex justify-between w-full gap-[20px]">
                    <SelfServingManage methodType={"SELF"} />
                </div>
            );
        } else if (activeForm === 'SERVING') {
            return (
                <div className="flex justify-between w-full gap-[20px]">
                    <ServingMethod />
                </div>
            );
        } else if(activeForm === 'PRE-PACKGED'){
            return (
                <div className="flex justify-between w-full gap-[20px]">
                    <PrePackged methodType={"PRE-PACKGED"} />
                </div>
            );
        }
    };
    
    return (
        <>
            <div className="w-[99%] md11:w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  md11:py-[34px] md150:py-[48px] md11:px-[30px] md150:px-[40px]  mx-auto   my-auto ">
                <div className=" mx-auto flex gap-[30px] w-[100%] md11:h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#FEAA00]">

                
                    <div className="flex absolute gap-[10px] left-[3%]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
                        <i className="fa-solid fa-angle-up fa-rotate-270" onClick={handleBack}></i>

                        <div className=' font-Potua  flex items-center gap-[10px] cursor-pointer' onClick={handleBack}>
                            <p>
                                PRODUCT
                            </p>
                            <p>
                                MANAGEMENT
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-[10px] mx-auto justify-center absolute  right-[7%]  z-0 md11:top-[5.3%] md150:top-[5.9%]'>

                        <div
                            className={`md150:w-[160px] md11:w-[130px] flex items-center md150:text-[18px] text-[16px] justify-center  rounded-tr-[10px]  rounded-tl-[10px]  border-r-[1px]  border-l-[1px]  font-[600] border-t-[1px] border-[#FEAA00]  ${activeForm === 'SELF' ? 'bg-[#FEAA00] text-[#fff]' : ' text-[#FEAA00] bg-white '} md150:h-[40px] md11:h-[35px] cursor-pointer`}
                            onClick={() => handleActiveFormChange('SELF')}
                        >
                            <p>Self Serving</p>
                        </div>


                        <div
                            className={`md150:w-[160px] md11:w-[130px] flex items-center md150:text-[18px] text-[16px] justify-center  rounded-tr-[10px] rounded-tl-[10px]  border-r-[1px] font-[600]  border-l-[1px]  border-t-[1px]  ${activeForm === 'SERVING' ? 'bg-[#00984b] text-[#fff] border-[#00984b]' : 'text-[#FEAA00] border-[#FEAA00]  bg-white '} md150:h-[40px] md11:h-[35px] cursor-pointer`}
                            onClick={() => handleActiveFormChange('SERVING')}
                        >
                            <p>Serving Method</p>
                        </div>

                        <div
                            className={`md150:w-[160px] md11:w-[130px] flex items-center md150:text-[18px] text-[16px] justify-center  rounded-tr-[10px]  rounded-tl-[10px]  border-r-[1px] font-[600] border-l-[1px]  border-t-[1px] border-[#FEAA00]  ${activeForm === 'PRE-PACKGED' ? 'bg-[#FEAA00] text-[#fff]' : 'text-[#FEAA00]  bg-white '} md150:h-[40px] md11:h-[35px] cursor-pointer`}
                            onClick={() => handleActiveFormChange('PRE-PACKGED')}
                        >
                            <p>Pre - Packaged</p>
                        </div>
                    </div>

                    <div className="md11:py-[69px] md150:py-[90px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
                        <Header />

                        <div className="   md150:py-[20px] md150:px-[20px] md11:px-[15px] md11:py-[15px]  md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                            {renderForm()}
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}
