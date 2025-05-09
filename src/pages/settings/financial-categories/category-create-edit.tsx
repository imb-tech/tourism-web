import FormAction from "@/components/custom/form-action"
import FormInput from "@/components/form/input"
import { FINANCIAL_CATEGORIES } from "@/constants/api-endpoints"
import { CATEGORY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function CategoryCreateEdit() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(FINANCIAL_CATEGORIES)
    const { store, remove } = useStore<FinancialCategory>(CATEGORY_DATA)

    const form = useForm<FinancialCategory>({
        defaultValues: store || {},
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [FINANCIAL_CATEGORIES],
        })
    }

    const { mutate: post, isPending: isCreating } = usePost({ onSuccess })
    const { mutate: patch, isPending: isUpdating } = usePatch({ onSuccess })

    function handleSubmit(vals: FinancialCategory) {
        if (store?.id) {
            patch(FINANCIAL_CATEGORIES + `/${store.id}`, vals)
        } else {
            post(FINANCIAL_CATEGORIES, vals)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormInput
                methods={form}
                name="name"
                required
                label="Category nomi"
            />
            <FormAction loading={isCreating || isUpdating} />
        </form>
    )
}
