"use client"
import Image from "next/image";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Challenges() {

    const [level, setLevel] = useState("");
    const [levelNum, setLevelNum] = useState("");
    const [challengeStarted, setChallengeStarted] = useState(false);

    const fetchLevel = async () => {
        try {
            const response = await axios.get(config.api_path + "/auth/profile", {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });

            if (response.status === 200) {
                setLevel(response.data.level);
                setLevelNum(response.data.levelNum);
            }
        } catch (error) {
            console.error("Error fetching level:", error);
        }
    };

    useEffect(() => {
        fetchLevel();
    }, []);

    const [monthlyTarget, setTarget] = useState("");

    const monthlytarget = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(config.api_path + "/challenges", {
                monthlyTarget
            }, {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then(res => {
                if (res.status === 200) {
                    const data = res.data;
                    console.log("Challenge started!", data);

                    // Store token in cookies
                    Cookies.set('token', data.token); // Expires in 7 days

                    Swal.fire({
                        icon: 'success',
                        title: 'เริ่มชาเลนจ์!',
                        text: 'สำเร็จชาเลนจ์เพื่อเลื่อนขั้น',
                        timer: 2000,
                        showConfirmButton: true,
                    })
                    setChallengeStarted(true);
                } else {
                    console.error("สร้างชาเลนจ์ไม่สำเร็จ!");
                    Swal.fire({
                        icon: 'error',
                        title: 'สร้างชาเลนจ์ไม่สำเร็จ!',
                        text: 'error',
                        showConfirmButton: true,
                    });
                }
            })
        } catch (e) {
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

    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");

    const fetchDate = async () => {
        try {
            const response = await axios.get(config.api_path + "/challenges/date", {
                headers: {
                    Authorization: Cookies.get('token')
                }
            });

            if (response.status === 200) {
                setstartDate(response.data.startDate);
                setendDate(response.data.endDate);
            }
        } catch (error) {
            console.error("Error fetching date:", error);
        }
    };

    useEffect(() => {
        fetchDate();
        fetchChallengeStatus();
    }, []);

    const fetchChallengeStatus = async () => {
        try {
            await axios.get(config.api_path + "/challenges/status", {
                headers: {
                    Authorization: Cookies.get('token')
                }
            }).then(res => {
                if (res.data.message === "Challenge in progress") {
                    setChallengeStarted(true);
                }
            });
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
    }

    if (challengeStarted) {
        return (
            <div className="flex flex-col justify-center items-center mx-auto pb-[13vh] overflow-y-auto max-h-[calc(100vh-80px)]">
                <div className="flex flex-col text-[#342A0F] font-bold h-auto w-[85vw] sm:w-[50vw] md:max-w-[50vw] bg-[#FFF1AC] border-[#4C3228] border-2 rounded-[30px] text-center mt-8 p-5">
                    <div className="flex justify-between items-end w-full">
                        <p className="text-[0.8rem] text-left">ชาเลนจ์ 3 เดือน</p>
                        <p className="text-[0.6rem] text-right font-semibold">เก็บเงินเดือนละ 500 บาท</p>
                    </div>

                    <div className="flex flex-col justify-center items-center pb-1" >
                        <div className="flex px-3 h-[6vh] w-[95%] sm:w-[95%] md:max-w-[95%] bg-[#F6F4EC] rounded-[13px] justify-between mt-4 flex justify-center items-center">
                            <p className="text-[0.8rem]" >เมษายน</p>
                            <p className="text-[0.6rem]" >ยอดเงินคงเหลือ - ฿</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center pb-1" >
                        <div className="flex px-3 h-[6vh] w-[95%] sm:w-[95%] md:max-w-[95%] bg-[#F6F4EC] rounded-[13px] justify-between mt-4 flex justify-center items-center">
                            <p className="text-[0.8rem]" >พฤกษาคม</p>
                            <p className="text-[0.6rem]" >ยอดเงินคงเหลือ - ฿</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center" >
                        <div className="flex px-3 h-[6vh] w-[95%] sm:w-[95%] md:max-w-[95%] bg-[#F6F4EC] rounded-[13px] justify-between mt-4 flex justify-center items-center">
                            <p className="text-[0.8rem]" >มิถุนายน</p>
                            <p className="text-[0.6rem]" >ยอดเงินคงเหลือ - ฿</p>
                        </div>
                    </div>
                    <div className="w-full text-left text-[0.7rem] mt-4 ml-3">
                        <p>ระยะเวลา</p>
                        <p>{startDate} - {endDate}</p>
                    </div>

                </div>

                <div className="flex flex-col justify-center items-center mt-5 text-[#342A0F]" >
                    <p className="text-[0.8rem] mt-2 font-bold" >ระดับปัจจุบัน</p>
                    <div className="flex justify-center gap-4 items-center font-bold h-[10vh] w-[50vw] sm:w-[30vw] md:max-w-[25vw] bg-[#FFF1AC] border-[#4C3228]/[61%] border-2 rounded-[30px] text-center mt-3">
                        <Image
                            src="/babyJor.jpg"
                            width={50}
                            height={50}
                            alt="Baby Jor"
                            className="rounded-full"
                        />
                        <div>
                            <p className="text-[0.8rem]">{level}</p>
                            <p className="text-[0.6rem]">ร{levelNum}</p>
                        </div>
                    </div>

                    <a href="/challenges/level" className="text-[0.8rem] mt-5 cursor-pointer font-bold" >กดเพื่อดูระดับต่าง ๆ <KeyboardDoubleArrowRightIcon /> </a>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col justify-center items-center mx-auto pb-[13vh] overflow-y-auto max-h-[calc(100vh-80px)]">
                {/* กล่องแรก */}
                <div className="flex justify-center gap-4 items-center text-[#342A0F] font-bold h-[10vh] w-[50vw] sm:w-[30vw] md:max-w-[25vw] bg-[#FFF1AC] border-[#4C3228]/[61%] border-2 rounded-[30px] text-center mt-3">
                    <Image
                        src="/babyJor.jpg"
                        width={50}
                        height={50}
                        alt="Baby Jor"
                        className="rounded-full"
                    />
                    <div>
                        <p className="text-[0.8rem]">{level}</p>
                        <p className="text-[0.6rem]">{levelNum}</p>
                    </div>
                </div>

                {/* กล่องที่สอง */}
                <div className="flex flex-col justify-center items-center text-[#342A0F] font-bold h-[37vh] w-[85vw] sm:w-[50vw] md:max-w-[50vw] bg-[#F6F4EC] border-[#4C3228] border-2 border-opacity-61 rounded-[30px] text-center mt-3">
                    <p className="text-[0.8rem]">
                        ชาเลนจ์ 3 เดือน สำหรับเบบี้ลิงจ๋อ
                    </p>

                    {/* กล่องสีเหลือง */}
                    <div className="flex flex-col px-3 h-[20vh] w-[90%] sm:w-[90%] md:max-w-[90%] bg-[#FFF1AC] rounded-[13px] text-center text-[0.8rem] mt-4 flex justify-center items-center">
                        <form className="pb-2 w-full" onSubmit={monthlytarget}>
                            <label htmlFor="password" className="block mb-2 font-bold text-[#342A0F] text-left">
                                เก็บเงินเดือนละ (บาท)
                            </label>
                            <input
                                type="number"
                                name="password"
                                id="password"
                                placeholder="500"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] block w-full py-1 px-4 text-[11px]"
                                required
                                value={monthlyTarget}
                                onChange={(e) => setTarget(e.target.value)}
                            />

                            <div className="w-full text-left">
                                <p>ระยะเวลา</p>
                                <p>{startDate} - {endDate}</p>
                            </div>

                            {/* ปุ่มสีเหลือง */}
                            <button className="mt-4 bg-[#FCDD45] text-[#342A0F] text-[0.8rem] font-bold py-2 px-4 w-[90%] sm:w-[90%] md:max-w-[90%] rounded-[30px]"
                                type="submit"
                                onClick={monthlytarget}>
                                เริ่มชาเลนจ์
                            </button>
                        </form>
                    </div>

                </div>

                <p className="text-[0.8rem] mt-2 font-bold text-[#342A0F]" >สำเร็จชาเลนจ์เพื่อเลื่อนขั้นเป็น</p>

                {/* กล่องที่สาม */}
                <div className="flex justify-center gap-4 items-center text-[#342A0F] font-bold h-[10vh] w-[50vw] sm:w-[30vw] md:max-w-[25vw] bg-[#F6F4EC] border-[#8D6E63]/[61%] border-2 rounded-[30px] text-center mt-2">
                    <Image
                        src="/jorL2.jpg"
                        width={50}
                        height={50}
                        alt="Baby Jor"
                        className="rounded-full"
                    />
                    <div>
                        <p className="text-[0.8rem]">ลิงจ๋อหัดเดิน</p>
                        <p className="text-[0.6rem] text-left">ระดับ 2</p>
                    </div>
                </div>

                <a href="/challenges/level" className="text-[0.8rem] mt-3 cursor-pointer font-bold text-[#342A0F]" >กดเพื่อดูระดับต่าง ๆ <KeyboardDoubleArrowRightIcon /> </a>

            </div>

        );
    }
}