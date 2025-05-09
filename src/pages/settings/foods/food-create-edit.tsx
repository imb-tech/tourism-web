import FormAction from "@/components/custom/form-action"
import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import { FOODS } from "@/constants/api-endpoints"
import { FOOD_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function FoodCreateEdit() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(FOODS)
    const { store, remove } = useStore<Food>(FOOD_DATA)

    const headers = {
        "Content-Type": "multipart/form-data",
    }

    const form = useForm<Food>({
        defaultValues: store || {},
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [FOODS],
        })
    }

    const { mutate: post, isPending } = usePost({ onSuccess }, { headers })
    const { mutate: patch, isPending: isUpdating } = usePatch(
        { onSuccess },
        { headers },
    )

    const dirty = form.formState.dirtyFields
    function handleSubmit(vals: Food) {
        const formData = new FormData()

        if (dirty.name) {
            formData.append("name", vals.name)
        }

        if (dirty.image) {
            formData.append("image", vals.image)
        }

        if (store?.id) {
            patch(FOODS + `/${store.id}`, formData)
        } else {
            post(FOODS, formData)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
        >
            <FormInput methods={form} name="name" required label="Taom nomi" />

            <FormImagePicker
                methods={form}
                name="image"
                required
                label="Photo"
            />

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
