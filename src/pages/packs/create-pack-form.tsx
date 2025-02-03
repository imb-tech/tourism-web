import FormAction from "@/components/custom/form-action"
import FormDatePicker from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { TOUR } from "@/constants/api-endpoints"
import { useGet, usePost } from "@/services/default-requests"
import { useForm } from "react-hook-form"

export default function CreatePackForm() {
    const form = useForm<CreatePack>()
    const { data: countries } = useGet<Country[]>("common/countries")
    const { data: managers } = useGet<Manager[]>("users/light")

    const { mutate, isPending } = usePost({})

    function handleSubmit(vals: CreatePack) {
        mutate(TOUR, vals)
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
        >
            <FormInput methods={form} name="client" label="Mijoz" />

            <SelectField
                name="manager"
                label="Manager"
                methods={form}
                options={
                    managers?.map((m) => ({
                        name: `${m.first_name} ${m.last_name}`,
                        id: m.id,
                    })) || []
                }
            />

            <SelectField
                name="country"
                label="Davlat"
                methods={form}
                options={countries || []}
            />

            <div className="flex gap-3 w-full">
                <FormDatePicker
                    format="yyyy-MM-dd"
                    methods={form}
                    name="start"
                    label="Kelish sanasi"
                    wrapperClassName={"w-full"}
                />

                <FormDatePicker
                    format="yyyy-MM-dd"
                    required
                    methods={form}
                    name="end"
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

            <FormAction loading={isPending} />
        </form>
    )
}
