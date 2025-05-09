import FormAction from "@/components/custom/form-action"
import Image from "@/components/custom/image"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { Button } from "@/components/ui/button"
import SeeInView from "@/components/ui/see-in-view"
import { CITIES, FOODS, RESTAURANTS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import FormMultiCombobox from "./select-food"

export default function RestaurantCreateForm() {
    const { data: cities, isLoading } = useGet<City[]>(CITIES)
    const { data: foods } = useGet<Food[]>(FOODS)

    const queryClient = useQueryClient()
    const { store } = useStore<Restaurant>(RESTAURANTS)
    const { closeModal } = useModal()
    const [deleted_sets, setDeletedSets] = useState<number[]>([])

    const form = useForm<Restaurant & { city: number }>({
        defaultValues:
            store ?
                {
                    ...store,
                    city: store.city.id,
                }
            :   {},
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sets",
        keyName: "key",
    })

    function onSuccess() {
        closeModal()
        remove()
        queryClient.removeQueries({
            queryKey: [RESTAURANTS],
        })
    }

    const { mutate: createRestaurant, isPending } = usePost({ onSuccess })
    const { mutate: updateRestaurant, isPending: isUpdating } = usePatch({
        onSuccess,
    })

    function onSubmit(vals: Restaurant) {
        if (store?.id) {
            updateRestaurant(RESTAURANTS + `/${store.id}`, {
                ...vals,
                deleted_sets,
            })
        } else {
            createRestaurant(RESTAURANTS, vals)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
        >
            <FormInput
                methods={form}
                name="name"
                required
                label="Retaurant name"
            />

            <SelectField
                isLoading={isLoading}
                methods={form}
                name="city"
                required
                label="City"
                options={cities || []}
            />

            {fields.map((field, index) => (
                <div key={field.id}>
                    <div className="flex gap-2 items-end">
                        <FormInput
                            methods={form}
                            name={`sets.${index}.name`}
                            required
                            label={index === 0 ? "Name of set" : ""}
                            placeholder="Name of set"
                        />

                        <FormNumberInput
                            thousandSeparator=" "
                            methods={form}
                            name={`sets.${index}.price`}
                            required
                            label={index === 0 ? "Price of set" : ""}
                            placeholder="Price of set"
                        />

                        <Button
                            size={"icon"}
                            type="button"
                            className={"min-w-9"}
                            variant={"destructive-muted"}
                            onClick={() => {
                                if (field.id) {
                                    setDeletedSets([...deleted_sets, field.id])
                                }
                                remove(index)
                            }}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>

                    <div className="flex gap-1 mt-2 flex-wrap">
                        {form
                            .watch(`sets.${index}.foods`)
                            ?.map((food, index) => (
                                <div key={index}>
                                    <SeeInView
                                        url={
                                            foods?.find((el) => el.id === food)
                                                ?.image || ""
                                        }
                                    >
                                        <Image
                                            src={
                                                foods?.find(
                                                    (el) => el.id === food,
                                                )?.image
                                            }
                                            alt=""
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </SeeInView>
                                </div>
                            ))}
                        <FormMultiCombobox
                            wrapperClassName={"w-auto"}
                            options={foods || []}
                            methods={form}
                            name={`sets.${index}.foods`}
                        />
                    </div>
                </div>
            ))}

            <Button
                type="button"
                variant={"outline"}
                onClick={() =>
                    append({
                        id: null,
                        name: "",
                        price: 0,
                        foods: [],
                    })
                }
            >
                Add new
            </Button>

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
