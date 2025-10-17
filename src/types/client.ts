export type Client = {
  id: number
  name: string
  salary: number
  companyValuation: number
  createdAt: string
  updatedAt: string
}

export type ApiResponse = {
  clients: Client[]
  totalPages: number
  currentPage: number
}