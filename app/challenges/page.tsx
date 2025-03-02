import MenuBar from "../component/Menu";
import Nav from "../component/Navbar";
import Challenges from "./challenges";

export default function Page(){
    return(
        <div className="bg-[#FAF9F6] h-screen">
            <Nav/>
            <Challenges/>
            <MenuBar/>
        </div>
    );
}