"use client";
import { motion } from "framer-motion";
import React from "react";
import WalletSelector from "./WalletSelector";
import CategorySelector from "../component/Category";
import TransactionTypeSelector from "../component/TransactionToggle";



interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-end bg-black/50">
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
        <div className="w-12 h-1 bg-gray-400 rounded-full mx-auto mb-4"/>

        {/* เลือก ว/ด/ป */}
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          <div className="text-sm p-2 font-normal text-[#342A0F]">วันที่</div>
          <select className="border py-2 px-3 rounded-full text-sm text-[#342A0F]">
            {[...Array(31)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
          <div className="text-sm p-2 font-normal text-[#342A0F]">เดือน</div>
          <select className="border py-2 px-3 rounded-full text-sm text-[#342A0F]">
            {["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค", "มิ.ย", "ก.ค", "ส.ค", "ก.ย", "ต.ค", "พ.ย", "ธ.ค"].map((m, i) => (
              <option key={i}>{m}</option>
            ))}
          </select>
          <div className="text-sm p-2 font-normal text-[#342A0F]">ปี</div>
          <select className="border py-2 px-3 rounded-full text-sm text-[#342A0F]">
            {[2566, 2567, 2568].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* รายการ */}
        <TransactionTypeSelector/>

        {/* จำนวนเงิน */}
        <div className="mt-4 mb-6">
          <div className="text-sm font-bold text-[#342A0F]">จำนวนเงิน</div>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-1"
            placeholder="฿ 0.00"
          />
        </div>

        {/* เลือกกระเป๋า */}
        <div className="mb-6">
          <WalletSelector/>
        </div>

        {/* เลือกหมวดหมู่ */}
        <div className="mb-6">
          <CategorySelector/>
        </div>

        {/* ปุ่มบันทึก */}
        <button className="w-full bg-[#FCDD45] p-3 rounded-[30px] text-sm font-bold text-[#342A0F]">บันทึก</button>
      </motion.div>
    </div>
  );
}
