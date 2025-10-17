import type { FC } from "react"

interface ModalClientDeleteProps {
    isOpen: boolean
    onClose: () => void
    clientName: string
    deleteLoading: boolean
    onDelete: () => void
}

const ModalClientDelete: FC<ModalClientDeleteProps> = ({
    isOpen,
    onClose,
    clientName,
    deleteLoading,
    onDelete
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-black">Excluir Cliente:</h3>
                    <button
                        type="button"
                        aria-label="Fechar"
                        className="text-black"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <p className="text-black mb-4">
                    Você está prestes a excluir o cliente: <strong>{clientName}</strong>
                </p>

                <button
                    type="button"
                    className="w-full mt-2 bg-[#ec6724] rounded-md py-2 cursor-pointer active:translate-y-[1px] focus:outline-none disabled:opacity-50"
                    onClick={onDelete}
                    disabled={deleteLoading}
                >
                    <strong className="text-white font-medium">
                        {deleteLoading ? "Excluindo..." : "Excluir cliente"}
                    </strong>
                </button>
            </div>
        </div>
    )
}

export default ModalClientDelete