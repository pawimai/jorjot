"use client";
import { motion } from "framer-motion";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletPopup({ isOpen, onClose }: PopupProps) {
  if (!isOpen) return null;

  const wallets = [
    { name: "เงินสด", amount: "฿50,000", color: "bg-[#FBF7E1] border-[#FBF7E1]", icon: <PaymentsIcon className="text-[#FFDC2D] w-6 h-6" /> },
    { name: "บัญชีธนาคาร", amount: "฿80,000", color: "bg-[#EEF6EC] border-[#EEF6EC]", icon: <AccountBalanceRoundedIcon className="text-[#78C456] w-6 h-6" /> },
    { name: "บัตรเครดิต", amount: "฿20,000", color: "bg-[#F8F0F2] border-[#F8F0F2]", icon: <CreditCardRoundedIcon className="text-[#DA6A6A] w-6 h-6" /> },
    { name: "เงินออม", amount: "฿20,000", color: "bg-[#E1F7FF] border-[#E1F7FF]", icon: <SavingsIcon className="text-[#5093D4] w-6 h-6" /> },
    { name: "เงินลงทุน", amount: "฿30,000", color: "bg-[#F9EFFF] border-[#F9EFFF]", icon: <QueryStatsRoundedIcon className="text-[#A56AF6] w-6 h-6" /> },
  ];

  return (
    <div className="fixed inset-0 flex justify-center items-end bg-black/50">
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
              <div key={index} className={`p-4 ${wallet.color} rounded-lg shadow-md flex items-center gap-3 border`}>
                <div className="p-3 bg-white rounded-md shadow-sm flex items-center justify-center">
                  {wallet.icon}
                </div>
                <div>
                  <p className="text-gray-700 font-medium">{wallet.name}</p>
                  <p className="text-gray-900 font-bold">{wallet.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
