import { useState } from "react";
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import PaymentsIcon from '@mui/icons-material/Payments';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';


const wallets = [
  { name: "เงินสด", color: "bg-[#FBF7E1] border-[#FBF7E1]", activeColor: "bg-[#FFF1AC] border-[#FCDD45]", icon: <PaymentsIcon className="text-[#D4A017] w-6 h-6" /> },
  { name: "บัญชีธนาคาร", color: "bg-[#EEF6EC] border-[#EEF6EC]", activeColor: "bg-[#CBEEBA] border-[#78C456]", icon: <AccountBalanceRoundedIcon className="text-[#2D7A4B] w-6 h-6" /> },
  { name: "บัตรเครดิต", color: "bg-[#F8F0F2] border-[#F8F0F2]", activeColor: "bg-[#FFC6C6] border-[#F07575]", icon: <CreditCardRoundedIcon className="text-[#B22222] w-6 h-6" /> },
  { name: "เงินออม", color: "bg-[#E1F7FF] border-[#E1F7FF]", activeColor: "bg-[#C0E0FF] border-[#5CA3E8]", icon: <SavingsIcon className="text-[#1E90FF] w-6 h-6" /> },
  { name: "เงินลงทุน", color: "bg-[#F9EFFF] border-[#F9EFFF]", activeColor: "bg-[#D7BCE8] border-[#A46AF6]", icon: <QueryStatsRoundedIcon className="text-[#8A2BE2] w-6 h-6" /> },
];

export default function WalletSelector() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  return (
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
  );
}
