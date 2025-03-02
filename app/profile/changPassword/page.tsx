"use client"

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ChangePassword() {
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
        <>
            <nav className="flex items-end justify-between h-[14vh] bg-[#4C3228] rounded-b-[30px] pb-4 px-6">
                <button
                    onClick={handleBack}
                    className="flex items-center justify-center w-8 h-8 bg-[#FCDD45] rounded-full shadow-md"
                >
                    <ArrowBackIcon fontSize="medium" className="text-[#4C3228]" />
                </button>
            </nav>

            <div className="flex flex-col items-center justify-center mx-auto w-full">
                <div className="text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63] border-2 border-opacity-61 rounded-[30px] h-auto text-center w-[90vw] sm:w-[90vw] md:max-w-[60vw] mt-5 p-6">
                    <h2 className="font-bold text-md mb-6">ตั้งค่ารหัสผ่านใหม่</h2>
                    <form className="space-y-4">
                        <div className="flex flex-col text-left">
                            <label htmlFor="current-password" className="text-sm font-medium text-[#342A0F] mb-1">
                                รหัสผ่านปัจจุบัน
                            </label>
                            <input
                                type="text"
                                id="current-password"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] w-full py-2 px-4 text-sm"
                                placeholder="รหัสผ่านปัจจุบัน"
                                required
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <label htmlFor="new-password" className="text-sm font-medium text-[#342A0F] mb-1">
                                รหัสผ่านใหม่
                            </label>
                            <input
                                type="text"
                                id="new-password"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] w-full py-2 px-4 text-sm"
                                placeholder="รหัสผ่านใหม่"
                                required
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <label htmlFor="confirm-password" className="text-sm font-medium text-[#342A0F] mb-1">
                                ยืนยันรหัสผ่านใหม่
                            </label>
                            <input
                                type="text"
                                id="confirm-password"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] mb-5 w-full py-2 px-4 text-sm"
                                placeholder="ยืนยันรหัสผ่านใหม่"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-[#513F0B] bg-[#FCDD45] font-bold rounded-[30px] text-sm px-5 py-3"
                        >
                            บันทึก
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}