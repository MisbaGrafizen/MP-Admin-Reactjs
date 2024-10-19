/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

export default function PrePackged() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [buttons, setButtons] = useState([]);
    const [selectedButton, setSelectedButton] = useState(0);

    const inputRef = useRef(null);

    const handlePlusClick = () => {
        setShowInput(true);
    };


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {

            setButtons([...buttons, inputValue]);
            setShowInput(false);
            setInputValue('');
        }
    };

    const [textareaValue, setTextareaValue] = useState(() => {
        return Array.from({ length: 1 }, (_, i) => `${i + 1}. `).join('\n');
    });

    const handleTextareaInput = (e) => {
        const lines = e.target.value.split('\n');
        const newLines = lines.map((line, index) => {

            const trimmedLine = line.replace(/^\d+\.\s*/, '');
            return `${index + 1}. ${trimmedLine}`;
        });
        setTextareaValue(newLines.join('\n'));
    };

    useEffect(() => {
        const textarea = document.getElementById('numbered-textarea');
        if (textarea) {
            textarea.scrollTop = textarea.scrollHeight;
            const length = textarea.value.length;
            textarea.setSelectionRange(length, length);
        }
    }, [textareaValue]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowInput(false);
            }
        };


        document.addEventListener("mousedown", handleClickOutside);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputRef]);


    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };

    return (
        <>
            <div className="w-[100%] p-[5px]">
                <div className="w-[100%] flex flex-col gap-[30px]">
                    <div className="flex gap-[10px] flex-wrap" ref={inputRef}>
                        <div className="flex">
                            {!showInput ? (
                                <div
                                    className="border-[1px] border-dashed border-[#000] w-[120px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer"
                                    onClick={handlePlusClick}
                                >
                                    <i className="text-[20px] font-[800] text-[#feaa00] fa-solid fa-plus"></i>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    className="border-[1px] border-[#000] border-dashed outline-none w-[120px] h-[40px] rounded-[10px] pl-[10px]"
                                    placeholder="Enter text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                />
                            )}
                        </div>


                        {buttons.map((text, index) => (
                            <div
                                key={index}
                                className={`border-[1px] border-[#000] font-[600] text-[18px]  w-[120px] h-[40px] flex justify-center items-center rounded-[10px] cursor-pointer ${selectedButton === index ? 'bg-[#feaa00] text-white' : 'bg-[#feaa00] text-white'}`}
                                onClick={() => handleButtonClick(index)}
                            >
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>


                    <div className="flex flex-wrap gap-[20px] ">
                        {selectedButton === 0 && (
                            <>

                                <div className="border-[1px] border-dashed border-[#feaa00] rounded-[10px] h-[100%] w-[180px] cursor-pointer" onClick={onOpen}>
                                    <div className="flex justify-center h-[140px] items-center ">
                                        <i className="text-[70px] flex font-[800] text-[#feaa00] fa-solid fa-plus"></i>
                                    </div>
                                    <div className="border-dashed flex gap-[20px] p-[10px] rounded-[10px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                        <div className="font-[600] text-[15px] text-[white]">
                                            <p>Name:</p>
                                            <p>Price:</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-[1px] border-dashed border-[#feaa00] rounded-[10px] h-[100%] w-[180px]">
                                    <div className="flex justify-center w-fullitems-center ">
                                        <img className=' h-[140px] w-[100%]  rounded-tl-[8px] rounded-tr-[8px]  ' src="../../../public/img/Foodsection/image 5.png" alt="" />
                                    </div>
                                    <div className="border-dashed flex gap-[20px] p-[10px] rounded-[10px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                        <div className="font-[600] text-[15px] text-[white]">
                                            <p>Name:</p>
                                            <p>Price:</p>
                                        </div>
                                        <div className="font-[600] text-[15px] text-[white]">
                                            <p></p>
                                            <p></p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {selectedButton === 1 && (
                            <>
                                <div className="border-[1px] border-dashed border-[#feaa00] rounded-[10px] h-[100%] w-[180px] cursor-pointer" onClick={onOpen}>
                                    <div className="flex justify-center h-[140px] items-center ">
                                        <i className="text-[70px] flex font-[800] text-[#feaa00] fa-solid fa-plus"></i>
                                    </div>
                                    <div className="border-dashed flex gap-[20px] p-[10px] rounded-[10px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                        <div className="font-[600] text-[15px] text-[white]">
                                            <p>Name:</p>
                                            <p>Price:</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-[1px] border-dashed border-[#feaa00] rounded-[10px] h-[100%] w-[180px]">
                                    <div className="flex justify-center w-full  items-center ">
                                        <img className='h-[140px] rounded-tl-[8px]  w-[100%]' src="../../../public/img/sandwich.jpg" alt="" />
                                    </div>
                                    <div className="border-dashed flex gap-[20px] p-[10px] rounded-[10px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                        <div className="font-[600] text-[15px] text-[white]">
                                            <p>Name:</p>
                                            <p>Price:</p>
                                        </div>
                                        <div className="font-[600] text-[15px] text-[white]">
                                            <p></p>
                                            <p>60 /-</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>


            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className='!max-w-[800px] h-[470px] border-[1px] border-[#000] ' >
                    {(onClose) => (
                        <>
                            <div className='relative '>
                                <div className=" p-[20px]   relative">
                                    <div className=" w-[100%] flex gap-[20px] flex-col">
                                        <div className=" flex gap-[20px]">
                                            <div className="border-[1px] border-dashed h-[170px] border-[#feaa00] rounded-[10px] flex justify-center items-center w-[190px] cursor cursor-pointer" onClick={onOpen}>

                                                <i className="text-[60px]  flex font-[800] text-[#feaa00] fa-solid fa-plus"></i>

                                            </div>

                                            <div className="w-full flex flex-col gap-[20px]">
                                                <div className="flex gap-[20px]">
                                                    <div className=" flex gap-[5px] items-center border-b-[1.9px] px-[5px] border-[#000]">
                                                        <p className='font-[700]'>Name :</p>
                                                        <input className='outline-none' type="text" />
                                                    </div>
                                                    <div className=" flex gap-[5px] items-center border-b-[1.9px] px-[5px] border-[#000]">
                                                        <p className='font-[700]'>Price :</p>
                                                        <input className='outline-none' type="text" />
                                                    </div>


                                                </div>
                                                <div className="flex">

                                                    <textarea name="" className="font-[500] w-[100%] p-[10px] border-[#000] outline-none border-[1.9px] rounded-[10px] h-[120px] text-[15px]" id="">Self note : </textarea>

                                                </div>

                                            </div>

                                        </div>
                                        <div className="textarea-container border-[1.9px] rounded-[10px] border-[#000]" >
                                            <textarea
                                                id="numbered-textarea"
                                                className="w-[100%] p-[10px] outline-none  rounded-[10px] h-[180px] text-[15px] font-[500]"
                                                style={{ fontFamiy: "monospace" }}
                                                value={textareaValue}
                                                onChange={handleTextareaInput}
                                            />
                                        </div>

                                    </div>

                                </div>


                                <div className=" w-full  text-white cursor-pointer font-[600] flex justify-center items-center  py-[16px] h-[50px] bg-[#00984b] text-[20px]" onClick={onClose}>
                                    <p>Click here to save</p>
                                </div>
                            </div>


                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}



















