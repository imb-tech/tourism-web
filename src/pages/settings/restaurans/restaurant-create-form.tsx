import FormAction from "@/components/custom/form-action"
import FormInput from "@/components/form/input"
import FormMultiCombobox from "@/components/form/multi-combobox"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { Button } from "@/components/ui/button"
import { CITIES, FOODS, RESTAURANTS } from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

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
                label="Restoran nomi"
            />

            <SelectField
                isLoading={isLoading}
                methods={form}
                name="city"
                required
                label="Shahar"
                options={cities || []}
            />

            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-end">
                    <FormInput
                        methods={form}
                        name={`sets.${index}.name`}
                        required
                        label={index === 0 ? "Set nomi" : ""}
                        placeholder="Set nomi"
                    />

                    <FormNumberInput
                        thousandSeparator=" "
                        methods={form}
                        name={`sets.${index}.price`}
                        required
                        label={index === 0 ? "Set narxi" : ""}
                        placeholder="Set narxi"
                    />

                    <FormMultiCombobox
                        options={foods || []}
                        methods={form}
                        name={`sets.${index}.foods`}
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
                Set qo'shish
            </Button>

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
