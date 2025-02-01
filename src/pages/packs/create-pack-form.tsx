import FormAction from "@/components/custom/form-action"
import FormDatePicker from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { useForm } from "react-hook-form"

export default function CreatePackForm() {
    const form = useForm<CreatePack>()

    function handleSubmit(vals: CreatePack) {
        console.log(vals)
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
        >
            <FormInput methods={form} name="name" label="Nomi" />

            <SelectField
                name="manager"
                label="Manager"
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

            <SelectField
                name="country"
                label="Davlat"
                methods={form}
                options={[
                    {
                        name: "O'zbekiston",
                        id: 1,
                    },
                    {
                        name: "Xitoy",
                        id: 2,
                    },
                ]}
            />

            <div className="flex gap-3 w-full">
                <FormDatePicker
                    methods={form}
                    name="start_date"
                    label="Kelish sanasi"
                    wrapperClassName={"w-full"}
                />

                <FormDatePicker
                    required
                    methods={form}
                    name="end_date"
                    label="Ketish sanasi"
                    wrapperClassName={"w-full"}
                />
            </div>

            <div className="flex gap-3 w-full">
                <FormNumberInput
                    methods={form}
                    name="days"
                    label="Kun"
                    placeholder="Necha kun turishadi"
                    wrapperClassName={"w-full"}
                />

                <FormNumberInput
                    methods={form}
                    name="nights"
                    label="Tun"
                    placeholder="Necha tun turishadi"
                    wrapperClassName={"w-full"}
                />
            </div>

            <FormAction />
        </form>
    )
}
