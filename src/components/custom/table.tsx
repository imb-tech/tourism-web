import { cn } from "@/lib/utils"

export interface CustomTableProps {
    children: React.ReactNode
    className?: string
    cols: number
}

export default function CustomTable({
    className,
    children,
    cols,
}: CustomTableProps) {
    return (
        <div
            className={cn(
                "w-full grid bg-background rounded-sm px-3 py-1",
                "grid-cols-" + cols,
                className,
            )}
        >
            {children}
        </div>
    )
}
