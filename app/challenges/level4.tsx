import MenuBar from "../component/Menu";
import Nav from "../component/Navbar";

export default function Level4() {
  return (
    <>
      <Nav />
      <div className="flex flex-col items-center bg-white min-h-screen p-4">
        <div className="mt-10 w-full max-w-md bg-[#FFF1AC]/[30%] shadow-lg rounded-[30px] border-2 border-[#4C3228] p-6 text-center">
          <img src="/pinkmonkey.svg" alt="ลิงจ๋อติดแกลม" className="w-40 h-40 mx-auto mb-4" />
          <p className="text-[#AB502D]">ชาเลนจ์สำเร็จ !!!</p>
          <p className="text-black">เลื่อนขั้นเป็น</p>
          <h3 className="text-lg font-bold text-[#AB502D]">ลิงจ๋อติดแกลม</h3>
          <button className="mt-4 bg-[#FB8CB2] text-white px-4 py-2 rounded-[30px] border-2 border-[#4C3228]">ทำชาเลนจ์ต่อไป</button>
        </div>
      </div>
      <MenuBar />
    </>
  );
}