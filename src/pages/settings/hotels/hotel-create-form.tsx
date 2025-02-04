import FormAction from "@/components/custom/form-action"
import FormImageInput from "@/components/form/image-input"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { Button } from "@/components/ui/button"
import { CITIES, HOTELS } from "@/constants/api-endpoints"
import { HOTEL_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form"

const headers = {
    "Content-Type": "multipart/form-data",
}

export default function HotelCreateForm() {
    const queryClient = useQueryClient()

    function onSuccess() {
        closeModal()
        queryClient.removeQueries({
            queryKey: [HOTELS],
        })
    }

    const { closeModal } = useModal()
    const { store } = useStore<Hotel>(HOTEL_DATA)

    const defaultValues = useMemo(() => {
        if (store?.id) {
            return {
                ...store,
                city: store.city.id,
                images: [...(store.images || []), { id: null, image: "none" }],
                rooms: [...(store.rooms || [])],
            }
        } else {
            return {
                name: "",
                city: 1,
                images: [{ id: null, image: "none" }],
                rooms: [{ name: "", price: 0 }],
                star: 0,
                id: null,
            }
        }
    }, [store])

    const form = useForm<HotelCreate>({ defaultValues })

    const { data: cities } = useGet<City[]>(CITIES)

    const { mutate, isPending } = usePost({ onSuccess }, { headers })
    const { mutate: patch, isPending: isUpdating } = usePatch(
        { onSuccess },
        { headers },
    )

    const {
        fields: rooms,
        append: appendRoom,
        remove: removeRoom,
    } = useFieldArray({
        control: form.control,
        name: "rooms",
    })

    const {
        fields: images,
        append,
        remove,
        update,
    } = useFieldArray({
        control: form.control,
        name: "images",
        keyName: "key",
    })

    function onSubmit(data: HotelCreate) {
        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("city", String(data.city))
        formData.append("rooms", JSON.stringify(data.rooms))

        for (const image of data.images) {
            if (image.image && !image.id && image.image !== "none") {
                formData.append("images", image.image)
            }
        }

        if (store?.id) {
            patch(HOTELS + `/${store.id}`, formData)
        } else {
            mutate(HOTELS, formData)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
        >
            <FormInput methods={form} name="name" label="Nomi" required />

            <SelectField
                name="city"
                methods={form}
                required
                label="Shahar"
                options={cities || []}
            />

            <div className="flex gap-2 flex-wrap my-1">
                {images?.map((field, i) => (
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
                                if (images.length > 1) {
                                    remove(i)
                                } else {
                                    update(i, {
                                        id: null,
                                        image: "none",
                                    })
                                }
                            }}
                        >
                            <Trash2 size={20} className="text-destructive" />
                        </span>
                    </div>
                ))}
            </div>

            {rooms?.map((room, i) => (
                <div key={room.id} className="flex gap-2 mb-2 items-end">
                    <FormInput
                        methods={form}
                        name={`rooms.${i}.name`}
                        label={i === 0 ? "Nomi" : ""}
                        placeholder="Nomi"
                        required
                    />
                    <FormNumberInput
                        methods={form}
                        name={`rooms.${i}.price`}
                        label={i === 0 ? "Narxi" : ""}
                        placeholder="Narxi"
                        required
                    />
                    <Button
                        size={"icon"}
                        variant={"destructive-muted"}
                        className={"min-w-8"}
                        onClick={() => removeRoom(i)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            ))}

            <Button
                type="button"
                variant={"outline"}
                onClick={() => appendRoom({ name: "", price: 0, id: null })}
                className="w-full border-dashed"
            >
                Qo'shish
            </Button>

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
