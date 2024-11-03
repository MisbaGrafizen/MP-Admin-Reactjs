import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import Header from "../../Components/header/Header";
import {
  addPremvatiAction,
  getPremvatiAction,
} from "../../redux/action/premvatiList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PremvatiManagement() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const premvatis = useSelector((state) => state.premvatiListState.getPremvati);

  console.log("premvatis", premvatis);
  const handleBack = () => {
    navigate(-1);
  }

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
        dispatch(getPremvatiAction());
        onOpenChange(false);
      })
      .catch((err) => {
        console.error("Error submitting premvati:", err);
      });
  };

  return (
    <>
      <div className="w-[99%] md11:w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  md11:py-[34px] md150:py-[48px] md11:px-[30px] md150:px-[40px]  mx-auto   my-auto">
        <div className="  mx-auto flex gap-[30px] w-[100%] md11:h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#FEAA00]">
          <div className="flex absolute gap-[10px] left-[3%]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
            <i className="fa-solid fa-angle-up fa-rotate-270" onClick={handleBack}></i>

            <div className=' font-Potua  flex items-center gap-[10px] cursor-pointer' onClick={handleBack}>
              <p>
                PREMVATI
              </p>
              <p>
                MANAGEMENT
              </p>
            </div>
          </div>

          <div className="md11:py-[69px] md150:py-[90px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
            <Header />

            <div className="  py-[20px] px-[20px]  md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
              <div className="flex flex-wrap w-full gap-[20px]">
                <div className="flex justify-between items-center md150:h-[220px] md11:h-[180px]  md150:w-[200px] md11:w-[150px]  flex-col rounded-[10px] border-[1.5px] border-[#FEAA00] border-dashed">
                  <div
                    className="md150:h-[200px] md11:h-[190px]  md150:w-[200px] md11:w-[150px] flex justify-center items-center cursor-pointer"
                    onClick={onOpen}
                  >
                    <i
                      className="text-[60px] text-center text-[#FEAA00] fa-solid fa-plus"
                      src="../../../public/img/Baps.png"
                    ></i>
                  </div>
                  <div className="h-[50px] justify-center flex items-center border-t-[1.5px] font-[600] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed w-[100%] bg-[#FEAA00]"></div>
                </div>
                <div className="flex justify-center md150:h-[220px] md11:h-[180px]  md150:w-[200px] md11:w-[150px]  items-center flex-col rounded-[10px] border-[1.5px] border-[#FEAA00] border-dashed">
                  <div
                    className="h-[180px] w-[200px] flex justify-center items-center cursor-pointer"

                  >

                  </div>
                  <div className="h-[50px] justify-center text-[15px] font-Poppins flex items-center border-t-[1.5px] font-[400] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed w-[100%] bg-[#FEAA00]">
                    <p>
                      Kalawad
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="absolute top-[180px]  bottom-0 h-[360px]  w-[280px] flex items-center "
        backdrop="blur"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <div className="flex justify-between h-[100%] w-[100%] items-center flex-col  border-dashed">
                <div className=" w-[100%] h-[100%]">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-[440px] h-[100%] rounded-t-[10px]"
                    />
                  ) : (
                    <>
                      <label
                        htmlFor="imageUpload"
                        className="text-[60px] text-[#FEAA00] h-[100%]  flex justify-center items-center fa-solid fa-plus cursor-pointer"
                      ></label>
                      <input
                        id="imageUpload" 
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                        className="hidden "
                      />
                    </>
                  )}
                </div>

                <div className=" flex w-[100%] flex-col ">
                  <div className="w-full mt-4">
                    <input
                      className="h-[60px] w-full text-[20px] font-[600] border-[2px] border-b-[2px] px-[20px] text-[#fff] outline-none bg-[#6A6A6A] border-[#fffaf5] border-dashed"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div
                    className="h-[60px] bg-[#00984B] w-full text-[20px]  border-[2px]  !border-t-[0px] cursor-pointer flex items-center justify-center font-[600] text-[#fff] border-[#fffaf5] border-dashed "
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
