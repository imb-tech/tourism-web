import { cn } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import useEditableRequest from "./editable-request"

type Props = {
    in: number
    children: React.ReactNode
    className?: string
    grid: `grid-cols-${number}`
    rowId: number
    day: number
}

export default function CustomTableRow({
    in: i,
    children,
    className,
    grid,
    rowId,
    day,
}: Props) {
    const [isVisible, setIsVisible] = useState(false)
    const { clear, duplicate } = useEditableRequest()
    return (
        <div
            className={cn(
                "min-w-full flex-1 py-2 px-1 relative grid",
                i > 0 && "border-t border-secondary",
                className,
                grid,
            )}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <span className="absolute right-1 top-1/2 -translate-y-1/2 bg-background flex gap-3 transition-all duration-200">
                    <Plus
                        size={16}
                        className="text-primary cursor-pointer"
                        onClick={() => duplicate(day)}
                    />
                    <Trash2
                        size={16}
                        className="text-destructive cursor-pointer"
                        onClick={() => clear(rowId)}
                    />
                </span>
            )}
        </div>
    )
}
