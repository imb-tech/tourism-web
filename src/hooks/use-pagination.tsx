import { useSearch } from "@tanstack/react-router"
import { useCallback } from "react"

export default function usePagination() {
    const { page: pageParamPage, page_size: paramPageSize } = useSearch({
        strict: false,
    })

    const page = pageParamPage || 1
    const page_size = paramPageSize || 10

    const calcTotalPages = useCallback(
        (count?: number) => {
            return Math.ceil((count || page_size) / page_size)
        },
        [page_size],
    )

    return {
        page,
        page_size,
        calcTotalPages,
    }
}
