import FormAction from "@/components/custom/form-action"
import FormImagePicker from "@/components/form/image-picker"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import FormTextarea from "@/components/form/textarea"
import { CITIES, ENTERANCES } from "@/constants/api-endpoints"
import { ENTERANCE_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function EnteranceCreateEditForm() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal(ENTERANCE_DATA)
    const { store, remove } = useStore<Enterance>(ENTERANCE_DATA)
    const { data: cities } = useGet<City[]>(CITIES)
    const headers = {
        "Content-Type": "multipart/form-data",
    }

    const form = useForm<CreaateEnterance>({
        defaultValues:
            store ?
                {
                    ...store,
                    city: store.city.id,
                }
            :   { price: 0 },
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [ENTERANCES],
        })
    }

    const { mutate: post, isPending } = usePost({ onSuccess }, { headers })
    const { mutate: patch, isPending: isUpdating } = usePatch(
        { onSuccess },
        { headers },
    )
    const dirty = form.formState.dirtyFields

    function handleSubmit(vals: CreaateEnterance) {
        const values = {
            ...vals,
            price: Number(vals.price) > 0 ? vals.price : "0",
        }
        const formData = new FormData()

        for (const key in dirty) {
            if (
                Object.prototype.hasOwnProperty.call(dirty, key) &&
                dirty[key as keyof typeof dirty]
            ) {
                const value = values[key as keyof CreaateEnterance]

                if (value && typeof value === "object" && value !== null) {
                    formData.append(key, value)
                } else if (typeof value === "string") {
                    formData.append(key, value)
                } else if (typeof value === "number") {
                    formData.append(key, value > 0 ? value.toString() : "0")
                }
            }
        }
        if (store?.id) {
            patch(ENTERANCES + `/${store.id}`, formData)
        } else {
            post(ENTERANCES, formData)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5"
        >
            <FormInput methods={form} name="name" label="Joy nomi" required />

            <FormNumberInput
                thousandSeparator=" "
                label="Kirish narxi"
                methods={form}
                name="price"
            />

            <SelectField
                label="Joylashgan shahri"
                options={cities || []}
                methods={form}
                name="city"
                required
            />
            <FormTextarea methods={form} name="desc" label="Description" />

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
