import type { Client } from "../../types/client"
import { formatCurrencyBRL } from "../../utils/currency"
import add from "../../assets/img/add.png"
import pencil from "../../assets/img/pencil.png"
import trash from "../../assets/img/trash.png"

export default function ClientCard({ client }: { client: Client }) {
    return (
        <article className="rounded-lg bg-white p-4 shadow-[0px_2px_2px_0px_#0000001A] text-black">
            <strong className="block text-center font-extrabold	 text-black mb-2">{client.name}</strong>
            <p className="text-center">Salário: {formatCurrencyBRL(client.salary)}</p>
            <p className="text-center">Empresa: {formatCurrencyBRL(client.companyValuation)}</p>

            <div className="mt-4 flex items-center justify-between px-2">
                <button
                    aria-label="Adicionar"
                    className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    <img src={add} alt="Adicionar" />
                </button>
                <button
                    aria-label="Editar"
                    className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    <img src={pencil} alt="Editar" />
                </button>
                <button
                    aria-label="Excluir"
                    className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                    <img src={trash} alt="Excluir" />
                </button>
            </div>
        </article>
    )
}