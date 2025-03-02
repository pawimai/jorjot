import MenuBar from "../component/Menu";
import Nav from "../component/Navbar";

export default function Level5() {
  return (
    <>
      <Nav />
      <div className="flex flex-col items-center bg-white min-h-screen p-4">
        <div className="mt-10 w-full max-w-md bg-[#FFF1AC]/[30%] shadow-lg rounded-[30px] border-2 border-[#4C3228] p-6 text-center">
          <img src="/goldmonkey.svg" alt="ลิงจ๋อทองคำ" className="w-50 h-50 mx-auto mb-4" />
          <p className="text-[#AB502D]">ชาเลนจ์สำเร็จ !!!</p>
          <p className="text-black">เลื่อนขั้นเป็น</p>
          <h3 className="text-lg font-bold text-[#AB502D]">ลิงจ๋อทองคำ</h3>
          <button className="mt-4 bg-[#F4B90D] text-white px-6 py-2 text-[0.9rem] rounded-[30px] border-2 border-[#4C3228]">คุณอยู่ระดับสูงสุดแล้ว<br/>เก่งมาก !</button>
        </div>
      </div>
      <MenuBar />
    </>
  );
}