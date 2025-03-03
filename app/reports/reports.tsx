"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css";
import { useState, useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { PieChart } from '@mui/x-charts/PieChart';
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const months = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
    "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
    "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

interface Transaction {
    transaction_type: string;
    amount: number;
    category: string;
    wallet: string;
    date: string;
    createdAt: string;
}

export default function Reports() {
    const [dropdown, setDropdown] = useState("month");
    const [swiper, setSwiper] = useState<SwiperCore | null>(null);
    const [month, setMonth] = useState(months[0]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categoryTotals, setCategoryTotals] = useState<{ [key: string]: number }>({});

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(config.api_path + "/transactions", {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });

            if (response.status === 200) {
                const transactions = response.data.data;
                setTransactions(transactions);
                calculateCategoryTotals(transactions, month);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred',
                text: 'ไม่สามารถดึงข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
            });
        }
    };

    const calculateCategoryTotals = (transactions: Transaction[], selectedMonth: string) => {
        const filteredTransactions = transactions.filter(transaction => transaction.date.includes(selectedMonth));
        const totals: { [key: string]: number } = {};
        filteredTransactions.forEach((transaction: Transaction) => {
            if (!totals[transaction.category]) {
                totals[transaction.category] = 0;
            }
            if (transaction.transaction_type === "รายรับ") {
                totals[transaction.category] += transaction.amount;
            } else {
                totals[transaction.category] -= transaction.amount;
            }
        });
        setCategoryTotals(totals);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        calculateCategoryTotals(transactions, month);
    }, [month, transactions]);

    const pieChartData = Object.keys(categoryTotals).map(category => ({
        label: category,
        value: Math.abs(categoryTotals[category])
    }));

    return (
        <div className="mx-auto pb-[13vh] overflow-y-auto max-h-[calc(100vh-80px)] bg-[#FAF9F6]">
            {/* Dropdown + Summary */}
            {/* <div className="flex justify-between items-center p-3 text-[#342A0F]">
                <Select
                    value={dropdown}
                    onChange={(e) => setDropdown(e.target.value)}
                    className="w-[25vw] h-[4vh] text-[0.8rem] font-bold border-2 border-[#342A0F] text-[#342A0F] rounded-[50px] w-auto"
                >
                    <MenuItem value="month">เดือน</MenuItem>
                    <MenuItem value="year">ปี</MenuItem>
                    <MenuItem value="Category">หมวดหมู่</MenuItem>
                </Select>
                <div className="flex text-[0.6rem]">
                    <div className="flex justify-center items-center text-[#342A0F] font-bold h-[4vh] w-[28vw] bg-[#F6F4EC] border-[#342A0F] border rounded-tl-[30px] rounded-bl-[30px] border-r-0 p-2 text-center">
                        รายรับ <span className="text-[#AB502D]">&nbsp;0&nbsp;</span> บาท
                    </div>
                    <div className="flex justify-center items-center text-[#342A0F] font-bold h-[4vh] w-[28vw] bg-[#F6F4EC] border-[#342A0F] border rounded-tr-[30px] rounded-br-[30px] p-2 text-center"
                        style={{ borderLeft: "2px dashed #AB502D" }}>
                        รายจ่าย <span className="text-[#AB502D]">&nbsp;0&nbsp;</span> บาท
                    </div>
                </div>
            </div> */}

            {/* Swiper for Month Selection */}
            <div className="relative flex p-2 w-full text-[#342A0F] flex justify-center items-center">
                <button onClick={() => swiper?.slidePrev()}><ArrowBackIosNewOutlinedIcon /></button>
                {/* Swiper */}
                <Swiper
                    onSwiper={setSwiper} // เซ็ตค่า swiper instance ลง state
                    spaceBetween={5}
                    slidesPerView={4}
                    slidesPerGroup={4}
                    freeMode={true}
                    className="w-full h-full"
                    onSlideChange={(swiper) => setMonth(months[swiper.activeIndex])}
                >
                    {months.map((m) => (
                        <SwiperSlide key={m}>
                            <div
                                className={`text-center cursor-pointer rounded-[30px] px-4 py-2 transition ${month === m ? "bg-[#FCDD45] text-[#342A0F]" : "text-[#342A0F]"
                                    }`}
                                onClick={() => setMonth(m)}
                            >
                                {m}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button onClick={() => swiper?.slideNext()} className="rotate-180">
                    <ArrowBackIosNewOutlinedIcon />
                </button>
            </div>

            {/* Chart */}
            <div className="flex items-center justify-center w-full">
                <PieChart
                    series={[
                        {
                            data: pieChartData,
                            innerRadius: 50,
                            outerRadius: 120,
                        },
                    ]}
                    height={250}
                    slotProps={{
                        legend: { hidden: false },
                    }}
                />
            </div>

            {/* Table */}
            <table className="w-full mt-4 border-separate border-spacing-0 border-2 border-[#4C3228] rounded-t-[30px] text-[#342A0F]">
                <thead>
                    <tr className="bg-gray-100 rounded-t-[30px]">
                        <th className="p-2 first:rounded-tl-[30px] last:rounded-tr-[30px] border-b-2 border-[#4C3228]">
                            หมวดหมู่
                        </th>
                        <th className="p-2 first:rounded-tl-[30px] last:rounded-tr-[30px] border-b-2 border-[#4C3228]">
                            จำนวนเงิน
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(categoryTotals).map((category, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-yellow-100" : "bg-white"}>
                            <td className="text-center p-2">{category}</td>
                            <td className={`text-center p-2 ${categoryTotals[category] >= 0 ? "text-[#07BE3E]" : "text-[#FF0000]"}`}>
                                ฿{Math.abs(categoryTotals[category]).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
