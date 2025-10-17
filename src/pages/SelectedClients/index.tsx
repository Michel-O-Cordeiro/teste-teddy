import Header from "../../components/Header";
import { useSelectedClients } from "../../context/SelectedClientsContext";
import SelectedClientCard from "../../components/SelectedClientCard";

export default function SelectedClients() {
    const { selectedClients, removeClient, clearAll } = useSelectedClients();

    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#F5F5F5] pt-24 pb-10">
                <div className="max-w-[1280px] w-full mx-auto px-4">
                    <h2 className="text-xl mb-4">
                        Clientes selecionados:
                    </h2>

                    {selectedClients.length === 0 ? (
                        <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
                            <p className="text-black">Nenhum cliente selecionado</p>
                        </div>
                    ) : (
                        <div>
                            <div className="grid grid-cols-4 gap-4">
                                {selectedClients.map((client) => (
                                    <SelectedClientCard
                                        key={client.id}
                                        client={client}
                                        onRemoveClick={(c) => {
                                            removeClient(c.id)
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                className="w-full mt-4 border-2 border-[#ec6724] bg-transparent rounded-md py-2 cursor-pointer active:translate-y-[1px] focus:outline-none"
                                onClick={clearAll}
                            >
                                <strong className="text-[#ec6724] font-medium">Limpar clientes selecionados</strong>
                            </button>
                        </div>
                    )}
                </div>

            </main>
        </>
    );
}
