import { cn } from "@/lib/utils"
import { ReactNode } from "@tanstack/react-router"

type Props = {
    className?: string
    icon: ReactNode
    label: string
    onClick?: () => void
}

export default function AddButton({
    icon: Icon,
    label,
    onClick,
    className,
}: Props) {
    function handleAdd() {
        const forms = document.querySelectorAll("form")
        forms.forEach((form) => {
            form.reset()
        })
        onClick?.()
    }

    return (
        <div className={cn("h-full", className)}>
            <button
                onClick={handleAdd}
                className="w-full h-full flex flex-col items-center justify-center p-8 border-[1px] border-dashed border-primary rounded-lg hover:bg-gray-50 transition-colors bg-background"
            >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Icon className="text-primary font-light" size={32} />
                </div>
                <span className="text-gray-900 text-lg font-medium">
                    {label}
                </span>
            </button>
        </div>
    )
}
