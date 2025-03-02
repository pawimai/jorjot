"use client"
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';
import config from "./config";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("first")
    try {
      console.log("first0")
      await axios.post(config.api_path + "/auth/login", {
        name,
        password,
      }).then(res => {
        if (1) {
          console.log("first")
          const data = res.data;
          console.log("Login successful:", data);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in!',
            timer: 2000,
            showConfirmButton: true,
          }).then(() => {
            router.push('/pocket-book');
          });
        } else {
          console.error("Login failed");
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password.',
            showConfirmButton: true,
          });
        }
      })
    } catch (error) {
      console.log("An error occurred:", error);
      Swal.fire({
        icon: 'error',
        title: 'An Error Occurred',
        text: 'Please try again later.',
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#4C3228] to-[#FCDD45] min-h-screen flex flex-col items-center justify-center">
      <div className="w-[90vw] border-2 border-[#342A0F] rounded-[30px] max-w-md bg-[#F6F4EC] rounded-[30px] shadow">
        <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center p-3 font-bold leading-tight tracking-tight text-[#342A0F] md:text-2xl">
            Login
          </h1>
          <form className="space-y-6 md:space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-[#342A0F]">
                ชื่อบัญชีผู้ใช้งาน
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] block w-full py-2 px-4 text-[11px]"
                placeholder="ชื่อบัญชี"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#342A0F]">
                รหัสผ่าน
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*************"
                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] block w-full py-2 px-4 text-[11px]"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div className="flex items-center mt-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50  accent-black"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                  Remember me
                </label>
              </div> */}
            </div>
            <div>
              <button
                type="submit"
                onClick={handleLogin}
                className="w-full text-[#513F0B] bg-[#FCDD45] font-bold rounded-[30px] text-sm px-5 py-3 mt-4"
              >
                LOGIN
              </button>
              <p className="text-[11px] font-light text-[#513F0B] text-center mt-2">
                ยังไม่มีบัญชี ?{' '}
                <a href="./signup" className="underline">
                  SIGN UP
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-5" >
        <Image
          src="/threeMonkeys.svg"
          alt="Background image"
          width={1920}
          height={1080}
          className="h-[54px] w-auto mt-auto"
        />
      </div>
    </div>
  );
}
