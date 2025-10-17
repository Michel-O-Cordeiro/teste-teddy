import { useEffect, useRef, useState } from "react"
import Header from "../../components/Header"
import { api } from "../../api/api"
import type { Client, ApiResponse } from "../../types/client"
import ClientCard from "../../components/ClientCard"
import Pagination from "../../components/Pagination"
import ModalClientAdd from "../../components/modals/modalClientAdd"
import ModalClientDelete from "../../components/modals/modalClientDelete"
import { useSelectedClients } from "../../context/SelectedClientsContext"


export default function Home() {
    const [clients, setClients] = useState<Client[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [pageSize, setPageSize] = useState<number>(16)

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [salary, setSalary] = useState<number | "">("")
    const [companyValuation, setCompanyValuation] = useState<number | "">("")
    const [createLoading, setCreateLoading] = useState<boolean>(false)
    const [createError, setCreateError] = useState<string | null>(null)
    const [createSuccess, setCreateSuccess] = useState<string | null>(null)
    const [formErrors, setFormErrors] = useState<{ name?: string; salary?: string; companyValuation?: string }>({})
    const [alertMessage, setAlertMessage] = useState<string | null>(null)
    const alertTimeoutRef = useRef<number | null>(null)

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [selectedClientToDelete, setSelectedClientToDelete] = useState<Client | null>(null)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    const [selectedClientToEdit, setSelectedClientToEdit] = useState<Client | null>(null)

    const { addClient, isSelected } = useSelectedClients()


    const visibleClients: Client[] = clients.filter((c) => !isSelected(c.id))

    const handleCreateClient = async () => {
        setCreateSuccess(null)
        setCreateError(null)

        const nextErrors: { name?: string; salary?: string; companyValuation?: string } = {}

        const trimmedName = name.trim()
        if (!trimmedName) {
            nextErrors.name = "Nome é obrigatório."
        } else if (trimmedName.length <= 3) {
            nextErrors.name = "Nome deve ter mais de 3 letras."
        } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(trimmedName)) {
            nextErrors.name = "Nome deve conter apenas letras."
        }

        if (salary === "" || isNaN(Number(salary))) {
            nextErrors.salary = "Salário é obrigatório."
        } else if (Number(salary) <= 0) {
            nextErrors.salary = "Salário deve ser maior que 0."
        }

        if (companyValuation === "" || isNaN(Number(companyValuation))) {
            nextErrors.companyValuation = "Valor da empresa é obrigatório."
        } else if (Number(companyValuation) <= 0) {
            nextErrors.companyValuation = "Valor da empresa deve ser maior que 0."
        }

        setFormErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setCreateLoading(true)
        try {
            const res = await api.post("/users", {
                name: trimmedName,
                salary: Number(salary),
                companyValuation: Number(companyValuation)
            })
            if (res.status >= 200 && res.status < 300) {
                setCreateSuccess("Usuário criado")
                setName("")
                setSalary("")
                setCompanyValuation("")
                setShowCreateModal(false)
                setAlertMessage("Cadastro de cliente foi um sucesso")
                if (alertTimeoutRef.current) {
                    window.clearTimeout(alertTimeoutRef.current)
                }
                alertTimeoutRef.current = window.setTimeout(() => {
                    setAlertMessage(null)
                }, 3000)
            } else {
                setCreateError("Erro ao tentar criar cliente")
            }
        } catch {
            setCreateError("Erro ao tentar criar cliente")
        } finally {
            setCreateLoading(false)
        }
    }

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

    useEffect(() => {
        return () => {
            if (alertTimeoutRef.current) {
                window.clearTimeout(alertTimeoutRef.current)
            }
        }
    }, [])

    const handleUpdateClient = async () => {
        if (!selectedClientToEdit) return
        setCreateSuccess(null)
        setCreateError(null)

        const nextErrors: { name?: string; salary?: string; companyValuation?: string } = {}

        const trimmedName = name.trim()
        if (!trimmedName) {
            nextErrors.name = "Nome é obrigatório."
        } else if (trimmedName.length <= 3) {
            nextErrors.name = "Nome deve ter mais de 3 letras."
        } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(trimmedName)) {
            nextErrors.name = "Nome deve conter apenas letras."
        }

        if (salary === "" || isNaN(Number(salary))) {
            nextErrors.salary = "Salário é obrigatório."
        } else if (Number(salary) <= 0) {
            nextErrors.salary = "Salário deve ser maior que 0."
        }

        if (companyValuation === "" || isNaN(Number(companyValuation))) {
            nextErrors.companyValuation = "Valor da empresa é obrigatório."
        } else if (Number(companyValuation) <= 0) {
            nextErrors.companyValuation = "Valor da empresa deve ser maior que 0."
        }

        setFormErrors(nextErrors)
        if (Object.keys(nextErrors).length > 0) return

        setCreateLoading(true)
        try {
            const res = await api.patch(`/users/${selectedClientToEdit.id}`, {
                name: trimmedName,
                salary: Number(salary),
                companyValuation: Number(companyValuation)
            })
            if (res.status >= 200 && res.status < 300) {
                setCreateSuccess("Cliente atualizado")
                setClients((prev) =>
                    prev.map((c) =>
                        c.id === selectedClientToEdit.id
                            ? { ...c, name: trimmedName, salary: Number(salary), companyValuation: Number(companyValuation) }
                            : c
                    )
                )
                setShowCreateModal(false)
                setSelectedClientToEdit(null)
                setName("")
                setSalary("")
                setCompanyValuation("")
                setAlertMessage("Cliente atualizado com sucesso")
                if (alertTimeoutRef.current) {
                    window.clearTimeout(alertTimeoutRef.current)
                }
                alertTimeoutRef.current = window.setTimeout(() => {
                    setAlertMessage(null)
                }, 3000)
            } else {
                setCreateError("Erro ao tentar atualizar cliente")
            }
        } catch {
            setCreateError("Erro ao tentar atualizar cliente")
        } finally {
            setCreateLoading(false)
        }
    }


    const handleDeleteClient = async () => {
        if (!selectedClientToDelete) return
        setDeleteLoading(true)
        try {
            const res = await api.delete(`/users/${selectedClientToDelete.id}`)
            if (res.status >= 200 && res.status < 300) {
                setClients((prev) => prev.filter((c) => c.id !== selectedClientToDelete.id))
                setShowDeleteModal(false)
                setSelectedClientToDelete(null)

                setAlertMessage("Cliente deletado com sucesso")
                if (alertTimeoutRef.current) {
                    window.clearTimeout(alertTimeoutRef.current)
                }
                alertTimeoutRef.current = window.setTimeout(() => {
                    setAlertMessage(null)
                }, 3000)
            }
        } catch {
            setAlertMessage("Erro ao deletar cliente")
        } finally {
            setDeleteLoading(false)
        }
    }

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
            {alertMessage && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white rounded-md px-4 py-2 shadow">
                    {alertMessage}
                </div>
            )}
            <main className="min-h-screen bg-[#F5F5F5] pt-24 pb-10">
                <div className="max-w-[1280px] w-full mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <h2 className="text-xl">
                            <b className="text-black">{Math.min(visibleClients.length, pageSize)}</b> clientes encontrados:
                        </h2>
                        <div className="flex items-center gap-2">
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
                        <div className="flex items-center justify-center h-40 text-black">Carregando...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {visibleClients.map((client: Client) => (
                                    <ClientCard
                                        key={client.id}
                                        client={client}
                                        onDeleteClick={(c) => {
                                            setSelectedClientToDelete(c)
                                            setShowDeleteModal(true)
                                        }}
                                        onEditClick={(c) => {
                                            setSelectedClientToEdit(c)
                                            setName(c.name)
                                            setSalary(c.salary)
                                            setCompanyValuation(c.companyValuation)
                                            setFormErrors({})
                                            setCreateError(null)
                                            setCreateSuccess(null)
                                            setShowCreateModal(true)
                                        }}
                                        onAddClick={(c) => {
                                            addClient(c)
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                className="w-full mt-4 border-2 border-[#ec6724] bg-transparent rounded-md py-2 cursor-pointer active:translate-y-[1px] focus:outline-none"
                                onClick={() => {
                                    setShowCreateModal(true)
                                    setCreateSuccess(null)
                                    setCreateError(null)
                                    setFormErrors({})
                                }}
                            >
                                <strong className="text-[#ec6724] font-medium">Criar cliente</strong>
                            </button>

                            {showCreateModal && (
                                <ModalClientAdd
                                    isOpen={showCreateModal}
                                    onClose={() => {
                                        setShowCreateModal(false)
                                        setFormErrors({})
                                        setCreateError(null)
                                        setCreateSuccess(null)
                                        setSelectedClientToEdit(null)
                                    }}
                                    name={name}
                                    salary={salary}
                                    companyValuation={companyValuation}
                                    formErrors={formErrors}
                                    createError={createError}
                                    createSuccess={createSuccess}
                                    createLoading={createLoading}
                                    onChangeName={(val) => {
                                        setName(val)
                                        if (formErrors.name) setFormErrors({ ...formErrors, name: undefined })
                                    }}
                                    onChangeSalary={(val) => {
                                        setSalary(val)
                                        if (formErrors.salary) setFormErrors({ ...formErrors, salary: undefined })
                                    }}
                                    onChangeCompanyValuation={(val) => {
                                        setCompanyValuation(val)
                                        if (formErrors.companyValuation) setFormErrors({ ...formErrors, companyValuation: undefined })
                                    }}
                                    onCreate={handleCreateClient}
                                    isEditing={selectedClientToEdit !== null}
                                    onUpdate={handleUpdateClient}
                                />
                            )}

                            {showDeleteModal && selectedClientToDelete && (
                                <ModalClientDelete
                                    isOpen={showDeleteModal}
                                    onClose={() => {
                                        setShowDeleteModal(false)
                                        setSelectedClientToDelete(null)
                                    }}
                                    clientName={selectedClientToDelete.name}
                                    deleteLoading={deleteLoading}
                                    onDelete={handleDeleteClient}
                                />
                            )}

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


