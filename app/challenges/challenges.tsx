"use client"
import Image from "next/image";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
export default function Challenges() {
    return (
        // <div className="flex flex-col justify-center items-center mx-auto pb-[13vh] overflow-y-auto max-h-[calc(100vh-80px)]">
        //     {/* กล่องแรก */}
        //     <div className="flex justify-center gap-4 items-center text-[#342A0F] font-bold h-[10vh] w-[50vw] sm:w-[30vw] md:max-w-[25vw] bg-[#FFF1AC] border-[#4C3228]/[61%] border-2 rounded-[30px] text-center mt-3">
        //         <Image
        //             src="/babyJor.jpg"
        //             width={50}
        //             height={50}
        //             alt="Baby Jor"
        //             className="rounded-full"
        //         />
        //         <div>
        //             <p className="text-[0.8rem]">เบบี้ลิงจ๋อ</p>
        //             <p className="text-[0.6rem]">ระดับเริ่มต้น</p>
        //         </div>
        //     </div>

        //     {/* กล่องที่สอง */}
        //     <div className="flex flex-col justify-center items-center text-[#342A0F] font-bold h-[37vh] w-[85vw] sm:w-[50vw] md:max-w-[50vw] bg-[#F6F4EC] border-[#4C3228] border-2 rounded-[30px] text-center mt-3">
        //         <p className="text-[0.8rem]">
        //             ชาเลนจ์ 3 เดือน สำหรับเบบี้ลิงจ๋อ
        //         </p>

        //         {/* กล่องสีเหลือง */}
        //         <div className="flex flex-col px-3 h-[20vh] w-[90%] sm:w-[90%] md:max-w-[90%] bg-[#FFF1AC] rounded-[13px] text-center text-[0.8rem] mt-4 flex justify-center items-center">
        //             <form className="pb-2 w-full">
        //                 <label htmlFor="password" className="block mb-2 font-bold text-[#342A0F] text-left">
        //                     จำนวนเงิน
        //                 </label>
        //                 <input
        //                     type="password"
        //                     name="password"
        //                     id="password"
        //                     placeholder="฿10,000.00"
        //                     className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] block w-full py-1 px-4 text-[11px]"
        //                     required
        //                 />
        //             </form>

        //             <div className="w-full text-left">
        //                 <p>ระยะเวลา</p>
        //                 <p>00/00/00 - 00/00/00</p>
        //             </div>
        //         </div>


        //         {/* ปุ่มสีเหลือง */}
        //         <button className="mt-4 bg-[#FCDD45] text-[#342A0F] text-[0.8rem] font-bold py-2 px-4 w-[90%] sm:w-[90%] md:max-w-[90%] rounded-[30px]">
        //             เริ่มชาเลนจ์
        //         </button>
        //     </div>

        //     <p className="text-[0.8rem] mt-2 font-bold" >สำเร็จชาเลนจ์เพื่อเลื่อนขั้นเป็น</p>

        //     {/* กล่องที่สาม */}
        //     <div className="flex justify-center gap-4 items-center text-[#342A0F] font-bold h-[10vh] w-[50vw] sm:w-[30vw] md:max-w-[25vw] bg-[#F6F4EC] border-[#8D6E63]/[61%] border-2 rounded-[30px] text-center mt-2">
        //         <Image
        //             src="/jorL2.jpg"
        //             width={50}
        //             height={50}
        //             alt="Baby Jor"
        //             className="rounded-full"
        //         />
        //         <div>
        //             <p className="text-[0.8rem]">ลิงจ๋อหัดเดิน</p>
        //             <p className="text-[0.6rem] text-left">ระดับที่ 2</p>
        //         </div>
        //     </div>

        //     <a href="/challenges/level" className="text-[0.8rem] mt-3 cursor-pointer font-bold" >กดเพื่อดูระดับต่าง ๆ <KeyboardDoubleArrowRightIcon /> </a>

        // </div>

        <div className="flex flex-col justify-center items-center mx-auto pb-[13vh] overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="flex flex-col text-[#342A0F] font-bold h-auto w-[85vw] sm:w-[50vw] md:max-w-[50vw] bg-[#FFF1AC] border-[#4C3228] border-2 rounded-[30px] text-center mt-8 p-5">
                <div className="flex justify-between items-end w-full">
                    <p className="text-[0.8rem] text-left">ชาเลนจ์ 3 เดือน</p>
                    <p className="text-[0.6rem] text-right font-semibold">เก็บเงินเดือนละ 500 บาท</p>
                </div>

                <div className="flex flex-col justify-center items-center pb-1" >
                    <div className="flex px-3 h-[6vh] w-[95%] sm:w-[95%] md:max-w-[95%] bg-[#F6F4EC] rounded-[13px] justify-between mt-4 flex justify-center items-center">
                        <p className="text-[0.8rem]" >ธันวาคม</p>
                        <p className="text-[0.6rem]" >ยอดเงินคงเหลือ 300.00 ฿</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center pb-1" >
                    <div className="flex px-3 h-[6vh] w-[95%] sm:w-[95%] md:max-w-[95%] bg-[#F6F4EC] rounded-[13px] justify-between mt-4 flex justify-center items-center">
                        <p className="text-[0.8rem]" >ธันวาคม</p>
                        <p className="text-[0.6rem]" >ยอดเงินคงเหลือ 300.00 ฿</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center" >
                    <div className="flex px-3 h-[6vh] w-[95%] sm:w-[95%] md:max-w-[95%] bg-[#F6F4EC] rounded-[13px] justify-between mt-4 flex justify-center items-center">
                        <p className="text-[0.8rem]" >ธันวาคม</p>
                        <p className="text-[0.6rem]" >ยอดเงินคงเหลือ 300.00 ฿</p>
                    </div>
                </div>
                <div className="w-full text-left text-[0.7rem] mt-4 ml-3">
                    <p>ระยะเวลา</p>
                    <p>00/00/00 - 00/00/00</p>
                </div>

            </div>

            <div className="flex flex-col justify-center items-center mt-5" >
                <p className="text-[0.8rem] mt-2 font-bold" >ระดับปัจจุบัน</p>
                <div className="flex justify-center gap-4 items-center text-[#342A0F] font-bold h-[10vh] w-[50vw] sm:w-[30vw] md:max-w-[25vw] bg-[#FFF1AC] border-[#4C3228]/[61%] border-2 rounded-[30px] text-center mt-3">
                    <Image
                        src="/babyJor.jpg"
                        width={50}
                        height={50}
                        alt="Baby Jor"
                        className="rounded-full"
                    />
                    <div>
                        <p className="text-[0.8rem]">เบบี้ลิงจ๋อ</p>
                        <p className="text-[0.6rem]">ระดับเริ่มต้น</p>
                    </div>
                </div>

                <a href="/challenges/level" className="text-[0.8rem] mt-5 cursor-pointer font-bold" >กดเพื่อดูระดับต่าง ๆ <KeyboardDoubleArrowRightIcon /> </a>
            </div>
        </div>



    );
}