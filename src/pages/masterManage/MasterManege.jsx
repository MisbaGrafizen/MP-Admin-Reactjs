import React, { useEffect, useState } from 'react';
import Header from '../../Components/header/Header';
import { addDesignationAction, addKshetraAction, addPravrutiAction, getDesignationAction, getKshetraAction, getPravrutiAction } from '../../redux/action/masterManagemnet';
import { useDispatch, useSelector } from 'react-redux';

export default function MasterManage() {
    // Initialize 'activeForm' with 'PRAVRUTI' to select it by default
    const [activeForm, setActiveForm] = useState('PRAVRUTI');
    const [pravrutiName, setPravrutiName] = useState("");
    const [kshetraName, setKshetraName] = useState("");
    const [designationName, setDesignationName] = useState("");


    const pravruties = useSelector((state) => state?.mastermanagementState?.getPravruti);
    const kshetras = useSelector((state) => state?.mastermanagementState?.getKshetra);
    const designations = useSelector((state) => state?.mastermanagementState?.getDesignation);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPravrutiAction());
        dispatch(getKshetraAction());
        dispatch(getDesignationAction());
    }, [dispatch]);

    const handleAddPravruti = () => {
        if (pravrutiName.trim() !== "") {
            const pravrutiData = {
                name: pravrutiName
            };
            dispatch(addPravrutiAction(pravrutiData)).then((response) => {
                setPravrutiName("");
            });
        } else {
            alert("Please enter a valid Pravruti name");
        }
    };

    const handleAddKshetra = () => {
        if (kshetraName.trim() !== "") {
            const kshetraData = {
                name: kshetraName
            };
            dispatch(addKshetraAction(kshetraData)).then((response) => {
                setKshetraName("");
            });
        } else {
            alert("Please enter a valid Kshetra name");
        }
    };

    const handleAddDesignation = () => {
        if (designationName.trim() !== "") {
            const designationData = {
                name: designationName
            };
            dispatch(addDesignationAction(designationData)).then((response) => {
                setDesignationName("");
            });
        } else {
            alert("Please enter a valid Designation name");
        }
    };

    const renderForm = () => {
        switch (activeForm) {
            case 'PRAVRUTI':
                return <div className="flex justify-between w-full gap-[20px]">
                    <div className="w-full h-full mx-auto mb-3 scroll-d-none">
                        <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                            <div className="box-border w-full">
                                <div className="sticky top-0 flex bg-[#FEAA00] border-black w-full">
                                    <div className="flex justify-center text-center py-[10px] border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                        <input type="checkbox" id="check-all" />
                                        <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit">Sr.</p>
                                    </div>

                                    <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                        <p className="text-[18px] font-[600] font-Outfit text-[#fff]">Name</p>
                                    </div>
                                    <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                        <p className="text-[15px] font-Outfit"></p>
                                    </div>
                                </div>
                                {/* Data Rows */}
                                <div className="flex justify-between">
                                    <div className="flex justify-center text-center py-3 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                        <input type="checkbox" id="check-all" />
                                        <p className="w-fit text-[15px] font-Outfit"></p>
                                    </div>

                                    <div className="flex justify-start text-center py-3 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                        <input className='w-[100%] border-none outline-none h-[full] px-[1px]'
                                            type='text'
                                            value={pravrutiName}
                                            onChange={(e) => setPravrutiName(e.target.value)}
                                            placeholder="Enter Pravruti name" />
                                    </div>
                                    <div className="flex justify-center text-center py-1 border-b border-black  px-3 min-w-[6%] max-w-[6%]">
                                        <p className="text-[25px] font-Outfit"><i className=" cursor-pointer text-[#00984B] fa-solid fa-paper-plane-top fa-flip-horizontal" onClick={handleAddPravruti}></i></p>
                                    </div>
                                </div>
                                {pravruties?.length > 0 && pravruties.map((pravruti, index) => (
                                    <div className="flex justify-between">
                                        <div key={index} className="flex justify-center text-center py-3 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                            <input type="checkbox" id="check-all" />
                                            <p className="w-fit text-[15px] font-Outfit">1</p>
                                        </div>
                                        <div className="flex justify-start text-center py-3 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                            <p className="text-[15px] font-Outfit">{pravruti.name}</p>
                                        </div>
                                        <div className="flex justify-center text-center py-3 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                            <p className="text-[15px] w-[25px] cursor-pointer font-Outfit"><img src='../../public/img/Foodsection/edit.png' /></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Optional Pagination */}
                            <div className="absolute bottom-0 flex items-center w-full gap-3 end-0">

                            </div>
                        </div>
                    </div>
                </div>;
            case 'KSHETRA':
                return <div className="flex justify-between w-full gap-[20px]">
                    <div className="w-full h-full mx-auto mb-3 scroll-d-none">
                        <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                            <div className="box-border w-full">
                                <div className="sticky top-0 flex bg-[#FEAA00] border-black w-full">
                                    <div className="flex justify-center text-center py-[10px] border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                        <input type="checkbox" id="check-all" />
                                        <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit">Sr.</p>
                                    </div>

                                    <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                        <p className="text-[18px] font-[600] font-Outfit text-[#fff]">Name</p>
                                    </div>
                                    <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                        <p className="text-[15px] font-Outfit"></p>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex justify-center text-center py-3 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                        <input type="checkbox" id="check-all" />
                                        <p className="w-fit text-[15px] font-Outfit"></p>
                                    </div>

                                    <div className="flex justify-start text-center py-3 border-r border-b border-black px-3 min-w-[88%] max-w-[88%] cursor-pointer">
                                        <input className='w-[100%] border-none outline-none h-[full] px-[1px]'
                                            type='text'
                                            value={kshetraName}
                                            onChange={(e) => setKshetraName(e.target.value)}
                                            placeholder='Enter Kshetra Name'
                                        />
                                    </div>
                                    <div className="flex justify-center text-center py-1 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                        <p className="text-[25px] font-Outfit"><i className=" cursor-pointer  text-[#00984B]  fa-solid fa-paper-plane-top fa-flip-horizontal" onClick={handleAddKshetra}></i></p>
                                    </div>
                                </div>
                                {Array.isArray(kshetras) && kshetras.length > 0 ? (
                                    kshetras.map((kshetra, index) => (
                                        <div className="flex justify-between">
                                            <div key={index} className="flex justify-center text-center py-3 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                                <input type="checkbox" id="check-all" />
                                                <p className="w-fit text-[15px] font-Outfit">1</p>
                                            </div>

                                            <div className="flex justify-start text-center py-3 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                                <p className="text-[15px] font-Outfit">{kshetra.name}</p>
                                            </div>
                                            <div className="flex justify-center text-center py-3 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                                <p className="text-[15px] w-[25px] font-Outfit cursor-pointer"><img src='../../public/img/Foodsection/edit.png' /></p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No kshetras found</p>
                                )}

                            </div>

                            <div className="absolute bottom-0 flex items-center w-full gap-3 end-0">

                            </div>
                        </div>
                    </div>
                </div>;
            case 'DESIGNATION':
                return <div className="flex justify-between w-full gap-[20px]">
                    <div className="w-full h-full mx-auto mb-3 scroll-d-none">
                        <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                            <div className="box-border w-full">
                                <div className="sticky top-0 flex bg-[#FEAA00] border-black w-full">
                                    <div className="flex justify-center text-center py-[10px] border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                        <input type="checkbox" id="check-all" />
                                        <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit">Sr.</p>
                                    </div>

                                    <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                        <p className="text-[18px] font-[600] font-Outfit text-[#fff]">Name</p>
                                    </div>
                                    <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                        <p className="text-[15px] font-Outfit"></p>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex justify-center text-center py-3 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                        <input type="checkbox" id="check-all" />
                                        <p className="w-fit text-[15px] font-Outfit"></p>
                                    </div>

                                    <div className="flex justify-start text-center py-3 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                        <input className='w-[100%] border-none outline-none h-[full] px-[1px]'
                                            type='text'
                                            value={designationName}
                                            onChange={(e) => setDesignationName(e.target.value)}
                                            placeholder='Enter Designation Name' />
                                    </div>
                                    <div className="flex justify-center text-center py-1 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                        <p className="text-[25px] font-Outfit"><i className=" cursor-pointer text-[#00984B] fa-solid fa-paper-plane-top fa-flip-horizontal" onClick={handleAddDesignation}></i></p>
                                    </div>
                                </div>
                                {Array.isArray(designations) && designations.length > 0 ? (
                                    designations.map((designation, index) => (
                                        <div className="flex justify-between" key={designation.id || index}>
                                            <div className="flex justify-center text-center py-3 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                                                <input type="checkbox" id={`check-${designation.id || index}`} />
                                                <p className="w-fit text-[15px] font-Outfit">{index + 1}</p>
                                            </div>
                                            <div className="flex justify-start text-center py-3 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                                                <p className="text-[15px] font-Outfit">{designation.name}</p>
                                            </div>
                                            <div className="flex justify-center text-center py-3 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                                                <p className="text-[15px] w-[25px] font-Outfit cursor-pointer">
                                                    <img src='../../public/img/Foodsection/edit.png' alt="Edit Icon" />
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No designations found</p>
                                )}






                            </div>
                            <div className="absolute bottom-0 flex items-center w-full gap-3 end-0">

                            </div>
                        </div>
                    </div>
                </div>;
            default:
                return <p>Select a form to display</p>;
        }
    };

    return (
        <>
            <div className="w-[99%] h-[100vh]  relative overflow-hidden top-0 bottom-0  px-[40px] py-[48px] mx-auto   my-auto   ">
                <div className="   mx-auto flex gap-[30px] h-[90vh] flex-col relative   rounded-[19px] border-[1px] border-[#FEAA00]">
                    <div className="flex absolute left-[3%]  top-[5%]  text-[20px] font-[600]">
                        <i className="fa-solid fa-angle-up fa-rotate-270"></i>
                        <p> MASTER MANAGEMENT</p>
                    </div>
                    <div className="flex absolute right-[20%] md150:top-[5.9%] top-[7.9%] font-Poppins font-[600] text-[15px] ">

                        <div className='flex gap-[10px] mx-auto justify-center w-[100%]   z-20'>

                            <div
                                className={` w-[80%] flex items-center justify-center  rounded-tr-[5px] rounded-tl-[5px] border-r-[1.5px] px-[19px]  border-l-[1.5px]  font-bold     cursor-pointer border-t-[1.5px] border-[#000]  ${activeForm === 'PRAVRUTI' ? 'bg-[#FEAA00] text-[#fff]' : ' bg-white '} h-[40px] cursor-pointer`}
                                onClick={() => setActiveForm('PRAVRUTI')}
                            >
                                <p>PRAVRUTI</p>
                            </div>


                            <div
                                className={` w-[80%] flex items-center justify-center  rounded-tr-[5px] rounded-tl-[5px] border-r-[1.5px] px-[19px] font-[]  border-l-[1.5px]  border-t-[1.5px] border-[#000]  ${activeForm === 'KSHETRA' ? 'bg-[#FEAA00] text-[#fff]' : 'text-[#000] bg-white '} h-[40px] cursor-pointer`}
                                onClick={() => setActiveForm('KSHETRA')}
                            >
                                <p>KSHETRA</p>
                            </div>

                            <div
                                className={`w-[130px] flex items-center justify-center  rounded-tr-[5px] rounded-tl-[5px] border-r-[1.5px] px-[19px] font-[600] border-l-[1.5px]  border-t-[1.5px] border-[#000]  ${activeForm === 'DESIGNATION' ? 'bg-[#FEAA00] text-[#fff]' : 'text-[#000] bg-white '} h-[40px] cursor-pointer`}
                                onClick={() => setActiveForm('DESIGNATION')}
                            >
                                <p>DESIGNATION</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-[90px] flex w-[97%]  gap-[20px]">
                        <Header />
                        <div className="  py-[20px] px-[20px]  md150:h-[70vh]  overflow-y-auto h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]" >


                            {renderForm()}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
