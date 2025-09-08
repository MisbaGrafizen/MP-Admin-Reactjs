import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Logout from '../../Components/logout/Logout';
import Header from '../../Components/header/Header';
import { ArrowLeft, Printer, X, AlertTriangle } from "lucide-react"
import food1 from "../../../public/img/Foodsection/image 5.png"

export default function OrderDeatils({ orderId, onBack }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }



    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [showKOTModal, setShowKOTModal] = useState(false)
    const [showPOTModal, setShowPOTModal] = useState(false)
    const [paymentForm, setPaymentForm] = useState({ cashierName: "", receiptNumber: "", notes: "" })

    // Sample order data - in real app, this would be fetched based on orderId
     const { state } = useLocation();
   const order = state?.order;

   if (!order) {
     return (
       <div className="p-6 text-red-600 font-semibold">
         ⚠️ No order details found. Please go back to the orders list.
       </div>
     );
   }

    const handlePaymentSubmit = () => {
        console.log("Payment submitted:", paymentForm)
        setShowPaymentModal(false)
        setPaymentForm({ cashierName: "", receiptNumber: "", notes: "" })
    }

    const handleRejectOrder = () => {
        console.log("Order rejected:", order.orderId)
        setShowRejectModal(false)
        // In real app, update order status and navigate back
        if (onBack) onBack()
    }

    const printReceipt = () => {
        window.print()
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800 border-green-200"
            case "unpaid":
                return "bg-red-100 text-red-800 border-red-200"
            case "partial":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getOrderFormColor = (form) => {
        switch (form) {
            case "self-serving":
                return "bg-orange-500"
            case "pre-packaged":
                return "bg-blue-500"
            case "premvati":
                return "bg-purple-500"
            default:
                return "bg-gray-500"
        }
    }

    console.log('order', order)

    return (
        <>


            <div className="w-[99%] md11:w-[100%] font-Poppins md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  md11:py-[34px] md150:py-[48px] md11:px-[30px] md150:px-[40px]  mx-auto   my-auto ">
                <div className="  mx-auto flex gap-[30px] w-[100%] md11:h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#F28C28]">
                    <div className="flex absolute gap-[10px] left-[3%]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
                        <i
                            className="fa-solid fa-angle-up fa-rotate-270"
                            onClick={handleBack}
                        ></i>

                        <div
                            className=" font-Potua  flex items-center gap-[10px] cursor-pointer"
                            onClick={handleBack}
                        >
                            <p>ORDER</p>
                            <p>DETAILS</p>
                        </div>
                    </div>

                    <Logout />
                    <div className=" md11:py-[69px] md150:py-[90px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
                        <Header />
                        <div className="   py-[20px] px-[20px]  md150:h-[70vh] md11:h-[73vh] overflow-y-auto   h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">




                            {/* Order Details Card */}
                            <div className="bg-white rounded-2xl shadow-lg  border-orange-200 overflow-hidden">
                                {/* Header */}
                                {/* <div className="flex items-center justify-between px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">ORDER DETAILS</h2>
              <button
                onClick={printReceipt}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Print Order"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">ORDER {order.paymentStatus.toUpperCase()}</span>
            </div>
          </div> */}

                                <div className="p-6">
                                    {/* Order Information Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                        {/* Left Column - Order Info */}
                                        <div className="space-y-6">
                                            <div className="bg-gray-50 rounded-lg p-3 border">
                                                <h3 className="text-lg font-semibold mb-3 text-gray-800">Order Information</h3>
                                                <div className="space-y-2">
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Order ID:</span>{" "}
                                                        <span className="font-mono text-gray-900">{order.orderId}</span>
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Order Date:</span>{" "}
                                                        <span className="text-gray-900">
                                                            {order.orderDate} 
                                                        </span>
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Delivery Date:</span>{" "}
                                                        <span className="text-gray-900">
                                                            {order.deliveryDate}
                                                        </span>
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Bill Number:</span>{" "}
                                                        <span className="text-gray-900">{order.orderId}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3 border">
                                                <h3 className="text-lg font-semibold mb-3 text-gray-800">Delivery Information</h3>
                                                <div className="space-y-2">
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Address:</span>{" "}
                                                        <span className="text-gray-900">{order.deliveryAddress}</span>
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className="font-medium text-gray-600">Contact:</span>{" "}
                                                        <span className="text-gray-900">{order.contactNumber}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column - Customer Info */}
                                        <div className="space-y-6">
                                            <div className="bg-gray-50 rounded-lg p-3 border">
                                                <h3 className="text-lg font-semibold mb-3 text-gray-800">Customer Information</h3>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-lg font-semibold text-gray-900">{order.customerName}</p>
                                                        <p className="text-sm text-gray-600">Customer</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div
                                                            className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.paymentStatus)}`}
                                                        >
                                                            {order.paymentStatus === "paid" && "✓ Paid"}
                                                            {order.paymentStatus === "unpaid" && "✗ Unpaid"}
                                                            {order.paymentStatus === "partial" && "⚠ Partial"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3 border">
                                                <h3 className="text-lg font-semibold mb-3 text-gray-800">Order Type</h3>
                                                <div
                                                    className={`inline-flex px-4 py-2 rounded-full text-sm font-medium text-white ${getOrderFormColor(order.orderForm)}`}
                                                >
                                                    {order.orderForm.charAt(0).toUpperCase() + order.orderForm.slice(1).replace("-", " ")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="mb-5">
                                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
                                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                                            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-200 font-semibold text-sm text-gray-700">
                                                <div className="col-span-1">Sr.</div>
                                                <div className="col-span-2">Image</div>
                                                <div className="col-span-4">Item Name</div>
                                                <div className="col-span-2">Quantity</div>
                                                <div className="col-span-2">Unit Price</div>
                                                <div className="col-span-1">Total</div>
                                            </div>
                                            {order.items?.map((item, index) => (
                                                <div key={index} className="grid grid-cols-12 gap-4 p-2 border-b border-gray-200 items-center">
                                                    <div className="col-span-1 text-sm font-medium text-gray-900">{index + 1}</div>
                                                    <div className="col-span-2">
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                                        />
                                                    </div>
                                                    <div className="col-span-4">
                                                        <h4 className="font-semibold text-gray-900">{item.name || item.foodItem?.name}</h4>
                                                    </div>
                                                    <div className="col-span-2 text-sm text-gray-700">
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                            Qty: {item.quantity}
                                                        </span>
                                                    </div>
                                                    <div className="col-span-2 text-sm font-semibold text-gray-900">₹{item.foodItem?.price}</div>
                                                    <div className="col-span-1 text-sm font-bold text-gray-900">₹{item.totalPrice}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Payment Summary */}
                                    <div className="mb-8">
                                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Payment Summary</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                                                    <p className="text-2xl font-bold text-gray-900">₹{order.totalPayment.toFixed(2)}</p>
                                                </div>
                                                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                    <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
                                                    <p className="text-2xl font-bold text-green-600">₹{order.paidAmount.toFixed(2)}</p>
                                                    {order.paidDate && <p className="text-xs text-gray-500 mt-1">Paid on {order.paidDate}</p>}
                                                </div>
                                                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                    <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
                                                    <p className="text-2xl font-bold text-red-600">₹{order.pendingAmount.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => setShowKOTModal(true)}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                        >
                                            View KOT
                                        </button>
                                        <button
                                            onClick={() => setShowPOTModal(true)}
                                            className="px-6 py-3 border-2 border-blue-300 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                        >
                                            View POT
                                        </button>
                                        <button
                                            onClick={() => setShowPaymentModal(true)}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            View Payment Receipt
                                        </button>
                                        <button
                                            onClick={() => setShowRejectModal(true)}
                                            className="px-6 py-3 border-2 border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                                        >
                                            Reject Order
                                        </button>
                                    </div>
                                </div>
                            </div>


                            {/* Payment Receipt Modal */}
                            {showPaymentModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold">View Payment Receipt</h3>
                                            <button
                                                onClick={() => setShowPaymentModal(false)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Cashier name :</label>
                                                <input
                                                    type="text"
                                                    value={paymentForm.cashierName}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, cashierName: e.target.value })}
                                                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                                    placeholder="Enter cashier name"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Receipt Number :</label>
                                                <input
                                                    type="text"
                                                    value={paymentForm.receiptNumber}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, receiptNumber: e.target.value })}
                                                    className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors"
                                                    placeholder="Enter receipt number"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Notes :</label>
                                                <textarea
                                                    value={paymentForm.notes}
                                                    onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                                                    className="w-full px-3 py-2 border-2 border-green-300 rounded-lg focus:border-green-500 outline-none h-32 resize-none transition-colors"
                                                    placeholder="Additional notes..."
                                                />
                                            </div>
                                        </div>

                                        <div className="flex space-x-4 mt-6">
                                            <button
                                                onClick={() => setShowPaymentModal(false)}
                                                className="flex-1 px-4 py-2 border-2 border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                                            >
                                                ✗ Cancel
                                            </button>
                                            <button
                                                onClick={handlePaymentSubmit}
                                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                            >
                                                ✓ Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reject Order Modal */}
                            {showRejectModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
                                        <div className="mb-6">
                                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <AlertTriangle className="w-8 h-8 text-red-600" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-900">Are you sure you want to reject the order?</h3>
                                            <p className="text-gray-600">This action cannot be undone.</p>
                                        </div>

                                        <div className="flex space-x-0">
                                            <button
                                                onClick={() => setShowRejectModal(false)}
                                                className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-l-lg font-semibold hover:bg-blue-600 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleRejectOrder}
                                                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-r-lg font-semibold hover:bg-red-600 transition-colors"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* KOT Modal */}
                            {showKOTModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                                        <div className="bg-orange-500 text-white p-4 text-center">
                                            <h3 className="text-xl font-bold">MAHANT PRASADAM</h3>
                                            <p className="text-sm">Kitchen Order Ticket</p>
                                        </div>

                                        <div className="p-4">
                                            <div className="mb-4">
                                                <p className="font-semibold">Bill No - {order.billNumber}</p>
                                                <p className="text-sm text-gray-600">
                                                    Order on - {order.orderDate} - {order.orderTime}
                                                </p>
                                            </div>

                                            <div className="bg-green-600 text-white p-2 grid grid-cols-3 gap-4 mb-4 rounded">
                                                <span className="font-semibold text-sm">No.</span>
                                                <span className="font-semibold text-sm">Items</span>
                                                <span className="font-semibold text-sm">Quantity</span>
                                            </div>

                                            {order.items.map((item, index) => (
                                                <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 text-sm">
                                                    <span className="font-medium">{String(index + 1).padStart(2, "0")}</span>
                                                    <span>{item.name}</span>
                                                    <span>{item.quantity}</span>
                                                </div>
                                            ))}

                                            <div className="border-t-2 border-dashed border-gray-400 mt-4 pt-2">
                                                <div className="flex justify-between font-semibold text-sm">
                                                    <span>Items : {order.items.length}</span>
                                                    <span>Qty : {order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setShowKOTModal(false)}
                                            className="w-full bg-blue-600 text-white p-4 font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <Printer className="w-6 h-6 mr-2" />
                                            Print KOT
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* POT Modal */}
                            {showPOTModal && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                                        <div className="bg-orange-500 text-white p-4 text-center">
                                            <h3 className="text-xl font-bold">MAHANT PRASADAM</h3>
                                            <p className="text-sm">Packaging Details</p>
                                        </div>

                                        <div className="p-4">
                                            <div className="mb-4">
                                                <p className="font-semibold">Bill No - {order.billNumber}</p>
                                                <p className="text-sm text-gray-600">
                                                    Order on - {order.orderDate} - {order.orderTime}
                                                </p>
                                            </div>

                                            <div className="bg-green-600 text-white p-2 grid grid-cols-3 gap-4 mb-4 rounded">
                                                <span className="font-semibold text-sm">No.</span>
                                                <span className="font-semibold text-sm">Items</span>
                                                <span className="font-semibold text-sm">Quantity</span>
                                            </div>

                                            {order.items.map((item, index) => (
                                                <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 text-sm">
                                                    <span className="font-medium">{String(index + 1).padStart(2, "0")}</span>
                                                    <span>{item.name}</span>
                                                    <span>{item.quantity}</span>
                                                </div>
                                            ))}

                                            <div className="border-t-2 border-dashed border-gray-400 mt-4 pt-2">
                                                <div className="flex justify-between font-semibold text-sm">
                                                    <span>Items : {order.items.length}</span>
                                                    <span>Qty : {order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setShowPOTModal(false)}
                                            className="w-full bg-blue-600 text-white p-4 font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                                        >
                                            <Printer className="w-6 h-6 mr-2" />
                                            Print POT
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
