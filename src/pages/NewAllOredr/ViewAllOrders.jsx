import React, { useMemo, useState } from 'react'
import Logout from '../../Components/logout/Logout'
import Header from '../../Components/header/Header'
import { useNavigate } from 'react-router-dom';
import { Eye, Calendar, Filter } from "lucide-react"


export default function ViewAllOrders() {
    const navigate = useNavigate(); const [dateRange, setDateRange] = useState({ from: "", to: "" })
    const [statusFilter, setStatusFilter] = useState("all")
    const [orderFormFilter, setOrderFormFilter] = useState("all")
    const [selectedOrderId, setSelectedOrderId] = useState(null)

    const [orders] = useState([
        {
            id: "1",
            orderId: "#68b94fd03e566",
            orderDate: "04/09/2025",
            deliveryDate: "11/09/2025",
            totalPayment: 170.0,
            paidAmount: 170.0,
            pendingAmount: 0,
            paymentStatus: "paid",
            orderForm: "self-serving",
            customerName: "Swamibapa",
            deliveryAddress: "Mavdi",
            items: [
                {
                    name: "BISC. FARALI NANKHATAI",
                    quantity: 2,
                    price: 85.0,
                    image: "/placeholder.svg?height=60&width=60&text=Food",
                },
                { name: "test", quantity: 1, price: 4.0, image: "/placeholder.svg?height=60&width=60&text=Product" },
            ],
            paidDate: "04/09/2025",
        },
        {
            id: "2",
            orderId: "#68b961cd",
            orderDate: "04/09/2025",
            deliveryDate: "15/09/2025",
            totalPayment: 89.0,
            paidAmount: 0,
            pendingAmount: 89.0,
            paymentStatus: "unpaid",
            orderForm: "pre-packaged",
            customerName: "Swamibapa",
            deliveryAddress: "Mavdi",
            items: [
                {
                    name: "BISC. FARALI NANKHATAI",
                    quantity: 1,
                    price: 85.0,
                    image: "/placeholder.svg?height=60&width=60&text=Food",
                },
                { name: "test", quantity: 1, price: 4.0, image: "/placeholder.svg?height=60&width=60&text=Product" },
            ],
        },
        {
            id: "3",
            orderId: "#68b962573e5",
            orderDate: "04/09/2025",
            deliveryDate: "04/09/2025",
            totalPayment: 125.5,
            paidAmount: 50.0,
            pendingAmount: 75.5,
            paymentStatus: "partial",
            orderForm: "premvati",
            customerName: "Ravi Kumar",
            deliveryAddress: "Pramukhvatika",
            items: [
                { name: "Special Thali", quantity: 1, price: 125.5, image: "/placeholder.svg?height=60&width=60&text=Thali" },
            ],
            paidDate: "04/09/2025",
        },
        {
            id: "4",
            orderId: "#68b963453",
            orderDate: "05/09/2025",
            deliveryDate: "10/09/2025",
            totalPayment: 250.0,
            paidAmount: 100.0,
            pendingAmount: 150.0,
            paymentStatus: "partial",
            orderForm: "self-serving",
            customerName: "Amit Patel",
            deliveryAddress: "Rajkot",
            items: [
                { name: "Gujarati Thali", quantity: 2, price: 125.0, image: "/placeholder.svg?height=60&width=60&text=Thali" },
            ],
            paidDate: "05/09/2025",
        },
        {
            id: "5",
            orderId: "#68b964563e566",
            orderDate: "06/09/2025",
            deliveryDate: "12/09/2025",
            totalPayment: 180.0,
            paidAmount: 0,
            pendingAmount: 180.0,
            paymentStatus: "unpaid",
            orderForm: "pre-packaged",
            customerName: "Priya Shah",
            deliveryAddress: "Ahmedabad",
            items: [
                { name: "Snack Box", quantity: 3, price: 60.0, image: "/placeholder.svg?height=60&width=60&text=Snacks" },
            ],
        },
    ])

    const filteredOrders = useMemo(() => {
        let filtered = orders

        // Filter by status
        if (statusFilter === "today") {
            const today = new Date().toLocaleDateString("en-GB")
            filtered = filtered.filter((order) => order.orderDate === today)
        } else if (statusFilter === "pending") {
            filtered = filtered.filter((order) => order.paymentStatus === "partial")
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

    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 border-green-500 text-green-800"
            case "unpaid":
                return "bg-red-100 border-red-500  text-red-800"
            case "partial":
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
        const today = new Date().toLocaleDateString("en-GB")
        return {
            today: orders.filter((order) => order.orderDate === today).length,
            pending: orders.filter((order) => order.paymentStatus === "partial").length,
            unpaid: orders.filter((order) => order.paymentStatus === "unpaid").length,
            paid: orders.filter((order) => order.paymentStatus === "paid").length,
        }
    }

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
                                                {filteredOrders.map((order, index) => (
                                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
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
                                                                onClick={() => handleViewOrder(order.id)}
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
                                            Showing <span className="font-medium">1</span> to{" "}
                                            <span className="font-medium">{filteredOrders.length}</span> of{" "}
                                            <span className="font-medium">{filteredOrders.length}</span> results
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                                disabled
                                            >
                                                Previous
                                            </button>
                                            <button className="px-3 py-2 text-sm bg-orange-500 text-white rounded-lg">1</button>
                                            <button
                                                className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                                disabled
                                            >
                                                Next
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
