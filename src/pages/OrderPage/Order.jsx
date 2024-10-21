import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../Components/header/Header';
import { Modal as NextUIModal, ModalBody, ModalContent } from '@nextui-org/react';
import { getAllPadiOrderListAction, getAllUnpadiOrderListAction } from '../../redux/action/orderListing';
import { useDispatch, useSelector } from 'react-redux';


export default function OrderManagement() {

  const [activeTab, setActiveTab] = useState('self-serving');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); 
  const [isNotifictionModalOpen, setIsNotifictionModalOpen] = useState(false);
  const [isPackgingModalOpen, setPackegingModalOpen] = useState(false);
  const [isReciptModalOpen, setReciptModalOpen] = useState(false);

  const dispatch = useDispatch();

  const paidOrderList = useSelector((state) => state.orderListingState?.getPaidOrderList);
  const unpaidOrderList = useSelector((state) => state.orderListingState?.getUnpaidOrderList);
  // const selectOrderData = useSelector((state) => state.orderListingState?.getOrderById);

  // console.log('unpaidOrderList', unpaidOrderList)

  useEffect(() => {
    dispatch(getAllPadiOrderListAction());
    dispatch(getAllUnpadiOrderListAction());
  }, [dispatch]);

  const handleSelectOrder = (orderId) => {
    setSelectedOrder(orderId);
  };

  
  const selectedOrderData = useMemo(() => {
    return (
      paidOrderList.find((order) => order._id === selectedOrder) ||
      unpaidOrderList.find((order) => order._id === selectedOrder)
    );
  }, [selectedOrder, paidOrderList, unpaidOrderList]);

  // console.log('selectedOrder', selectedOrder);
  

  // const orders = [
  //   ...paidOrderList.map(order => ({ ...order, paid: true })),
  //   ...unpaidOrderList.map(order => ({ ...order, paid: false })), 
  // ];
  function formatDateAndTime(dateInput) {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
  }
  
  
  const openNotifictionModal = () => {
    setIsNotifictionModalOpen(true);
    window.history.pushState({}, '');
  };
  const closeNotifictionModal = () => {
    setIsNotifictionModalOpen(false);
    window.history.back();
  };


  const openPackgingnModal = () => {
    setPackegingModalOpen(true);
    window.history.pushState({}, '');
  };

  const closePackgingModal = () => {
    setPackegingModalOpen(false);
    window.history.back();
  };


  const openReciptModal = () => {
    setReciptModalOpen(true);
    window.history.pushState({}, '');
  };

  const closeReciptModal = () => {
    setReciptModalOpen(false);
    window.history.back();
  };
  const items = [
    { name: 'BHAJI 200GMS', quantity: 10 },
    { name: 'BHAJI 200GMS', quantity: 10 },
    { name: 'BHAJI 200GMS', quantity: 10 },

  ];
  const items2 = [
    { name: ' Paper plate - 4 no. silver foil', quantity: 10 },
    { name: ' Paper plate - 4 no. silver foil', quantity: 10 },
    { name: ' Paper plate - 4 no. silver foil', quantity: 10 },

  ];


  const paidOrder = {
    id: '30481',
    date: '21/08/2024 - 09:20 PM',
    forDate: '23/08/2024',
    location: 'Shraddhapark',
    name: 'MR. HITESH OZA',
    total: '₹ 360',
    items: [
      { name: 'ONLY BHAJI 200GMS', qty: '05', price: '₹ 180.00' },
      { name: 'ONLY BHAJI 200GMS', qty: '05', price: '₹ 180.00' },
    ],
    status: 'Order successful',
    address: 'Shraddhapark',
    paid: true, // Mark as paid
  };

  const unpaidOrder = {
    id: '30482',
    date: '22/08/2024 - 08:10 PM',
    forDate: '24/08/2024',
    location: 'Shraddhapark',
    name: 'MR. RAJESH KUMAR',
    total: '₹ 420',
    items: [
      { name: 'ONLY BHAJI 300GMS', qty: '04', price: '₹ 200.00' },
      { name: 'ONLY BHAJI 300GMS', qty: '04', price: '₹ 200.00' },
    ],
    status: 'Order successful',
    address: 'Shraddhapark',
    paid: false, // Mark as unpaid
  };

  // Filter orders based on active filter
  const shouldShowPaid = activeFilter === 'all' || activeFilter === 'paid';
  const shouldShowUnpaid = activeFilter === 'all' || activeFilter === 'unpaid';

  // Update selectedOrder when the filter changes to maintain the first order in view
  useEffect(() => {
    if (activeFilter === 'all') {
      setSelectedOrder(paidOrderList[0]?._id || unpaidOrderList[0]?._id); 
    } else if (activeFilter === 'paid') {
      setSelectedOrder(paidOrderList[0]?._id); 
    } else if (activeFilter === 'unpaid') {
      setSelectedOrder(unpaidOrderList[0]?._id);
    }
  }, [activeFilter, paidOrderList, unpaidOrderList]);

  

  return (
    <>
      <div className="w-[99%] h-[100%] relative overflow-hidden px-[40px] py-[48px] mx-auto my-auto">
        <div className="mx-auto flex gap-[30px] h-[90vh] flex-col relative rounded-[19px] border-[1px] border-[#FEAA00]">
          <div className="pt-[20px] justify-between items-center pl-[20px] flex pr-[10%]">
            <div className="flex text-[20px] font-patua font-[600]">
              <i className="fa-solid fa-angle-up fa-rotate-270"></i>
              <p> ORDERS MANAGEMENT</p>
            </div>
            <div className="flex absolute top-[5.8%] gap-[10px] right-[10%]">
              <div
                onClick={() => setActiveTab('self-serving')}
                className={`w-[130px] p-[8px]  rounded-tl-[7px]  rounded-tr-[7px]  border-[#000] flex items-center justify-center cursor-pointer ${activeTab === 'self-serving'
                  ? 'bg-[#FEAA00] text-[#fff]'
                  : 'border-t-[1px] border-l-[1px] border-r-[1px]'
                  }`}
              >
                <p>Self Serving</p>
              </div>
              <div
                onClick={() => setActiveTab('pre-packaged')}
                className={`w-[130px] p-[8px]  rounded-tr-[7px] rounded-tl-[7px]  border-[#000] flex items-center justify-center cursor-pointer ${activeTab === 'pre-packaged'
                  ? 'bg-[#FEAA00] text-[#fff]'
                  : 'border-t-[1px] border-l-[1px] border-r-[1px]'
                  }`}
              >
                <p>Pre - Packaged</p>
              </div>
            </div>
          </div>

          <div className="flex w-[97%] gap-[20px]">
            <Header />

            <div className="py-[20px] px-[20px] flex gap-[20px] md150:h-[70vh] overflow-y-auto h-[67vh] bg-white w-[100%] rounded-[19px] relative border-[1px] my-justify-center items-center border-[#000000]">


              <div className="w-[30%] rounded-[10px] gap-[10px] flex flex-col p-[15px] h-[100%] no-scrollbar border-[1.4px] border-[#FEAA00] overflow-y-auto">

                {/* Filter Buttons */}
                <div className="w-[100%] overflow-hidden bg-[#F3F3F3] h-[35px] rounded-[7px] items-center border-[1px] flex justify-between border-[#595454]">
                  <div
                    className={`w-[100%] h-[100%] text-center flex items-center justify-center cursor-pointer ${activeFilter === 'all' ? 'bg-[#00984B] text-white' : ''
                      }`}
                    onClick={() => setActiveFilter('all')}
                  >
                    <p>All</p>
                  </div>
                  <div
                    className={`w-[100%] h-[100%]  text-center flex items-center justify-center cursor-pointer ${activeFilter === 'paid' ? 'bg-[#006198] text-white' : ''
                      }`}
                    onClick={() => setActiveFilter('paid')}
                  >
                    <p>Paid</p>
                  </div>
                  <div
                    className={`w-[100%] h-[100%] text-center flex items-center justify-center cursor-pointer ${activeFilter === 'unpaid' ? 'bg-[#FF2323] text-white' : ''
                      }`}
                    onClick={() => setActiveFilter('unpaid')}
                  >
                    <p>Unpaid</p>
                  </div>
                </div>

                {/* Paid Order */}
                {shouldShowPaid && paidOrderList.map((order) => (
                  <div
                    key={order.id}
                    className={`w-[100%] items-center justify-between rounded-[10px] border-[#00984B] text-[#00984B] flex text-[13px] border-[1.4px] p-[9px] cursor-pointer`}
                    onClick={() => handleSelectOrder(order._id)}
                    >
                    <div>
                      <p>Order ID #{order._id}</p>
                      <p>Order on - {formatDateAndTime(order?.createdAt)}</p>
                      <p>Order for - {formatDateAndTime(order?.orderDate?.pickupDate)}</p>
                      <p>Pickup location - {order?.pickupLocation?.name}</p>
                    </div>
                    <div
                      className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                        ? 'bg-[#00984B] text-white'
                        : 'bg-white text-[#00984B] border-[1px] border-[#00984B]'
                        }`}
                    >
                      <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                    </div>
                  </div>
                ))}

                {/* Unpaid Order */}
                {shouldShowUnpaid && unpaidOrderList.map((order) =>(
                  <div
                    key={order.id}
                    className={`w-[100%] items-center justify-between rounded-[10px] border-[#FF0606] text-[#FF0606] flex text-[13px] border-[1.4px] p-[9px] cursor-pointer`}
                    onClick={() => handleSelectOrder(order._id)}
                    >
                    <div>
                      <p>Order ID #{order._id}</p>
                      <p>Order on - {formatDateAndTime(order?.createdAt)}</p>
                      <p>Order for - {formatDateAndTime(order.orderDate?.pickupDate)}</p>
                      <p>Pickup location - {order.pickupLocation?.name}</p>
                    </div>
                    <div
                      className={`w-[25px] h-[25px] flex justify-center items-center rounded-[5px] ${selectedOrder === order._id
                        ? 'bg-[#FF0606] text-white'
                        : 'bg-white text-[#FF0606] border-[1px] border-[#FF0606]'
                        }`}
                    >
                      <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Order Details */}
              {selectedOrderData && (
                <div className="w-[75%] relative no-scrollbar rounded-[10px] gap-[10px] flex flex-col p-[15px] h-[100%] border-[1.4px] border-[#FEAA00] overflow-y-auto">
                  <div className="flex justify-between">
                    <div className="text-[17px] font-[600]">
                      <p>ORDERS DETAILS</p>
                    </div>
                    <div
                      className={`w-[150px] rounded-bl-[7px] font-patua text-[#fff] relative text-[15px] top-[-50%] right-[-2%] flex justify-center py-[5px] ${selectedOrder === 0 ? 'bg-[#006198]' : 'bg-[#FF0606]'
                        }`}
                    >
                      <p>{paidOrderList.find((order) => order._id === selectedOrder) ? 'ORDER PAID' : 'ORDER UNPAID'}</p>
                    </div>
                  </div>
                  <div
                    className={`w-[100%] h-[79%] no-scrollbar flex-col overflow-y-auto gap-[15px] rounded-[10px] flex text-[13px] border-[1.4px] font-[500] p-[14px] ${selectedOrder === 0 ? 'border-[#00984B]' : 'border-[#FF0606]'
                      }`}
                  >
                    <div className="w-[100%] flex justify-between">
                      <div className="text-[15px] font-[400]">
                        <p>Order ID #{selectedOrderData?.orderId?._id}</p>
                        <p>Order on - {formatDateAndTime(selectedOrderData?.createdAt)}</p>
                        <p>Order for - {formatDateAndTime(selectedOrderData?.orderDate?.pickupDate)}</p>
                      </div>
                      <p className="font-[600] pr-[20px] items-center text-[18px]">
                        Name - {selectedOrderData?.orderId?.userId?.name}
                      </p>
                    </div>
                    <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                    <div className="flex px-[10px] items-center justify-between">
                      <div className="flex flex-col gap-[5px]">
                        <p className="font-[300]">Delivery Address :</p>
                        <p className="font-bold ">
                          {selectedOrderData?.pickupLocation?.name}
                        </p>
                      </div>
                      <div className="flex gap-[6px] pr-[20px]">
                        <i className="fa-sharp-duotone fa-solid fa-circle-check tick text-[17px]"></i>
                        <p>{selectedOrderData?.orderType}</p>
                      </div>
                    </div>
                    <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
                    <div className="flex flex-col gap-[14px]">
                      {selectedOrderData?.orderId?.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between px-[10px]">
                          <div className="flex gap-[10px] items-center">
                            <img
                              className="w-[80px]"
                              src={item?.foodItem?.photo || "../../../public/img/Foodsection/newBhaji.png"}
                              alt="Product"
                            />
                            <div>
                              <p className="text-[16px]">{item?.foodItem?.name}</p>
                              <p className="text-[#595858]">Qty - {item?.quantity}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[16px]">{item?.totalPrice}</p>
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
                      <div className='flex gap-[10px] items-center'>
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
                      {selectedOrder === 0 && (
                        <div
                          className="w-[130px] cursor-pointer rounded-[5px] flex justify-center py-[6px] text-[#ffffff] font-[500] bg-[#00984B]"
                          onClick={openReciptModal}
                        >
                          <p>View Receipt</p>
                        </div>
                      )}
                    </div>

                    {selectedOrder === 1 && (
                      <div className="flex gap-[10px] items-center">
                        <div className="w-[130px] rounded-[5px] flex justify-center py-[6px] text-[#FF0606] border-[#FF0606] font-[500] border-[1.7px]">
                          <p>Reject Order</p>
                        </div>
                        <div className="w-[130px] rounded-[5px] flex justify-center py-[6px] text-[#fff] font-[500] bg-[#FEAA00]">
                          <p>Accept Order</p>
                        </div>
                      </div>
                    )}
                  </div>


                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      <NextUIModal
        className='md:max-w-[390px] max-w-[333px] relative  flex justify-center !py-0 mx-auto md:h-[60%] h-[350px]'
        isOpen={isNotifictionModalOpen}
        backdrop={"blur"}
        onOpenChange={closeNotifictionModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0">

            <div className='w-[100%] flex  items-center '>
              <div className='w-[100%]'>
                <div className='w-[100%] absolute left-0  items-center justify-center flex flex-col h-[80px] bg-[#FEAA00] text-[#fff] text-center '>
                  <p className='text-[25px] leading-[30px]'>
                    MAHANT PRASADAM
                  </p>
                  <p className='text-[15px]'>
                    Kitchen Order Ticket
                  </p>

                </div>

                <div className='text-[] mt-[24%] flex flex-col text-left   justify-start py-[10px] '>
                  <p>Bill No - 481</p>
                  <p>
                    Order on - 21/08/2024 - 09:20 PM
                  </p>
                </div>
                <div className='w-[100%] flex flex-col gap-[5px] absolute left-0'>
                  <div className='w-[100%] px-[20px] text-[18px] text-[#fff] font-[500] py-[5px] flex justify-between bg-[#00984B]'>
                    <p className='w-[15%]'>No.</p>
                    <p className='w-[55%]'>Items</p>
                    <p className='text-right w-[30%]'>Quantity</p>
                  </div>

                  {/* Map over the items and dynamically generate the rows */}
                  {items.map((item, index) => (

                    <div key={index} className='w-[100%] px-[20px] text-[16px] font-[500] py-[2px] flex justify-between left-0'>
                      <p className='w-[15%]'>{String(index + 1).padStart(2, '0')}</p> {/* Generates 01, 02, 03, etc. */}
                      <p className='w-[55%]'>{item.name}</p>
                      <p className='text-right w-[30%]'>{item.quantity}</p>
                    </div>
                  ))}
                  {/* <div className='flex justify-between  text-[18px] px-[15px] border-t-[1.5px] border-b-[1.5px] border-[#000] border-dashed'>
                    <p>
                      Items  : 03
                    </p>
                    <p>
                      Qty : 40
                    </p>
                  </div> */}

                </div>
                <div className='flex w-[100%] left-0 justify-between absolute bottom-[60px]  text-[18px] px-[15px] border-t-[1.5px] border-b-[1.5px] border-[#000] border-dashed'>
                  <p>
                    Items  : 03
                  </p>
                  <p>
                    Qty : 40
                  </p>
                </div>
                <div className='bg-[#006198] absolute bottom-0 w-[100%] left-0 py-[6px] flex justify-center text-[30px] text-[#fff]'>
                  <i class="fa-solid fa-print"></i>
                </div>

              </div>
            </div>



          </ModalBody>
        </ModalContent>
      </NextUIModal>
      <NextUIModal
        className='md:max-w-[390px] max-w-[333px] relative  flex justify-center !py-0 mx-auto md:h-[60%] h-[350px]'
        isOpen={isPackgingModalOpen}
        backdrop={"blur"}
        onOpenChange={closePackgingModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0">

            <div className='w-[100%] flex  items-center '>
              <div className='w-[100%]'>
                <div className='w-[100%] absolute left-0  items-center justify-center flex flex-col h-[80px] bg-[#FEAA00] text-[#fff] text-center '>
                  <p className='text-[25px] leading-[30px]'>
                    MAHANT PRASADAM
                  </p>
                  <p className='text-[15px]'>
                    Packaging Details
                  </p>

                </div>

                <div className='text-[] mt-[24%] flex flex-col text-left   justify-start py-[10px] '>
                  <p>Bill No - 481</p>
                  <p>
                    Order on - 21/08/2024 - 09:20 PM
                  </p>
                </div>
                <div className='w-[100%] flex flex-col gap-[5px] absolute left-0'>
                  <div className='w-[100%] px-[20px] text-[18px] text-[#fff] font-[500] py-[5px] flex justify-between bg-[#00984B]'>
                    <p className='w-[15%]'>No.</p>
                    <p className='w-[55%]'>Items</p>
                    <p className='text-right w-[30%]'>Quantity</p>
                  </div>

                  {/* Map over the items and dynamically generate the rows */}
                  {items2.map((item, index) => (

                    <div key={index} className='w-[100%] px-[20px] text-[16px] font-[500] py-[2px] flex justify-between left-0'>
                      <p className='w-[15%]'>{String(index + 1).padStart(2, '0')}</p> {/* Generates 01, 02, 03, etc. */}
                      <p className='w-[55%]'>{item.name}</p>
                      <p className='text-right w-[30%]'>{item.quantity}</p>
                    </div>
                  ))}
                  {/* <div className='flex justify-between  text-[18px] px-[15px] border-t-[1.5px] border-b-[1.5px] border-[#000] border-dashed'>
                    <p>
                      Items  : 03
                    </p>
                    <p>
                      Qty : 40
                    </p>
                  </div> */}

                </div>
                <div className='flex w-[100%] left-0 justify-between absolute bottom-[60px]  text-[18px] px-[15px] border-t-[1.5px] border-b-[1.5px] border-[#000] border-dashed'>
                  <p>
                    Items  : 03
                  </p>
                  <p>
                    Qty : 40
                  </p>
                </div>
                <div className='bg-[#006198] absolute bottom-0 w-[100%] left-0 py-[6px] flex justify-center text-[30px] text-[#fff]'>
                  <i class="fa-solid fa-print"></i>
                </div>

              </div>
            </div>



          </ModalBody>
        </ModalContent>
      </NextUIModal>
      <NextUIModal
        className='md:max-w-[490px] max-w-[563px] overflow-hidden relative  flex justify-center  rounded-[20px] !py-0 mx-auto md:h-[68%] h-[350px]'
        isOpen={isReciptModalOpen}
        backdrop={"blur"}
        onOpenChange={closeReciptModal}
      >
        <ModalContent className="relative ">
          <ModalBody className="!py-0 border-[2px] border-[green] overflow-hidden rounded-[20px]">


            <div
              className={`w-[100%] h-[100%] absolute overflow-hidden left-0 no-scrollbar flex-col overflow-y-auto gap-[15px] rounded-[10px] flex text-[13px]  font-[500] p-[14px] '
                }`}
            >
              <div className="w-[100%] flex justify-between">
                <div className="text-[15px] font-[400]">
                  <p>Order ID #{selectedOrder === 0 ? paidOrder.id : unpaidOrder.id}</p>
                  <p>Order on - {selectedOrder === 0 ? paidOrder.date : unpaidOrder.date}</p>
                  <p>Order for - {selectedOrder === 0 ? paidOrder.forDate : unpaidOrder.forDate}</p>
                </div>
                <p className="font-[600] pr-[20px] items-center text-[18px]">
                  Name - {selectedOrder === 0 ? paidOrder.name : unpaidOrder.name}
                </p>
              </div>
              <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
              <div className="flex px-[10px] items-center justify-between">
                <div className="flex flex-col gap-[5px]">
                  <p className="font-[300]">Delivery Address :</p>
                  <p className="font-bold ">
                    {selectedOrder === 0 ? paidOrder.address : unpaidOrder.address}
                  </p>
                </div>
                <div className="flex gap-[6px] pr-[20px]">
                  <i className="fa-sharp-duotone fa-solid fa-circle-check tick text-[17px]"></i>
                  <p>{selectedOrder === 0 ? paidOrder.status : unpaidOrder.status}</p>
                </div>
              </div>
              <div className="w-[100%] border-t-[1.7px] border-dashed"></div>
              <div className="flex flex-col gap-[14px]">
                {(selectedOrder === 0 ? paidOrder.items : unpaidOrder.items).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-[10px]">
                    <div className="flex gap-[10px] items-center">
                      <img
                        className="w-[80px]"
                        src="../../../public/img/Foodsection/newBhaji.png"
                        alt="Product"
                      />
                      <div>
                        <p className="text-[16px]">{item.name}</p>
                        <p className="text-[#595858]">Qty - {item.qty}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[16px]">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex absolute bottom-[80px] w-[99%] left-[2px] flex-col gap-[10px]'>


                <div className="w-[100%] border-t-[2.3px]"></div>
                <div className="flex justify-between px-[10px] font-[500] text-[15px] font-mono">
                  <p>Total</p>
                  <p>{selectedOrder === 0 ? paidOrder.total : unpaidOrder.total}</p>
                </div>
              </div>
              <div className='bg-[#00984B] absolute bottom-0 w-[100%] left-0 py-[9px] flex justify-center text-[30px] text-[#fff]'>
                <i class="fa-solid fa-print"></i>
              </div>
            </div>


          </ModalBody>
        </ModalContent>
      </NextUIModal>
    </>
  );
}
