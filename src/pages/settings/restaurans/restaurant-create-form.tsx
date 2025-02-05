import FormAction from "@/components/custom/form-action"
import FormInput from "@/components/form/input"
import FormMultiCombobox from "@/components/form/multi-combobox"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { Button } from "@/components/ui/button"
import { CITIES, FOODS, RESTAURANTS } from "@/constants/api-endpoints"
import { useGet, usePost } from "@/services/default-requests"
import { Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"

export default function RestaurantCreateForm() {
    const { data: cities, isLoading } = useGet<City[]>(CITIES)
    const { data: foods } = useGet<Food[]>(FOODS)

    const form = useForm<Restaurant>()

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sets",
    })

    const { mutate: createRestaurant, isPending } = usePost()

    function onSubmit(vals: Restaurant) {
        createRestaurant(RESTAURANTS, vals)
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
                        onClick={() => remove(index)}
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

            <FormAction loading={isPending} />
        </form>
    )
}
