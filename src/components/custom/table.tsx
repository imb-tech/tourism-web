import { cn } from "@/lib/utils"

export interface CustomTableProps {
    children: React.ReactNode
    className?: string
    grid: `grid-cols-${number}`
}

export default function CustomTable({
    className,
    children,
    grid,
}: CustomTableProps) {
    return (
        <div
            className={cn(
                "w-full grid bg-background rounded-sm px-3 py-1",
                grid,
                className,
            )}
        >
            {children}
        </div>
    )
}
