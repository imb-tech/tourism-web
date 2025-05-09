import { useModal } from "@/hooks/use-modal"
import { useDelete } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode } from "@tanstack/react-router"
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
    path: string
    id: string | number
    name?: ReactNode
    onSuccessAction?: () => void
    modalKey?: string
    refetch?: boolean
    refetchKey?: string
    refetchKeys?: unknown[]
}

export default function DeleteModal({
    path,
    id,
    name = "",
    onSuccessAction,
    modalKey = "delete",
    refetch = true,
    refetchKey,
    refetchKeys,
}: IProps) {
    const { closeModal } = useModal(modalKey)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useDelete({
        onSuccess: () => {
            toast.success("Successfully deleted!", { icon: "✅" })
            if (onSuccessAction) {
                onSuccessAction()
            }
            if (refetch) {
                queryClient.refetchQueries({
                    queryKey: refetchKey ? [refetchKey] : [path],
                })
            }
            if (refetchKeys) {
                queryClient.refetchQueries({
                    predicate: (q) => {
                        return refetchKeys?.includes(q.queryKey[0])
                    },
                })
            }
            closeModal()
        },
    })

    const handleDelete = () => {
        mutate(path + `/${id}`)
    }

    return (
        <Modal modalKey={modalKey}>
            <DialogHeader>
                <DialogTitle className="font-normal">
                    Are you sure you want to delete {name}?
                </DialogTitle>
                <DialogDescription>
                    This action cannot be undone!
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="grid grid-cols-2 gap-2">
                <Button
                    variant={"outline"}
                    disabled={isPending}
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    variant={"destructive"}
                    onClick={handleDelete}
                    loading={isPending}
                >
                    Delete
                </Button>
            </DialogFooter>
        </Modal>
    )
}
