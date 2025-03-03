"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import axios from "axios";
import Swal from "sweetalert2";
import config from "../config";
import Cookies from "js-cookie";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  const [selectedType, setSelectedType] = useState<"รายรับ" | "รายจ่าย">("รายรับ");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<string>("ม.ค.");
  const [selectedYear, setSelectedYear] = useState<number>(2568);

  const wallets = [
    { name: "เงินสด", color: "bg-[#FBF7E1] border-[#FBF7E1]", activeColor: "bg-[#FFF1AC] border-[#FCDD45]", icon: <PaymentsIcon className="text-[#D4A017] w-6 h-6" /> },
    { name: "บัญชีธนาคาร", color: "bg-[#EEF6EC] border-[#EEF6EC]", activeColor: "bg-[#CBEEBA] border-[#78C456]", icon: <AccountBalanceRoundedIcon className="text-[#2D7A4B] w-6 h-6" /> },
    { name: "บัตรเครดิต", color: "bg-[#F8F0F2] border-[#F8F0F2]", activeColor: "bg-[#FFC6C6] border-[#F07575]", icon: <CreditCardRoundedIcon className="text-[#B22222] w-6 h-6" /> },
    { name: "เงินออม", color: "bg-[#E1F7FF] border-[#E1F7FF]", activeColor: "bg-[#C0E0FF] border-[#5CA3E8]", icon: <SavingsIcon className="text-[#1E90FF] w-6 h-6" /> },
    { name: "เงินลงทุน", color: "bg-[#F9EFFF] border-[#F9EFFF]", activeColor: "bg-[#D7BCE8] border-[#A46AF6]", icon: <QueryStatsRoundedIcon className="text-[#8A2BE2] w-6 h-6" /> },
  ];

  const categories = ["อาหาร", "ช้อปปิ้ง", "จ่ายบิล", "เดินทาง", "บันเทิง", "เที่ยว", "เงินเก็บ", "อื่นๆ"];

  const categoryColors: Record<string, { default: string; active: string }> = {
    อาหาร: { default: "border border-[#FF8F3F] text-[#FF8F3F]", active: "border border-[#FF8F3F] bg-[#FF8F3F] text-white" },
    ช้อปปิ้ง: { default: "border border-[#FFC374] text-[#FFC374]", active: "border border-[#FFC374] text-white bg-[#FFC374]" },
    จ่ายบิล: { default: "border border-green-400 text-green-400", active: "border border-green-400 text-white bg-green-400" },
    เดินทาง: { default: "border border-teal-400 text-teal-400 ", active: "border border-teal-400  text-white bg-teal-400" },
    บันเทิง: { default: "border border-indigo-400 text-indigo-400", active: "border border-indigo-400 text-white bg-indigo-400" },
    เที่ยว: { default: "border border-pink-400 text-pink-400", active: "border border-pink-400 text-white bg-pink-400" },
    เงินเก็บ: { default: "border border-purple-400 text-purple-400", active: "border border-purple-400 text-white bg-purple-400" },
    อื่นๆ: { default: "border border-sky-400 text-sky-400", active: "border border-sky-400 text-white bg-sky-400" },
  };


  const handleSubmit = async () => {
    try {

      const response = await axios.post(config.api_path + "/transactions", {
        transaction_type: selectedType,
        wallet: selectedWallet,
        category: selectedCategory,
        amount: parseFloat(amount),
        date: `${selectedDate} ${selectedMonth} ${selectedYear}`
      }, {
        headers: {
          Authorization: Cookies.get('token')
        }
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          text: 'ข้อมูลของคุณถูกบันทึกแล้ว!',
          timer: 2000,
          showConfirmButton: true,
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-end bg-black/50 mb-20 ">
      <motion.div
        className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-t-2xl p-6 shadow-lg"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 100 }}
        onDragEnd={(event, info) => {
          if (info.point.y > window.innerHeight - 100) {
            onClose();
          }
        }}
      >
        {/* แถบลากปิด */}
        <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mb-4" />

        {/* เลือก ว/ด/ป */}
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          <div className="text-sm p-2 font-normal text-[#342A0F]">วันที่</div>
          <select
            className="border py-2 px-3 rounded-full text-sm text-[#342A0F]"
            value={selectedDate}
            onChange={(e) => setSelectedDate(parseInt(e.target.value))}
          >
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="text-sm p-2 font-normal text-[#342A0F]">เดือน</div>
          <select
            className="border py-2 px-3 rounded-full text-sm text-[#342A0F]"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค", "มิ.ย", "ก.ค", "ส.ค", "ก.ย", "ต.ค", "พ.ย", "ธ.ค"].map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
          <div className="text-sm p-2 font-normal text-[#342A0F]">ปี</div>
          <select
            className="border py-2 px-3 rounded-full text-sm text-[#342A0F]"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {[2568].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* รายการ */}
        <div>
          <div className="text-sm font-bold text-[#342A0F] p-2">เลือกรายการ</div>
          <div className="flex w-full max-w-md gap-2">
            {/* ปุ่มรายรับ */}
            <button
              className={`w-1/2 p-2 rounded-[30px] text-center text-sm font-bold transition ${selectedType === "รายรับ"
                ? "bg-[#4C3228] text-[#FAF9F6]"
                : "bg-[#4C3228]/[12%] text-[#342A0F]"
                }`}
              onClick={() => setSelectedType("รายรับ")}
            >
              รายรับ
            </button>

            {/* ปุ่มรายจ่าย */}
            <button
              className={`w-1/2 p-2 rounded-[30px] text-center text-sm font-bold transition ${selectedType === "รายจ่าย"
                ? "bg-[#4C3228] text-[#FAF9F6]"
                : "bg-[#4C3228]/[12%] text-[#342A0F]"
                }`}
              onClick={() => setSelectedType("รายจ่าย")}
            >
              รายจ่าย
            </button>
          </div>
        </div>

        {/* จำนวนเงิน */}
        <div className="mt-4 mb-6">
          <div className="text-sm font-bold text-[#342A0F]">จำนวนเงิน (บาท)</div>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-1 text-md text-[#342A0F]"
            placeholder="฿ 0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* เลือกกระเป๋า */}
        <div className="mb-6">
          <div className="mt-4">
            <div className="text-sm font-bold text-[#342A0F]">เลือกกระเป๋า</div>

            <div className="scrollable flex gap-2 mt-2 p-2">
              {wallets.map((wallet) => {
                const isActive = selectedWallet === wallet.name;
                return (
                  <button
                    key={wallet.name}
                    className={`p-3 min-w-[120px] rounded-[10px] text-center text-xs font-medium transition flex flex-col items-center gap-1 
                ${isActive ? wallet.activeColor : wallet.color} border text-[#342A0F]`}
                    onClick={() => setSelectedWallet(wallet.name)}
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow">
                      {wallet.icon}
                    </div>
                    {wallet.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* เลือกหมวดหมู่ */}
        <div className="mb-6">
          <div className="mt-4">
            <div className="text-sm font-bold text-[#342A0F]">เลือกหมวดหมู่</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-full text-sm transition ${isActive ? categoryColors[category].active : categoryColors[category].default
                      }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ปุ่มบันทึก */}
        <button
          className="w-full bg-[#FCDD45] p-3 rounded-[30px] text-sm font-bold text-[#342A0F]"
          onClick={handleSubmit}
        >
          บันทึก
        </button>
      </motion.div>
    </div>
  );
}
