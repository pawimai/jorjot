export default function Levels() {
    const levels = [
      {
        title: "เบบี้ลิงจ๋อ",
        description: "ระดับเริ่มต้น",
        image: "/monkey1.svg",
      },
      {
        title: "ลิงจ๋อหัดเดิน (ระดับ 2)",
        description: "เก็บเงิน 3 เดือน เพื่อเลื่อนขั้นเป็นลิงจ๋อหัดเดิน",
        image: "/bluemonk.svg",
      },
      {
        title: "ลิงจ๋อวัยแรกรุ่น (ระดับ 3)",
        description: "เก็บเงิน 6 เดือน เพื่อเลื่อนขั้นเป็นลิงจ๋อวัยแรกรุ่น",
        image: "/purplemonk.svg",
      },
      {
        title: "ลิงจ๋อติดแกลม (ระดับ 4)",
        description: "เก็บเงิน 9 เดือน เพื่อเลื่อนขั้นเป็นลิงจ๋อติดแกลม",
        image: "/pinkmonk.svg",
      },
      {
        title: "ลิงจ๋อทองคำ (ระดับสูงสุด)",
        description: "เก็บเงิน 12 เดือน เพื่อเลื่อนขั้นเป็นลิงจ๋อทองคำ",
        image: "/goldmonk.svg",
      },
    ];
  
    return (
      <div className="flex flex-col items-center bg-white min-h-screen p-4">
        <div className="mt-10 w-full max-w-md bg-[#FFF1AC]/[30%] shadow-lg rounded-[30px] border-2 border-[#4C3228]/[12%] p-6">
          <h2 className="text-center text-lg font-bold mb-4">ระดับต่าง ๆ</h2>
          {levels.map((level, index) => (
            <div key={index} className="flex items-center space-x-4 p-2">
              <img src={level.image} alt={level.title} className="w-15 h-15 rounded-full" />
              <div>
                <h3 className="font-bold">{level.title}</h3>
                <p className="text-gray-600 text-sm">{level.description}</p>
              </div>
            </div>
          ))}
        </div>
        <img src="/kingkong.svg" alt="ลิงจ๋อคิงคอง" className="w-30 h-30 mt-10" />
      </div>
    );
  }
  