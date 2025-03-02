import MenuBar from "../component/Menu";
import Nav from "../component/Navbar";

export default function Forecast(){
    return(
        <div className="bg-[#FAF9F6] h-screen">
            <Nav/>
            <h1 className="flex justify-center items-center text-[#342A0F] mt-10" >Comming soon...</h1>
            <MenuBar/>
        </div>
    );
}