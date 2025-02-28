export default function Level2() {
    return (
      <div className="flex flex-col items-center bg-white min-h-screen p-4">
      <div className="mt-10 w-full max-w-md bg-[#FFF1AC]/[30%] shadow-lg rounded-[30px] border-2 border-[#4C3228] p-6 text-center">
        <img src="/bluemonkey.svg" alt="ลิงจ๋อหัดเดิน" className="w-40 h-40 mx-auto mb-4" />
        <p className="text-[#AB502D] font-bold">ชาเลนจ์สำเร็จ !!!</p>
        <p className="text-black">เลื่อนขั้นเป็น</p>
        <h3 className="text-lg font-bold text-[#AB502D]">ลิงจ๋อหัดเดิน</h3>
        <button className="mt-4 bg-[#81CAEE] text-white px-4 py-2 rounded-[30px] border-2 border-[#4C3228]">ทำชาเลนจ์ต่อไป</button>
      </div>
    </div>);
  }