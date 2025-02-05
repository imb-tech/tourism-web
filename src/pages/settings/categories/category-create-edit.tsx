import FormAction from "@/components/custom/form-action"
import FormInput from "@/components/form/input"
import { CATEGORIES } from "@/constants/api-endpoints"
import { CATEGORY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function CategoryCreateEdit() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("category")
    const { store, remove } = useStore<Category>(CATEGORY_DATA)

    const form = useForm<Category>({
        defaultValues: store || {},
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [CATEGORIES],
        })
    }

    const { mutate: post, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isUpdating } = usePatch({ onSuccess })

    function handleSubmit(vals: Category) {
        if (store?.id) {
            patch(CATEGORIES + `/${store.id}`, vals)
        } else {
            post(CATEGORIES, vals)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormInput
                methods={form}
                name="name"
                required
                label="Categoriya nomi"
            />
            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
