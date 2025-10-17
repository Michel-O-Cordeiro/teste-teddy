import { useEffect, useState, type FC } from "react"
import { formatCurrencyBRL } from "../../../utils/currency"

type FormErrors = { name?: string; salary?: string; companyValuation?: string }

interface ModalClientAddProps {
    isOpen: boolean
    onClose: () => void
    name: string
    salary: number | ""
    companyValuation: number | ""
    formErrors: FormErrors
    createError: string | null
    createSuccess: string | null
    createLoading: boolean
    onChangeName: (value: string) => void
    onChangeSalary: (value: number | "") => void
    onChangeCompanyValuation: (value: number | "") => void
    onCreate: () => void
    isEditing?: boolean
    onUpdate?: () => void
}

const ModalClientAdd: FC<ModalClientAddProps> = ({
    isOpen,
    onClose,
    name,
    salary,
    companyValuation,
    formErrors,
    createError,
    createSuccess,
    createLoading,
    onChangeName,
    onChangeSalary,
    onChangeCompanyValuation,
    onCreate,
    isEditing,
    onUpdate
}) => {
    if (!isOpen) return null

    const handleClose = () => {
        onChangeName("")
        onChangeSalary("")
        onChangeCompanyValuation("")
        onClose()
    }

    const [salaryText, setSalaryText] = useState(salary === "" ? "" : formatCurrencyBRL(Number(salary)))
    const [companyValuationText, setCompanyValuationText] = useState(companyValuation === "" ? "" : formatCurrencyBRL(Number(companyValuation)))

    useEffect(() => {
        setSalaryText(salary === "" ? "" : formatCurrencyBRL(Number(salary)))
    }, [salary])

    useEffect(() => {
        setCompanyValuationText(companyValuation === "" ? "" : formatCurrencyBRL(Number(companyValuation)))
    }, [companyValuation])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-black">{isEditing ? "Editar Cliente:" : "Criar cliente:"}</h3>
                    <button
                        type="button"
                        aria-label="Fechar"
                        className="text-black"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3">
                    <div>
                        <input
                            type="text"
                            placeholder="Digite o nome"
                            className="w-full rounded bg-white text-black border border-gray-300 px-3 py-2"
                            value={name}
                            onChange={(e) => onChangeName(e.target.value)}
                        />
                        {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Digite o salário:"
                            className="w-full rounded bg-white text-black border border-gray-300 px-3 py-2"
                            value={salaryText}
                            inputMode="numeric"
                            onChange={(e) => {
                                const raw = e.target.value
                                const digits = raw.replace(/\D/g, "")
                                if (digits === "") {
                                    setSalaryText("")
                                    onChangeSalary("")
                                    return
                                }
                                const numeric = Number(digits) / 100
                                setSalaryText(formatCurrencyBRL(numeric))
                                onChangeSalary(numeric)
                            }}
                        />
                        {formErrors.salary && <p className="mt-1 text-sm text-red-600">{formErrors.salary}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Digite o valor da empresa"
                            className="w-full rounded bg-white text-black border border-gray-300 px-3 py-2"
                            value={companyValuationText}
                            inputMode="numeric"
                            onChange={(e) => {
                                const raw = e.target.value
                                const digits = raw.replace(/\D/g, "")
                                if (digits === "") {
                                    setCompanyValuationText("")
                                    onChangeCompanyValuation("")
                                    return
                                }
                                const numeric = Number(digits) / 100
                                setCompanyValuationText(formatCurrencyBRL(numeric))
                                onChangeCompanyValuation(numeric)
                            }}
                        />
                        {formErrors.companyValuation && <p className="mt-1 text-sm text-red-600">{formErrors.companyValuation}</p>}
                    </div>
                </div>

                {createError && <div className="mt-3 text-sm text-red-600">{createError}</div>}
                {createSuccess && <div className="mt-3 text-sm text-green-600">{createSuccess}</div>}

                <button
                    type="button"
                    className="w-full mt-4 bg-[#ec6724] rounded-md py-2 cursor-pointer active:translate-y-[1px] focus:outline-none disabled:opacity-50"
                    onClick={isEditing ? onUpdate : onCreate}
                    disabled={createLoading}
                >
                    <strong className="text-white font-medium">
                        {createLoading
                            ? (isEditing ? "Editando..." : "Criando...")
                            : (isEditing ? "Editar cliente" : "Criar cliente")}
                    </strong>
                </button>
            </div>
        </div>
    )
}

export default ModalClientAdd