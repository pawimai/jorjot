"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Level() {
    const router = useRouter();

    // ฟังก์ชันย้อนกลับ
    const handleBack = () => {
        if (window.history.length > 1) {
            router.back(); // กลับไปหน้าก่อนหน้า
        } else {
            router.push("/"); // ถ้าไม่มีหน้าก่อนหน้า ให้ไปหน้าแรก
        }
    };


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
                <div className="flex flex-col gap-4 text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63] border-2 border-opacity-61 rounded-[30px] text-center mt-3 w-[90vw] sm:w-[90vw] md:max-w-[60vw] h-auto p-4">
                    {/* เลเวลลิง */}
                    <p className="text-[1rem] md:text-[1.2rem] font-bold">ระดับต่างๆ</p>

                    {[
                        { src: "/jorL1.jpg", title: "เบบี้ลิงจ๋อ", desc: "ระดับเริ่มต้น" },
                        { src: "/jorL2.jpg", title: "ลิงจ๋อหัดเดิน (ระดับ 2)", desc: "เก็บเงิน 3 เดือนเพื่อเลื่อนขั้นเป็นลิงจ๋อหัดเดิน" },
                        { src: "/jorL3.jpg", title: "ลิงจ๋อวัยแรกรุ่น (ระดับ 3)", desc: "เก็บเงิน 6 เดือนเพื่อเลื่อนขั้นเป็นลิงจ๋อวัยแรกรุ่น" },
                        { src: "/jorL4.jpg", title: "ลิงจ๋อติดแกลม (ระดับ 4)", desc: "เก็บเงิน 9 เดือนเพื่อเลื่อนขั้นเป็นลิงจ๋อติดแกลม" },
                        { src: "/jorL5.jpg", title: "ลิงจ๋อทองคำ (ระดับสูงสุด)", desc: "เก็บเงิน 12 เดือนเพื่อเลื่อนขั้นเป็นลิงจ๋อทองคำ" },
                    ].map((level, index) => (
                        <div key={index} className="flex items-center gap-2 ">
                            <div className="w-[50px] h-[50px]">
                                <Image
                                    src={level.src}
                                    width={50}
                                    height={50}
                                    alt="Level"
                                    className="rounded-full w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[0.8rem] md:text-[1rem] text-start font-bold">{level.title}</p>
                                <p className="text-[0.6rem] md:text-[0.9rem] text-start">{level.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-[70px] h-[70px] mt-5">
                    <Image
                        src="/kingMonkey.jpg"
                        width={70}
                        height={70}
                        alt="Level"
                        className=""
                    />
                </div>
            </div>
        </div>
    );
}
