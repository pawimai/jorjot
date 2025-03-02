"use client";
import { useEffect, useState } from "react";
import Popup from "../component/Popup";
import WalletPopup from "../component/WalletPopup";

import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";

export function Pocket_book() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopuppocketOpen, setIsPopuppocketOpen] = useState(false);
    const [remain, setRemain] = useState("");
    const [income, setIncome] = useState("");
    const [expense, setExpense] = useState("");

    useEffect(() => { fetchBalance(); }, []);

    useEffect(() => { fetchincomeToday(); }, []);

    useEffect(() => { fetchexpenseToday(); }, []);

    const fetchBalance = async () => {
        try {
            await axios.get(config.api_path + "/transactions/balance",
                {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        setRemain(res.data.balance);
                    }
                });
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

    const fetchincomeToday = async () => {
        try {
            await axios.get(config.api_path + "/transactions/today",
                {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        setIncome(res.data.incomeToday);
                    }
                });
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

    const fetchexpenseToday = async () => {
        try {
            await axios.get(config.api_path + "/transactions/today",
                {
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                }).then(res => {
                    if (res.status === 200) {
                        setExpense(res.data.expenseToday);
                    }
                });
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
        <>
            <div className="p-4 bg-[#FAF9F6] flex flex-col gap-4 items-center mx-auto pb-[13vh] overflow-y-auto max-h-[calc(100vh-80px)]">
                {/* ยอดคงเหลือ */}
                <div className="bg-[#F6F4EC] rounded-[30px] p-4 pl-6 border border-[#4C3228]/[12%] w-full max-w-md shadow-sm">
                    <div className="text-[#342A0F] font-bold text-sm">ยอดคงเหลือ</div>
                    <div className="text-xl font-bold text-[#342A0F]"> {remain} <span className="text-sm font-normal">บาท</span></div>
                </div>

                {/* รายรับ/รายจ่ายวันนี้ */}
                <div className="flex items-center w-full text-xs max-w-md bg-[#F6F4EC] rounded-[20px] p-3 border border-[#4C3228]/[12%] justify-between shadow-sm">
                    <div className="text-center w-1/2 border-r border-[#4C3228]/[12%]">
                        <div className="text-[#342A0F]">รายรับวันนี้</div>
                        <div className="text-[#07BE3E] font-bold">{income}</div>
                    </div>
                    <div className="text-center w-1/2">
                        <div className="text-[#342A0F]">รายจ่ายวันนี้</div>
                        <div className="text-[#FF0000] font-bold">{expense}</div>
                    </div>
                </div>
                {/* ธุรกรรม */}
                <div className="relative w-full max-w-md bg-[#F6F4EC] rounded-[20px] p-4 pb-8 border border-[#4C3228]/[12%] shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-[#342A0F] font-bold">ธุรกรรม</div>
                        <div className="text-xs text-[#342A0F] font-normal">ทั้งหมด <span>&gt;</span></div>
                    </div>

                    {/* รายการ */}
                    <div className="flex flex-col gap-3">
                        {/* รายการล่าสุด */}
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 flex items-center justify-center bg-[#FFF1AC] border border-[#4C3228]/[12%] rounded-[5px]">
                                <PaymentsIcon className="text-[#FFDC2D] w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <div className="py-1 text-xs text-normal text-[#342A0F] font-bold">อาหาร</div>
                                <div className="px-2 py-0.5 w-fit rounded-full text-xs text-white text-center border border-[#FF8F3F] bg-[#FF8F3F]">ข้าวผัด</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-[#FF0000] font-bold">฿100.00</div>
                                <div className="text-xs text-[#342A0F] font-normal">8 มี.ค 2568</div>
                            </div>
                        </div>

                        {/* รายการล่าสุด */}
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 flex items-center justify-center bg-[#C0E0FF] border border-[#4C3228]/[12%] rounded-[5px]">
                                <SavingsIcon className="text-[#5CA3E8] w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <div className="py-1 text-xs text-normal text-[#342A0F] font-bold">อาหาร</div>
                                <div className="px-2 py-0.5 w-fit rounded-full text-xs text-white text-center border border-[#FF8F3F] bg-[#FF8F3F]">ข้าวผัด</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-[#FF0000] font-bold">฿100.00</div>
                                <div className="text-xs text-[#342A0F] font-normal">8 มี.ค 2568</div>
                            </div>
                        </div>

                        {/* รายการล่าสุด */}
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 flex items-center justify-center bg-[#CBEEBA] border border-[#4C3228]/[12%] rounded-[5px]">
                                <AccountBalanceRoundedIcon className="text-[#78C456] w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <div className="p-1 text-xs text-normal text-[#342A0F] font-bold">อาหาร</div>
                                <div className="px-2 py-0.5 w-fit rounded-full text-xs text-white text-center border border-[#FF8F3F] bg-[#FF8F3F]">ข้าวผัด</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-[#FF0000] font-bold">฿100.00</div>
                                <div className="text-xs text-[#342A0F] font-normal">8 มี.ค 2568</div>
                            </div>
                        </div>
                    </div>

                    {/* ปุ่มเพิ่ม */}
                    <button className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 flex items-center justify-center"
                        onClick={() => setIsPopupOpen(true)}>
                        <AddCircleIcon className="text-[#4C3228] w-14 h-14 rounded-full" />
                    </button>
                </div>


                {/* Popup บันทึก */}
                <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

                {/* กระเป๋า */}
                <div className="w-full max-w-md bg-[#F6F4EC] rounded-[20px] p-4 border border-[#4C3228]/[12%] shadow-sm mt-5">
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-[#342A0F] font-bold">กระเป๋า</div>
                        {/* ปุ่มกระเป๋าทั้งหมด */}
                        <button className="text-xs text-[#342A0F] font-normal" onClick={() => setIsPopuppocketOpen(true)} >ทั้งหมด <span>&gt;</span></button>
                        {/* Popup กระเป๋าทั้งหมด */}
                        <WalletPopup isOpen={isPopuppocketOpen} onClose={() => setIsPopuppocketOpen(false)} />


                    </div>

                    {/* กระเป๋า */}
                    <div className="flex flex-wrap gap-4 mt-2 p-2 justify-start">
                        {/*กระเป๋าเงินสด */}
                        <div className="p-3 min-w-[100px] rounded-[10px] border border-[#FFDC2D] text-center text-xs font-medium transition flex flex-col items-center gap-1 bg-[#FBF7E1] ">
                            <div className="w-11 h-11 flex items-center justify-center bg-[#FFF1AC]  rounded-[5px]">
                                <PaymentsIcon className="text-[#FFDC2D] w-8 h-8" />
                            </div>
                            <div className="text-[#342A0F]">เงินสด</div>
                        </div>
                        {/*กระเป๋าบัญชีธนาคาร */}
                        <div className="p-3 min-w-[100px] rounded-[10px] border border-[#78C456] text-center text-xs font-medium transition flex flex-col items-center gap-1 bg-[#EEF6EC] ">
                            <div className="w-11 h-11 flex items-center justify-center bg-[#CBEEBA] rounded-[5px]">
                                <AccountBalanceRoundedIcon className="text-[#78C456] w-8 h-8" />
                            </div>
                            <div className="text-[#342A0F]">บัญชีธนาคาร</div>
                        </div>
                        {/*กระเป๋าบัตรเครดิต */}
                        <div className="p-3 min-w-[100px] rounded-[10px] border border-[#DA6A6A] text-center text-xs font-medium transition flex flex-col items-center gap-1 bg-[#F8F0F2] ">
                            <div className="w-11 h-11 flex items-center justify-center bg-[#FFC6C6] rounded-[5px]">
                                <CreditCardRoundedIcon className="text-[#DA6A6A] w-8 h-8" />
                            </div>
                            <div className="text-[#342A0F]">บัตรเครดิต</div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}