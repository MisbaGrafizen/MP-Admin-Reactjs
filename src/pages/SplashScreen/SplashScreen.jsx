import React, { useEffect, useRef, useState } from 'react'
import Header from '../../Components/header/Header';
import cloudinaryUpload from '../../helper/cloudinaryUpload';
import { toast } from '../../helper';
import { addSplashScreenImageAction, getSplashScreenImageAction } from '../../redux/action/splashScreen';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const dispatch = useDispatch();
    const [selectedImages, setSelectedImages] = useState(Array(6).fill(null));
    const [apiImages, setApiImages] = useState(Array(6).fill(null));
    const fileInputRefs = Array.from({ length: 6 }, () => useRef(null));
    const [cloudUrl, setCloudUrl] = useState(Array(6).fill(null));  
   const handleContainerClick = (index) => {
        fileInputRefs[index].current.click();
    };
    useEffect(()=>{
        const getImg = async () =>{
            // await dispatch(getSplashScreenImageAction()).then((response) =>{
            //     if (response && response.length > 0) {
            //         console.log("sdffsddjuerh",response)
            //         const images = response.map(item => item.splashImage); 
            //         console.log("sdfsdfff",images)
            //         setSelectedImages(images);
            //         setApiImages(images) 
            //       }
            // })
            await dispatch(getSplashScreenImageAction()).then((response) => {
                if (response && response.length > 0) {
                    console.log("Response:", response);
                    
                    const images = response.reduce((acc, item) => {
                        if (Array.isArray(item.splashImages) && item.splashImages.length > 0) {
                            item.splashImages.forEach(image => {
                                if (image.imgUrl) {
                                    acc.push(image.imgUrl);
                                }
                            });
                        }
                        return acc;
                    }, []);
                    
                    console.log("Extracted Images:", images);
                    setSelectedImages(images);
                    setApiImages(images);
                }
              });
              
        }
        getImg();
    },[])
    const handleFileChange = async (event, index) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const imageUrl = await cloudinaryUpload(file);
                setCloudUrl((prev) => {
                    const newUrls = [...prev];
                    newUrls[index] = imageUrl; 
                    return newUrls;
                  });    
                  const reader = new FileReader();
                  reader.onload = (e) => {
                      const newImages = [...selectedImages];
                      newImages[index] = e.target.result;
                      setSelectedImages(newImages);
                  };
                  reader.readAsDataURL(file);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };
    const handelImgSubmit = async() =>{
    // console.log("ApiImg",apiImages)
    // console.log("upadateOrDeleteImg",selectedImages)
    console.log("dfscloudUrl",cloudUrl)
    const changes = cloudUrl.reduce((acc, imgUrl, index) => {
        if (imgUrl !== null) {
            acc.push({ index, imgUrl }); 
        }
        return acc;
      }, []);
      
      console.log("Chsdsdanges:", changes);
      await dispatch(addSplashScreenImageAction(changes)).then((response) =>{
        console.log("Dataasas",response)
    })
    }
    return (
        <>
            <div className="w-[99%] h-[100vh]  relative overflow-hidden  px-[40px] py-[37px] mx-auto   my-auto   ">
                <div className="  mx-auto flex gap-[30px] h-[90vh] flex-col relative   rounded-[19px] border-[1px] border-[#FEAA00]">

                    <div className="flex absolute  gap-[10px] font-Potua left-[3%]  top-[5%]  text-[20px] font-[600]">
                        <i className="fa-solid fa-angle-up fa-rotate-270"></i>

                        <div className='flex items-center gap-[10px]'>
                            <p>
                                SPLASH
                            </p>
                            <p>
                                SCREEN
                            </p>
                            <p>
                                MANAGEMENT
                            </p>

                        </div>
                    </div>
                    <div className="py-[90px] flex w-[97%]  gap-[20px]">
                        <Header />
                        <div className=" py-[20px] px-[20px]  md150:h-[70vh]  overflow-y-auto h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]" >
                            <div className="flex flex-wrap w-100 gap-[20px]">
                                <div className="">
                                    <img className='w-[220px] h-[450px]' src="../../../public/img/AdminSpalsh/Splash screen.png" alt="" />
                                </div>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-[210px] h-[450px] rounded-[10px] border-[#FEAA00] flex justify-center items-center border-2 border-dashed cursor-pointer relative overflow-hidden"
                                        onClick={() => handleContainerClick(index)}
                                        style={{
                                            backgroundImage: selectedImages[index] ? `url(${selectedImages[index]})` : "none",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        {!selectedImages[index] && (
                                            <i className="text-[60px] text-[#FEAA00] fa-solid fa-plus"></i>
                                        )}
                                        <input
                                            type="file"
                                            ref={fileInputRefs[index]}
                                            style={{ display: "none" }}
                                            onChange={(e) => handleFileChange(e, index)}
                                        />
                                    </div>
                                ))}

                            </div>

                            <div className=" border-t-[2px] bg-white active:bg-[#00984B] active:text-[#fff] border-r-[2px] border-l-[2px]  absolute mx-auto px-[15px] w-[220px] justify-center text-center  bottom-0 left-0 right-0  rounded-tl-[10px] cursor-pointer  rounded-tr-[10px] py-[10px] text-[#00984B] font-[600] custom-font text-[25px]  border-[#00984B]" onClick={handelImgSubmit}>

                                <p>Save the changes</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}
