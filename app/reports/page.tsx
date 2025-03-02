import Nav from "../component/Navbar";
import Reports from "./reports";
import MenuBar from "../component/Menu";
export default function Page() {
    return (
        <div className="bg-[#FAF9F6] h-screen">
            <Nav />
            <Reports />
            <MenuBar/>
        </div>
    );
}