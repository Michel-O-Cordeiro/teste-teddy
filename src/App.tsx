import AppRoutes from "./Routes"
import { SelectedClientsProvider } from "./context/SelectedClientsContext"

export default function App() {
  return (
    <SelectedClientsProvider>
      <AppRoutes />
    </SelectedClientsProvider>
  )
}
