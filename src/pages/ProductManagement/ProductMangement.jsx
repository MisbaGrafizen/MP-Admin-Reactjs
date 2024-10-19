
import React, { useEffect, useState } from 'react';
import Header from '../../Components/header/Header';
import SelfServingManage from '../../Components/Product/SelfServingManage';
import ServingMethod from '../../Components/Product/ServingMethod';
import PrePackged from '../../Components/Product/PrePackged';



export default function ProductMangement() {

    const [activeForm, setActiveForm] = useState('SELF');

    const renderForm = () => {
        switch (activeForm) {
            case 'SELF':
                return <div className="flex justify-between w-full gap-[20px]">
                    <SelfServingManage />
                </div>;

            case 'SERVING':
                return <div className="flex justify-between w-full gap-[20px]">
                    <ServingMethod />
                </div>;

            case 'PRE-PACKGED':
                return <div className="flex justify-between w-full gap-[20px]">
                    <PrePackged />
                </div>;

        }
    };

    return (
        <>
            <div className="w-[99%] h-[100%]  relative overflow-hidden  px-[40px] py-[48px] mx-auto   my-auto ">
                <div className=" mx-auto flex gap-[30px] h-[90vh] flex-col relative   rounded-[19px] border-[1px] border-[#FEAA00]">

                    <div className="flex absolute left-[3%]  top-[5%]  text-[20px] font-[600]">
                        <i className="fa-solid fa-angle-up fa-rotate-270"></i>
                        <p className='font-[1200] '> PRODUCT MANAGEMENT</p>
                    </div>
                    <div className='flex gap-[10px] mx-auto justify-center absolute  right-[7%]  z-20 top-[50px] md150:top-[5.8%]'>

                        <div
                            className={`w-[160px] flex items-center text-[18px] justify-center  rounded-tr-[10px]  rounded-tl-[10px]  border-r-[1px]  border-l-[1px]  font-[600] border-t-[1px] border-[#FEAA00]  ${activeForm === 'SELF' ? 'bg-[#FEAA00] text-[#fff]' : ' text-[#FEAA00] bg-white '} h-[40px] cursor-pointer`}
                            onClick={() => setActiveForm('SELF')}
                        >
                            <p>Self Serving</p>
                        </div>


                        <div
                            className={`w-[160px] flex items-center text-[18px] justify-center  rounded-tr-[10px] rounded-tl-[10px]  border-r-[1px] font-[600]  border-l-[1px]  border-t-[1px] border-[#FEAA00]  ${activeForm === 'SERVING' ? 'bg-[#00984b] text-[#fff] border-[#00984b]' : 'text-[#FEAA00] bg-white '} h-[40px] cursor-pointer`}
                            onClick={() => setActiveForm('SERVING')}
                        >
                            <p>Serving Method</p>
                        </div>

                        <div
                            className={`w-[160px] flex items-center text-[18px] justify-center  rounded-tr-[10px]  rounded-tl-[10px]  border-r-[1px] font-[600] border-l-[1px]  border-t-[1px] border-[#FEAA00]  ${activeForm === 'PRE-PACKGED' ? 'bg-[#FEAA00] text-[#fff]' : 'text-[#FEAA00] bg-white '} h-[40px] cursor-pointer`}
                            onClick={() => setActiveForm('PRE-PACKGED')}
                        >
                            <p>Pre - Packaged</p>
                        </div>
                    </div>

                    <div className="py-[90px] flex w-[97%]  gap-[20px]">
                        <Header />

                        <div className=" py-[20px] px-[20px]  md150:h-[70vh]  overflow-y-auto h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                            {renderForm()}
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}
