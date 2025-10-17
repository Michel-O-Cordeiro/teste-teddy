import { useState } from "react"
import AppRoutes from "./Routes"
import { SelectedClientsProvider } from "./context/SelectedClientsContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function App() {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <SelectedClientsProvider>
        <AppRoutes />
      </SelectedClientsProvider>
    </QueryClientProvider>
  )
}
