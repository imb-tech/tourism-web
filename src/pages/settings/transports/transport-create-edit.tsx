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
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

export default function TransportCreateEdit() {
    const queryClient = useQueryClient()

    const { closeModal } = useModal()
    const { store, remove } = useStore<Transport>(TRANSPORT_DATA)

    const form = useForm<Transport>({
        values:
            store ?
                {
                    ...store,
                    images: [
                        ...(store?.images || []),
                        {
                            id: null,
                            image: "none",
                        },
                    ],
                }
            :   {
                    id: -1,
                    name: "",
                    size: 0,
                    price: 0,
                    year: 0,
                    type: 1,
                    images: [
                        {
                            id: null,
                            image: "none",
                        },
                    ],
                },
    })

    const {
        fields,
        append,
        remove: removeImage,
        update,
    } = useFieldArray({
        control: form.control,
        name: "images",
        keyName: "key",
    })

    const [deleted_images, setDeletedImages] = useState<number[]>([])

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [TRANSPORTS],
        })
    }

    const { mutate: post, isPending } = usePost(
        { onSuccess },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    const { mutate: patch, isPending: isUpdating } = usePatch(
        { onSuccess },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    function handleSubmit(vals: Transport) {
        const formData = new FormData()

        vals.images.forEach((image) => {
            if (image.image && !image.id && image.image !== "none") {
                formData.append("new_images", image.image)
            }
        })

        formData.append("name", vals.name)
        formData.append("size", String(vals.size))
        formData.append("price", String(vals.price))
        formData.append("year", String(vals.year))
        for (const image of deleted_images) {
            formData.append("deleted_images", image.toString())
        }

        if (store?.id) {
            patch(TRANSPORTS + `/${store.id}`, formData)
        } else {
            post(TRANSPORTS, formData)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-5"
        >
            <FormInput methods={form} name="name" label="Name" required />

            <FormNumberInput
                thousandSeparator=" "
                label="Capacity"
                methods={form}
                name="size"
                required
            />

            <FormNumberInput
                thousandSeparator=" "
                label="Price"
                methods={form}
                name="price"
                required
            />

            <FormNumberInput
                thousandSeparator=""
                label="Year"
                methods={form}
                name="year"
                required
            />

            <div className="flex gap-2 flex-wrap">
                {fields?.map((field, i) => (
                    <div
                        key={field.key}
                        className="relative border p-1 rounded-xl flex flex-col gap-1"
                    >
                        <FormImageInput
                            methods={form}
                            name={`images.${i}.image`}
                            handleChange={() => {
                                append({
                                    id: null,
                                    image: "none",
                                })
                            }}
                            disabled={!!field.image && field.image !== "none"}
                        />
                        <span
                            className=" cursor-pointer flex items-center justify-center rounded-md"
                            onClick={() => {
                                if (fields.length > 1) {
                                    removeImage(i)
                                } else {
                                    update(i, {
                                        id: null,
                                        image: "none",
                                    })
                                }
                                if (field.id) {
                                    setDeletedImages((prev) => [
                                        ...prev,
                                        Number(field.id),
                                    ])
                                }
                            }}
                        >
                            <Trash2 size={20} className="text-destructive" />
                        </span>
                    </div>
                ))}
            </div>

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
