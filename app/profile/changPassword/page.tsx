"use client"

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";
import Cookies from "js-cookie";


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

    const [currentPassword, setcurrentPassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");

    const changepassword = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = Cookies.get('token'); // Retrieve token from cookies

            await axios.put(config.api_path + "/auth/change-password", {
                currentPassword,
                newpassword,
                confirmNewPassword
            }, {
                headers: {
                    Authorization: `${token}` // Use token in the Authorization header
                }
            }).then(res => {
                if (res.status === 200) {
                    const data = res.data;
                    console.log("Password updated successfully:", data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Password updated successfully',
                        text: 'Your password has been changed!',
                        timer: 2000,
                        showConfirmButton: true,
                    }).then(() => {
                        router.push('/');
                    });
                }
            }).catch(err => {
                throw err.response.data
            })

        } catch (e: unknown) {
            let errorMessage = 'An unknown error occurred';
            if (e instanceof Error) {
                errorMessage = e.message;
            } else if (typeof e === 'string') {
                errorMessage = e;
            }
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred',
                text: errorMessage,
            });
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
                <div className="text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63]/[12%] border-2 rounded-[30px] h-auto text-center w-[90vw] sm:w-[90vw] md:max-w-[60vw] mt-5 p-6">
                    <h2 className="font-bold text-md mb-6">ตั้งค่ารหัสผ่านใหม่</h2>
                    <form className="space-y-4" onSubmit={changepassword}>
                        <div className="flex flex-col text-left">
                            <label htmlFor="current-password" className="text-sm font-medium text-[#342A0F] mb-1">
                                รหัสผ่านปัจจุบัน
                            </label>
                            <input
                                type="password"
                                id="current-password"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] w-full py-2 px-4 text-sm"
                                placeholder="รหัสผ่านปัจจุบัน"
                                required
                                value={currentPassword}
                                onChange={(e) => setcurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <label htmlFor="new-password" className="text-sm font-medium text-[#342A0F] mb-1">
                                รหัสผ่านใหม่
                            </label>
                            <input
                                type="password"
                                id="new-password"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] w-full py-2 px-4 text-sm"
                                placeholder="รหัสผ่านใหม่"
                                required
                                value={newpassword}
                                onChange={(e) => setnewpassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <label htmlFor="confirm-password" className="text-sm font-medium text-[#342A0F] mb-1">
                                ยืนยันรหัสผ่านใหม่
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] mb-5 w-full py-2 px-4 text-sm"
                                placeholder="ยืนยันรหัสผ่านใหม่"
                                required
                                value={confirmNewPassword}
                                onChange={(e) => setconfirmNewPassword(e.target.value)}
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
        </div>
    );
}