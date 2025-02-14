import { useModal } from "@/hooks/use-modal"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog"
import Modal from "./modal"

interface IProps {
    onSuccessAction: () => Promise<void>
    title?: ReactNode
    description?: ReactNode
    modalKey?: string
    refetch?: boolean
    refetchKey?: string
    refetchKeys?: unknown[]
}

export default function ConfirmCancelModal({
    onSuccessAction,
    title = "Siz rostdan ham buni bajarishni xohlaysizmi?",
    description = "Bu amal qaytarib bo‘lmaydi!",
    modalKey = "confirm",
    refetch = true,
    refetchKey,
    refetchKeys,
}: IProps) {
    const { closeModal } = useModal(modalKey)
    const queryClient = useQueryClient()
    const handleConfirm = async () => {
        try {
            await onSuccessAction()
            toast.success("Amal muvaffaqiyatli bajarildi", { icon: "✅" })
            if (refetch) {
                queryClient.refetchQueries({
                    queryKey: refetchKey ? [refetchKey] : [],
                })
            }
            if (refetchKeys) {
                queryClient.refetchQueries({
                    predicate: (q) => refetchKeys.includes(q.queryKey[0]),
                })
            }
            closeModal()
        } catch (error) {
            toast.error("Amalni bajarishda xatolik yuz berdi", { icon: "❌" })
            closeModal()
        }
    }

    return (
        <Modal modalKey={modalKey}>
            <DialogHeader>
                <DialogTitle className="font-normal">{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={closeModal}>
                    Bekor qilish
                </Button>
                <Button onClick={handleConfirm}>Tasdiqlash</Button>
            </DialogFooter>
        </Modal>
    )
}
