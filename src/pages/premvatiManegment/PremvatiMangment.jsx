import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Header from "../../Components/header/Header";
import {
  addPremvatiAction,
  getPremvatiAction,
} from "../../redux/action/premvatiList";
import { useDispatch, useSelector } from "react-redux";

export default function PremvatiManagement() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const premvatis = useSelector((state) => state.premvatiListState.getPremvati);

  console.log("premvatis", premvatis);

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
      <div className="w-[99%] h-[100vh]  relative overflow-hidden top-0 bottom-0  px-[40px] py-[48px] mx-auto   my-auto ">
        <div className="mx-auto flex gap-[30px] h-[90vh] flex-col relative   rounded-[19px] border-[1px] border-[#FEAA00]">
          <div className="flex absolute left-[3%]  top-[5%]  text-[20px] font-[600]">
            <i className="fa-solid fa-angle-up fa-rotate-270"></i>
            <div className="flex gap-[9px] items-center">
              <p>PREMVATI</p>
              <p>MANAGEMENT</p>
            </div>
          </div>

          <div className="py-[90px] flex w-[97%]  gap-[20px]">
            <Header />

            <div className=" py-[20px] px-[20px]  md150:h-[70vh]  overflow-y-auto h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
              <div className="flex flex-wrap w-full gap-[20px]">
                <div className="flex justify-center items-center flex-col rounded-[10px] border-[1.5px] border-[#FEAA00] border-dashed">
                  <div
                    className="h-[200px] w-[200px] flex justify-center items-center cursor-pointer"
                    onClick={onOpen}
                  >
                    <i
                      className="text-[60px] text-[#FEAA00] fa-solid fa-plus"
                      src="../../../public/img/Baps.png"
                    ></i>
                  </div>
                  <div className="h-[35px] justify-center flex items-center border-t-[1.5px] font-[600] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed w-[200px] bg-[#FEAA00]"></div>
                </div>
                <div className="flex justify-center items-center flex-col rounded-[10px] border-[1.5px] border-[#FEAA00] border-dashed">
                  <div
                    className="h-[180px] w-[200px] flex justify-center items-center cursor-pointer"
                    
                  >
               
                  </div>
                  <div className="h-[55px] justify-center flex items-center border-t-[1.5px] font-[600] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed w-[200px] bg-[#FEAA00]"></div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="absolute top-[180px]  bottom-0 h-[340px]  w-[260px] flex items-center "
        backdrop="blur" 
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <div className="flex justify-between h-[100%] w-[100%] items-center flex-col rounded-[10px] border-dashed">
                <div className=" w-[100%] h-[100%]">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-[440px] h-[180px] rounded-[10px]"
                    />
                  ) : (
                    <>
                      {/* Label as a clickable area for file input */}
                      <label
                        htmlFor="imageUpload"
                        className="text-[60px] text-[#FEAA00] h-[100%]  flex justify-center items-center fa-solid fa-plus cursor-pointer"
                      ></label>
                      {/* Hidden file input */}
                      <input
                        id="imageUpload" // Ensure id matches the label's htmlFor
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                        className="hidden  "
                      />
                    </>
                  )}
                </div>

                <div className=" flex w-[100%] flex-col">
                  <div className="w-full mt-4">
                    <input
                      className="h-[70px] w-full text-[20px] font-[600] border-t-[2px] border-b-[2px] px-[20px] text-[#fff] outline-none bg-[#6A6A6A] border-[#fffaf5] border-dashed"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Submit button */}
                  <div
                    className="h-[70px] bg-[#00984B] w-full text-[20px]   cursor-pointer flex items-center justify-center font-[600] text-[#fff] border-[#fffaf5] border-dashed "
                    onClick={handleSubmit}
                  >
                    <p>Submit & Save Premvati</p>
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
