type PaginationProps = {
    totalPages: number
    currentPage: number
    onChange: (page: number) => void
    className?: string
}

const buildPagination = (totalPages: number, currentPage: number): Array<number | string> => {
    if (totalPages < 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    const items: Array<number | string> = []
    items.push(1)
    if (currentPage > 3) items.push("...")
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let p = start; p <= end; p++) items.push(p)
    if (currentPage < totalPages - 2) items.push("...")
    items.push(totalPages)
    return items
}

export default function Pagination({ totalPages, currentPage, onChange, className }: PaginationProps) {
    const items = buildPagination(totalPages, currentPage)

    return (
        <div className={className ?? "mt-6 flex flex-wrap items-center justify-center gap-1 sm:gap-2"}>
            {items.map((item, idx) =>
                typeof item === "number" ? (
                    <button
                        key={`${item}-${idx}`}
                        onClick={() => onChange(item)}
                        className={
                            item === currentPage
                                ? "px-3 py-1 rounded !bg-[#ec6724] text-white font-semibold"
                                : "px-3 py-1 bg-white text-black hover:bg-gray-100"
                        }
                    >
                        {item}
                    </button>
                ) : (
                    <span key={`dots-${idx}`} className="px-2 text-black">
                        ...
                    </span>
                )
            )}
        </div>
    )
}