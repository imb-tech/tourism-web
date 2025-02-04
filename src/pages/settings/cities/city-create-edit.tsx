import FormAction from "@/components/custom/form-action"
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

    const { mutate: post, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isUpdating } = usePatch({ onSuccess })

    function handleSubmit(vals: City) {
        if (store?.id) {
            patch(CITIES + `/${store.id}`, vals)
        } else {
            post(CITIES, vals)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormInput methods={form} name="name" required label="Sahar nomi" />
            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
