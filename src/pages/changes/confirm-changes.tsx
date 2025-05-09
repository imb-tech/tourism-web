import FormAction from "@/components/custom/form-action"
import FormTextarea from "@/components/form/textarea"
import { CHANGES } from "@/constants/api-endpoints"
import { CHANGE_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function ConfirmChanges() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal()
    const { store, remove } = useStore<ChnagesSetStore>(CHANGE_DATA)

    const form = useForm<ChangeDocumentForm>({})

    function onSuccess() {
        remove()
        queryClient.refetchQueries({
            queryKey: [CHANGES],
        })
        closeModal()
    }

    const { mutate: patch, isPending: isUpdating } = usePatch({ onSuccess })

    function handleSubmit(vals: ChangeDocumentForm) {
        patch(CHANGES + `/${store?.id}`, {
            comment: vals.comment,
            condition: store?.condition,
        })
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-4">
            <FormTextarea
                methods={form}
                name="comment"
                required
                label="Editni tasdiqlang"
            />
            <FormAction
                loading={isUpdating}
                submitName="Tasdiqlash"
                cancelName="Bekor qilish"
            />
        </form>
    )
}
