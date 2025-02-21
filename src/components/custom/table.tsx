import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import useEditableRequest from "@/pages/tour/editable-request"
import ConfirmCancelModal from "./confirm-modal"

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
    const { clear } = useEditableRequest()
    const { closeModal } = useModal("tour-detail-delete")
    const { store, remove } = useStore<number>("tour-detail-delete")

    async function handleClear() {
        if (!store) return
        await clear(store)
        closeModal()
        remove()
    }

    return (
        <div
            className={cn(
                "w-full grid bg-background rounded-sm px-3 py-1",
                grid,
                className,
            )}
        >
            {children}

            <ConfirmCancelModal
                modalKey="tour-detail-delete"
                onSuccessAction={handleClear}
            />
        </div>
    )
}
