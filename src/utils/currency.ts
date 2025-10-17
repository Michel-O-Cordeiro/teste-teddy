export function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

export function parseCurrencyToNumberBRL(input: string): number {
  let s = input.replace(/[^\d.,]/g, "")
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".")
  } else {
    const parts = s.split(".")
    if (parts.length > 1) {
      const decimal = parts.pop() as string
      s = parts.join("") + "." + decimal
    }
  }
  const value = Number(s)
  return Number.isFinite(value) ? value : NaN
}