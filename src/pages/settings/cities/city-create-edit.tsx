import FormAction from "@/components/custom/form-action"
import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import { CITIES } from "@/constants/api-endpoints"
import { CITY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function CityCreateEdit() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("city")
    const { store, remove } = useStore<City>(CITY_DATA)
    const headers = {
        "Content-Type": "multipart/form-data",
    }

    const form = useForm<City>({
        defaultValues: store || {},
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [CITIES],
        })
    }

    const { mutate: post, isPending } = usePost({ onSuccess }, { headers })
    const { mutate: patch, isPending: isUpdating } = usePatch(
        { onSuccess },
        { headers },
    )
    const dirty = form.formState.dirtyFields

    function handleSubmit(vals: FormCity) {
        const formData = new FormData()

        for (const key in dirty) {
            if (
                Object.prototype.hasOwnProperty.call(dirty, key) &&
                dirty[key as keyof typeof dirty]
            ) {
                const value = vals[key as keyof FormCity]

                if (typeof value === "object" && value !== null) {
                    formData.append(key, value)
                } else if (typeof value === "string") {
                    formData.append(key, value)
                }
            }
        }

        if (store?.id) {
            patch(CITIES + `/${store.id}`, formData)
        } else {
            post(CITIES, formData)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormInput methods={form} name="name" required label="City name" />
            <FormImagePicker
                methods={form}
                name="image"
                required
                label="Iamge"
            />

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
