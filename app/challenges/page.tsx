import MenuBar from "../component/Menu";
import Nav from "../component/Navbar";
import Challenges from "./challenges";
import Level from "./level/page";
import Level2 from "./level2";
import Level3 from "./level3";
import Level4 from "./level4";
import Level5 from "./level5";

export default function Page(){
    return(
        <div className="bg-[#FAF9F6] h-screen text-[#342A0F]">
            <Nav/>
            <Challenges/>
            <MenuBar/>
            {/* <Level2/>
            <Level3/>
            <Level4/>
            <Level5/> */}
        </div>
    );
}