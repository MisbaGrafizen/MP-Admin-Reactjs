import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { addFoodCategoryAction, addFoodItemAction, getAllFoodCategoryAction, getFoodItemByCategoryIdAction } from '../../redux/action/productMaster';
import { useDispatch, useSelector } from 'react-redux';

export default function SelfServingManage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [buttons, setButtons] = useState([]);
    const [selectedFoodCategory, setSelectedFoodCategory] = useState("");
    const [selectedButton, setSelectedButton] = useState(0);
    const [foodItemInput, setFoodItemInput] = useState({ name: '', price: '', description: '', photo: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const inputRef = useRef(null);

    const dispatch = useDispatch();

    const foodCategories = useSelector((state) => state?.productMasterState?.getAllFoodCategory);
    const foodItems = useSelector((state) => state?.productMasterState?.getFoodItemByFoodCategory);

    useEffect(() => {
        dispatch(getAllFoodCategoryAction());
    }, [dispatch]);


    useEffect(() => {
        if (selectedFoodCategory) {
            dispatch(getFoodItemByCategoryIdAction(selectedFoodCategory?._id));
        }
    }, [dispatch, selectedFoodCategory]);

    const handleCategoryClick = (category, index) => {
        setSelectedFoodCategory(category);
        setSelectedButton(index);
    };



    const handlePlusClick = () => {
        setShowInput(true);
    };


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleCategorySubmit = () => {
        if (inputValue) {
            dispatch(addFoodCategoryAction({ name: inputValue }));
            setInputValue('');
            setShowInput(false);
        }
    };

    const handleFoodItemInputChange = (e) => {
        setFoodItemInput({
            ...foodItemInput,
            [e.target.name]: e.target.value
        });
    };

    const handleAddFoodItemSubmit = () => {
        if (!selectedFoodCategory || !selectedFoodCategory?._id) {
            alert('Please select a valid food category.');
            return;
        }
        if (!foodItemInput.name || !foodItemInput.price || !foodItemInput.description) {
            alert('Please fill in all required fields and upload an image.');
            return;
        }

        // Create FormData for file and form fields
        const formData = new FormData();
        formData.append('name', foodItemInput.name);
        formData.append('price', foodItemInput.price);
        formData.append('description', foodItemInput.description);
        formData.append('photo', imageFile); // Append the image file
        formData.append('foodId', selectedFoodCategory?._id); // Append the category ID

        // Dispatch formData to the action
        dispatch(addFoodItemAction(formData))
            .then(response => {
                console.log('Item added successfully:', response);
                // Reset form fields and image preview after submission
                setFoodItemInput({ name: '', price: '', description: '', photo: null });
                setImagePreview(null); // Reset image preview
                onOpenChange(false); // Close the modal
            })
            .catch(error => {
                console.error('Error adding item:', error);
            });
    };


    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const objectUrl = URL.createObjectURL(file);
    //         setImagePreview(objectUrl);
    //     }
    // };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file); // Save file for submission

        // Image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result); // Set preview URL
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            handleCategorySubmit();
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

        setFoodItemInput({
            ...foodItemInput,
            description: newLines.join('\n'),
        });
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


    return (
        <>
            <div className="w-[100%] py-[5px] px-[5px]">
                <div className="w-[100%] flex flex-col gap-[30px]">
                    <div className="flex gap-[15px] flex-wrap" ref={inputRef}>
                        <div className="flex">
                            {!showInput ? (
                                <div
                                    className="border-[1px] border-dashed border-[#000] w-[120px] h-[40px] flex justify-center items-center rounded-[8px] cursor-pointer"
                                    onClick={handlePlusClick}
                                >
                                    <i className="text-[20px] font-[800] text-[#000000] fa-solid fa-plus"></i>
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    className="border-[0.5px] border-[#4d4b4b] border-dashed outline-none w-[120px] h-[40px] rounded-[8px] pl-[10px]"
                                    placeholder="Enter text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                />
                            )}
                        </div>


                        {foodCategories?.map((category, index) => (
                            <div
                                key={index}
                                className={`border-[0.5px] border-[#000] font-[600] text-[18px] w-[120px] h-[40px] flex justify-center items-center rounded-[8px] cursor-pointer ${selectedButton === index ? 'bg-[#feaa00] text-white' : ''}`}
                                onClick={() => handleCategoryClick(category, index)}  // Pass index here
                            >
                                <p>{category?.name}</p>
                            </div>
                        ))}
                    </div>


                    <div className="flex flex-wrap gap-[20px] ">


                        <div className=" flex gap-[20px] ">
                            <div className="border-[1px] border-dashed border-[#feaa00] rounded-[8px]  w-[180px] cursor-pointer" onClick={onOpen}>
                                <div className="flex justify-center h-[140px] items-center pt-[16px] mb-[20px]">
                                    <i className="text-[70px] flex font-[800] text-[#feaa00] fa-solid fa-plus"></i>
                                </div>
                                <div className="border-dashed flex gap-[20px] p-[10px] rounded-[8px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                    <div className="font-[600] pl-[7px] text-[15px] text-[white]">
                                        <p>Name:</p>
                                        <p>Price:</p>
                                    </div>
                                </div>
                            </div>



                            {foodItems && foodItems.length > 0 ? (
                                foodItems.map((item, index) => (
                                    <>
                                        <div className=" flex gap-[20px] flex-wrap">

                                            <div key={index} className="border-[1px] border-dashed border-[#feaa00] rounded-[8px]  w-[180px]">
                                                <div className="flex justify-center w-fullitems-center  p-[10px]">
                                                    <img className=' h-[140px] w-[100%]  rounded-tl-[8px] rounded-tr-[8px]  ' src={item?.photo} alt="" />
                                                </div>
                                                <div className="border-dashed pl-[7px] flex gap-[20px] p-[10px] rounded-[8px] border-[#fff] bg-[#feaa00] border-t-[1.7px] w-full">
                                                    <div className="font-[600] text-[15px] text-[white]">
                                                        <p>Name:</p>
                                                        <p>Price:</p>
                                                    </div>
                                                    <div className="font-[600] text-[14px] text-[white]">
                                                        <p>{item?.name}</p>
                                                        <p>{item?.price}/-</p>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>
                                    </>
                                ))
                            ) :
                                <p></p>
                            }


                        </div>



                    </div>
                </div>
            </div>


            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='bg-[]'>
                <ModalContent className='!max-w-[580px]  !mt-[200px] h-[480px] bg-white border-[1px] border-[#000] ' >
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
                                                        // Plus button icon (visible by default)
                                                        <i className="text-[60px] flex font-[800] text-[#feaa00] fa-solid fa-plus"></i>
                                                    )}

                                                    {/* Hidden file input */}
                                                    <input
                                                        type="file"
                                                        id="imageUpload"
                                                        name="photo"
                                                        className="hidden" // Hide the input
                                                        onChange={handleFileChange}
                                                        accept="image/*" // To only accept images from gallery
                                                    />
                                                </label>

                                            </div>

                                            <div className=" flex flex-col w-[100%] gap-[20px]">
                                                <div className="flex w-[100%] gap-[20px]">
                                                    <div className=" flex gap-[5px] w-[37%]  text-[14px] items-center border-b-[1.9px] px-[5px] border-[#000]">
                                                        <p className='font-[700]'>Name:</p>
                                                        <input className='outline-none'
                                                            type="text"
                                                            name="name"
                                                            value={foodItemInput?.name}
                                                            onChange={handleFoodItemInputChange}
                                                        />
                                                    </div>
                                                    <div className="  w-[37%] flex gap-[5px] items-center border-b-[1.9px] px-[5px] border-[#000]">
                                                        <p className='font-[700] text-[14px] '>Price:</p>
                                                        <input className='outline-none'
                                                            type="text"
                                                            name="price"
                                                            value={foodItemInput?.price}
                                                            onChange={handleFoodItemInputChange}
                                                        />
                                                    </div>


                                                </div>
                                                <div className="flex">

                                                    <textarea name="" className="font-[500] w-[79%] p-[10px] border-[#000] outline-none border-[1.9px] rounded-[8px] h-[120px] text-[15px]" id="">Self note : </textarea>

                                                </div>

                                            </div>

                                        </div>
                                        <div className="textarea-container border-[1.9px] rounded-[8px] border-[#000]" >
                                            <textarea
                                                id="numbered-textarea"
                                                className="w-[100%] p-[10px] outline-none  rounded-[8px] h-[180px] text-[15px] font-[500]"
                                                style={{ fontFamiy: "monospace" }}
                                                value={foodItemInput?.description}
                                                onChange={handleTextareaInput}
                                            />
                                        </div>

                                    </div>

                                </div>


                                <div className=" w-full  text-white cursor-pointer items-center font-[600] flex justify-center mt-[16px]   h-[40px] bg-[#00984b] text-[20px]" onClick={handleAddFoodItemSubmit}>
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



















