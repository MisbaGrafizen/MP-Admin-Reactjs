import React, { useState } from 'react';
import Header from '../../Components/header/Header';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function TransectionHistory() {

    const transactions = [
        { id: '#5552311', date: '30 March 2024, 02:12 AM', name: 'Manish Pandey', location: 'Shraddhapark', status: 'Completed', amount: '₹ 500' },
        { id: '#5552312', date: '05 March 2024, 02:12 AM', name: 'Harsh Patel', location: 'Shraddhapark', status: 'Canceled', amount: '₹ 1400' },
        { id: '#5552313', date: '02 March 2024, 03:22 PM', name: 'John Doe', location: 'Mumbai', status: 'Completed', amount: '₹ 800' },
        { id: '#5552314', date: '10 April 2024, 01:45 PM', name: 'Jane Smith', location: 'Delhi', status: 'Completed', amount: '₹ 600' },
        { id: '#5552315', date: '12 April 2024, 05:32 PM', name: 'Rahul Jain', location: 'Bangalore', status: 'Canceled', amount: '₹ 300' },
        { id: '#5552316', date: '15 April 2024, 10:50 AM', name: 'Sara Ali', location: 'Hyderabad', status: 'Completed', amount: '₹ 1200' },
        { id: '#5552317', date: '17 April 2024, 10:20 AM', name: 'Sara Ali', location: 'kalawad', status: 'Cancelled', amount: '₹ 6200' },

    ];

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const currentTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


    const [value, setValue] = useState(dayjs());
    return (
        <>
            <div className="w-[99%] h-[100%] relative overflow-hidden px-[40px] py-[48px] mx-auto my-auto">
                <div className="mx-auto flex gap-[30px] h-[90vh] flex-col relative rounded-[19px] border-[1px] border-[#FEAA00]">
                    <div className="flex absolute left-[3%] top-[5%] text-[20px] font-[600]">
                        <i className="fa-solid fa-angle-up fa-rotate-270"></i>
                        <p>ORDERS TRANSACTION</p>
                    </div>

                    <div className="py-[90px] flex w-[97%] gap-[20px]">
                        <Header />
                        <div className="py-[12px] md150:h-[70vh] overflow-y-auto h-[67vh] bg-white w-[100%] rounded-[19px] relative border-[1px] my-justify-center items-center border-[#000000]">
                            <div className="w-[100%] flex flex-col gap-[15px]">
                                <div className="w-[100%] px-[13px] flex justify-between">
                                    <div className="flex border-[1.4px] gap-[10px] items-center px-[10px] h-[35px] w-[250px] border-[#00984B] rounded-[6px]">
                                        <i className="fa-solid fa-magnifying-glass text-[#00984B]"></i>
                                        <input type="text" placeholder="Search" className="w-[100%] placeholder-shown:text-[#b0abab] outline-none rounded-[6px]" />
                                    </div>
                                    <div className="flex border-[1.4px] gap-[10px] items-center px-[10px] h-[35px] w-[160px] border-[#00984B] rounded-[6px]">
                                  
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            
                                                <DatePicker
                              
                                                    value={value}
                                                    onChange={(newValue) => setValue(newValue)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className="w-[100%] flex flex-col">
                                    <div className="bg-[#FEAA00] border-t-[1px] border-b-[1px] border-[#000] border-dashed flex font-[600] text-[18px] text-[#fff] justify-between px-[19px] py-[7px]">
                                        <p className="w-[15%]">Order id</p>
                                        <p className="w-[24%]">Date</p>
                                        <p className="w-[23%]">Customer Name</p>
                                        <p className="w-[18%]">Location</p>
                                        <p className="w-[13%]">Status</p>
                                        <p className="w-[10%]">Amount</p>
                                    </div>

                                    {currentTransactions.map((transaction) => (
                                        <div key={transaction.id} className="border-b-[1px] border-[#FEAA00] flex font-[600] text-[16px] text-[#000] justify-between px-[19px] py-[10px]">
                                            <p className="w-[15%]">{transaction.id}</p>
                                            <p className="w-[24%]">{transaction.date}</p>
                                            <p className="w-[23%]">{transaction.name}</p>
                                            <p className="w-[18%]">{transaction.location}</p>
                                            <p className={`font-[600] w-[13%] ${transaction.status === 'Completed' ? 'text-[#00984B]' : 'text-[#ff2f2f]'}`}>
                                                {transaction.status}
                                            </p>
                                            <p className="w-[10%]">{transaction.amount}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between w-[100%] px-[20px] absolute bottom-2">
                                    <div className="text-[18px] text-[#006198]">
                                        <p>Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, transactions.length)} of {transactions.length} entries</p>
                                    </div>

                                    <div className="flex gap-[10px]">
                                        <button onClick={() => handlePageChange(currentPage - 1)}>
                                            <i className="fa-solid fa-angle-up fa-rotate-270"></i>
                                        </button>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`w-[30px] h-[30px] rounded-[5px] flex justify-center items-center text-[16px] ${currentPage === index + 1 ? 'bg-[#00984B] text-[#fff]' : 'border-[1px] border-[#000]'}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button onClick={() => handlePageChange(currentPage + 1)}>
                                            <i className="fa-solid fa-angle-up fa-rotate-90"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
