import FormAction from "@/components/custom/form-action"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import { PLANS } from "@/constants/api-endpoints"
import { TOUR_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { usePatch, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { useForm } from "react-hook-form"

export default function CreateTourForm() {
    const { store } = useStore<PlanItem>(TOUR_DATA)
    const { closeModal } = useModal(TOUR_DATA)
    const { pack } = useParams({ from: "/_main/packs/$pack/" })
    const queryClient = useQueryClient()

    function onSuccess() {
        queryClient.removeQueries({
            queryKey: [PLANS],
        })
        closeModal()
    }

    const { mutate, isPending } = usePost({ onSuccess })
    const { mutate: patch, isPending: isUpdating } = usePatch({ onSuccess })

    const form = useForm<PlanItem>({
        defaultValues: store || {},
    })

    function handleSubmit(vals: PlanItem) {
        vals.leaders_count = vals.leaders_count || 0

        if (store?.id) {
            patch(PLANS + `/${store.id}`, {
                ...vals,
                tour: Number(pack),
            })
        } else {
            mutate(PLANS, {
                ...vals,
                tour: Number(pack),
            })
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
        >
            <div className="flex gap-3 w-full">
                <FormNumberInput
                    methods={form}
                    required
                    name="tourists_count"
                    label="Tourists count"
                    placeholder="0"
                    wrapperClassName={"w-full"}
                />

                <FormNumberInput
                    methods={form}
                    name="leaders_count"
                    label="Number of leaders"
                    placeholder="0"
                    wrapperClassName={"w-full"}
                />
            </div>

            <SelectField
                name="hotel_stars"
                label="Hotel type"
                required
                placeholder="Select hotel type"
                methods={form}
                options={Array(5)
                    .fill(5)
                    .map((_, i) => ({ id: i + 1, name: `${i + 1} yulduzli` }))}
            />

            <FormAction loading={isPending || isUpdating} />
        </form>
    )
}
