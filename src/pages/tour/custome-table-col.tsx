import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode
    className?: string
}

export default function CustomTableCol({ children, className }: Props) {
    return (
        <div
            className={cn(
                "flex flex-col justify-center text-xs font-light",
                className,
            )}
        >
            {children}
        </div>
    )
}
