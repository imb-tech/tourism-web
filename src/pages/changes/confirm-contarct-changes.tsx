import FormAction from "@/components/custom/form-action"
import FormTextarea from "@/components/form/textarea"
import { CHANGES } from "@/constants/api-endpoints"
import { CHANGE_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function ConfirmContractChanges() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("contract")
    const { store, remove } = useStore<ChnagesSetStore>(CHANGE_DATA)

    const form = useForm<ChangeDocumenContracttForm>({})

    function onSuccess() {
        remove()
        queryClient.refetchQueries({
            queryKey: [CHANGES],
        })
        closeModal()
    }

    const { mutate: patch, isPending: isUpdating } = usePatch(
        { onSuccess },
        { headers: { "Content-Type": "multipart/form-data" } },
    )

    function handleSubmit(vals: ChangeDocumenContracttForm) {
        const formData = new FormData()
        formData.append("contract", vals.contract)
        formData.append("comment", vals.comment)
        formData.append("condition", store?.condition?.toString() ?? "")

        patch(CHANGES + `/${store?.id}`, formData)
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-2 mt-2">
            <FormTextarea
                methods={form}
                name="comment"
                required
                label="Tahrirlashni tasdiqlang"
            />

            <input
                className="mt-4"
                onChange={(e) => form.setValue("contract", e.target.files![0])}
                required
                type="file"
            />

            <FormAction
                loading={isUpdating}
                submitName="Tasdiqlash"
                cancelName="Bekor qilish"
            />
        </form>
    )
}
