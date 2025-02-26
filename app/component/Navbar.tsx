import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import Image from "next/image";

export default function Nav() {
    return (
        <nav className="flex items-end justify-between h-[14vh] bg-[#4C3228] rounded-b-[30px] pb-3 px-6">
            {/* โลโก้ชื่อเว็บ */}
            <a href="/pocket-book" className="text-white text-[1.5rem] font-bold drop-shadow-md">จ๋อจด</a>

            {/* เมนูด้านขวา */}
            <div className="flex space-x-3 items-end">
                {/* ไอคอนปฏิทิน */}
                <a href="/" className="text-[#FCDD45]">
                    <InsertInvitationIcon fontSize="large" />
                </a>

                {/* โปรไฟล์ */}
                <a href="/profile">
                    <div className="relative w-10 h-10 overflow-hidden border-[3px] border-[#FCDD45] rounded-full bg-white">
                        <Image
                            src="/profile1.jpg" //เปลี่ยนรูปโปรไฟล์ได้
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                </a>

            </div>
        </nav>
    );
}
