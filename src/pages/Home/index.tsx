import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { api } from "../../api/api"
import type { Client, ApiResponse } from "../../types/client"
import ClientCard from "../../components/ClientCard"
import Pagination from "../../components/Pagination"


export default function Home() {
    const [clients, setClients] = useState<Client[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const [pageSize, setPageSize] = useState<number>(16)

    useEffect(() => {
        let mounted = true
        const fetchClients = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await api.get<ApiResponse>("/users", {
                    params: { page: currentPage, limit: pageSize, perPage: pageSize, pageSize: pageSize }
                })
                const data = res.data ?? { clients: [], totalPages: 1, currentPage: 1 }
                if (!mounted) return
                setClients(Array.isArray(data.clients) ? data.clients.slice(0, pageSize) : [])
                setTotalPages(Number(data.totalPages) || 1)
                setCurrentPage(Number(data.currentPage) || currentPage)
            } catch {
                if (!mounted) return
                setError("Falha ao carregar clientes.")
            } finally {
                if (mounted) setLoading(false)
            }
        }
        fetchClients()
        return () => {
            mounted = false
        }
    }, [currentPage, pageSize])

    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#F5F5F5] pt-24 pb-10">
                <div className="max-w-[1280px] w-full mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl  mb-4">
                            <b className="text-black">{Math.min(clients.length, pageSize)}</b> clientes encontrados:
                        </h2>
                        <div className="mb-4 flex items-center gap-2">
                            <label htmlFor="page-size" className="text-black">Clientes por página:</label>
                            <select
                                id="page-size"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value))
                                    setCurrentPage(1)
                                }}
                                className="px-2 py-1 rounded bg-white text-black border border-gray-300"
                            >
                                {[4, 8, 12, 16].map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {error && <div className="text-red-600 mb-4">{error}</div>}

                    {loading ? (
                        <div className="flex items-center justify-center h-40 text.black">Carregando...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-4 gap-4">
                                {clients.map((client) => (
                                    <ClientCard key={client.id} client={client} />
                                ))}
                            </div>

                            <button
                                type="button"
                                className="w-full mt-4 border-2 border-[#ec6724] bg-transparent rounded-md py-2 cursor-pointer active:translate-y-[1px] focus:outline-none"
                            >
                                <strong className="text-[#ec6724] font-medium">Criar cliente</strong>
                            </button>

                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onChange={setCurrentPage}
                            />
                        </>
                    )}
                </div>
            </main>
        </>
    )
}
