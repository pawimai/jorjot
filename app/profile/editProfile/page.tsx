"use client"

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";
import Cookies from "js-cookie";

export default function EditProfile() {
    const router = useRouter();

    // ฟังก์ชันย้อนกลับ
    const handleBack = () => {
        if (window.history.length > 1) {
            router.back(); // กลับไปหน้าก่อนหน้า
        } else {
            router.push("/"); // ถ้าไม่มีหน้าก่อนหน้า ให้ไปหน้าแรก
        }
    };

    const profileImages = [
        "/profile1.svg",
        "/profile2.svg",
        "/profile3.svg",
        "/profile4.svg",
        "/profile5.svg",
        "/profile6.svg",
        "/profile7.svg",
        "/profile8.svg",
        "/profile9.svg",
    ];

    const [newName, setnewName] = useState("");
    const [profileImage, setProfileImage] = useState("/profile1.svg");

    const changename = async (e: React.FormEvent) => {
        e.preventDefault();

        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "คุณต้องการเปลี่ยนชื่อของคุณหรือไม่?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
             confirmButtonText: 'ใช่, เปลี่ยนเลย!',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.put(config.api_path + "/auth/change-name", {
                        newName: newName
                    }, {
                        headers: {
                            Authorization: Cookies.get('token') // Use token in the Authorization header
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            const data = res.data;
                            Swal.fire({
                                icon: 'success',
                                title: 'เปลี่ยนชื่อสำเร็จ',
                                text: 'ชื่อของคุณถูกเปลี่ยนแล้ว!',
                                timer: 2000,
                                showConfirmButton: true,
                            })
                        }
                    }).catch(err => {
                        throw err.response.data
                    })

                } catch (e: unknown) {
                    let errorMessage = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ';
                    if (e instanceof Error) {
                        errorMessage = e.message;
                    } else if (typeof e === 'string') {
                        errorMessage = e;
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: errorMessage,
                    });
                }
            }
        });
    };

    const changeprofileimage = async () => {

        try {
            const token = Cookies.get('token'); // Retrieve token from cookies

            await axios.put(config.api_path + "/auth/profile", {
                profileImage
            }, {
                headers: {
                    Authorization: `${token}` // Use token in the Authorization header
                }
            }).then(res => {
                if (res.status === 200) {
                    const data = res.data;
                    console.log("Profile updated successfully:", data);
                    Swal.fire({
                        icon: 'success',
                        title: 'เปลี่ยนรูปโปรไฟล์สำเร็จ',
                        text: 'รูปโปรไฟล์ของคุณถูกเปลี่ยนแล้ว!',
                        timer: 2000,
                        showConfirmButton: true,
                    })
                }
            }).catch(err => {
                throw err.response.data
            })

        } catch (e: unknown) {
            let errorMessage = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ';
            if (e instanceof Error) {
                errorMessage = e.message;
            } else if (typeof e === 'string') {
                errorMessage = e;
            }
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: errorMessage,
            });
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await axios.get(config.api_path + "/auth/profile", {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });

            if (response.status === 200) {
                setProfileImage(response.data.profileImage); // Update state with fetched profile image
                setnewName(response.data.name);
            }
        } catch (error) {
            console.error("Error fetching profile image:", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

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
            <div className="flex bg-[#FAF9F6] flex-col items-center justify-center mx-auto w-full">
                <div className="text-[#342A0F] bg-[#F6F4EC] border-[#8D6E63]/[12%] border-2 rounded-[30px] h-auto text-center w-[90vw] sm:w-[90vw] md:max-w-[60vw] mt-5 p-6" >
                    <h2 className="text-[0.8rem] font-bold text-brown">แก้ไขโปรไฟล์</h2>

                    {/* รูปโปรไฟล์ใหญ่ */}
                    <div className="flex justify-center my-4">
                        <div className="w-24 h-24 rounded-full border-4 border-yellow-500 p-1">
                            <img src={profileImage} alt="Profile" className="w-full h-full rounded-full" />
                        </div>
                    </div>

                    {/* Swiper สำหรับเลือกรูปโปรไฟล์ */}
                    <div className="overflow-visible mx-auto w-full">
                        <Swiper slidesPerView={4.5} spaceBetween={5} className="my-4">
                            {profileImages.map((img, index) => (
                                <SwiperSlide key={index} className="relative">
                                    <button
                                        onClick={() => setProfileImage(img)}
                                        className={`w-12 h-12 rounded-full border-2 p-1 flex items-center justify-center border-yellow-500`} // กรอบสีเหลืองสำหรับทุกรูป
                                    >
                                        <img src={img} alt={`Profile ${index}`} className="w-full h-full rounded-full" />
                                        {img === profileImage && (
                                            <div className="absolute bottom-1 right-1 bg-brown text-[#4C3228] w-2 h-2 flex items-center justify-center rounded-full text-xs">
                                                <CheckCircleIcon className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <button onClick={changeprofileimage} className="w-full bg-[#FCDD45] text-[#342A0F] font-semibold py-2 mt-5 rounded-[30px] mb-3">
                        บันทึกรูปโปรไฟล์
                    </button>

                    {/* เส้นคั่น */}
                    <div className="border-t-2 border-[#8D6E63]/[30%] w-full my-5 mb-8"></div>


                    {/* เปลี่ยนชื่อบัญชี */}
                    <form className="space-y-6 md:space-y-6" onSubmit={changename}>
                        <div className="mt-4 text-left">
                            <label className="block text-brown font-bold text-[0.8rem] pb-2">เปลี่ยนชื่อบัญชี</label>
                            <input
                                type="text"
                                placeholder="ชื่อบัญชี"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] w-full py-2 px-4 text-sm"
                                required
                                value={newName}
                                onChange={(e) => setnewName(e.target.value)}
                            />
                        </div>

                        {/* ปุ่มบันทึก */}
                        <button className="w-full bg-[#FCDD45] text-[#342A0F] font-semibold py-2 mt-5 rounded-[30px]">
                            บันทึกชื่อบัญชี
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}