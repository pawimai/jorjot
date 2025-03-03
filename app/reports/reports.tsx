"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MenuItem, Select } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const months = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.",
    "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
    "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];

const data = [
    { date: "01/01", expense: 100 },
    { date: "02/01", expense: 200 },
    { date: "03/01", expense: 150 },
    { date: "04/01", expense: 300 },
    { date: "04/01", expense: 300 },
    { date: "04/01", expense: 300 },
    { date: "04/01", expense: 300 },
];

export default function Reports() {
    const [dropdown, setDropdown] = useState("month");

    const [swiper, setSwiper] = useState<SwiperCore | null>(null);

    const [month, setMonth] = useState(months[0]);

    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");

    /*const fetchCategory = async () => {
        try {
            const response = await axios.get(config.api_path + "/", {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });

            if (response.status === 200) {
                setProfileImage(response.data.profileImage); // Update state with fetched profile image
                setName(response.data.name);
                setLevel(response.data.level);
            }
        } catch (error) {
            console.error("Error fetching profile image:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);*/


    return ( 
        <div className="mx-auto pb-[13vh] overflow-y-auto max-h-[calc(100vh-80px)] bg-[#FAF9F6]">
            {/* Dropdown + Summary */}
            {/* <div className="flex justify-between items-center p-3 text-[#342A0F]">
                <Select
                    value={dropdown}
                    onChange={(e) => setDropdown(e.target.value)}
                    className="w-[25vw] h-[4vh] text-[0.8rem] font-bold border-2 border-[#342A0F] text-[#342A0F] rounded-[50px] w-auto"
                >
                    <MenuItem value="month">เดือน</MenuItem>
                    <MenuItem value="year">ปี</MenuItem>
                    <MenuItem value="Category">หมวดหมู่</MenuItem>
                </Select>
                <div className="flex text-[0.6rem]">
                    <div className="flex justify-center items-center text-[#342A0F] font-bold h-[4vh] w-[28vw] bg-[#F6F4EC] border-[#342A0F] border rounded-tl-[30px] rounded-bl-[30px] border-r-0 p-2 text-center">
                        รายรับ <span className="text-[#AB502D]">&nbsp;0&nbsp;</span> บาท
                    </div>
                    <div className="flex justify-center items-center text-[#342A0F] font-bold h-[4vh] w-[28vw] bg-[#F6F4EC] border-[#342A0F] border rounded-tr-[30px] rounded-br-[30px] p-2 text-center"
                        style={{ borderLeft: "2px dashed #AB502D" }}>
                        รายจ่าย <span className="text-[#AB502D]">&nbsp;0&nbsp;</span> บาท
                    </div>
                </div>

            </div> */}

            {/* Swiper for Month Selection */}
            <div className="relative flex p-2 w-full text-[#342A0F] flex justify-center items-center">
                <button onClick={() => swiper?.slidePrev()}><ArrowBackIosNewOutlinedIcon /></button>
                {/* Swiper */}
                <Swiper
                    onSwiper={setSwiper} // เซ็ตค่า swiper instance ลง state
                    spaceBetween={5}
                    slidesPerView={4}
                    slidesPerGroup={4}
                    freeMode={true}
                    className="w-full h-full"
                    onSlideChange={(swiper) => setMonth(months[swiper.activeIndex])}
                >

                    {months.map((m) => (
                        <SwiperSlide key={m}>
                            <div
                                className={`text-center cursor-pointer rounded-[30px] px-4 py-2 transition ${month === m ? "bg-[#FCDD45] text-[#342A0F]" : "text-[#342A0F]"
                                    }`}
                                onClick={() => setMonth(m)}
                            >
                                {m}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button onClick={() => swiper?.slideNext()} className="rotate-180">
                    <ArrowBackIosNewOutlinedIcon />
                </button>

            </div>

            {/* Chart */}
            <div className="flex items-center justify-center w-[90vw]" >
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="expense" stroke="#000" strokeWidth={2} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <table className="w-full mt-4 border-separate border-spacing-0 border-2 border-[#4C3228] rounded-t-[30px] text-[#342A0F]">
                <thead>
                    <tr className="bg-gray-100 rounded-t-[30px]">
                        <th className="p-2 first:rounded-tl-[30px] last:rounded-tr-[30px] border-b-2 border-[#4C3228]">
                            วันที่
                        </th>
                        <th className="p-2 first:rounded-tl-[30px] last:rounded-tr-[30px] border-b-2 border-[#4C3228]">
                            จำนวนเงิน
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[100, 100, 100, 100, 100, 100, 100, 100].map((amount, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-yellow-100" : "bg-white"}>
                            <td className="text-center p-2">00/00/00</td>
                            <td className="text-center p-2">฿{amount}.00</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
