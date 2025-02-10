import { cn } from "@/lib/utils"

type Props = {
    in: number
    children: React.ReactNode
    className?: string
    grid: `grid-cols-${number}`
}

export default function CustomTableRow({
    in: i,
    children,
    className,
    grid,
}: Props) {
    return (
        <div
            className={cn(
                "min-w-full flex-1 py-2 px-1 grid",
                i > 0 && "border-t border-secondary",
                className,
                grid,
            )}
        >
            {children}
        </div>
    )
}
