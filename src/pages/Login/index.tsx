import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelectedClients } from "../../context/SelectedClientsContext"

export default function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [error, setError] = useState("")

    const { clearAll } = useSelectedClients()

    useEffect(() => {
        clearAll()
        localStorage.clear()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-[1280px] w-full mx-auto text-center py-8 px-4 sm:px-8">
                <p className="text-2xl font-bold mb-4">Olá, seja bem-vindo!</p>
                <div className="flex items-center flex-col w-full">
                    <input
                        type="text"
                        className="max-w-full w-[521px] h-[60px] p-2 border border-gray-300 rounded-md"
                        placeholder="Digite seu nome:"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            if (error) setError("")
                        }}
                    />
                    {error && (
                        <p className="text-red-600 text-sm mt-2" role="alert">
                            {error}
                        </p>
                    )}
                    <button
                        className="w-full max-w-[521px] h-[60px] mt-4 !bg-[#ec6724] text-white p-2 rounded-md cursor-pointer"
                        onClick={() => {
                            const trimmed = name.trim()
                            if (!trimmed) {
                                setError("Por favor, digite seu nome.")
                                return
                            }
                            if (!/\p{L}/u.test(trimmed)) {
                                setError("O nome deve conter letras.")
                                return
                            }
                            localStorage.setItem("username", trimmed)
                            navigate('/home')
                        }}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
    )
}

