import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Client } from "../types/client";

type SelectedClientsContextValue = {
    selectedClients: Client[];
    addClient: (client: Client) => void;
    removeClient: (clientId: number) => void;
    isSelected: (clientId: number) => boolean;
    clearAll: () => void;
};

const SelectedClientsContext = createContext<SelectedClientsContextValue | undefined>(undefined);

export function SelectedClientsProvider({ children }: { children: ReactNode }) {
    const [selectedClients, setSelectedClients] = useState<Client[]>([]);

    const addClient = (client: Client) => {
        setSelectedClients((prev) => (prev.some((c) => c.id === client.id) ? prev : [...prev, client]));
    };

    const removeClient = (clientId: number) => {
        setSelectedClients((prev) => prev.filter((c) => c.id !== clientId));
    };

    const isSelected = (clientId: number) => selectedClients.some((c) => c.id === clientId);

    const clearAll = () => {
        setSelectedClients([]);
    };

    const value = useMemo(
        () => ({ selectedClients, addClient, removeClient, isSelected, clearAll }),
        [selectedClients]
    );

    return <SelectedClientsContext.Provider value={value}>{children}</SelectedClientsContext.Provider>;
}

export function useSelectedClients() {
    const ctx = useContext(SelectedClientsContext);
    if (!ctx) {
        throw new Error("useSelectedClients deve ser usado dentro de SelectedClientsProvider");
    }
    return ctx;
}