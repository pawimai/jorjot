import { useState } from "react";

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

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="mt-4">
      <div className="text-sm font-bold text-[#342A0F]">เลือกหมวดหมู่</div>
      <div className="flex flex-wrap gap-2 mt-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              className={`px-3 py-1 rounded-full text-sm transition ${
                isActive ? categoryColors[category].active : categoryColors[category].default
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
