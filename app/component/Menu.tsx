"use client";

import { useState } from "react";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

export default function MenuBar() {
  const [active, setActive] = useState("overview");

  const menuItems = [
    { id: "record", label: "บันทึก", icon: <EditOutlinedIcon fontSize="small" /> },
    { id: "overview", label: "ภาพรวม", icon: <InsertChartIcon fontSize="small" /> },
    { id: "forecast", label: "คาดการณ์", icon: <HourglassEmptyIcon fontSize="small" /> },
    { id: "challenge", label: "ชาเลนจ์", icon: <TrackChangesIcon fontSize="small" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#FCDD45] p-4 flex justify-between items-center rounded-t-[30px] shadow-lg">
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`flex flex-col items-center space-y-1 p-2 w-full max-w-[90px] rounded-[16px] drop-shadow-lg transition ${
            active === item.id
              ? "bg-[#4C3228] text-white shadow-md"
              : "text-black"
          }`}
          onClick={() => setActive(item.id)}
        >
          {item.icon}
          <span className="text-[0.8rem] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
