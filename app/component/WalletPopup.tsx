"use client";
import { motion } from "framer-motion";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Wallet {
  name: string;
  amount: number;
  color: string;
  icon: React.ReactElement; // Use React.ReactElement instead of JSX.Element
}


export default function WalletPopup({ isOpen, onClose }: PopupProps) {
  const [wallets, setWallets] = useState<Wallet[]>([
    { name: "เงินสด", amount: 0, color: "bg-[#FBF7E1] border-[#FBF7E1]", icon: <PaymentsIcon className="text-[#FFDC2D] w-4 h-4" /> },
    { name: "บัญชีธนาคาร", amount: 0, color: "bg-[#EEF6EC] border-[#EEF6EC]", icon: <AccountBalanceRoundedIcon className="text-[#78C456] w-4 h-4" /> },
    { name: "บัตรเครดิต", amount: 0, color: "bg-[#F8F0F2] border-[#F8F0F2]", icon: <CreditCardRoundedIcon className="text-[#DA6A6A] w-4 h-4" /> },
    { name: "เงินออม", amount: 0, color: "bg-[#E1F7FF] border-[#E1F7FF]", icon: <SavingsIcon className="text-[#5093D4] w-4 h-4" /> },
    { name: "เงินลงทุน", amount: 0, color: "bg-[#F9EFFF] border-[#F9EFFF]", icon: <QueryStatsRoundedIcon className="text-[#A56AF6] w-4 h-4" /> },
  ]);

  useEffect(() => {
    if (isOpen) {
      fetchWallets();
    }
  }, [isOpen]);

  const fetchWallets = async () => {
    try {
      const token = Cookies.get('token'); // Retrieve token from cookies
      const response = await axios.get(config.api_path + "/transactions/wallet", {
        headers: {
          Authorization: `${token}` // Use token in the Authorization header
        }
      });

      if (response.status === 200) {
        const data = response.data;
        const updatedWallets = wallets.map(wallet => ({
          ...wallet,
          amount: data[wallet.name] || 0
        }));
        setWallets(updatedWallets);
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถดึงข้อมูลกระเป๋าเงินได้ กรุณาลองใหม่อีกครั้ง',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-end bg-black/50 mb-20 ">
      <motion.div
        className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg"
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
        <div>
          <div className="text-sm font-bold text-[#342A0F] mb-4">กระเป๋าทั้งหมด</div>
          <div className="grid grid-cols-2 gap-4">
            {wallets.map((wallet, index) => (
              <div key={index} className={`p-2 ${wallet.color} rounded-lg shadow-md flex items-center gap-3 border text-[0.7rem]`}>
                <div className="p-2 bg-white rounded-md shadow-sm flex items-center justify-center">
                  {wallet.icon}
                </div>
                <div>
                  <p className="text-gray-700 font-medium">{wallet.name}</p>
                  <p className="text-gray-900 font-bold">฿{wallet.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
