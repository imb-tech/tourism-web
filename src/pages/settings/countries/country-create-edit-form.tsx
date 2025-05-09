import FormAction from "@/components/custom/form-action"
import FormInput from "@/components/form/input"
import { COUNTRIES } from "@/constants/api-endpoints"
import { COUNTRY_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function CountryCreateEditForm() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal("country")
    const { store, remove } = useStore<Country>(COUNTRY_DATA)

    const form = useForm<Country>({
        defaultValues: store || {},
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [COUNTRIES],
        })
    }

    const { mutate: post, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isUpdating } = usePatch({ onSuccess })

    function handleSubmit(vals: Country) {
        if (store?.id) {
            patch(COUNTRIES + `/${store.id}`, vals)
        } else {
            post(COUNTRIES, vals)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormInput
                methods={form}
                name="name"
                required
                label="Country name"
            />
            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
