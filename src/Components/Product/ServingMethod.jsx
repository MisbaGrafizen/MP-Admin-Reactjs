import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { addServingCategoryAction, addServingMethodAction, getAllServingCategoryAction, getServingMethodByCategoryIdAction } from '../../redux/action/productMaster';
import { useDispatch, useSelector } from 'react-redux';

export default function ServingMethod() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedServingCategory, setSelectedServingCategory] = useState("");
    const [buttons, setButtons] = useState(['Dishes', 'Bowl', 'Dinner Plates']);
    const [selectedButton, setSelectedButton] = useState(0);
    const [servingMethodInput, setServingMethodInput] = useState({ name: '', price: '', description: '', photo: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedServingMethod, setSelectedServingMethod] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const dispatch = useDispatch();
    const servingCategories = useSelector((state) => state?.productMasterState?.getServingCategory);
    const servingMethods = useSelector((state) => state?.productMasterState?.getServingMethod);

    useEffect(() => {
        dispatch(getAllServingCategoryAction())
    }, [dispatch]);

    useEffect(() => {
        if (selectedServingCategory) {
            dispatch(getServingMethodByCategoryIdAction(selectedServingCategory?._id));
        }
    }, [dispatch, selectedServingCategory]);

    const handleCategoryClick = (category, index) => {
        setSelectedServingCategory(category);
        setSelectedButton(index);
    };

    const inputRef = useRef(null);
    const handlePlusClick = () => {
        setShowInput(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleCategorySubmit = () => {
        if (inputValue) {
            dispatch(addServingCategoryAction({ name: inputValue }));
            setInputValue('');
            setShowInput(false);
        }
    };

    const handleServingMethodInputChange = (e) => {
        setServingMethodInput({
            ...servingMethodInput,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file); 

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleTextareaInput = (e) => {
        const lines = e.target.value.split('\n');
        const newLines = lines.map((line, index) => {
            const trimmedLine = line.replace(/^\d+\.\s*/, '');
            return `${index + 1}. ${trimmedLine}`;
        });

        setServingMethodInput({
            ...servingMethodInput,
            description: newLines.join('\n'),
        });
    };



    const [textareaValue, setTextareaValue] = useState(() => {
        return Array.from({ length: 1 }, (_, i) => `${i + 1}. `).join('\n');
    });


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


    const handleAddServingMethodSubmit = () => {
        if (!selectedServingCategory || !selectedServingCategory?._id) {
            alert('Please select a valid category.');
            return;
        }
        if (!servingMethodInput.name || !servingMethodInput.price || !servingMethodInput.description) {
            alert('Please fill in all required fields and upload an image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', servingMethodInput.name);
        formData.append('price', servingMethodInput.price);
        formData.append('description', servingMethodInput.description);
        formData.append('photo', imageFile);
        formData.append('categoryId', selectedServingCategory?._id);

        dispatch(addServingMethodAction(formData))
            .then(response => {
                console.log('Item added successfully:', response);
                setServingMethodInput({ name: '', price: '', description: '', photo: null });
                setImagePreview(null);
                onOpenChange(false);
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    };

    const handleCategoryEditSubmit = (categoryId) => {
        if (inputValue) {
            dispatch(addServingCategoryAction({ _id: categoryId, name: inputValue }))
                .then(() => {
                    setEditingCategoryId(null);
                    setInputValue('');
                    dispatch(getAllServingCategoryAction()); 
                })
                .catch(error => console.error('Error updating category:', error));
        }
    };

    const handleCategoryDoubleClick = (category) => {
        setEditingCategoryId(category._id);
        setInputValue(category.name);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            if (editingCategoryId) {
                handleCategoryEditSubmit(editingCategoryId);
            } else {
                handleCategorySubmit();
            }
        }
    };

    const handleServingMethodDoubleClick = (method, event) => {
        setSelectedServingMethod(method);
        setPopupVisible(true);


        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({
            top: rect.top + window.scrollY + rect.height / 2 - 30, 
            left: rect.left + window.scrollX + rect.width / 2 - 70 
        });
    };

    const handlePopupClose = () => {
        setPopupVisible(false);
        setSelectedServingMethod(null);
    };

    const handleEditServingMethod = () => {
        if (selectedServingMethod) {
            onOpen();
            setPopupVisible(false);
        }
    };
    const [isDelOpen, setIsDelOpen] = useState(false);

    const handleDelete = () => {
        setIsDelOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDelOpen(false);
    };


    return (
        <>
            <div className="w-[100%] p-[5px]">
                <div className="w-[100%] flex flex-col md150:gap-[30px] md11:gap-[20px]">
                    <div className="flex gap-[15px] flex-wrap" ref={inputRef}>
                        <div className="flex">
                            {!showInput ? (
                                <div
                                    className="border-[1px] border-dashed border-[#000] md150:text-[18px] md11:text-[15px] md150:w-[120px] md11:w-[100px] md150:h-[40px] md11:h-[35px]  flex justify-center items-center rounded-[8px] cursor-pointer"
                                    onClick={handlePlusClick}
                                >
                                    <i className="text-[20px] font-[800] text-[#000000] fa-solid fa-plus"></i>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    className="border-[0.5px] border-[#4d4b4b] border-dashed outline-none md150:text-[18px] md11:text-[15px] md150:w-[120px] md11:w-[100px] md150:h-[40px] md11:h-[35px]  rounded-[8px] pl-[10px]"
                                    placeholder="Enter text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                />
                            )}
                        </div>


                        {servingCategories.map((category, index) => (
                            <div
                                key={category._id}
                                className={`border-[0.5px] border-[#000] font-[600] md150:text-[18px] md11:text-[15px] md150:w-[120px] md11:w-[100px] md150:h-[40px] md11:h-[35px] flex justify-center items-center rounded-[8px] cursor-pointer ${selectedButton === index ? 'bg-[#feaa00] text-white' : ''}`}
                                onClick={() => handleCategoryClick(category, index)}
                                onDoubleClick={() => handleCategoryDoubleClick(category)}
                            >
                                {editingCategoryId === category._id ? (
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyPress}
                                        className="text-center bg-transparent border-none outline-none"
                                        autoFocus
                                    />
                                ) : (
                                    <p>{category.name}</p>
                                )}
                            </div>
                        ))}
                    </div>


                    <div className="flex flex-wrap gap-[20px] ">

                        <div className="border-[1px] border-dashed border-[#feaa00] rounded-[8px] h-[100%] w-[180px] cursor-pointer" onClick={onOpen}>
                            <div className="flex justify-center h-[140px] items-center pt-[10px]">
                                <i className="text-[70px] flex font-[800] text-[#feaa00] fa-solid fa-plus"></i>
                            </div>
                            <div className="border-dashed flex gap-[20px] p-[10px] rounded-[8px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                <div className="font-[600] pl-[7px] text-[15px] text-[white]">
                                    <p>Name:</p>
                                    <p>Price:</p>
                                </div>
                            </div>
                        </div>
                        {servingMethods?.map((method, index) => (
                            <div
                                key={index}
                                className="border-[1px] border-dashed border-[#feaa00] rounded-[8px] w-[180px] h-[100%] cursor-pointer"
                                onDoubleClick={(e) => handleServingMethodDoubleClick(method, e)}
                            >
                                <div className="flex justify-center h-[140px] w-full p-[10px]">
                                    <img className=" w-[100%] rounded-tl-[8px] rounded-tr-[8px]" src={method?.photo} alt={method?.name || 'Serving Method Image'} />
                                </div>
                                <div className="border-dashed pl-[7px] flex gap-[20px] p-[10px] rounded-[8px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                    <div className="font-[600] pl-[7px] text-[15px] text-[white]">
                                        <p>Name:</p>
                                        <p>Price:</p>
                                    </div>
                                    <div className="font-[600] text-[14px] text-[white]">
                                        <p>{method?.name}</p>
                                        <p>{method?.price}/-</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {popupVisible && (
                            <div
                                className="absolute p-2 bg-white border w-[140px] rounded shadow-lg transition-opacity duration-300 ease-in-out"
                                style={{
                                    top: `${popupPosition?.top - 100}px`, 
                                    left: `${popupPosition?.left - 55}px`, 
                                    transform: 'translate(-50%, -50%)',
                                }}
                                onMouseLeave={handlePopupClose}
                            >
                                <p className="text-blue-500 hover:bg-blue-100 pl-[10px] rounded-[5px] font-Poppins cursor-pointer" onClick={handleEditServingMethod}>Edit</p>
                                <p className="text-red-500 hover:bg-red-100 pl-[10px] rounded-[5px] font-Poppins cursor-pointer" onClick={handleDelete} >Delete</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>


            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-[]'>
                <ModalContent className='!max-w-[580px]  !mt-[100px] h-[480px] rounded-[10px] overflow-hidden bg-white border-[1px] border-[#000]  ' >
                    {(onClose) => (
                        <>
                            <div className='relative '>
                                <div className=" px-[20px] py-[20px]   relative">
                                    <div className=" w-[100%] flex gap-[29px] flex-col">
                                        <div className="w-[100%] flex gap-[16px]">
                                            <div className="border-[1px] border-dashed max-h-[170px]  border-[#feaa00] rounded-[8px] flex justify-center items-center w-[167px] cursor cursor-pointer" onClick={onOpen}>
                                                <label htmlFor="imageUpload" className="cursor-pointer flex justify-center !w-[560px]">
                                                    {imagePreview ? (
                                                        <img
                                                            src={imagePreview}
                                                            className="h-[160px] w-[600px] rounded-[8px]"
                                                        />
                                                    ) : (
                                                        <i className="text-[60px] flex font-[800] text-[#feaa00] fa-solid fa-plus"></i>
                                                    )}
                                                    <input
                                                        type="file"
                                                        id="imageUpload"
                                                        name="photo"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                        accept="image/*" 
                                                    />
                                                </label>

                                            </div>

                                            <div className=" flex flex-col w-[100%] gap-[20px]">
                                                <div className="flex w-[100%] gap-[20px]">
                                                    <div className=" flex gap-[5px] w-[41%]  text-[14px] items-center border-b-[1.9px] px-[5px] border-[#000]">
                                                        <p className='font-[700]'>Name:</p>
                                                        <input className='outline-none'
                                                            type="text"
                                                            name="name"
                                                            value={servingMethodInput?.name}
                                                            onChange={handleServingMethodInputChange}
                                                        />
                                                    </div>
                                                    <div className="  w-[41%] flex gap-[5px] items-center border-b-[1.9px] px-[5px] border-[#000]">
                                                        <p className='font-[700] text-[14px] '>Price:</p>
                                                        <input className='outline-none'
                                                            type="text"
                                                            name="price"
                                                            value={servingMethodInput?.price}
                                                            onChange={handleServingMethodInputChange}
                                                        />
                                                    </div>


                                                </div>
                                                <div className="flex  gap-[2px] w-[88%] p-[10px] border-[#000] outline-none border-[1.9px] rounded-[8px] h-[120px] text-[15px">
                                                    <p>Self note : </p>
                                                    <textarea name="" className="font-[500] w-[78%] outline-none" id=""> </textarea>

                                                </div>

                                            </div>

                                        </div>
                                        <div className="textarea-container border-[1.9px] rounded-[8px] border-[#000]" >

                                            <textarea
                                                id="numbered-textarea"
                                                className="w-[100%] p-[10px] outline-none  rounded-[8px] h-[180px] text-[15px] font-[500]"
                                                style={{ fontFamiy: "monospace" }}
                                                value={servingMethodInput?.description}
                                                onChange={handleTextareaInput}
                                            />
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className="  w-[100%]  text-white absolute bottom-0 cursor-pointer items-center font-[600] flex justify-center h-[47px] rounded-b-[5px] bg-[#00984b] text-[20px]" onClick={handleAddServingMethodSubmit}>
                                <p>Click here to save</p>
                            </div>

                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isDelOpen} onOpenChange={setIsDelOpen}>
                <ModalContent className="md:max-w-[350px] max-w-[333px] relative  flex justify-center !py-0 mx-auto  h-[300px] shadow-delete ">
                    {(ondelClose) => (
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
                                            <div className='w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[red] rounded-bl-[10px] text-[#fff] font-[600] font-Poppins text-[20px]' onClick={closeDeleteModal}>
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



















