import FormAction from "@/components/custom/form-action"
import FormImageInput from "@/components/form/image-input"
import FormInput from "@/components/form/input"
import SelectField from "@/components/form/select-field"
import { Button } from "@/components/ui/button"
import { CITIES, HOTELS } from "@/constants/api-endpoints"
import { HOTEL_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import HotelRoomTypes from "./hotel-room-types"

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
                rooms: [
                    {
                        name: "",
                        price: 0,
                        seasons: [
                            {
                                id: null,
                                start_date: "",
                                end_date: "",
                                price: 0,
                            },
                        ],
                    },
                ],
                star: 0,
                id: null,
            }
        }
    }, [store])

    const [deletetSeasons, setDeletedSeasons] = useState<number[]>([])
    const [deletetRooms, setDeletedRooms] = useState<number[]>([])
    const [deletedImages, setDeletedImages] = useState<number[]>([])

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
        keyName: "key",
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
        formData.append("star", data.star.toString())
        formData.append("rooms", JSON.stringify(data.rooms))

        if (deletetSeasons.length) {
            formData.append("deleted_seasons", `[${deletetSeasons.join(",")}]`)
        }
        if (deletetRooms.length) {
            formData.append("deleted_rooms", `[${deletetRooms.join(",")}]`)
        }
        if (deletedImages.length) {
            formData.append("deleted_images", `[${deletedImages.join(",")}]`)
        }

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

    function handleDeleteRoom(id: number | null, index: number) {
        removeRoom(index)
        if (id) {
            setDeletedRooms?.((c) => [...c, id])
        }
    }

    function handleDeleteImage(id: number | null, index: number) {
        remove(index)
        if (images.length > 1) {
            remove(index)
        } else {
            update(index, {
                id: null,
                image: "none",
            })
        }
        if (id) {
            setDeletedImages?.((c) => [...c, id])
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

            <SelectField
                name="star"
                methods={form}
                required
                label="Star"
                options={[
                    { id: 1, name: "1 yulduz" },
                    { id: 2, name: "2 yulduz" },
                    { id: 3, name: "3 yulduz" },
                    { id: 4, name: "4 yulduz" },
                    { id: 5, name: "5 yulduz" },
                ]}
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
                            onClick={() => handleDeleteImage(field.id, i)}
                        >
                            <Trash2 size={20} className="text-destructive" />
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-5">
                {rooms.map((field, i) => (
                    <div key={field.key} className="grid grid-cols-4">
                        <FormInput
                            methods={form}
                            name={`rooms.${i}.name`}
                            label="Xona nomi"
                            wrapperClassName="col-span-3"
                        />
                        <Button
                            size={"icon"}
                            className="mt-4 ml-2"
                            variant={"destructive-muted"}
                            onClick={() => handleDeleteRoom(field.id, i)}
                        >
                            <Trash2 />
                        </Button>
                        <HotelRoomTypes
                            roomIndex={i}
                            methods={form}
                            setDeletedSeasons={setDeletedSeasons}
                        />
                    </div>
                ))}
            </div>

            <Button
                type="button"
                variant={"outline"}
                onClick={() =>
                    appendRoom({
                        id: null,
                        name: "",
                        seasons: [
                            {
                                id: null,
                                start_date: "",
                                end_date: "",
                                price: 0,
                            },
                        ],
                    })
                }
                className="w-full border-dashed"
            >
                Xona qo'shish
            </Button>

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
