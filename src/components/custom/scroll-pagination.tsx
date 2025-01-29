import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import Spinner from "../ui/spinner"

interface IPaginationProps {
    className?: string
    isFetchingNextPage?: boolean
    hasNextPage: boolean
    fetchNextPage: () => void
}

export function ScrollPagination({
    className,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
}: IPaginationProps) {
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <footer
            ref={ref}
            className={cn("grid place-items-center h-10", className)}
        >
            {isFetchingNextPage && <Spinner />}
            {/* {!hasNextPage && !isFetchingNextPage && "Hamma ma'lumot yuklandi"} */}
        </footer>
    )
}
