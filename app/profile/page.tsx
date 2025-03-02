"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from '@mui/icons-material/Lock';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Profile() {
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

            <div className="flex flex-col bg-[#FAF9F6] items-center justify-center mx-auto w-full">
                <div className="flex items-center text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63]/[12%] border-2 rounded-[30px] text-center mt-5 w-[90vw] sm:w-[90vw] md:max-w-[60vw] h-[19vh] p-4 gap-4">
                    <div className="relative w-20 h-20 overflow-hidden border-[3px] border-[#FCDD45] ml-2 rounded-full bg-white flex items-center justify-center">
                        <Image
                            src="/profile1.svg" // เปลี่ยนรูปโปรไฟล์ได้
                            alt="Profile"
                            width={60} 
                            height={60} 
                            className="object-cover"
                        />
                    </div>


                    <div className="flex flex-col ml-1 items-start flex-1">
                        <p className="text-[0.8rem] md:text-[1rem] font-bold">ชื่อบัญชี</p>
                        <p className="text-[0.6rem] md:text-[0.9rem]">ระดับ เบบี้ลิงจ๋อ</p>
                        <a className="mt-2 bg-[#FCDD45] text-[#342A0F] text-[0.7rem] font-bold w-[90%] h-[4vh] rounded-[30px] flex items-center justify-center"
                            href="/profile/editProfile" >
                            แก้ไขโปรไฟล์ของคุณ
                        </a>
                    </div>
                </div>
                <a
                    href="/profile/changePassword"
                    className="flex items-center text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63]/[12%] border-2 rounded-[30px] text-center mt-5 w-[90vw] sm:w-[90vw] md:max-w-[60vw] h-[7vh] p-4 gap-4">
                    <LockIcon className="ml-2" />
                    <p className="text-[0.9rem] md:text-[1rem] font-bold">เปลี่ยนรหัสผ่าน</p>
                </a>
                <a
                    href="/profile/aboutUs"
                    className="flex items-center text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63]/[12%] border-2 rounded-[30px] text-center mt-5 w-[90vw] sm:w-[90vw] md:max-w-[60vw] h-[7vh] p-4 gap-4">
                    <InfoOutlinedIcon className="ml-2" />
                    <p className="text-[0.9rem] md:text-[1rem] font-bold">เกี่ยวกับเรา</p>
                </a>
                <div className="flex items-center text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63]/[12%] border-2 rounded-[30px] text-center mt-3 w-[90vw] sm:w-[90vw] md:max-w-[60vw] h-[7vh] p-4 gap-4">
                    <LogoutOutlinedIcon className="ml-2 text-[#AB502D]" /><p className="text-[0.9rem] md:text-[1rem] font-bold" >ออกจากระบบ</p>
                </div>
            </div>
        </div>
    );
}
