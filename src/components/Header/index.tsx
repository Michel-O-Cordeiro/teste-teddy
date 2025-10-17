
import { NavLink, Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 w-full h-20 flex justify-center items-center bg-white shadow-[0px_2px_2px_0px_#0000001A]">
            <div className="w-full max-w-[900px] flex justify-center items-center">
                <nav className="flex gap-5">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-[15px] py-[2px] rounded-[5px] ${
                                isActive
                                    ? "underline !text-[#EC6724] hover:!text-[#EC6724]"
                                    : "text-black hover:!text-black no-underline hover:no-underline"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <Link
                        to="/login"
                        className="!text-black hover:!text-black visited:!text-black active:!text-black focus:!text-black no-underline hover:no-underline px-[15px] py-[2px] rounded-[5px] no-decoration"
                    >
                        Sair
                    </Link>
                </nav>
            </div>
        </header>
    )
}