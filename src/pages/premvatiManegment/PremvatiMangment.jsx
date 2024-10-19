import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Header from "../../Components/header/Header";
import { addPremvatiAction, getPremvatiAction } from "../../redux/action/premvatiList";
import { useDispatch, useSelector } from "react-redux";


export default function PremvatiManagement() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("")

    const premvatis = useSelector((state) => state.premvatiListState.getPremvati);

    console.log('premvatis', premvatis);

    useEffect(() => {
        dispatch(getPremvatiAction());
    }, [dispatch]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", name);
        if (image) {
            formData.append("image", image);
        }

        dispatch(addPremvatiAction(formData))
            .then(() => {
                dispatch(getPremvatiAction()); // Reload the data after adding
                onOpenChange(false); // Close the modal
            })
            .catch((err) => {
                console.error("Error submitting premvati:", err);
            });
    };



    return (
        <>
            <div className="w-[99%] h-[100%]  relative overflow-hidden  px-[40px] py-[48px] mx-auto   my-auto ">

                <div className="mx-auto flex gap-[30px] h-[90vh] flex-col relative   rounded-[19px] border-[1px] border-[#FEAA00]">

                    <div className="flex absolute left-[3%]  top-[5%]  text-[20px] font-[600]">
                        <i className="fa-solid fa-angle-up fa-rotate-270"></i>
                        <p>PREMVATI MANAGEMENT</p>
                    </div>

                    <div className="py-[90px] flex w-[97%]  gap-[20px]">
                        <Header />

                        <div className=" py-[20px] px-[20px]  md150:h-[70vh]  overflow-y-auto h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                            <div className="flex w-full gap-[20px]">
                                {Array.isArray(premvatis) ? (
                                    premvatis.map((item, index) => (
                                        <div key={index} className="flex justify-center items-center flex-col rounded-[10px] border-[1.5px] border-[#FEAA00] border-dashed">
                                            <div className="h-[200px] w-[200px] flex justify-center items-center cursor-pointer" onClick={onOpen}>
                                                <i className="text-[60px] text-[#FEAA00] fa-solid fa-plus" src={item?.image}></i>
                                            </div>
                                            <div className="h-[35px] justify-center flex items-center border-t-[1.5px] font-[600] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed w-[200px] bg-[#FEAA00]">
                                                <p>{item?.name}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No data available</p>
                                )}
                                {/* Additional Cards */}

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="absolute top-[180px]  bottom-0 h-[490px]  flex items-center "
                backdrop="blur" // Adds background blur
            >
                <ModalContent className="border-[1px]   border-[#FEAA00] border-dashed">
                    {(onClose) => (
                        <>

                            <div className="flex  justify-center items-center flex-col rounded-[10px] border-dashed">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="h-[350px] w-[440px] rounded-[10px]"
                                    />
                                ) : (
                                    <>
                                        <label
                                            className="text-[60px] text-[#FEAA00] fa-solid fa-plus cursor-pointer"
                                            htmlFor="imageUpload"
                                        />
                                        <input
                                            name="image"
                                            type="file"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </>
                                )}
                                <div className="w-full ">
                                    <input className="h-[70px] justify-center w-full text-[20px] flex items-center border-[1.5px] font-[600] px-[20px] text-[#fff] rounded-[10px] bg-[#6A6A6A] border-[#fffaf5] border-dashed "
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="h-[70px] justify-center bg-[#00984B] w-full text-[20px] cursor-pointer flex items-center border-[1.5px] font-[600] px-[10px] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed " onClick={handleSubmit}>
                                    <p>
                                        Submit & Save Premvati
                                    </p>
                                </div>
                            </div>



                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
