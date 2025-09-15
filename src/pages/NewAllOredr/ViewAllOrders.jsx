import React, { useEffect, useMemo, useState } from 'react'
import Logout from '../../Components/logout/Logout'
import Header from '../../Components/header/Header'
import { useNavigate } from 'react-router-dom';
import { Eye, Calendar, Filter } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";

import {
    getAllUnpaidOrderListAction,
    getAllPaidOrderListAction,
    getAllPrePackageUnpaidOrderListAction,
    getAllPrePackagePaidOrderListAction,
    getAllUnpaidBulkOrderListAction,
    getAllPaidBulkOrderListAction,
    getAllPendingOrderListAction,
    getAllPrePackagePendingOrderListAction,
} from "../../redux/action/orderListing";



export default function ViewAllOrders() {
    const navigate = useNavigate(); const [dateRange, setDateRange] = useState({ from: "", to: "" })
    const [statusFilter, setStatusFilter] = useState("all")
    const [orderFormFilter, setOrderFormFilter] = useState("all")
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 8


    const handleSubmit = (order) => {
        navigate(`/order-details/${order.id}`, { state: { order } });
    };


    const dispatch = useDispatch();
    const {
        getPaidOrderList,
        getUnpaidOrderList,
        getPrePackagePaidOrderList,
        getPrePackageUnpaidOrderList,
        getBulkPaidOrderList,
        getBulkUnpaidOrderList,
        getPendingOrderList,
        getPrePackagePendingOrderList,
    } = useSelector((state) => state.orderListingState);

    useEffect(() => {
        dispatch(getAllPaidOrderListAction());
        dispatch(getAllUnpaidOrderListAction());
        dispatch(getAllPrePackagePaidOrderListAction());
        dispatch(getAllPrePackageUnpaidOrderListAction());
        dispatch(getAllPaidBulkOrderListAction());
        dispatch(getAllUnpaidBulkOrderListAction());
        dispatch(getAllPendingOrderListAction());
        dispatch(getAllPrePackagePendingOrderListAction());
    }, [dispatch]);

    const deduplicateOrders = (orders) => {
        const seen = new Set();
        return orders.filter((order) => {
            const id = order.id || order.orderId;
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
        });
    };

    const orders = useMemo(() => {
        const normalize = (list, form) =>
        (Array.isArray(list) && list.map((o) => ({
            id: o._id,
            orderId: o?.orderId?._id || o?._id,
            orderDate: o?.orderId?.createdAt
                ? new Date(o.orderId.createdAt).toLocaleDateString("en-GB")
                : "-",
            deliveryDate: o?.orderDate?.pickupDate
                ? new Date(o.orderDate.pickupDate).toLocaleDateString("en-GB")
                : "-",
            totalPayment: o?.orderId?.totalAmount || 0,
            paidAmount: o?.paidAmount || 0,
            pendingAmount: (o?.orderId?.totalAmount || 0) - (o?.paidAmount || 0),
            paymentStatus: o?.paymentStatus || o?.orderType || "unpaid",
            orderForm: form,
            customerName: o?.orderId?.userId?.name || "Unknown",
            deliveryAddress: o?.pickupLocation?.name || "-",
            items: o?.orderId?.items || [],
            paidDate: o?.updatedAt
                ? new Date(o.updatedAt).toLocaleDateString("en-GB")
                : null,
        })));

        const combined = [
            ...normalize(getPaidOrderList, "self-serving"),
            ...normalize(getUnpaidOrderList, "self-serving"),
            ...normalize(getPendingOrderList, "self-serving"),
            ...normalize(getPrePackagePaidOrderList, "pre-packaged"),
            ...normalize(getPrePackageUnpaidOrderList, "pre-packaged"),
            ...normalize(getPrePackagePendingOrderList, "pre-packaged"),
            ...normalize(getBulkPaidOrderList, "premvati"),
            ...normalize(getBulkUnpaidOrderList, "premvati"),
        ];

        return deduplicateOrders(combined);
    }, [
        getPaidOrderList,
        getUnpaidOrderList,
        getPendingOrderList,
        getPrePackagePaidOrderList,
        getPrePackageUnpaidOrderList,
        getPrePackagePendingOrderList,
        getBulkPaidOrderList,
        getBulkUnpaidOrderList,
    ]);

    console.log('getPrePackagePendingOrderList', getPrePackagePendingOrderList)



    const filteredOrders = useMemo(() => {
        let filtered = orders

        // Filter by status
        if (statusFilter === "today") {
            const today = new Date().toLocaleDateString("en-GB")
            filtered = filtered.filter((order) => order.orderDate === today)
        } else if (statusFilter === "pending") {
            filtered = filtered.filter((order) => order.paymentStatus === "pending")
        } else if (statusFilter === "unpaid") {
            filtered = filtered.filter((order) => order.paymentStatus === "unpaid")
        } else if (statusFilter === "paid") {
            filtered = filtered.filter((order) => order.paymentStatus === "paid")
        }

        // Filter by order form
        if (orderFormFilter !== "all") {
            filtered = filtered.filter((order) => order.orderForm === orderFormFilter)
        }

        // Filter by date range
        if (dateRange.from && dateRange.to) {
            filtered = filtered.filter((order) => {
                const orderDate = new Date(order.orderDate.split("/").reverse().join("-"))
                const fromDate = new Date(dateRange.from)
                const toDate = new Date(dateRange.to)
                return orderDate >= fromDate && orderDate <= toDate
            })
        }

        return filtered
    }, [orders, statusFilter, orderFormFilter, dateRange])

    console.log('orders', orders)

    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 border-green-500 text-green-800"
            case "unpaid":
                return "bg-red-100 border-red-500  text-red-800"
            case "pending":
                return "bg-yellow-100  border-yellow-500  text-yellow-800"
            default:
                return "bg-gray-100 border-gray-500  text-gray-800"
        }
    }

    const getOrderFormColor = (form) => {
        switch (form) {
            case "self-serving":
                return "bg-orange-100 text-orange-800"
            case "pre-packaged":
                return "bg-blue-100 text-blue-800"
            case "premvati":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const handleViewOrder = (orderId) => {
        // In a real app, this would navigate to the order details page
        // For now, we'll just set the selected order ID
        setSelectedOrderId(orderId)
        console.log("Navigate to order details:", orderId)
    }

    const resetFilters = () => {
        setStatusFilter("all")
        setOrderFormFilter("all")
        setDateRange({ from: "", to: "" })
    }

    const getStatusCounts = () => {
        const today = new Date().toLocaleDateString("en-GB");
        return {
            today: filteredOrders.filter((order) => order.orderDate === today).length,
            pending: filteredOrders.filter((order) => order.paymentStatus === "pending").length,
            unpaid: filteredOrders.filter((order) => order.paymentStatus === "unpaid").length,
            paid: filteredOrders.filter((order) => order.paymentStatus === "paid").length,
        };
    };


    const statusCounts = getStatusCounts()

    const handleBack = () => {
        navigate(-1);
    };


    return (

        <>


            <div className="w-[99%] font-Poppins md11:w-[100%] md150:w-[99%] h-[100vh] flex flex-col items-center  relative overflow-hidden top-0 bottom-0  md11:py-[34px] md150:py-[48px] md11:px-[30px] md150:px-[40px]  mx-auto   my-auto ">
                <div className="  mx-auto flex gap-[30px] w-[100%] md11:h-[92vh] md150:h-[90vh] flex-col relative    rounded-[19px] border-[1px] border-[#F28C28]">
                    <div className=' flex py-[10px] top-[5px] pl-[40px] gap-[40px] pr-[10px] absolute w-[100%] justify-between h-fit'>


                        <div className="flex  gap-[10px] w-fit left-[3%]  md11:top-[4.1%]  md150:top-[5%] items-center    md11:text-[18px] md150:text-[20px] font-[600]">
                            <i
                                className="fa-solid fa-angle-up fa-rotate-270"
                                onClick={handleBack}
                            ></i>

                            <div
                                className=" font-Potua  flex items-center gap-[10px] cursor-pointer"
                                onClick={handleBack}
                            >
                                <p>All </p>
                                <p>ORDERS</p>
                            </div>
                        </div>
                        <div className="bg-white  gap-[20px]w-[80%] flex    ">
                            {/* <div className="flex items-center justify-between mb-4">
        
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div> */}


                            {/* Date Range */}
                            <div className="flex flex-col space-y-2 mr-[10px]">
                                {/* <label className="text-sm font-medium text-gray-700 flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Date Range
                                    </label> */}
                                <div className="flex space-x-2">
                                    <input
                                        type="date"
                                        value={dateRange.from}
                                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                        className="flex-1 px-3 py-[6px] border border-gray-300 rounded-lg  outline-none text-sm"
                                        placeholder="From"
                                    />
                                    <input
                                        type="date"
                                        value={dateRange.to}
                                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                        className="flex-1 px-3 py-[6px] border border-gray-300 rounded-lg  outline-none text-sm"
                                        placeholder="To"
                                    />
                                </div>
                            </div>
                            <div className=" w-[100%] gap-[10px] flex">
                                {/* Status Filters */}
                                <button
                                    onClick={() => setStatusFilter(statusFilter === "today" ? "all" : "today")}
                                    className={`px-4  w-fit py-1 h-[36px] text-[14px]  flex-shrink-0 rounded-md font-medium transition-colors relative ${statusFilter === "today" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Today's Orders
                                    {statusCounts.today > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 flex-shrink-0 h-4 flex items-center justify-center">
                                            {statusCounts.today}
                                        </span>
                                    )}
                                </button>

                                <button
                                    onClick={() => setStatusFilter(statusFilter === "pending" ? "all" : "pending")}
                                    className={`px-4  w-fit py-1 h-[36px] text-[14px]  flex-shrink-0 rounded-md font-medium transition-colors relative ${statusFilter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Pending Payment
                                    {statusCounts.pending > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 flex-shrink-0 h-4 flex items-center justify-center">
                                            {statusCounts.pending}
                                        </span>
                                    )}
                                </button>

                                <button
                                    onClick={() => setStatusFilter(statusFilter === "unpaid" ? "all" : "unpaid")}
                                    className={`px-4  w-fit py-1 h-[36px] text-[14px]  flex-shrink-0 rounded-md font-medium transition-colors relative ${statusFilter === "unpaid" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Unpaid Orders
                                    {statusCounts.unpaid > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 flex-shrink-0 h-4 flex items-center justify-center">
                                            {statusCounts.unpaid}
                                        </span>
                                    )}
                                </button>

                                <button
                                    onClick={() => setStatusFilter(statusFilter === "paid" ? "all" : "paid")}
                                    className={`px-4  w-fit py-1 h-[36px] text-[14px]  flex-shrink-0 rounded-md font-medium transition-colors relative ${statusFilter === "paid" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    Paid Orders
                                    {statusCounts.paid > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                            {statusCounts.paid}
                                        </span>
                                    )}
                                </button>

                                {/* Order Form Dropdown */}
                                <div className="flex flex-col ">
                                    {/* <label className="text-sm absolute font-medium text-gray-700">Order Form</label> */}
                                    <select
                                        value={orderFormFilter}
                                        onChange={(e) => setOrderFormFilter(e.target.value)}
                                        className="px-4 py-[7px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                                    >
                                        <option value="all">All Forms</option>
                                        <option value="pre-packaged">Pre Packaged</option>
                                        <option value="self-serving">Self Serving</option>
                                        <option value="premvati">Premvati</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Logout />
                    <div className=" md11:py-[69px] md150:py-[90px] flex md11:w-[98%] md150:w-[97%] md11:gap-[15px]  md150:gap-[20px]">
                        <Header />
                        <div className="   py-[20px] px-[20px]  md150:h-[70vh] md11:h-[73vh]  items-center  h-[67vh] bg-white  w-[100%] rounded-[19px] relative   border-[1px]  my-justify-center items-center  border-[#000000]">


                            <div className="">
                                {/* Header */}
                                {/* <div className="flex items-center justify-between mb-6">

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Total Orders: <span className="font-semibold text-orange-600">{orders.length}</span>
            </div>
            <div className="text-sm text-gray-600">
              Filtered: <span className="font-semibold text-blue-600">{filteredOrders.length}</span>
            </div>
          </div>
        </div> */}

                                {/* Filters */}




                                {/* Table */}
                                <div className="bg-white border rounded-xl border-[#ffa6008a] shadow-lg overflow-hidden">


                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead className="bg-orange-100">
                                                <tr>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Sr.
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Order ID
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Customer
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Order Date
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Delivery Date
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Total Payment
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Payment Status
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Order Form
                                                    </th>
                                                    <th className="px-3 py-3  flex-shrink-0 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((order, index) => (
                                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                                        <td className="px-3 py-1 whitespace-nowrap text-[12px] text-gray-900 font-mono">{order.orderId}</td>
                                                        <td className="px-3 py-1 whitespace-nowrap">
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                                                <div className="text-[12px] text-gray-500">{order.deliveryAddress}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-1 whitespace-nowrap text-[12px] text-gray-900">{order.orderDate}</td>
                                                        <td className="px-3 py-1 whitespace-nowrap text-[12px] text-gray-900">{order.deliveryDate}</td>
                                                        <td className="px-3 py-1 whitespace-nowrap text-[12px] font-semibold text-gray-900">
                                                            ₹{order.totalPayment.toFixed(2)}
                                                        </td>
                                                        <td className="px-3 py-1 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex px-3 py-[2px] border rounded-full text-[11px] font-medium ${getStatusColor(order.paymentStatus)}`}
                                                            >
                                                                {order.paymentStatus}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-1 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex px-3 py-[3px] rounded-full  border text-[11px]  font-medium ${getOrderFormColor(order.orderForm)}`}
                                                            >
                                                                {order.orderForm}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-1 whitespace-nowrap text-center">
                                                            <button
                                                                onClick={() => handleSubmit(order)}
                                                                className="text-orange-600 hover:text-orange-800 transition-colors p-2 rounded-full hover:bg-orange-50"
                                                                title="View Order Details"
                                                            >
                                                                <Eye className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredOrders.length === 0 && (
                                        <div className="text-center py-12">
                                            <div className="text-gray-400 text-lg mb-2">No orders found</div>
                                            <p className="text-gray-500">Try adjusting your filters to see more results</p>
                                            <button
                                                onClick={resetFilters}
                                                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                            >
                                                Clear All Filters
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Pagination */}
                                {filteredOrders.length > 0 && (
                                    <div className="flex items-center justify-between mt-6">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium"> {(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
                                            <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredOrders.length)}</span> of{" "}
                                            <span className="font-medium">{filteredOrders.length}</span> results
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                                disabled={currentPage === 1}
                                            >
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </button>
                                            <button className="px-3 py-2 min-w-[40px] text-sm bg-orange-500 text-white rounded-lg">   {currentPage}</button>
                                            <button
                                                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                                onClick={() =>
                                                    setCurrentPage((p) =>
                                                        p < Math.ceil(filteredOrders.length / rowsPerPage) ? p + 1 : p
                                                    )
                                                }
                                                disabled={currentPage === Math.ceil(filteredOrders.length / rowsPerPage)}
                                            >
                                                <i className="fa-solid fa-chevron-right"></i>

                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
