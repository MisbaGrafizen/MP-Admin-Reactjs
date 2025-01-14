import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/header/Header";
import {
  addDesignationAction,
  addKshetraAction,
  addPravrutiAction,
  DeleteDesignationsAction,
  DeleteKshetraAction,
  DeletePravrutiAction,
  getDesignationAction,
  getKshetraAction,
  getPravrutiAction,
  updateDesignationAction,
  updateKshetraAction,
  updatePravrutiAction,
} from "../../redux/action/masterManagemnet";
import { useDispatch, useSelector } from "react-redux";
import Editpng from "../../../public/img/Foodsection/edit.png";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import userpng from "../../../public/img/AdminSpalsh/user 3.png";
import Logout from "../../Components/logout/Logout";

export default function MasterManage() {
  const [activeForm, setActiveForm] = useState("PRAVRUTI");
  const [pravrutiName, setPravrutiName] = useState("");
  const [kshetraName, setKshetraName] = useState("");
  const [designationName, setDesignationName] = useState("");
  const [editIndexPravruti, setEditIndexPravruti] = useState(null);
  const [editIndexKshetra, setEditIndexKshetra] = useState(null);
  const [editIndexDesignation, setEditIndexDesignation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const pravruties =
    useSelector((state) => state?.mastermanagementState?.getPravruti) || [];
  const totalPages = Math.ceil(pravruties.length / itemsPerPage);
  const kshetras =
    useSelector((state) => state?.mastermanagementState?.getKshetra) || [];
  const totalPageskhestras = Math.ceil(kshetras.length / itemsPerPage);
  const designations =
    useSelector((state) => state?.mastermanagementState?.getDesignation) || [];
  const totalPagesdesignation = Math.ceil(designations.length / itemsPerPage);
  const dispatch = useDispatch();
  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const paginatedPravruties = pravruties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedKhestras = kshetras.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedDesignation = designations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const [deleteInfo, setDeleteInfo] = useState({});

  useEffect(() => {
    setCurrentPage(1);
  }, [activeForm]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = (pravruti, typeofManges) => {
    setDeleteInfo({ pravruti, typeofManges: typeofManges?.typeofManges });
    onOpenChange(false);
  };
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      setCheckedItems(pravruties.map((_, index) => index));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(index)) {
        return prevCheckedItems.filter((item) => item !== index);
      } else {
        return [...prevCheckedItems, index];
      }
    });
  };

  useEffect(() => {
    dispatch(getPravrutiAction());
    dispatch(getKshetraAction());
    dispatch(getDesignationAction());
  }, [dispatch]);

  const handleAddOrUpdatePravruti = () => {
    if (pravrutiName.trim() !== "") {
      if (editIndexPravruti !== null) {
        const updatedPravruti = {
          ...pravruties[editIndexPravruti],
          name: pravrutiName,
        };
        dispatch(updatePravrutiAction(updatedPravruti)).then(() => {
          setEditIndexPravruti(null);
          setPravrutiName("");
        });
      } else {
        dispatch(addPravrutiAction({ name: pravrutiName })).then(() => {
          setPravrutiName("");
        });
      }
    } else {
      alert("Please enter a valid Pravruti name");
    }
  };

  const handleAddOrUpdateKshetra = () => {
    if (kshetraName.trim() !== "") {
      if (editIndexKshetra !== null) {
        const updatedKshetra = {
          ...kshetras[editIndexKshetra],
          name: kshetraName,
        };
        dispatch(updateKshetraAction(updatedKshetra)).then(() => {
          setEditIndexKshetra(null);
          setKshetraName("");
        });
      } else {
        dispatch(addKshetraAction({ name: kshetraName })).then(() => {
          setKshetraName("");
        });
      }
    } else {
      alert("Please enter a valid Kshetra name");
    }
  };

  const handleAddOrUpdateDesignation = () => {
    if (designationName.trim() !== "") {
      if (editIndexDesignation !== null) {
        const updatedDesignation = {
          ...designations[editIndexDesignation],
          name: designationName,
        };
        dispatch(updateDesignationAction(updatedDesignation)).then(() => {
          setEditIndexDesignation(null);
          setDesignationName("");
        });
      } else {
        dispatch(addDesignationAction({ name: designationName })).then(() => {
          setDesignationName("");
        });
      }
    } else {
      alert("Please enter a valid Designation name");
    }
  };

  const handleEditPravruti = (index) => {
    setEditIndexPravruti(index);
    console.log("pravruties[index]sd", pravruties[index]);
    setPravrutiName(pravruties[index].name);
  };

  const handleEditKshetra = (index) => {
    setEditIndexKshetra(index);
    setKshetraName(kshetras[index].name);
  };

  const handleEditDesignation = (index) => {
    setEditIndexDesignation(index);
    setDesignationName(designations[index].name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [pravruties, totalPages]);

  useEffect(() => {
    if (currentPage > totalPageskhestras && totalPageskhestras > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [kshetras, totalPageskhestras]);

  useEffect(() => {
    if (currentPage > totalPagesdesignation && totalPagesdesignation > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [designations, totalPagesdesignation]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setDropdownOpen(false);
  };
  const handleDeleteRecord = async () => {
    console.log("sdsdsdsds", pravruties.length);
    console.log("data", currentPage);

    if (deleteInfo.typeofManges === "pravruti" && deleteInfo?.pravruti?._id) {
      console.log("sdfdfsgdfg", deleteInfo?.pravruti?._id);
      await dispatch(DeletePravrutiAction(deleteInfo?.pravruti?._id)).then(
        () => {
          setDeleteInfo({});
          onClose();
        }
      );
      return;
    } else if (
      deleteInfo.typeofManges === "kshetra" &&
      deleteInfo?.pravruti?._id
    ) {
      await dispatch(DeleteKshetraAction(deleteInfo?.pravruti?._id)).then(
        () => {
          setDeleteInfo({});
          onClose();
        }
      );
      return;
    } else if (
      deleteInfo.typeofManges === "designations" &&
      deleteInfo?.pravruti?._id
    ) {
      console.log("comesdffghfdsfdgh", deleteInfo?.pravruti?._id);
      await dispatch(DeleteDesignationsAction(deleteInfo?.pravruti?._id)).then(
        () => {
          setDeleteInfo({});
          onClose();
        }
      );
      return;
    }
  };
  const renderForm = () => {
    switch (activeForm) {
      case "PRAVRUTI":
        return (
          <div className="flex justify-between w-full gap-[20px]">
            <div className="w-full h-full mx-auto mb-3 scroll-d-none">
              <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                <div className="box-border w-full">
                  <div className="sticky top-0 flex bg-[#F28C28] border-black w-full">
                    <div className="flex justify-center text-center py-[10px] items-center border-r border-b border-black gap-[7px] px-3 min-w-[6%] max-w-[6%]">
                      <input
                        type="checkbox"
                        id="check-all"
                        checked={checkAll}
                        onChange={handleCheckAll}
                        style={{ width: "15px", height: "15px" }}
                      />
                      <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit">
                        Sr.
                      </p>
                    </div>
                    <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                      <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                        Name
                      </p>
                    </div>
                    <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                      <p className="text-[15px] font-Outfit"></p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex justify-center text-center     py-2 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                      <p className="w-fit text-[15px] font-Outfit"></p>
                    </div>
                    <div className="flex justify-start text-center     py-2 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                      <input
                        className="w-[100%] border-none outline-none"
                        type="text"
                        value={pravrutiName}
                        onChange={(e) => setPravrutiName(e.target.value)}
                        placeholder="Enter Pravruti name"
                      />
                    </div>
                    <div className="flex justify-center text-center py-1 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                      <p className="text-[25px] font-Outfit">
                        <i
                          className={`cursor-pointer text-[#00984B] fa-solid ${
                            editIndexPravruti !== null
                              ? "fa-check"
                              : "fa-paper-plane-top"
                          } fa-flip-verticl`}
                          onClick={handleAddOrUpdatePravruti}
                        ></i>
                      </p>
                    </div>
                  </div>

                  {pravruties?.length > 0 &&
                    paginatedPravruties.map((pravruti, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="flex justify-center items-center text-center     py-2 border-r border-b border-black gap-[10px] px-1 min-w-[6%] max-w-[6%]">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                            style={{ width: "15px", height: "15px" }}
                            className="ml-[-8%]"
                          />
                          <p className="w-fit text-[17px] mt-[2%] font-Outfit">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </p>
                        </div>
                        <div className="flex justify-start text-center     py-2 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                          <p className="text-[15px] font-Outfit">
                            {pravruti.name}
                          </p>
                        </div>
                        <div className="flex justify-center items-center text-center     py-2 border-b gap-[13px] border-black px-3 min-w-[6%] max-w-[6%]">
                          <img
                            className="w-[20px] cursor-pointer"
                            src={Editpng}
                            alt="Edit"
                            onClick={() =>
                              handleEditPravruti(
                                index + 0 + (currentPage - 1) * itemsPerPage
                              )
                            }
                          />
                          <i
                            className="text-[20px] cursor-pointer mt-[2px] text-[#ff0b0b] fa-solid fa-trash-can"
                            onClick={() =>
                              handleDelete(pravruti, {
                                typeofManges: "pravruti",
                              })
                            }
                          ></i>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className="flex absolute bottom-3 right-6 font-Poppins items-center gap-[10px]"
                ref={dropdownRef}
              >
                <div>
                  <p className="text-[15px] font-[600] text-[#2565df]">
                    Total pages - {totalPages}
                  </p>
                </div>
                <div>
                  <div
                    className="flex justify-center border-[1.7px] border-[#000] cursor-pointer py-[5px] px-[24px] rounded-[10px] text-[14px] font-[600]"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <p>{currentPage}</p>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="border-[1.7px] flex flex-col bg-[#fff] min-h-[100%] overflow-y-auto right-[-19px] top-[40px] border-[#000] z-[100] w-[100px] rounded-[10px] absolute">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`w-[100%] text-[14px] border-b-[1.7px] rounded-[6px] border-[#847e7e] py-[6px] font-[600] flex justify-center items-center cursor-pointer 
                                                ${
                                                  currentPage === i + 1
                                                    ? "bg-[#F28C28] text-[#fff]"
                                                    : "hover:bg-[#e1ab3e] hover:text-[#fff]"
                                                }`}
                        onClick={() => goToPage(i + 1)}
                      >
                        <p>{i + 1}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "KSHETRA":
        return (
          <div className="flex justify-between w-full gap-[20px]">
            <div className="w-full h-full mx-auto mb-3 scroll-d-none">
              <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                <div className="box-border w-full">
                  <div className="sticky top-0 flex bg-[#F28C28] border-black w-full">
                    <div className="flex justify-center text-center py-[10px] items-center border-r border-b border-black gap-[7px] px-3 min-w-[6%] max-w-[6%]">
                      <input
                        type="checkbox"
                        id="check-all"
                        checked={checkAll}
                        onChange={handleCheckAll}
                        style={{ width: "15px", height: "15px" }}
                      />
                      <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit">
                        Sr.
                      </p>
                    </div>

                    <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                      <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                        Name
                      </p>
                    </div>
                    <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                      <p className="text-[15px] font-Outfit"></p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex justify-center text-center py-1 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                      <p className="w-fit text-[15px] font-Outfit"></p>
                    </div>

                    <div className="flex justify-start text-center py-1 border-r border-b border-black px-3 min-w-[88%] max-w-[88%] cursor-pointer">
                      <input
                        className="w-[100%] border-none outline-none h-[full] px-[1px]"
                        type="text"
                        value={kshetraName}
                        onChange={(e) => setKshetraName(e.target.value)}
                        placeholder="Enter Kshetra Name"
                      />
                    </div>
                    <div className="flex justify-center text-center py-1 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                      <p className="text-[25px] font-Outfit">
                        <i
                          className={`cursor-pointer text-[#00984B] fa-solid ${
                            editIndexKshetra !== null
                              ? "fa-check"
                              : "fa-paper-plane-top"
                          } fa-flip-verticl`}
                          onClick={handleAddOrUpdateKshetra}
                        ></i>
                      </p>
                    </div>
                  </div>
                  {Array.isArray(kshetras) && kshetras.length > 0 ? (
                    paginatedKhestras.map((kshetra, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="flex justify-center items-center text-center py-2 border-r border-b border-black gap-[10px] px-1 min-w-[6%] max-w-[6%]">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                            style={{ width: "15px", height: "15px" }}
                            className="ml-[-8%]"
                          />
                          <p className="w-fit text-[17px] mt-[2%] font-Outfit">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </p>
                        </div>

                        <div className="flex justify-start text-center py-2 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                          <p className="text-[15px] font-Outfit">
                            {kshetra.name}
                          </p>
                        </div>
                        <div className="flex justify-center items-center text-center py-2 border-b gap-[13px] border-black px-3 min-w-[6%] max-w-[6%]">
                          <img
                            className="w-[20px] cursor-pointer"
                            src={Editpng}
                            alt="Edit"
                            onClick={() =>
                              handleEditKshetra(
                                index + 0 + (currentPage - 1) * itemsPerPage
                              )
                            }
                          />
                          <i
                            className="text-[19px] cursor-pointer mt-[2px] text-[#ff0b0b] fa-solid fa-trash-can"
                            onClick={() =>
                              handleDelete(kshetra, { typeofManges: "kshetra" })
                            }
                          ></i>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No kshetras found</p>
                  )}
                </div>
              </div>
              <div
                className="flex absolute bottom-3 right-6 font-Poppins items-center gap-[10px]"
                ref={dropdownRef}
              >
                <div>
                  <p className="text-[15px] font-[600] text-[#2565df]">
                    Total pages - {totalPageskhestras}
                  </p>
                </div>
                <div>
                  <div
                    className="flex justify-center border-[1.7px] border-[#000] cursor-pointer py-[5px] px-[24px] rounded-[10px] text-[14px] font-[600]"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <p>{currentPage}</p>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="border-[1.7px] flex flex-col bg-[#fff] min-h-[100%]    overflow-y-auto right-[-19px] top-[40px] border-[#000] z-[100] w-[100px] rounded-[10px] absolute">
                    {Array.from({ length: totalPageskhestras }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`w-[100%] text-[14px] border-b-[1.7px] rounded-[6px] border-[#847e7e] py-[6px] font-[600] flex justify-center items-center cursor-pointer 
                                                ${
                                                  currentPage === i + 1
                                                    ? "bg-[#F28C28] text-[#fff]"
                                                    : "hover:bg-[#e1ab3e] hover:text-[#fff]"
                                                }`}
                        onClick={() => goToPage(i + 1)}
                      >
                        <p>{i + 1}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "DESIGNATION":
        return (
          <div className="flex justify-between w-full gap-[20px]">
            <div className="w-full h-full mx-auto mb-3 scroll-d-none">
              <div className="w-full h-full mx-auto rounded-[10px] border border-black overflow-x-hidden relative">
                <div className="box-border w-full">
                  <div className="sticky top-0 flex bg-[#F28C28] border-black w-full">
                    <div className="flex justify-center text-center py-[10px] items-center border-r border-b border-black gap-[7px] px-3 min-w-[6%] max-w-[6%]">
                      <input
                        type="checkbox"
                        id="check-all"
                        checked={checkAll}
                        onChange={handleCheckAll}
                        style={{ width: "15px", height: "15px" }}
                      />
                      <p className="w-fit text-[18px] font-[600] text-[#fff] font-Outfit">
                        Sr.
                      </p>
                    </div>

                    <div className="flex justify-start text-center py-[10px] border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                      <p className="text-[18px] font-[600] font-Outfit text-[#fff]">
                        Name
                      </p>
                    </div>
                    <div className="flex justify-center text-center py-2 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                      <p className="text-[15px] font-Outfit"></p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex justify-center text-center     py-2 border-r border-b border-black gap-[10px] px-3 min-w-[6%] max-w-[6%]">
                      <p className="w-fit text-[15px] font-Outfit"></p>
                    </div>

                    <div className="flex justify-start text-center     py-2 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                      <input
                        className="w-[100%] border-none outline-none h-[full] px-[1px]"
                        type="text"
                        value={designationName}
                        onChange={(e) => setDesignationName(e.target.value)}
                        placeholder="Enter Designation Name"
                      />
                    </div>
                    <div className="flex justify-center text-center py-1 border-b border-black px-3 min-w-[6%] max-w-[6%]">
                      <p className="text-[25px] font-Outfit">
                        <i
                          className={`cursor-pointer text-[#00984B] fa-solid ${
                            editIndexPravruti !== null
                              ? "fa-check"
                              : "fa-paper-plane-top"
                          } fa-flip-verticl`}
                          onClick={handleAddOrUpdateDesignation}
                        ></i>
                      </p>
                    </div>
                  </div>
                  {Array.isArray(designations) && designations.length > 0 ? (
                    paginatedDesignation.map((designation, index) => (
                      <div
                        className="flex justify-between"
                        key={designation.id || index}
                      >
                        <div className="flex justify-center items-center text-center     py-2 border-r border-b border-black gap-[10px] px-1 min-w-[6%] max-w-[6%]">
                          <input
                            type="checkbox"
                            checked={checkedItems.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                            style={{ width: "15px", height: "15px" }}
                            className="ml-[-8%]"
                          />
                          <p className="w-fit text-[17px] mt-[2%] font-Outfit">
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                          </p>
                        </div>
                        <div className="flex justify-start text-center     py-2 border-r border-b border-black px-3 min-w-[88%] max-w-[88%]">
                          <p className="text-[15px] font-Outfit">
                            {designation.name}
                          </p>
                        </div>
                        <div className="flex justify-center items-center text-center     py-2 border-b gap-[13px] border-black px-3 min-w-[6%] max-w-[6%]">
                          <img
                            className="w-[20px] cursor-pointer"
                            src={Editpng}
                            alt="Edit"
                            onClick={() =>
                              handleEditDesignation(
                                index + 0 + (currentPage - 1) * itemsPerPage
                              )
                            }
                          />
                          <i
                            className="text-[20px] cursor-pointer mt-[2px] text-[#ff0b0b] fa-solid fa-trash-can"
                            onClick={() =>
                              handleDelete(designation, {
                                typeofManges: "designations",
                              })
                            }
                          ></i>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No designations found</p>
                  )}
                </div>
              </div>
              <div
                className="flex absolute bottom-3 right-6 font-Poppins items-center gap-[10px]"
                ref={dropdownRef}
              >
                <div>
                  <p className="text-[15px] font-[600] text-[#2565df]">
                    Total pages - {totalPagesdesignation}
                  </p>
                </div>
                <div>
                  <div
                    className="flex justify-center border-[1.7px] border-[#000] cursor-pointer py-[5px] px-[24px] rounded-[10px] text-[14px] font-[600]"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <p>{currentPage}</p>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="border-[1.7px] flex flex-col bg-[#fff] min-h-[100%] overflow-y-auto right-[-19px] top-[40px] border-[#000] z-[100] w-[100px] rounded-[10px] absolute">
                    {Array.from({ length: totalPagesdesignation }, (_, i) => (
                      <div
                        key={i + 1}
                        className={`w-[100%] text-[14px] border-b-[1.7px] rounded-[6px] border-[#847e7e] py-[6px] font-[600] flex justify-center items-center cursor-pointer 
                                                ${
                                                  currentPage === i + 1
                                                    ? "bg-[#F28C28] text-[#fff]"
                                                    : "hover:bg-[#e1ab3e] hover:text-[#fff]"
                                                }`}
                        onClick={() => goToPage(i + 1)}
                      >
                        <p>{i + 1}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return <p>Select a form to display</p>;
    }
  };

  return (
    <>
      <div className="    w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0      py-[34px] md150:py-[48px]     px-[30px] md150:px-[40px]  mx-auto   my-auto ">
        <div className="  mx-auto flex gap-[30px] w-[100%]     h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#F28C28]">
          <div className="flex absolute gap-[10px] left-[3%]      top-[4.1%]  md150:top-[5%] items-center        text-[18px] md150:text-[20px] font-[600]">
            <i
              className="cursor-pointer fa-solid fa-angle-up fa-rotate-270"
              onClick={handleBack}
            ></i>
            <div
              className="font-Potua  flex items-center gap-[10px] cursor-pointer"
              onClick={handleBack}
            >
              <p>MASTER</p>
              <p>MANAGEMENT</p>
            </div>
          </div>
          <div className="flex absolute right-[8%] md150:top-[5.9%] top-[4.5%] font-Poppins font-[600] text-[15px] ">
            <div className="flex gap-[10px] mx-auto justify-center w-[100%]   z-0">
              <div
                className={` w-[80%] flex items-center justify-center  !font-Poppins rounded-tr-[10px] rounded-tl-[10px] border-r-[1.5px] px-[19px]  border-l-[1.5px]  font-bold     cursor-pointer border-t-[1.5px] border-[#000]  ${
                  activeForm === "PRAVRUTI"
                    ? "bg-[#F28C28] text-[#fff]"
                    : " bg-white "
                } h-[40px] cursor-pointer`}
                onClick={() => setActiveForm("PRAVRUTI")}
              >
                <p>PRAVRUTI</p>
              </div>

              <div
                className={` w-[80%] flex items-center justify-center  rounded-tr-[10px] rounded-tl-[10px] border-r-[1.5px] px-[19px] font-[]  border-l-[1.5px]  border-t-[1.5px] border-[#000]  ${
                  activeForm === "KSHETRA"
                    ? "bg-[#F28C28] text-[#fff]"
                    : "text-[#000] bg-white "
                } h-[40px] cursor-pointer`}
                onClick={() => setActiveForm("KSHETRA")}
              >
                <p>KSHETRA</p>
              </div>

              <div
                className={`w-[130px] flex items-center justify-center  rounded-tr-[10px] rounded-tl-[10px] border-r-[1.5px] px-[19px] font-[600] border-l-[1.5px]  border-t-[1.5px] border-[#000]  ${
                  activeForm === "DESIGNATION"
                    ? "bg-[#F28C28] text-[#fff]"
                    : "text-[#000] bg-white "
                } h-[40px] cursor-pointer`}
                onClick={() => setActiveForm("DESIGNATION")}
              >
                <p>DESIGNATION</p>
              </div>
            </div>
          </div>
       <Logout />
          <div className="    py-[69px] md150:py-[90px] flex     w-[98%] md150:w-[97%]     gap-[15px]  md150:gap-[20px]">
            <Header />
            <div className="  md150:py-[20px] md150:px-[20px]     px-[15px]     py-[15px]  md150:h-[70vh]     h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[rgb(0,0,0)]">
              {renderForm()}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="md:max-w-[350px] max-w-[333px] relative  flex justify-center !py-0 mx-auto  h-[300px] shadow-delete ">
          {(onClose) => (
            <>
              <div className="relative w-[100%] h-[100%] ">
                <div className="relative  w-[100%] h-[100%]">
                  <div className="w-[100%] flex gap-7 flex-col">
                    <div className="w-[100%] mt-[30px] p-[10px] mx-auto flex justify-center s">
                      <i className=" text-[80px] text-[red] shadow-delete-icon rounded-full fa-solid fa-circle-xmark"></i>
                    </div>
                    <div className=" mx-auto justify-center flex text-[28px] font-[500] font-Poppins">
                      <p>Are you sure ?</p>
                    </div>
                    <div className="absolute bottom-0 flex w-[100%]">
                      <div
                        className="w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[red] rounded-bl-[10px] text-[#fff] font-[600] font-Poppins text-[20px]"
                        onClick={handleDeleteRecord}
                      >
                        <p>Delete</p>
                      </div>
                      <div
                        className="w-[50%] cursor-pointer flex justify-center items-center py-[10px]  bg-[#26b955] rounded-br-[10px] text-[#fff] font-[600] font-Poppins text-[20px]"
                        onClick={onClose}
                      >
                        <p>Cancel</p>
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
