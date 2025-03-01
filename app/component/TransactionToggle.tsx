import { useState } from "react";

export default function TransactionTypeSelector() {
  const [selectedType, setSelectedType] = useState<"income" | "expense">("income");

  return (
    <div>
      <div className="text-sm font-bold text-[#342A0F] p-2">เลือกรายการ</div>
      <div className="flex w-full max-w-md gap-2">
        {/* ปุ่มรายรับ */}
        <button
          className={`w-1/2 p-2 rounded-[30px] text-center text-sm font-bold transition ${
            selectedType === "income"
              ? "bg-[#4C3228] text-[#FAF9F6]"
              : "bg-[#4C3228]/[12%] text-[#342A0F]"
          }`}
          onClick={() => setSelectedType("income")}
        >
          รายรับ
        </button>

        {/* ปุ่มรายจ่าย */}
        <button
          className={`w-1/2 p-2 rounded-[30px] text-center text-sm font-bold transition ${
            selectedType === "expense"
              ? "bg-[#4C3228] text-[#FAF9F6]"
              : "bg-[#4C3228]/[12%] text-[#342A0F]"
          }`}
          onClick={() => setSelectedType("expense")}
        >
          รายจ่าย
        </button>
      </div>
    </div>
  );
}
