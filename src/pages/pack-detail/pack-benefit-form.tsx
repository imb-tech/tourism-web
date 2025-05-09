import FormAction from "@/components/custom/form-action"
import FormNumberInput from "@/components/form/number-input"
import { EXPECTED, PLANS } from "@/constants/api-endpoints"
import { PLAN_BENEFIT, TOUR_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import formatMoney from "@/lib/format-money"
import { useGet, usePatch } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

export default function PackBenefitForm() {
    const { store } = useStore<PlanItem>(TOUR_DATA)
    const queryClient = useQueryClient()
    const { closeModal } = useModal(PLAN_BENEFIT)

    const { data } = useGet<PaymentTypeItem>(EXPECTED + `/${store?.id}`)

    const form = useForm<PlanItem>({
        defaultValues: store || {},
    })

    function onSuccess() {
        queryClient.removeQueries({
            queryKey: [PLANS],
        })
        closeModal()
    }

    const { mutate, isPending } = usePatch({ onSuccess })

    function handleSubmit(vals: PlanItem) {
        mutate(PLANS + `/${store?.id}`, vals)
    }

    const present = form.watch("benefit")
    const totatCash = useMemo(
        () => ((data?.cash || 0) * 1.12).toFixed(2),
        [data],
    )

    const totalAmount = useMemo(
        () =>
            (
                (Number(totatCash) + (data?.bank || 0)) *
                (present / 100 + 1)
            ).toFixed(2),
        [data, present, totatCash],
    )

    return (
        <div>
            <p className="text-lg font-medium">
                Cash:
                <span className="font-light">
                    {data?.cash || 0} * 1.12 ={" "}
                    {formatMoney(totatCash, undefined, "$")}
                </span>
            </p>
            <p className="text-lg font-medium">
                Bank:
                <span className="font-light">
                    {formatMoney(data?.bank || 0, undefined, "$")}
                </span>
            </p>

            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4 mt-4"
            >
                <div className="flex gap-3 w-full">
                    <FormNumberInput
                        methods={form}
                        required
                        name="benefit"
                        label="Percentage"
                        placeholder="0"
                        className="font-medium"
                        wrapperClassName={"w-full"}
                        suffix=" %"
                    />
                </div>
                <p className="text-lg font-medium mt-1">
                    Total:
                    <span className="font-light">
                        {formatMoney(totalAmount, undefined, "$")}
                    </span>
                </p>
                <FormAction loading={isPending} />
            </form>
        </div>
    )
}
