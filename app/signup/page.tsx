
import Image from "next/image";

export default function Signup() {
    return (
        <div className="bg-gradient-to-b from-[#4C3228] to-[#FCDD45] min-h-screen flex flex-col items-center justify-center">
            <div className="w-[90vw] border-2 border-[#342A0F] rounded-[30px] max-w-md bg-[#F6F4EC] rounded-[30px] shadow">
                <div className="p-10 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center p-3 font-bold leading-tight tracking-tight text-[#342A0F] md:text-2xl">
                        Sign up
                    </h1>
                    <form className="space-y-6 md:space-y-6">
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
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#342A0F]">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                // onChange={e => setEmail(e.target.value)}
                                id="email"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] block w-full py-2 px-4 text-[11px]"
                                placeholder="Email"
                                required
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
                            />
                        </div>
                        <div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#342A0F]">
                                ยืนยันรหัสผ่าน
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="*************"
                                className="bg-[#FFFFFF] border-2 border-[#342A0F] text-[#513F0B] rounded-[30px] block w-full py-2 px-4 text-[11px]"
                                required
                            />
                        </div>
                            <div className="flex items-center mt-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50  accent-black"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full text-[#513F0B] bg-[#FCDD45] font-bold rounded-[30px] text-sm px-5 py-3 mt-4"
                            >
                                SIGN UP
                            </button>
                            <p className="text-[11px] font-light text-[#513F0B] text-center mt-2">
                                ยังไม่มีบัญชี ?{' '}
                                <a href="#" className="underline">
                                LOGIN
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
