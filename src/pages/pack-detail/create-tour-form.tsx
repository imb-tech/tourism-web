import FormAction from "@/components/custom/form-action"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { TOUR_DATA } from "@/constants/localstorage-keys"
import { useStore } from "@/hooks/use-store"
import { useForm } from "react-hook-form"

export default function CreateTourForm() {
    const { store } = useStore<TourItem>(TOUR_DATA)

    const form = useForm<TourItem>({
        defaultValues: store || {},
    })

    function handleSubmit(vals: TourItem) {
        console.log(vals)
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
        >
            <div className="flex gap-3 w-full">
                <FormNumberInput
                    methods={form}
                    name="users"
                    label="Turistlar soni"
                    placeholder="0"
                    wrapperClassName={"w-full"}
                />

                <FormNumberInput
                    methods={form}
                    name="leaders"
                    label="Tun"
                    placeholder="0"
                    wrapperClassName={"w-full"}
                />
            </div>

            <SelectField
                name="hotel_type"
                label="Mexmonxona turi"
                placeholder="Mehmonxona turini tanlang"
                methods={form}
                options={[
                    {
                        name: "Jesica",
                        id: 1,
                    },
                    {
                        name: "Xudoyor",
                        id: 2,
                    },
                ]}
            />

            <FormAction />
        </form>
    )
}
