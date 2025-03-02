import MenuBar from "../component/Menu"
import Nav from "../component/Navbar"
import { Pocket_book } from "./pocket-book"
export default function Pocket() {
    return (
        <div className="bg-[#FAF9F6] h-screen">
            <Nav />
            <Pocket_book />
            <MenuBar />

        </div>
    )
}