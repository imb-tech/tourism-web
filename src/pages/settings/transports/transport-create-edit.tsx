import FormAction from "@/components/custom/form-action"
import FormImageInput from "@/components/form/image-input"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import { TRANSPORTS } from "@/constants/api-endpoints"
import { TRANSPORT_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function TransportCreateEdit() {
    const queryClient = useQueryClient()

    const { closeModal } = useModal()
    const { store, remove } = useStore<Transport>(TRANSPORT_DATA)

    const form = useForm<Transport>({
        defaultValues: store || {},
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [TRANSPORTS],
        })
    }

    const { mutate: post, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isUpdating } = usePatch({ onSuccess })

    function handleSubmit(vals: Transport) {
        if (store?.id) {
            patch(TRANSPORTS + `/${store.id}`, vals)
        } else {
            post(TRANSPORTS, vals)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5"
        >
            <FormInput methods={form} name="name" label="Joy nomi" />

            <FormNumberInput
                thousandSeparator=" "
                label="Sig'imi"
                methods={form}
                name="size"
            />

            <FormNumberInput
                thousandSeparator=" "
                label="Narxi"
                methods={form}
                name="price"
            />

            <FormImageInput methods={form} name="images" />

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
