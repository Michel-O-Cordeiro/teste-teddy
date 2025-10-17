import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import menuIcon from "../../assets/img/menu.png"
import logo from "../../assets/img/teddy.png"
import arrow from "../../assets/img/arrow.png"
import client from "../../assets/img/client.png"
import clientSelected from "../../assets/img/clientSelect.png"
import client1 from "../../assets/img/client1.png"
import clientSelected1 from "../../assets/img/clientSelect1.png"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState("")

    useEffect(() => {
        const stored = localStorage.getItem("username")
        if (stored) setUsername(stored)
    }, [])

    return (
        <>
            <header className="fixed top-0 left-0 right-0 w-full h-20 flex justify-center items-center bg-white shadow-[0px_2px_2px_0px_#0000001A]">
                <div className="w-full max-w-[1280px] flex justify-between items-center px-4">
                    <div className="flex items-center gap-2">
                        <span
                            aria-label="Abrir menu"
                            className="me-5"
                            role="button"
                            tabIndex={0}
                            onClick={() => setIsOpen(true)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") setIsOpen(true)
                            }}
                        >
                            <img src={menuIcon} alt="Abrir menu" className="select-none" />
                        </span>
                        <img src={logo} alt="Logo" className="select-none" />
                    </div>



                    <nav className="flex gap-5">
                        <NavLink
                            to="/home"
                            end
                            className={({ isActive }) =>
                                `px-[15px] py-[2px] rounded-[5px] ${isActive ? "!underline !text-[#ec6724]" : "text-black no-underline"}`
                            }
                        >
                            Clientes
                        </NavLink>
                        <NavLink
                            to="/selected-clients"
                            end
                            className={({ isActive }) =>
                                `px-[15px] py-[2px] rounded-[5px] ${isActive ? "!underline !text-[#ec6724]" : "text-black no-underline"}`
                            }
                        >
                            Clientes Selecionados
                        </NavLink>
                        <Link
                            to="/login"
                            className="!text-black hover:!text-black visited:!text-black active:!text-black focus:!text-black no-underline hover:no-underline px-[15px] py-[2px] rounded-[5px] no-decoration"
                            onClick={() => {
                                localStorage.removeItem("username")
                                setUsername("")
                            }}
                        >
                            Sair
                        </Link>
                    </nav>

                    <span className="text-black ">Olá{username ? `, ${username}!` : ""}</span>
                </div>
            </header>

            {isOpen && (
                <div className="fixed inset-0 z-40">
                    <div
                        className="absolute inset-y-0 left-72 right-0 bg-black/30"
                        onClick={() => setIsOpen(false)}
                    />
                    <aside className="absolute top-0 left-0 h-full w-72 bg-white/10 backdrop-blur-md shadow-xl z-50 border-r border-white/20 animate-[sidebar-slide-in_300ms_ease]">
                        <div className="relative h-30 bg-black/30 flex items-center justify-center px-4">
                            <div className="w-28 h-16 bg-transparent rounded-md flex items-center justify-center">
                                <img src={logo} alt="Logo" className="select-none" />
                            </div>
                        </div>

                        <div
                            aria-label="Fechar menu"
                            className="absolute -right-4 top-30 -translate-y-1/2 w-10 h-10 rounded-full bg-black text-white shadow flex items-center justify-center z-10"
                            role="button"
                            onClick={() => setIsOpen(false)}
                        >
                            <img src={arrow} alt="Fechar menu" className="select-none" />
                        </div>

                        <div className="relative h-[calc(100%-96px)] bg-white/5 p-4">
                            <span className="absolute right-0 top-0 h-full w-[2px] bg-[#ec6724]" />
                            <nav className="flex flex-col gap-4">
                                <NavLink
                                    to="/home"
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-2 py-1 rounded ${isActive ? "!text-[#ec6724]" : "text-black"}`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span><img src={isActive ? client1 : client} alt="Cliente" className="select-none" /></span>
                                            <span>Clientes</span>
                                        </>
                                    )}
                                </NavLink>

                                <NavLink
                                    to="/selected-clients"
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-2 py-1 rounded ${isActive ? "!text-[#ec6724]" : "text-black"}`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span><img src={isActive ? clientSelected1 : clientSelected} alt="Clientes selecionados" className="select-none" /></span>
                                            <span>Clientes selecionados</span>
                                        </>
                                    )}
                                </NavLink>
                            </nav>
                        </div>
                    </aside>
                </div>
            )}
        </>
    )
}