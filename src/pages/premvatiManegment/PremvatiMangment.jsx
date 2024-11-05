import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import Header from "../../Components/header/Header";
import {
  addPremvatiAction,
  deletePremvatiAction,
  getPremvatiAction,
  updatePremvatiAction,
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
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectPremvati,setSelectPremvati] = useState();
    const [popupPosition, setPopupPosition] = useState();
    const [isUpdateData,setIsUpdateData] = useState(false)
  const [updateDataId,setUpdateDataId] = useState("");
  const [deleteDataId,setDeleteDataId] = useState("");
  const [isDelOpen, setIsDelOpen] = useState(false);

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
    if(isUpdateData){

      dispatch(updatePremvatiAction(updateDataId,formData))
        .then(() => {
          dispatch(getPremvatiAction());
          setUpdateDataId("");
          onOpenChange(false);
        })
        .catch((err) => {
          console.error("Error submitting premvati:", err);
        });
    }else {
      dispatch(addPremvatiAction(formData))
      .then(() => {
        dispatch(getPremvatiAction());
        onOpenChange(false);
      })
      .catch((err) => {
        console.error("Error submitting premvati:", err);
      });
    }
  };

  const handleFoodItemDoubleClick = (item, event) => {
    console.log("dsghfd",item)
    // setSelectedFoodItem(item);
    setSelectPremvati(item)
    setPopupVisible(true);

    const containerRect = event.currentTarget.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;


    setPopupPosition({
        top: centerY,
        left: centerX,
    });
};

const handleEditFoodItem = (item) => {
  if (selectPremvati) {            
    onOpen();
    setIsUpdateData(true)
    setName(selectPremvati?.name)
    setImage(selectPremvati?.image)
    setUpdateDataId(selectPremvati?._id)
  }
};

const handleDelete = (deleteData) => {
  setIsDelOpen(true);
  if(selectPremvati){
    setDeleteDataId(selectPremvati?._id)
  }
};

const closeDeleteModal = () => {
  setIsDelOpen(false);
};

const handlePopupClose = () => {
  setPopupVisible(false);
  // setSelectedFoodItem(null);
};

const handelConfirmDelete = () =>{
  console.log("ssdsdssd",deleteDataId)
if(deleteDataId){
dispatch(deletePremvatiAction(deleteDataId))
.then((response) => {          
setDeleteDataId(null)
setIsDelOpen(false);
})
.catch(error => {
console.error('Error Delete item:', error);
});
}
}
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
                    onClick={() =>{setIsUpdateData(false);setName("");
                      setImage("");setPreviewImage("");onOpen()}}
                  >
                    <i
                      className="text-[60px] text-center text-[#FEAA00] fa-solid fa-plus"
                      src="../../../public/img/Baps.png"
                    ></i>
                  </div>
                  <div className="h-[50px] justify-center flex items-center border-t-[1.5px] font-[600] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed w-[100%] bg-[#FEAA00]"></div>
                </div>
               {premvatis && premvatis?.map((item) =>(
                
                <div className="flex justify-center md150:h-[220px] md11:h-[180px]  md150:w-[200px] md11:w-[150px]  items-center flex-col rounded-[10px] border-[1.5px] border-[#FEAA00] border-dashed"
                onDoubleClick={(e) => handleFoodItemDoubleClick(item, e)}
                >
                  <div
                    className="h-[180px] w-[200px] flex justify-center items-center cursor-pointer"

                  >

                  </div>
                  <div className="h-[50px] justify-center text-[15px] font-Poppins flex items-center border-t-[1.5px] font-[400] text-[#fff] rounded-[10px] border-[#fffaf5] border-dashed w-[100%] bg-[#FEAA00]">
                    <p>
                      {item?.name}  
                    </p>
                  </div>
                  {popupVisible && (
                                            <div
                                                className="absolute p-2 bg-white border w-[140px] rounded shadow-lg transition-opacity duration-300 ease-in-out"
                                                style={{
                                                    top: `${popupPosition?.top - 140}px`, 
                                                    left: `${popupPosition?.left - 125}px`,
                                                    transform: 'translate(-50%, -50%)',
                                                }}
                                                onMouseLeave={handlePopupClose}
                                            >
                                                <p className="text-blue-500 hover:bg-blue-100 pl-[10px] rounded-[5px] font-Poppins cursor-pointer"  onClick={() => handleEditFoodItem(item)} >Edit</p>
                                                <p className="text-red-500 hover:bg-red-100 pl-[10px] rounded-[5px] font-Poppins cursor-pointer" onClick={() =>handleDelete(item)}>Delete</p>
                                            </div>
                                        )}
                </div>
               )) 
             }

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
                                            <div className='w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[red] rounded-bl-[10px] text-[#fff] font-[600] font-Poppins text-[20px]' 
                                            onClick={handelConfirmDelete}>
                                                
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
