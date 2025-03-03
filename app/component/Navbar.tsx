"use client"
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Cookies from "js-cookie";

export default function Nav() {
    const [profileImage, setProfileImage] = useState("/profile1.svg"); // Default profile image

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const token = Cookies.get('token');

                const response = await axios.get(config.api_path + "/auth/profile", {
                    headers: {
                        Authorization: `${token}`
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    setProfileImage(data.profileImage); // Update state with fetched profile image
                }
            } catch (error) {
                console.error("Error fetching profile image:", error);
            }
        };

        fetchProfileImage();
    }, []);

    return (
        <nav className="flex items-end justify-between h-[14vh] bg-[#4C3228] rounded-b-[30px] pb-3 px-6 ">
            {/* โลโก้ชื่อเว็บ */}
            <Link href={"/pocket-book"} className="text-white text-[1.5rem] font-bold drop-shadow-md">จ๋อจด</Link>

            {/* เมนูด้านขวา */}
            <div className="flex space-x-3 items-end">
                {/* ไอคอนปฏิทิน */}
                <div className="text-[#FCDD45]">
                    <InsertInvitationIcon fontSize="large" />
                </div>

                {/* โปรไฟล์ */}
                <Link href={"/profile"}>
                    <div className="relative w-10 h-10 overflow-hidden border-[3px] border-[#FCDD45] rounded-full bg-white">
                        <Image
                            src={profileImage} // Use fetched profile image
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
            </div>
        </nav>
    );
}
