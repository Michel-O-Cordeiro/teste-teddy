import type { Client } from "../../types/client"
import { formatCurrencyBRL } from "../../utils/currency"
import neg from "../../assets/img/neg.png"

export default function SelectedClientCard({ client, onRemoveClick }: { client: Client; onRemoveClick?: (client: Client) => void }) {
    return (
        <article className="rounded-lg bg-white p-4 shadow-[0px_2px_2px_0px_#0000001A] text-black">
            <strong className="block text-center font-extrabold text-black mb-2">{client.name}</strong>
            <p className="text-center">Salário: {formatCurrencyBRL(client.salary)}</p>
            <p className="text-center">Empresa: {formatCurrencyBRL(client.companyValuation)}</p>

            <div className="mt-4 flex items-center justify-end px-2">
                <button
                    aria-label="Remover"
                    className="cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    onClick={() => onRemoveClick?.(client)}
                    title="Remover dos selecionados"
                >
                    <img src={neg} alt="Excluir" />
                </button>
            </div>
        </article>
    )
}