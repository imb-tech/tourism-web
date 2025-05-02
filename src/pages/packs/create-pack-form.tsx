import FormAction from "@/components/custom/form-action"
import FormDatePicker from "@/components/form/date-picker"
import FormInput from "@/components/form/input"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { COUNTRIES, LIGHT, TOUR } from "@/constants/api-endpoints"
import { TOUR_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export default function CreatePackForm() {
    const queryClient = useQueryClient()
    const { closeModal } = useModal()

    const { store } = useStore<PackItem | undefined>(TOUR_DATA)

    const form = useForm<CreatePack>({
        defaultValues:
            store ?
                {
                    ...store,
                    manager: store.manager?.id,
                    country: store.country?.id,
                }
            :   {},
    })

    const { data: countries, isLoading } = useGet<Country[]>(COUNTRIES)
    const { data: managers, isLoading: isManagersLoading } = useGet<Manager[]>(
        LIGHT,
        { params: { role_id: 2 } },
    )

    function onSuccess() {
        closeModal()
        queryClient.removeQueries({
            queryKey: [TOUR],
        })
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: update, isPending: isUpdating } = usePatch({ onSuccess })

    function handleSubmit(vals: CreatePack) {
        if (store?.id) {
            update(TOUR + `/${store.id}`, vals)
        } else {
            mutate(TOUR, vals)
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
        >
            <FormInput required methods={form} name="client" label="Mijoz" />

            <SelectField
                name="manager"
                label="Manager"
                required
                isLoading={isManagersLoading}
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
                required
                methods={form}
                isLoading={isLoading}
                options={countries || []}
            />

            <div className="flex gap-3 w-full">
                <FormDatePicker
                    format="yyyy-MM-dd"
                    required
                    methods={form}
                    name="start"
                    label="Date of arrival"
                    wrapperClassName={"w-full"}
                />

                <FormDatePicker
                    format="yyyy-MM-dd"
                    required
                    methods={form}
                    name="end"
                    label="Date of departure"
                    wrapperClassName={"w-full"}
                />
            </div>

            <div className="flex gap-3 w-full">
                <FormNumberInput
                    methods={form}
                    required
                    name="days"
                    label="Kun"
                    placeholder="How many days will they stay?"
                    wrapperClassName={"w-full"}
                />

                <FormNumberInput
                    methods={form}
                    required
                    name="nights"
                    label="Tun"
                    placeholder="How many nights do they stay?"
                    wrapperClassName={"w-full"}
                />
            </div>

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
