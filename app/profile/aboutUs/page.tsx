"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AboutUs() {
    const router = useRouter();

    // ฟังก์ชันย้อนกลับ
    const handleBack = () => {
        if (window.history.length > 1) {
            router.back(); // กลับไปหน้าก่อนหน้า
        } else {
            router.push("/"); // ถ้าไม่มีหน้าก่อนหน้า ให้ไปหน้าแรก
        }
    };
    
    const teamMembers = [
        { name: "มนพร พรหมมงคลกุล", id: "66011456", image: "/P1.png" },
        { name: "ณัฐณิชา ตั่นเล่ง", id: "66010233", image: "/P2.png" },
        { name: "ณัฐรัตน์ เรืองปิยะเสร", id: "66010262", image: "/P3.png" },
        { name: "ปวิชญา อ่อนอำไพ", id: "66010474", image: "/P4.png" },
        { name: "วนัสชาพร พลพัฒน์", id: "66010727", image: "/P5.png" }
    ];

    return (
        <div className="bg-[#FAF9F6] h-screen">
            <nav className="flex items-end justify-between h-[14vh] bg-[#4C3228] rounded-b-[30px] pb-4 px-6">
                <button
                    onClick={handleBack}
                    className="flex items-center justify-center w-8 h-8 bg-[#FCDD45] rounded-full shadow-md"
                >
                    <ArrowBackIcon fontSize="medium" className="text-[#4C3228]" />
                </button>
            </nav>
            <div className="flex flex-col items-center justify-center mx-auto w-full">
                <div className="text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63]/[12%] border-2 rounded-[30px] text-center w-[90vw] sm:w-[90vw] md:max-w-[60vw] h-auto mt-5 p-4">
                    <h2 className="font-bold text-xl mt-2">เกี่ยวกับเรา</h2>
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center pl-5 gap-5 text-[#342A0F] w-full h-[12vh]">
                            <div className="relative w-12 h-12 overflow-hidden rounded-full bg-white">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-[0.8rem] md:text-[1rem] font-bold text-left">{member.name}<br/>{member.id}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}