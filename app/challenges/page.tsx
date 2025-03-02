import MenuBar from "../component/Menu";
import Nav from "../component/Navbar";
import Challenges from "./challenges";

export default function Page(){
    return(
        <>
            <Nav/>
            <Challenges/>
            <MenuBar/>
        </>
    );
}