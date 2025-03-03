"use client"

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from "sweetalert2";
import Link from "next/link";

interface Transaction {
    transaction_type: string;
    amount: number;
    category: string;
    wallet: string;
    date: string;
    createdAt: string;
}

export default function HistoryPage() {
    const router = useRouter();
    const [wallet, setWallet] = useState<Transaction[]>([]);

    // ฟังก์ชันย้อนกลับ
    const handleBack = () => {
        if (window.history.length > 1) {
            router.back(); // กลับไปหน้าก่อนหน้า
        } else {
            router.push("/"); // ถ้าไม่มีหน้าก่อนหน้า ให้ไปหน้าแรก
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios.get(config.api_path + "/transactions",
                {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then(res => {
                    setWallet(res.data.data)
                }).catch(err => {
                    throw err;
                })
        } catch (e: unknown) {
            let errorMessage = 'An unknown error occurred';
            if (e instanceof Error) {
                errorMessage = e.message;
            } else if (typeof e === 'string') {
                errorMessage = e;
            }
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred',
                text: errorMessage,
            });

        }
    }

    return (
        <div className="bg-[#FAF9F6] h-screen">
            <nav className="flex items-end justify-between h-[14vh] bg-[#4C3228] rounded-b-[30px] pb-4 px-6">
                <button
                    onClick={handleBack}
                    className="flex items-center justify-center w-8 h-8 bg-[#FCDD45] rounded-full shadow-md"
                >
                    <ArrowBackIcon fontSize="medium" className="text-[#4C3228]" />
                </button>
            </nav>

            <div className="flex justify-center items-center mb-5 mt-5">
                <div className="text-md text-[#342A0F] font-bold text-center">ประวัติรายการ</div>
            </div>

            <div className="relative w-full max-w-md bg-[#F6F4EC] rounded-[20px] p-4 pb-8 border border-[#4C3228]/[12%] shadow-sm">

                {/* รายการ */}
                <div className="flex flex-col gap-3">
                    {wallet && wallet.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((transaction, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className={`w-11 h-11 flex items-center justify-center ${transaction.wallet === "เงินสด" ? "bg-[#FFF1AC]" : transaction.wallet === "บัตรเครดิต" ? "bg-[#FFC6C6]" : transaction.wallet === "บัญชีธนาคาร" ? "bg-[#CBEEBA]" : transaction.wallet === "เงินออม" ? "bg-[#C0E0FF]" : "bg-[#F8F0F2]"} border border-[#4C3228]/[12%] rounded-[5px]`}>
                                {transaction.wallet === "เงินสด" && <PaymentsIcon className="text-[#FFDC2D] w-8 h-8" />}
                                {transaction.wallet === "บัตรเครดิต" && <CreditCardRoundedIcon className="text-[#DA6A6A] w-8 h-8" />}
                                {transaction.wallet === "บัญชีธนาคาร" && <AccountBalanceRoundedIcon className="text-[#78C456] w-8 h-8" />}
                                {transaction.wallet === "เงินออม" && <SavingsIcon className="text-[#5CA3E8] w-8 h-8" />}
                                {transaction.wallet === "เงินลงทุน" && <QueryStatsRoundedIcon className="text-[#8A2BE2] w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                                <div className="py-1 text-xs text-normal text-[#342A0F] font-bold">{transaction.category}</div>
                            </div>
                            <div className="text-right">
                                <div className={`text-xs ${transaction.transaction_type === "รายรับ" ? "text-[#07BE3E]" : "text-[#FF0000]"} font-bold`}>฿{transaction.amount.toFixed(2)}</div>
                                <div className="text-xs text-[#342A0F] font-normal">{transaction.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
