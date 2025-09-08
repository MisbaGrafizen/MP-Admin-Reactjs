import React, { useState, useEffect, useMemo } from "react";
import Header from "../../Components/header/Header";
import {
  Modal as NextUIModal,
  ModalBody,
  ModalContent,
} from "@nextui-org/react";
import {
  getAllPaidOrderListAction,
  getAllPrePackagePadiOrderListAction,
  getAllPrePackageUnpadiOrderListAction,
  getAllUnpaidOrderListAction,
  updateOrderRecieptToCancelAction,
  updateOrderRecieptToPaidAction,
  updatePrePackageOrderRecieptToCancelAction,
  updatePrePackageOrderRecieptToPaidAction,
  getAllUnpaidBulkOrderListAction,
  getAllPaidBulkOrderListAction,
  updateBulkOrderRecieptToCancelAction,
  updateBulkOrderRecieptToPaidAction,
  updateBulkOrderRecieptToAcceptAction,
} from "../../redux/action/orderListing";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentByIdAction,
  getPrePackagePaymentByIdAction,
} from "../../redux/action/payment";
import { useNavigate } from "react-router-dom";
import Logout from "../../Components/logout/Logout";

export default function OrderManagement() {
  const [accepted, setAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState("self-serving");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isNotifictionModalOpen, setIsNotifictionModalOpen] = useState(false);
  const [isPackgingModalOpen, setPackegingModalOpen] = useState(false);
  const [isReciptModalOpen, setReciptModalOpen] = useState(false);
  const [isOrderReciptModalOpen, setOrderReciptModalOpen] = useState(false);
  const [ispaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paidOrderList = useSelector(
    (state) => state.orderListingState?.getPaidOrderList
  );
  const unpaidOrderList = useSelector(
    (state) => state.orderListingState?.getUnpaidOrderList
  );
  const prePackagePaidOrderList = useSelector(
    (state) => state.orderListingState?.getPrePackagePaidOrderList
  );
  const prePackageUnpaidOrderList = useSelector(
    (state) => state.orderListingState?.getPrePackageUnpaidOrderList
  );
  const bulkOrderUnpaidList = useSelector(
    (state) => state.orderListingState?.getBulkUnpaidOrderList
  );
  const bulkOrderPaidList = useSelector(
    (state) => state.orderListingState?.getBulkPaidOrderList
  );
  const prePayment = useSelector(
    (state) => state.paymentState?.getPrePackagePayment
  );
  const payment = useSelector((state) => state.paymentState?.getPayment);
  const handleBack = () => {
    navigate(-1);
  };


  useEffect(() => {
    dispatch(getAllPaidOrderListAction());
    dispatch(getAllUnpaidOrderListAction());
    dispatch(getAllPrePackagePadiOrderListAction());
    dispatch(getAllPrePackageUnpadiOrderListAction());
    dispatch(getAllPaidBulkOrderListAction());
    dispatch(getAllUnpaidBulkOrderListAction());
  }, [dispatch]);

  const handleSelectOrder = (orderId) => {
    setSelectedOrder(orderId);
  };


  const selectedOrderData = useMemo(() => {
    const isArray = (list) => Array.isArray(list) ? list : [];
    return (
      isArray(paidOrderList).find((order) => order._id === selectedOrder) ||
      isArray(unpaidOrderList).find((order) => order._id === selectedOrder) ||
      isArray(prePackagePaidOrderList).find((order) => order._id === selectedOrder) ||
      isArray(prePackageUnpaidOrderList).find((order) => order._id === selectedOrder) ||
      isArray(bulkOrderPaidList).find((order) => order._id === selectedOrder) ||
      isArray(bulkOrderUnpaidList).find((order) => order._id === selectedOrder)
    );
  }, [
    selectedOrder,
    paidOrderList,
    unpaidOrderList,
    prePackagePaidOrderList,
    prePackageUnpaidOrderList,
    bulkOrderPaidList,
    bulkOrderUnpaidList,
  ]);

  function formatDateAndTime(dateInput) {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
  }

  const openNotifictionModal = () => {
    setIsNotifictionModalOpen(true);
    window.history.pushState({}, "");
  };
  const closeNotifictionModal = () => {
    setIsNotifictionModalOpen(false);
    window.history.back();
  };

  const openPackgingnModal = () => {
    setPackegingModalOpen(true);
    window.history.pushState({}, "");
  };

  const closePackgingModal = () => {
    setPackegingModalOpen(false);
    window.history.back();
  };

  const closeOrderModal = () => {
    setOrderReciptModalOpen(false);
    window.history.back();
  };

  const paidOrderCount =
    activeTab === "self-serving"
      ? paidOrderList?.length
      : activeTab === "premvati"
        ? bulkOrderPaidList?.length
        : prePackagePaidOrderList?.length;

  const unpaidOrderCount =
    activeTab === "self-serving"
      ? unpaidOrderList?.length
      : activeTab === "premvati"
        ? bulkOrderUnpaidList?.length
        : prePackageUnpaidOrderList?.length;

  const allOrderCount = paidOrderCount + unpaidOrderCount;

  const openReciptModal = () => {
    setReciptModalOpen(true);
    window.history.pushState({}, "");
  };

  const closeReciptModal = () => {
    setReciptModalOpen(false);
    window.history.back();
  };

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
    window.history.pushState({}, "");
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    window.history.back();
  };
  const openRejectModal = () => {
    setRejectModalOpen(true);
    window.history.pushState({}, "");
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    window.history.back();
  };

  const paidOrder = {
    id: "30481",
    date: "21/08/2024 - 09:20 PM",
    forDate: "23/08/2024",
    location: "Shraddhapark",
    name: "MR. HITESH OZA",
    total: "₹ 360",
    items: [
      { name: "ONLY BHAJI 200GMS", qty: "05", price: "₹ 180.00" },
      { name: "ONLY BHAJI 200GMS", qty: "05", price: "₹ 180.00" },
    ],
    status: "Order successful",
    address: "Shraddhapark",
    paid: true,
  };

  const unpaidOrder = {
    id: "30482",
    date: "22/08/2024 - 08:10 PM",
    forDate: "24/08/2024",
    location: "Shraddhapark",
    name: "MR. RAJESH KUMAR",
    total: "₹ 420",
    items: [
      { name: "ONLY BHAJI 300GMS", qty: "04", price: "₹ 200.00" },
      { name: "ONLY BHAJI 300GMS", qty: "04", price: "₹ 200.00" },
    ],
    status: "Order successful",
    address: "Shraddhapark",
    paid: false,
  };

  const handleComplete = async () => {
    if (!selectedOrderData?.orderId?._id) return;

    setIsCompleting(true);
    try {
      let ok = false;

      if (activeTab === "self-serving") {
        ok = await dispatch(
          updateOrderRecieptToPaidAction(selectedOrderData.orderId._id)
        );
      } else if (activeTab === "pre-packaged") {
        ok = await dispatch(
          updatePrePackageOrderRecieptToPaidAction(selectedOrderData.orderId._id)
        );
      } else if (activeTab === "premvati") {
        ok = await dispatch(
          updateBulkOrderRecieptToPaidAction(selectedOrderData.orderId._id)
        );
      }

      if (ok) {
        await Promise.all([
          dispatch(getAllPadiOrderListAction()),
          dispatch(getAllUnpadiOrderListAction()),
          dispatch(getAllPrePackagePadiOrderListAction()),
          dispatch(getAllPrePackageUnpadiOrderListAction()),
          dispatch(getAllPaidBulkOrderListAction()),
          dispatch(getAllUnpaidBulkOrderListAction()),
        ]);

        setActiveFilter("paid");

        setPaymentModalOpen(true);
        setOrderReciptModalOpen(false);
      }
    } catch (e) {
      console.error("Failed to mark order as paid:", e);
    } finally {
      setIsCompleting(false);
    }
  };


  const shouldShowPaid = activeFilter === "all" || activeFilter === "paid";
  const shouldShowUnpaid = activeFilter === "all" || activeFilter === "unpaid";

  console.log('selectedOrderData', selectedOrderData);

  useEffect(() => {
    if (activeTab === "self-serving") {
      if (activeFilter === "all") {
        setSelectedOrder(paidOrderList[0]?._id || unpaidOrderList[0]?._id);
      } else if (activeFilter === "paid") {
        setSelectedOrder(paidOrderList[0]?._id);
      } else if (activeFilter === "unpaid") {
        setSelectedOrder(unpaidOrderList[0]?._id);
      }
    } else if (activeTab === "pre-packaged") {
      if (activeFilter === "all") {
        setSelectedOrder(
          prePackagePaidOrderList[0]?._id || prePackageUnpaidOrderList[0]?._id
        );
      } else if (activeFilter === "paid") {
        setSelectedOrder(prePackagePaidOrderList[0]?._id);
      } else if (activeFilter === "unpaid") {
        setSelectedOrder(prePackageUnpaidOrderList[0]?._id);
      }
    } else if (activeTab === "premvati") {
      if (activeFilter === "all") {
        setSelectedOrder(
          bulkOrderPaidList[0]?._id || bulkOrderUnpaidList[0]?._id
        );
      } else if (activeFilter === "paid") {
        setSelectedOrder(bulkOrderPaidList[0]?._id);
      } else if (activeFilter === "unpaid") {
        setSelectedOrder(bulkOrderUnpaidList[0]?._id);
      }
    }
  }, [
    activeFilter,
    activeTab,
    paidOrderList,
    unpaidOrderList,
    prePackagePaidOrderList,
    prePackageUnpaidOrderList,
    bulkOrderPaidList,
    bulkOrderUnpaidList,
  ]);

  const getPaymentFetcher = (tab) => {
    if (tab === "self-serving") return getPaymentByIdAction;
    if (tab === "pre-packaged") return getPrePackagePaymentByIdAction;
    return null; // no per-order payment receipt for "premvati" in current flow
  };

  const openOrderModal = async () => {

    setLoading(true);
    setError(null);
    try {
      let data;
      if (activeTab === "self-serving") {
        data = await dispatch(getPaymentByIdAction(selectedOrderData._id));
      } else if (activeTab === "pre-packaged") {
        data = await dispatch(
          getPrePackagePaymentByIdAction(selectedOrderData._id)
        );
      }

      setPaymentData(data);
      setOrderReciptModalOpen(true);
      window.history.pushState({}, "");
    } catch (error) {
      setError("Failed to fetch payment data.");
      console.error("Error fetching payment data:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log('selectedOrderDataId', selectedOrderData?._id)

  const handlePaymentConfirm = async () => {
    try {
      if (activeTab === "self-serving") {
        const result = await dispatch(updateOrderRecieptToPaidAction(selectedOrderData.orderId?._id));
        if (result) {
          setRejectModalOpen(true);
          setTimeout(() => {
            setPaymentModalOpen(false);
            window.location.reload();
          }, 2000)
        }
      }
      if (activeTab === "pre-packaged") {
        const result = await dispatch(updatePrePackageOrderRecieptToPaidAction(selectedOrderData.orderId?._id));
        if (result) {
          setRejectModalOpen(true);
          setTimeout(() => {
            setPaymentModalOpen(false);
            window.location.reload();
          }, 2000)
        }
      }
      if (activeTab === "premvati") {
        const result = await dispatch(updateBulkOrderRecieptToPaidAction(selectedOrderData.orderId?._id));
        if (result) {
          setAccepted(true);
        }
      }
    } catch (error) {
      console.error("Error updating order receipt to paid:", error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      if (activeTab === "self-serving") {
        const result = await dispatch(updateOrderRecieptToCancelAction(selectedOrderData.orderId?._id));
        if (result) {
          setRejectModalOpen(true);
          setTimeout(() => {
            setRejectModalOpen(false);
            window.location.reload();
          }, 2000)
        }
      }
      if (activeTab === "pre-packaged") {
        const result = await dispatch(updatePrePackageOrderRecieptToCancelAction(selectedOrderData.orderId?._id));
        if (result) {
          setRejectModalOpen(true);
          setTimeout(() => {
            setRejectModalOpen(false);
            window.location.reload();
          }, 2000)
        }
      }
      if (activeTab === "premvati") {
        const result = await dispatch(updateBulkOrderRecieptToCancelAction(selectedOrderData.orderId?._id));
        if (result) {
          setRejectModalOpen(true);
          setTimeout(() => {
            setRejectModalOpen(false);
            window.location.reload();
          }, 2000)
        }
      }
    } catch (error) {
      console.error("Error updating order receipt to paid:", error);
    }
  };


  return (
    <>
      <div className="w-[99%]  md11:w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  md11:py-[34px] md150:py-[48px] md11:px-[30px] md150:px-[40px]  mx-auto   my-auto ">
        <div className=" mx-auto flex gap-[30px] w-[100%] md11:h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#F28C28]">
          <div className="flex absolute gap-[10px] left-[3%]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
            <i
              className="fa-solid fa-angle-up fa-rotate-270"
              onClick={handleBack}
            ></i>

            <div
              className=" font-Potua  flex items-center gap-[10px] cursor-pointer"
              onClick={handleBack}
            >
              <p>ORDERS</p>
              <p>MANAGEMENT</p>
            </div>
          </div>
          <div className="flex absolute md150:top-[5.9%] top-[5%] gap-[10px]  right-[7%] ">
            <div
              onClick={() => setActiveTab("self-serving")}
              className={`w-[130px] p-[8px]  rounded-tl-[7px] font-[500]  rounded-tr-[7px]  border-[#000] flex items-center justify-center cursor-pointer ${activeTab === "self-serving"
                ? "bg-[#F28C28] text-[#fff]"
                : "border-t-[1px] border-l-[1px] border-r-[1px]"
                }`}
            >
              <p>Self Serving</p>
            </div>
            <div
              onClick={() => setActiveTab("pre-packaged")}
              className={`w-[130px] p-[8px]  rounded-tr-[7px] font-[500]  rounded-tl-[7px]  border-[#000] flex items-center justify-center cursor-pointer ${activeTab === "pre-packaged"
                ? "bg-[#F28C28] text-[#fff]"
                : "border-t-[1px] border-l-[1px] border-r-[1px]"
                }`}
            >
              <p>Pre - Packaged</p>
            </div>
            <div
              onClick={() => setActiveTab("premvati")}
              className={`w-[130px] p-[8px]  rounded-tr-[7px] font-[500]  rounded-tl-[7px]  border-[#000] flex items-center justify-center cursor-pointer ${activeTab === "premvati"
                ? "bg-[#F28C28] text-[#fff]"
                : "border-t-[1px] border-l-[1px] border-r-[1px]"
                }`}
            >
              <p>Premvati</p>
            </div>
          </div>

          <div className="md11:py-[69px] md150:py-[90px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px] font-Poppins  md150:gap-[20px]">
            <Header />
            {activeTab === "self-serving" && (
              <div className="md150:py-[20px] md150:px-[20px] md11:px-[15px] md11:py-[15px] flex gap-[10px] md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                <div className="w-[23%] rounded-[10px] gap-[10px] flex flex-col p-[15px] h-[100%] no-scrollbar border-[1.4px] border-[#F28C28] overflow-y-auto">
                  <div className="w-[100%] overflow-hidden z-[50] bg-[#ffff] h-[30px] md11:text-[14px] md150:text-[16px] py-[20px] rounded-[7px] items-center sticky top-[0px] border-[1px] flex justify-between border-[#595454]">
                    <div
                      className={`w-[100%] gap-[5px] h-[100%] font-[500] text-center flex items-center justify-center   cursor-pointer ${activeFilter === "all"
                        ? "bg-[#00984B] text-white py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("all")}
                    >
                      <p>All</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        ({allOrderCount})
                      </p>
                    </div>
                    <div
                      className={`w-[100%] h-[100%] gap-[5px] font-[500] text-center flex items-center justify-center cursor-pointer ${activeFilter === "paid"
                        ? "bg-[#006198] text-white py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("paid")}
                    >
                      <p>Paid</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        ({paidOrderCount})
                      </p>
                    </div>
                    <div
                      className={`w-[100%] gap-[5px]   font-[500] h-[100%] text-center flex items-center justify-center cursor-pointer ${activeFilter === "unpaid"
                        ? "bg-[RED] text-white  py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("unpaid")}
                    >
                      <p>Unpaid </p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        ({unpaidOrderCount})
                      </p>
                    </div>
                  </div>

                  {shouldShowPaid &&
                    paidOrderList.map((order) => (
                      <div
                        key={order.id}
                        className={`w-[100%] items-center justify-between rounded-[10px] border-[#00984B] text-[#00984B] flex md150:text-[13px] md11:text-[10px] border-[1.4px] p-[9px] cursor-pointer`}
                        onClick={() => handleSelectOrder(order._id)}
                      >
                        <div>
                          <p>Order ID - #{order._id}</p>
                          <p>
                            Order on - {formatDateAndTime(order?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(order?.orderDate?.pickupDate)}
                          </p>
                          <p>Pickup location - {order?.pickupLocation?.name}</p>
                        </div>
                        <div
                          className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                            ? "bg-[#00984B] text-white"
                            : "bg-white text-[#00984B] border-[1px] border-[#00984B]"
                            }`}
                        >
                          <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                        </div>
                      </div>
                    ))}

                  {shouldShowUnpaid &&
                    unpaidOrderList.map((order) => (
                      <div
                        key={order.id}
                        className={`w-[100%] items-center justify-between rounded-[10px] border-[#FF0606] text-[#FF0606] flex md150:text-[13px] md11:text-[10px]  border-[1.4px] p-[9px] cursor-pointer`}
                        onClick={() => handleSelectOrder(order._id)}
                      >
                        <div>
                          <p>Order ID - #{order._id}</p>
                          <p>
                            Order on - {formatDateAndTime(order?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(order.orderDate?.pickupDate)}
                          </p>
                          <p>Pickup location - {order.pickupLocation?.name}</p>
                        </div>
                        <div
                          className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                            ? "bg-[#FF0606] text-white"
                            : "bg-white text-[#FF0606] border-[1px] border-[#FF0606]"
                            }`}
                        >
                          <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                        </div>
                      </div>
                    ))}
                </div>

                {selectedOrderData && (
                  <div className="w-[75%] relative no-scrollbar rounded-[10px] justify-between  gap-[10px] flex flex-col p-[15px] h-[100%] border-[1.4px] border-[#F28C28] overflow-y-auto">
                    <div className="flex justify-between  pt-[3px]">
                      <div className="md150:text-[18px] md11:text-[16px]  items-center  flex gap-[20px] font-[500]">
                        <p>ORDERS DETAILS</p>
                        <i
                          className=" text-[25px] cursor-pointer fa-regular fa-print"
                          onClick={openOrderModal}
                        ></i>
                      </div>
                      <div
                        className={`w-[150px] rounded-bl-[7px] font-[500] md150:text-[18px] md11:text-[16px] flex justify-center  ${selectedOrder === 0
                          ? "text-[#00984B]"
                          : "text-[#FF0606]"
                          }`}
                      >
                        <p>
                          {paidOrderList.find(
                            (order) => order._id === selectedOrder
                          )
                            ? "ORDER PAID"
                            : "ORDER UNPAID"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-[100%] h-[79%] no-scrollbar flex-col overflow-y-auto gap-[15px] rounded-[10px] flex text-[13px] border-[1.4px] font-[500] p-[14px] ${selectedOrder === 0
                        ? "border-[#00984B]"
                        : "border-[#FF0606]"
                        }`}
                    >
                      <div className="w-[100%] flex justify-between">
                        <div className="md150:text-[14px] md11:text-[13px] font-[400]">
                          <p>Order ID #{selectedOrderData?._id}</p>
                          <p>
                            Order on -{" "}
                            {formatDateAndTime(selectedOrderData?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(
                              selectedOrderData?.orderDate?.pickupDate
                            )}
                          </p>
                        </div>
                        <p className="font-[400] pr-[20px] items-center text-[15px]">
                          Name - {selectedOrderData?.orderId?.userId?.name}
                        </p>
                      </div>
                      <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                      <div className="flex px-[10px] items-center justify-between">
                        <div className="flex flex-col gap-[5px]">
                          <p className="font-[300]">Delivery Address :</p>
                          <p className="font-[400] ">
                            {selectedOrderData?.pickupLocation?.name}
                          </p>
                        </div>
                        <div className="flex gap-[6px] items-center pr-[20px]">
                          <i className={`fa-sharp-duotone fa-solid fa-circle-check tick text-[17px] ${selectedOrderData?.orderType === 'paid' ? 'text-green-500' : 'text-red-500'}
  `}></i>
                          <p className={`${selectedOrderData?.orderType === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                            {selectedOrderData?.orderType}
                          </p>
                        </div>
                      </div>
                      <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                      <div className="flex flex-col gap-[14px]">
                        {selectedOrderData?.orderId?.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-[10px]"
                          >
                            <div className="flex gap-[10px] items-center">
                              <img
                                className="w-[80px] rounded-[8px] h-[80px]"
                                src={
                                  item?.foodItem?.photo ||
                                  "../../../public/img/Foodsection/newBhaji.png"
                                }
                                alt="Product"
                              />
                              <div>
                                <p className="text-[14px]">
                                  {item?.foodItem?.name}
                                </p>
                                <p className="text-[#595858]">
                                  Qty - {item?.quantity}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[16px]">{item?.totalPrice.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                        {selectedOrderData?.orderId?.servingMethodId?.map(
                          (item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between px-[10px]"
                            >
                              <div className="flex gap-[10px] items-center">
                                <img
                                  className="w-[80px] rounded-[8px] h-[80px]"
                                  src={
                                    item?.servingMethod?.photo ||
                                    "../../../public/img/Foodsection/newBhaji.png"
                                  }
                                  alt="Product"
                                />
                                <div>
                                  <p className="text-[14px]">
                                    {item?.servingMethod?.name}
                                  </p>
                                  <p className="text-[#595858]">
                                    Qty - {item?.quantity}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <p className="text-[16px]">
                                  {item?.totalPrice.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="w-[100%] border-t-[2.3px]"></div>
                      <div className="flex justify-between px-[10px] font-[500] text-[15px] font-mono">
                        <p>Total</p>
                        <p>{selectedOrderData?.orderId?.totalAmount.toFixed(2)}</p>
                      </div>




                    </div>

                    <div className="flex justify-between mt-[8px]">
                      <div className="flex gap-[10px] justify-between w-[100%] items-center">
                        <div className="flex gap-[10px] items-center">
                          <div
                            className="w-[130px] rounded-[5px] active:bg-[#006198] active:text-[#fff] items-center border-[#000] cursor-pointer flex justify-center py-[6px] font-[500] border-[1.7px]"
                            onClick={openNotifictionModal}
                          >
                            <p>View KOT</p>
                          </div>
                          <div
                            className="w-[130px] cursor-pointer active:bg-[#006198] active:text-[#fff] rounded-[5px] items-center flex justify-center py-[6px] font-[500] border-[1.7px] border-[#006198] text-[#006198]"
                            onClick={openPackgingnModal}
                          >
                            <p>View POT</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-[10px] items-center">
                        {!paidOrderList.find((order) => order._id === selectedOrder) && (
                          <div
                            className="w-[210px] rounded-[5px] flex font-Montserrat justify-center active:bg-[#006198] active:text-[#fff] cursor-pointer py-[6px] text-[#006198] border-[#006198] font-[500] border-[1.7px]"
                            onClick={openOrderModal}
                          >
                            <p>View Payment Receipt</p>
                          </div>
                        )}

                        <div
                          className="w-[130px] rounded-[5px] flex justify-center active:bg-[#FF0606] active:text-[#fff] cursor-pointer py-[6px] text-[#FF0606] border-[#FF0606] font-[500] border-[1.7px]"
                          onClick={openRejectModal}
                        >
                          <p>Reject Order</p>
                        </div>

                        {paidOrderList.find(
                          (order) => order._id === selectedOrder
                        ) ? (
                          <div
                            className="w-[130px] cursor-pointer rounded-[5px] flex justify-center py-[6px] text-[#ffffff] font-[500] bg-[#00984B]"
                            onClick={openReciptModal}
                          >
                            <p>View Receipt</p>
                          </div>
                        ) : (
                          <></>
                          // <div
                          //   className="w-[130px] cursor-pointer rounded-[5px] flex justify-center py-[6px] text-[#ffffff] font-[500] bg-[#00984B]"
                          //   onClick={handlePaymentConfirm}
                          // >
                          //   <p>Accept Order</p>
                          // </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "pre-packaged" && (
              <div className="md150:py-[20px] md150:px-[20px] md11:px-[15px] md11:py-[15px] flex gap-[10px] md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                <div className="w-[26%] rounded-[10px] gap-[10px] flex flex-col p-[15px] h-[100%] no-scrollbar border-[1.4px] border-[#F28C28] overflow-y-auto">
                  <div className="w-[100%] md11:text-[14px] md150:text-[16px] overflow-hidden z-[50] bg-[#ffff] h-[35px] py-[20px] rounded-[7px] items-center sticky top-[0px] border-[1px] text-[14px] flex justify-between border-[#595454]">
                    <div
                      className={`w-[100%] gap-[5px] h-[100%] font-[500] text-center flex items-center justify-center   cursor-pointer ${activeFilter === "all"
                        ? "bg-[#00984B] text-white py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("all")}
                    >
                      <p>All</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        {" "}
                        ({allOrderCount})
                      </p>
                    </div>
                    <div
                      className={`w-[100%] h-[100%] gap-[5px]  font-[500] text-center flex items-center justify-center cursor-pointer ${activeFilter === "paid"
                        ? "bg-[#006198] text-white py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("paid")}
                    >
                      <p>Paid</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        ({paidOrderCount})
                      </p>
                    </div>
                    <div
                      className={`w-[100%]  gap-[5px] font-[500] h-[100%] text-center flex items-center justify-center cursor-pointer ${activeFilter === "unpaid"
                        ? "bg-[RED] text-white  py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("unpaid")}
                    >
                      <p>Unpaid</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        ({unpaidOrderCount})
                      </p>
                    </div>
                  </div>

                  {shouldShowPaid &&
                    Array.isArray(prePackagePaidOrderList) &&
                    prePackagePaidOrderList.map((order) => (
                      <div
                        key={order.id}
                        className={`w-[100%] items-center justify-between rounded-[10px] border-[#00984B] text-[#00984B] flex md11:text-[10px] md150:text-[13px] border-[1.4px] p-[9px] cursor-pointer`}
                        onClick={() => handleSelectOrder(order._id)}
                      >
                        <div>
                          <p>Order ID - #{order._id}</p>
                          <p>
                            Order on - {formatDateAndTime(order?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(order?.orderDate?.pickupDate)}
                          </p>
                          <p>Pickup location - {order?.pickupLocation?.name}</p>
                        </div>
                        <div
                          className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                            ? "bg-[#00984B] text-white"
                            : "bg-white text-[#00984B] border-[1px] border-[#00984B]"
                            }`}
                        >
                          <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                        </div>
                      </div>
                    ))}

                  {shouldShowUnpaid &&
                    Array.isArray(prePackageUnpaidOrderList) &&
                    prePackageUnpaidOrderList.map((order) => (
                      <div
                        key={order.id}
                        className={`w-[100%] items-center justify-between rounded-[10px] border-[#FF0606] text-[#FF0606] flex md11:text-[10px] md150:text-[13px] border-[1.4px] p-[9px] cursor-pointer`}
                        onClick={() => handleSelectOrder(order._id)}
                      >
                        <div>
                          <p>Order ID - #{order._id}</p>
                          <p>
                            Order on - {formatDateAndTime(order?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(order.orderDate?.pickupDate)}
                          </p>
                          <p>Pickup location - {order.pickupLocation?.name}</p>
                        </div>
                        <div
                          className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                            ? "bg-[#FF0606] text-white"
                            : "bg-white text-[#FF0606] border-[1px] border-[#FF0606]"
                            }`}
                        >
                          <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                        </div>
                      </div>
                    ))}
                </div>

                {selectedOrderData && (
                  <div className="w-[75%] relative no-scrollbar rounded-[10px] justify-between  gap-[10px] flex flex-col p-[15px] h-[100%] border-[1.4px] border-[#F28C28] overflow-y-auto">
                    <div className="flex justify-between  pt-[3px]">
                      <div className="md150:text-[18px] md11:text-[16px]  items-center  flex gap-[20px] font-[500]">
                        <p>ORDERS DETAILS</p>
                        <i
                          className=" text-[25px] cursor-pointer fa-regular fa-print"
                          onClick={openOrderModal}
                        ></i>
                      </div>
                      <div
                        className={`w-[150px] rounded-bl-[7px] font-[500] md150:text-[18px] md11:text-[16px] flex justify-center ${prePackagePaidOrderList.find(
                          (order) => order._id === selectedOrder
                        )
                          ? "text-[#00984B]"
                          : "text-[#FF0606]"
                          }`}
                      >
                        <p>
                          {prePackagePaidOrderList.find(
                            (order) => order._id === selectedOrder
                          )
                            ? "ORDER PAID"
                            : "ORDER UNPAID"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-[100%] h-[79%] no-scrollbar flex-col overflow-y-auto gap-[15px] rounded-[10px] flex text-[13px] border-[1.4px] font-[500] p-[14px] ${selectedOrder === 0
                        ? "border-[#00984B]"
                        : "border-[#FF0606]"
                        }`}
                    >
                      <div className="w-[100%] flex justify-between">
                        <div className="md150:text-[14px] md11:text-[13px] font-[400]">
                          <p>Order ID #{selectedOrderData?._id}</p>
                          <p>
                            Order on -{" "}
                            {formatDateAndTime(selectedOrderData?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(
                              selectedOrderData?.orderDate?.pickupDate
                            )}
                          </p>
                        </div>
                        <p className="font-[500] pr-[20px] items-center text-[15px]">
                          Name - {selectedOrderData?.orderId?.userId?.name}
                        </p>
                      </div>
                      <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                      <div className="flex px-[10px] items-center justify-between">
                        <div className="flex flex-col gap-[5px]">
                          <p className="font-[300]">Delivery Address :</p>
                          <p className="font-[500] ">
                            {selectedOrderData?.pickupLocation?.name}
                          </p>
                        </div>
                        <div className="flex gap-[6px] pr-[20px]">
                          <i className={`fa-sharp-duotone fa-solid fa-circle-check tick text-[17px] ${selectedOrderData?.orderType === 'Paid' ? 'text-green-500' : 'text-red-500'}
  `}></i>
                          <p className={`${selectedOrderData?.orderType === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                            {selectedOrderData?.orderType}
                          </p>
                        </div>
                      </div>
                      <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                      <div className="flex flex-col gap-[14px]">
                        {selectedOrderData?.orderId?.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-[10px]"
                          >
                            <div className="flex gap-[10px] items-center">
                              <img
                                className="w-[80px] rounded-[8px] h-[80px]"
                                src={
                                  item?.foodItem?.photo ||
                                  "../../../public/img/Foodsection/newBhaji.png"
                                }
                                alt={item?.foodItem?.name}
                              />
                              <div>
                                <p className="text-[14px]">
                                  {item?.foodItem?.name}
                                </p>
                                <p className="text-[#595858]">
                                  Qty - {item?.quantity}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[13px]">{item?.totalPrice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-[100%] border-t-[2.3px]"></div>
                      <div className="flex justify-between px-[10px] font-[500] text-[15px] font-mono">
                        <p>Total</p>
                        <p>{selectedOrderData?.orderId?.totalAmount}</p>
                      </div>
                    </div>

                    <div className="flex justify-between mt-[8px]">
                      <div className="flex gap-[10px] justify-between w-[100%] items-center">
                        <div className="flex gap-[10px] items-center">
                          <div
                            className="w-[130px] rounded-[5px] active:bg-[#006198] active:text-[#fff] items-center border-[#000] cursor-pointer flex justify-center py-[6px] font-[500] border-[1.7px]"
                            onClick={openNotifictionModal}
                          >
                            <p>View KOT</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-[10px] items-center">

                        <div
                          className="w-[210px] rounded-[5px] flex font-Montserrat justify-center active:bg-[#006198] active:text-[#fff] cursor-pointer py-[6px] text-[#006198] border-[#006198] font-[500] border-[1.7px]"
                          onClick={openOrderModal}
                        >
                          <p>View Payment Recipt</p>
                        </div>
                        <div
                          className="w-[130px] rounded-[5px] flex justify-center active:bg-[#FF0606] active:text-[#fff] cursor-pointer py-[6px] text-[#FF0606] border-[#FF0606] font-[500] border-[1.7px]"
                          onClick={openRejectModal}
                        >
                          <p>Reject Order</p>
                        </div>


                        {prePackagePaidOrderList.find(
                          (order) => order._id === selectedOrder
                        ) ? (
                          <div
                            className="w-[130px] cursor-pointer rounded-[5px] flex justify-center py-[6px] text-[#ffffff] font-[500] bg-[#00984B]"
                            onClick={openReciptModal}
                          >
                            <p>View Receipt</p>
                          </div>
                        ) : (
                          // <div
                          //   className="w-[130px] cursor-pointer rounded-[5px] flex justify-center py-[6px] text-[#ffffff] font-[500] bg-[#00984B]"
                          //   onClick={handlePaymentConfirm}
                          // >
                          //   <p>Accept Order</p>
                          // </div>
                          <>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "premvati" && (
              <div className="md150:py-[20px] md150:px-[20px] md11:px-[15px] md11:py-[15px] flex gap-[10px] md150:h-[70vh] md11:h-[73vh]   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">
                <div className="w-[26%] rounded-[10px] gap-[10px] flex flex-col p-[15px] h-[100%] no-scrollbar border-[1.4px] border-[#F28C28] overflow-y-auto">
                  <div className="w-[100%] md11:text-[14px] md150:text-[16px] overflow-hidden z-[50] bg-[#ffff] h-[35px] py-[20px] rounded-[7px] items-center sticky top-[0px] border-[1px] text-[14px] flex justify-between border-[#595454]">
                    <div
                      className={`w-[100%] gap-[5px] h-[100%] font-[500] text-center flex items-center justify-center   cursor-pointer ${activeFilter === "all"
                        ? "bg-[#00984B] text-white py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("all")}
                    >
                      <p>All</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        {" "}
                        ({allOrderCount})
                      </p>
                    </div>
                    <div
                      className={`w-[100%] h-[100%] gap-[5px]  font-[500] text-center flex items-center justify-center cursor-pointer ${activeFilter === "paid"
                        ? "bg-[#006198] text-white py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("paid")}
                    >
                      <p>Paid</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        ({paidOrderCount})
                      </p>
                    </div>
                    <div
                      className={`w-[100%]  gap-[5px] font-[500] h-[100%] text-center flex items-center justify-center cursor-pointer ${activeFilter === "unpaid"
                        ? "bg-[RED] text-white  py-[70px]"
                        : "bg-white text-[#000]"
                        }`}
                      onClick={() => setActiveFilter("unpaid")}
                    >
                      <p>Unpaid</p>
                      <p className="md11:text-[10px] md150:text-[14px]">
                        ({unpaidOrderCount})
                      </p>
                    </div>
                  </div>

                  {shouldShowPaid &&
                    Array.isArray(bulkOrderPaidList) &&
                    bulkOrderPaidList.map((order) => (
                      <div
                        key={order.id}
                        className={`w-[100%] items-center justify-between rounded-[10px] border-[#00984B] text-[#00984B] flex md11:text-[10px] md150:text-[13px] border-[1.4px] p-[9px] cursor-pointer`}
                        onClick={() => handleSelectOrder(order._id)}
                      >
                        <div>
                          <p>Order ID - #{order._id}</p>
                          <p>
                            Order on - {formatDateAndTime(order?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(order?.orderDate)}
                          </p>
                          <p>Pickup location - {order?.orderId?.userId?.premvati?.name}</p>
                        </div>
                        <div
                          className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                            ? "bg-[#00984B] text-white"
                            : "bg-white text-[#00984B] border-[1px] border-[#00984B]"
                            }`}
                        >
                          <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                        </div>
                      </div>
                    ))}

                  {shouldShowUnpaid &&
                    Array.isArray(bulkOrderUnpaidList) &&
                    bulkOrderUnpaidList.map((order) => (
                      <div
                        key={order.id}
                        className={`w-[100%] items-center justify-between rounded-[10px] border-[#FF0606] text-[#FF0606] flex md11:text-[10px] md150:text-[13px] border-[1.4px] p-[9px] cursor-pointer`}
                        onClick={() => handleSelectOrder(order._id)}
                      >
                        <div>
                          <p>Order ID - #{order._id}</p>
                          <p>
                            Order on - {formatDateAndTime(order?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(order.orderDate)}
                          </p>
                          <p>Pickup location - {order.orderId?.userId?.premvati?.name}</p>
                        </div>
                        <div
                          className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                            ? "bg-[#FF0606] text-white"
                            : "bg-white text-[#FF0606] border-[1px] border-[#FF0606]"
                            }`}
                        >
                          <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                        </div>
                      </div>
                    ))}
                </div>

                {selectedOrderData && (
                  <div className="w-[75%] relative no-scrollbar rounded-[10px] justify-between  gap-[10px] flex flex-col p-[15px] h-[100%] border-[1.4px] border-[#F28C28] overflow-y-auto">
                    <div className="flex justify-between  pt-[3px]">
                      <div className="md150:text-[18px] md11:text-[16px]  items-center  flex gap-[20px] font-[500]">
                        <p>ORDERS DETAILS</p>
                        <i
                          className=" text-[25px] cursor-pointer fa-regular fa-print"
                          onClick={openOrderModal}
                        ></i>
                      </div>
                      <div
                        className={`w-[150px] rounded-bl-[7px] font-[500] md150:text-[18px] md11:text-[16px] flex justify-center ${bulkOrderPaidList.find(
                          (order) => order._id === selectedOrder
                        )
                          ? "text-[#00984B]"
                          : "text-[#FF0606]"
                          }`}
                      >
                        <p>
                          {bulkOrderPaidList.find(
                            (order) => order._id === selectedOrder
                          )
                            ? "ORDER PAID"
                            : "ORDER UNPAID"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-[100%] h-[79%] no-scrollbar flex-col overflow-y-auto gap-[15px] rounded-[10px] flex text-[13px] border-[1.4px] font-[500] p-[14px] ${selectedOrder === 0
                        ? "border-[#00984B]"
                        : "border-[#FF0606]"
                        }`}
                    >
                      <div className="w-[100%] flex justify-between">
                        <div className="md150:text-[14px] md11:text-[13px] font-[400]">
                          <p>Order ID #{selectedOrderData?._id}</p>
                          <p>
                            Order on -{" "}
                            {formatDateAndTime(selectedOrderData?.createdAt)}
                          </p>
                          <p>
                            Order for -{" "}
                            {formatDateAndTime(
                              selectedOrderData?.orderDate
                            )}
                          </p>
                        </div>
                        <p className="font-[500] pr-[20px] items-center text-[15px]">
                          Name - {selectedOrderData?.orderId?.userId?.name}
                        </p>
                      </div>
                      <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                      <div className="flex px-[10px] items-center justify-between">
                        <div className="flex flex-col gap-[5px]">
                          <p className="font-[300]">Delivery Address :</p>
                          <p className="font-[500] ">
                            {selectedOrderData?.orderId?.userId?.premvati?.name}
                          </p>
                        </div>
                        <div className="flex gap-[6px] items-center pr-[20px]">
                          <i className={`fa-sharp-duotone fa-solid fa-circle-check tick text-[17px] ${selectedOrderData?.orderType === 'paid' ? 'text-green-500' : 'text-red-500'}
  `}></i>
                          <p className={`${selectedOrderData?.orderType === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                            {selectedOrderData?.orderType}
                          </p>
                        </div>

                      </div>
                      <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                      <div className="flex flex-col gap-[14px]">
                        {selectedOrderData?.orderId?.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-[10px]"
                          >
                            <div className="flex gap-[10px] items-center">
                              <img
                                className="w-[80px] rounded-[8px] h-[80px]"
                                src={
                                  item?.foodItem?.photo ||
                                  "../../../public/img/Foodsection/newBhaji.png"
                                }
                                alt={item?.foodItem?.name}
                              />
                              <div>
                                <p className="text-[14px]">
                                  {item?.foodItem?.name}
                                </p>
                                <p className="text-[#595858]">
                                  Qty - {item?.quantity}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-[13px]">{item?.totalPrice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="w-[100%] border-t-[1.3px]"></div>
                      <div className=" flex flex-col gap-[10px]">

                        <div className="flex justify-between px-[10px] font-[500] text-[15px] font-mono">
                          <p>Total Amount</p>
                          <p>{selectedOrderData?.orderId?.totalAmount}</p>
                        </div>
                        <div className="flex justify-between px-[10px] font-[500] text-[15px] font-mono">
                          <p>Deposite Amount</p>
                          <p>{selectedOrderData?.formId?.depositPrice}</p>
                        </div>
                        <div className="w-[100%] border-t-[.3px]"></div>
                        <div className="flex justify-between px-[10px] font-[500] text-[15px] font-mono">
                          <p>Remaining Amount</p>
                          <p>{selectedOrderData?.formId?.remainingPrice}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-[8px]">
                      <div className="flex gap-[10px] justify-between w-[100%] items-center">
                        <div className="flex gap-[10px] items-center">
                          <div
                            className="w-[130px] rounded-[5px] active:bg-[#006198] active:text-[#fff] items-center border-[#000] cursor-pointer flex justify-center py-[6px] font-[500] border-[1.7px]"
                            onClick={openNotifictionModal}
                          >
                            <p>View KOT</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-[10px] items-center">
                        {!accepted && (
                          <div
                            className="w-[130px] rounded-[5px] flex font-Montserrat justify-center active:bg-[#FF0606] active:text-[#fff] cursor-pointer py-[6px] text-[#FF0606] border-[#FF0606] font-[500] border-[1.7px]"
                            onClick={openRejectModal}
                          >
                            <p>Reject Order</p>
                          </div>


                        )}


                        {bulkOrderPaidList.find(
                          (order) => order._id === selectedOrder
                        ) ? (
                          <div
                            className="w-[130px] cursor-pointer font-Montserrat rounded-[5px] flex justify-center py-[6px] text-[#ffffff] font-[500] bg-[#00984B]"
                            onClick={openReciptModal}
                          >
                            <p>View Receipt</p>
                          </div>
                        ) : (
                          <>
                            <div
                              className={`w-[150px] font-Montserrat cursor-pointer rounded-[5px] flex justify-center py-[6px] font-[500] ${accepted ? "bg-white text-[#00984B] border border-[#00984B]" : "bg-[#00984B] text-white"
                                }`}
                              onClick={handlePaymentConfirm}
                            >
                              <p>{accepted ? "Order Accepted" : "Accept Order"}</p>
                            </div>


                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}


            <Logout />
          </div>
        </div>
      </div>

      <NextUIModal
        className="md:max-w-[390px] max-w-[333px] relative   rounded-[10px] flex justify-center !py-0 mx-auto md:h-[60%] h-[350px]"
        isOpen={isNotifictionModalOpen}
        backdrop={"blur"}
        onOpenChange={closeNotifictionModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0">
            <div className="w-[100%] flex  items-center ">
              <div className="w-[100%]">
                <div className="w-[100%] absolute left-0  items-center justify-center flex flex-col h-[80px] bg-[#F28C28] text-[#fff] text-center ">
                  <p className="text-[25px] leading-[30px]">MAHANT PRASADAM</p>
                  <p className="text-[15px]">Kitchen Order Ticket</p>
                </div>

                <div className="text-[] mt-[24%] flex flex-col text-left   justify-start py-[10px] ">
                  <p>Bill No - 481</p>
                  <p>
                    Order on -{" "}
                    {formatDateAndTime(
                      selectedOrderData?.createdAt
                    )}
                  </p>
                </div>
                <div className="w-[100%] flex flex-col gap-[5px] absolute left-0">
                  <div className="w-[100%] px-[20px] text-[18px] text-[#fff] font-[500] py-[5px] flex justify-between bg-[#00984B]">
                    <p className="w-[15%]">No.</p>
                    <p className="w-[55%]">Items</p>
                    <p className="text-right w-[30%]">Quantity</p>
                  </div>

                  {selectedOrderData?.orderId?.items?.map((item, index) => (
                    <>
                      <div className="max-h-[200px] overflow-y-auto ">
                        <div
                          key={index}
                          className="w-[100%] px-[20px] text-[16px] font-[500] py-[2px]  flex justify-between left-0"
                        >
                          <p className="w-[15%]">
                            {String(index + 1).padStart(2, "0")}
                          </p>{" "}
                          <p className="w-[55%]">{item.foodItem?.name}</p>
                          <p className="text-right w-[30%]">{item?.quantity}</p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="flex w-[100%] left-0 bg-white justify-between absolute bottom-[60px]  text-[18px] px-[15px] border-t-[1.5px] border-b-[1.5px] border-[#000] border-dashed">
                  <p>
                    Items : {selectedOrderData?.orderId?.items?.length || 0}
                  </p>
                  <p>
                    Qty :{" "}
                    {selectedOrderData?.orderId?.items?.reduce(
                      (total, item) => total + item.quantity,
                      0
                    ) || 0}
                  </p>
                </div>
                <div className="bg-[#006198] absolute bottom-0 w-[100%] left-0 py-[6px] flex justify-center text-[30px] text-[#fff]">
                  <i className="fa-solid fa-print"></i>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </NextUIModal>
      <NextUIModal
        className="md:max-w-[390px]  max-w-[333px] relative  flex justify-center rounded-[10px] !py-0 mx-auto md:h-[60%] h-[350px]"
        isOpen={isPackgingModalOpen}
        backdrop={"blur"}
        onOpenChange={closePackgingModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0">
            <div className="w-[100%] flex  items-center ">
              <div className="w-[100%]">
                <div className="w-[100%] absolute left-0  items-center justify-center flex flex-col h-[80px] bg-[#F28C28] text-[#fff] text-center ">
                  <p className="text-[25px] leading-[30px]">MAHANT PRASADAM</p>
                  <p className="text-[15px]">Packaging Details</p>
                </div>

                <div className="text-[] mt-[24%] flex flex-col text-left   justify-start py-[10px] ">
                  <p>Bill No - 481</p>
                  <p>
                    Order on -{" "}
                    {formatDateAndTime(
                      selectedOrderData?.createdAt
                    )}
                  </p>
                </div>
                <div className="w-[100%] flex flex-col gap-[5px] absolute left-0">
                  <div className="w-[100%] px-[20px] text-[18px] text-[#fff] font-[500] py-[5px] flex justify-between bg-[#00984B]">
                    <p className="w-[15%]">No.</p>
                    <p className="w-[55%]">Items</p>
                    <p className="text-right w-[30%]">Quantity</p>
                  </div>

                  {selectedOrderData?.orderId?.servingMethodId?.map(
                    (item, index) => (
                      <>
                        <div className="max-h-[175px] overflow-y-auto">
                          <div
                            key={index}
                            className="w-[100%] px-[20px] text-[16px] font-[500] py-[2px] flex justify-between left-0"
                          >
                            <p className="w-[15%]">
                              {String(index + 1).padStart(2, "0")}
                            </p>{" "}
                            <p className="w-[55%]">
                              {item.servingMethod?.name}
                            </p>
                            <p className="text-right w-[30%]">
                              {item.quantity}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
                <div className="flex w-[100%] left-0 justify-between absolute bottom-[60px]  text-[18px] px-[15px] border-t-[1.5px] border-b-[1.5px] border-[#000] border-dashed">
                  <p>
                    Items :{" "}
                    {selectedOrderData?.orderId?.servingMethodId?.length || 0}
                  </p>
                  <p>
                    Qty :{" "}
                    {selectedOrderData?.orderId?.servingMethodId?.reduce(
                      (total, item) => total + item.quantity,
                      0
                    ) || 0}
                  </p>
                </div>
                <div className="bg-[#006198] absolute bottom-0 w-[100%] left-0 py-[6px] flex justify-center text-[30px] text-[#fff]">
                  <i className="fa-solid fa-print"></i>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </NextUIModal>
      <NextUIModal
        className="md:max-w-[490px] max-w-[563px] overflow-y-auto relative  flex justify-center   rounded-[20px] !py-0 mx-auto md:h-[500px]  h-[300px]"
        isOpen={isReciptModalOpen}
        backdrop={"blur"}
        onOpenChange={closeReciptModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0 border-[1.5px] border-[green] overflow-y-auto rounded-[20px]">
            <div
              className={`w-[100%] h-[100%] absolute overflow-hidden left-0 no-scrollbar flex-col overflow-y-auto gap-[15px] rounded-[10px] flex text-[13px]  font-[500] p-[14px] '
                }`}
            >
              <div className="w-[100%] flex justify-between">
                <div className="text-[15px] font-[400]">
                  <p>Order ID #{selectedOrderData?.orderId?._id}</p>
                  <p>
                    Order on - {formatDateAndTime(selectedOrderData?.createdAt)}
                  </p>
                  <p>
                    Order for -{" "}
                    {formatDateAndTime(
                      selectedOrderData?.orderDate?.pickupDate
                    )}
                  </p>
                </div>
                <p className="font-[600] pr-[20px] items-center text-[18px]">
                  Name - {selectedOrderData?.orderId?.userId?.name}
                </p>
              </div>
              <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
              <div className="flex px-[10px] items-center justify-between">
                <div className="flex flex-col gap-[5px]">
                  <p className="font-[300]">Delivery Address :</p>
                  <p className="font-[500] ">
                    {selectedOrderData?.pickupLocation?.name}
                  </p>
                </div>
                <div className={`flex gap-[6px]  text-green-500 pr-[20px] ${""}`}>
                  <i className="fa-sharp-duotone fa-solid fa-circle-check tick text-[17px]"></i>
                  <p>
                    {selectedOrder === 0
                      ? paidOrder.status
                      : unpaidOrder.status}
                  </p>
                </div>
              </div>
              <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
              <div className="flex flex-col max-h-[300px] overflow-y-auto gap-[14px]">
                {selectedOrderData?.orderId?.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-[10px]"
                  >
                    <div className="flex gap-[10px] items-center">
                      <img
                        className="w-[80px] h-[80px] rounded-[8px]"
                        src={
                          item?.foodItem?.photo ||
                          "../../../public/img/Foodsection/newBhaji.png"
                        }
                        alt={item?.foodItem?.name}
                      />
                      <div>
                        <p className="text-[16px]">{item.foodItem?.name}</p>
                        <p className="text-[#595858]">Qty - {item?.quantity}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[16px]">{item?.price}</p>
                    </div>
                  </div>
                ))}
                {selectedOrderData?.orderId?.servingMethodId?.map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-[10px]"
                    >
                      <div className="flex gap-[10px] items-center">
                        <img
                          className="w-[80px] rounded-[8px] h-[80px]"
                          src={
                            item?.servingMethod?.photo ||
                            "../../../public/img/Foodsection/newBhaji.png"
                          }
                          alt={item?.servingMethod?.name}
                        />
                        <div>
                          <p className="text-[16px]">
                            {item?.servingMethod?.name}
                          </p>
                          <p className="text-[#595858]">
                            Qty - {item?.quantity}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[16px]">{item?.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex absolute bg-white bottom-[80px] w-[99%] left-[2px] flex-col gap-[10px]">
                <div className="w-[100%] border-t-[2.3px]"></div>
                <div className="flex justify-between px-[10px] font-[500] text-[19px] font-mono">
                  <p>Total</p>
                  <p>{selectedOrderData?.orderId?.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="bg-[#00984B] absolute bottom-0 w-[100%] left-0 py-[9px] flex justify-center text-[30px] text-[#fff]">
                <i className="fa-solid fa-print"></i>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </NextUIModal>
      <NextUIModal
        className="md:max-w-[420px]  max-w-[533px] relative  flex justify-center !py-0 mx-auto  rounded-[10px] h-[480px]"
        isOpen={isOrderReciptModalOpen}
        backdrop={"blur"}
        onOpenChange={closeOrderModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0">
            <div className="w-[100%] gap-[20px] flex flex-col absolute left-0 top-1 right-0 items-center ">
              <div className=" w-[100%] flex justify-center text-[17px] text-center py-[9px] font-[600] border-b-[1px] border-[#000] rounded-[10px] ">
                <p>View PayMent Recipt</p>
                <div className="absolute right-2 top-[-0px] ">
                  <i
                    className="fa-regular fa-xmark text-[20px] cursor-pointer"
                    onClick={closeOrderModal}
                  ></i>
                </div>
              </div>
              <div className=" flex flex-col gap-[28px] w-[100%]">
                <div className=" w-[95%] px-[20px] mx-auto flex justify-between ">
                  <p className=" font-[600]">Cashier name :</p>
                  <p className=" border-b-[1.5px]  overflow-x-auto w-[60%] border-[#000]">
                    {payment?.cashierName}
                  </p>
                </div>
                <div className=" w-[95%] px-[20px] mx-auto flex justify-between ">
                  <p className=" font-[600]">Receipt Number :</p>
                  <p className=" border-b-[1.5px] w-[60%] border-[#000]">
                    {payment?.recieptNo}
                  </p>
                </div>
                <div className=" border-[1px] rounded-[10px] border-[#00984B] h-[210px] w-[90%] mx-auto">
                  {payment?.recieptImage}
                </div>


                <div className="flex px-[20px] justify-between font-Poppins items-center gap-4">
                  {/* Cancel Button */}
                  <button
                    className="w-[130px] rounded-[5px] flex items-center justify-center gap-2 py-[6px] font-[500] 
               border-[1.7px] border-[#ff4d4f] text-[#ff4d4f] bg-white
               hover:bg-[#f5f5f5] active:bg-[#ff4d4f] active:text-white transition"
                  >
                    <i className="fa-solid fa-xmark"></i>
                    <span>Cancel</span>
                  </button>

                  {/* Confirm Button */}
                  <button
                    className="w-[130px] rounded-[5px] flex items-center justify-center gap-2 py-[6px] font-[500] 
             border-[1.7px] border-[#006198] text-[#006198] bg-white
             hover:bg-[#f5f5f5] active:bg-[#006198] active:text-white transition disabled:opacity-60"
                    onClick={handleComplete}
                    disabled={isCompleting}
                  >
                    <i className="fa-solid fa-check"></i>
                    <span>{isCompleting ? "Confirming..." : "Confirm"}</span>
                  </button>
                </div>


              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </NextUIModal>

      {/* Reject order modal */}

      {/* payment confirm order modal */}
      <NextUIModal
        className="md:max-w-[300px]  max-w-[333px] relative  flex justify-center rounded-[10px] !py-0 mx-auto  h-[300px]"
        isOpen={ispaymentModalOpen}
        backdrop={"blur"}
        onOpenChange={closePaymentModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0">
            <div className="w-[100%] gap-[20px] my-auto flex flex-col absolute left-0 top- right-0 items-center ">
              <div className="  mt-[70px]">
                <i className="fa-sharp fa-regular text-[100px] text-[green] fa-badge-check"></i>
              </div>
              <div className=" flex font-[500] font-Poppins text-[green]  text-[28px] mx-auto">
                <p>Order Accept</p>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </NextUIModal>
      <NextUIModal
        className="md:max-w-[320px]  max-w-[333px] relative  flex justify-center !py-0 mx-auto rounded-[10px] h-[300px]"
        isOpen={isRejectModalOpen}
        backdrop={"blur"}
        onOpenChange={closeRejectModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0">
            <div className="w-[100%] gap-[20px] flex flex-col absolute left-0 top- right-0 items-center ">
              <div className="  mt-[50px]">
                <i className="fa-sharp text-[90px] text-[red] fa-solid fa-brake-warning"></i>
              </div>
              <div className=" flex font-[600] w-[100%] text-center text-[20px] mx-auto">
                <p>Are you sure you want to reject the order?</p>
              </div>

              <div className=" w-[90%] mx-auto flex items-center  ">
                <div
                  className=" bg-[#34aff7] rounded-tl-[10px] cursor-pointer  rounded-bl-[10px] w-[50%] text-[white] font-[600] items-center flex justify-center text-center  py-[10px]"
                  onClick={closeRejectModal}
                >
                  {" "}
                  Cancel
                </div>
                <div
                  className=" bg-[Red] rounded-tr-[10px] cursor-pointer   rounded-br-[10px] w-[50%] text-[white] font-[600] items-center flex justify-center text-center  py-[10px]"
                  onClick={handleCancelOrder}
                >
                  {" "}
                  Confirm
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </NextUIModal>
    </>
  );
}
