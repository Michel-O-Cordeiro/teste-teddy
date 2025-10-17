import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const canEnter = name.trim().length >= 3
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-[1280px] w-full mx-auto text-center py-8 px-4 sm:px-8">
                <p className="text-2xl font-bold mb-4">Olá, seja bem-vindo!</p>
                <div className="flex items-center flex-col">
                    <input
                        type="text"
                        className=" w-lg h-[60px] p-2 border border-gray-300 rounded-md"
                        placeholder="Digite seu nome:"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className="w-lg mt-4 !bg-[#ec6724] text-white p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            if (!canEnter) return
                            localStorage.setItem("username", name.trim())
                            navigate('/home')
                        }}
                        disabled={!canEnter}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    )
}

