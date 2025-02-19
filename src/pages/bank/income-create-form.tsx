import FormAction from "@/components/custom/form-action"
import { TabsOptionProps } from "@/components/custom/tabs"
import FormCheckbox from "@/components/form/checkbox"
import DropZone from "@/components/form/dropzone"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import FormTextarea from "@/components/form/textarea"
import ParamAnimatedTabs from "@/components/param/animated-tab"
import {
    CREATE_INCOME_OTHER,
    FINANCIAL_CATEGORIES,
    TRANSACTIONS,
} from "@/constants/api-endpoints"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useGet, usePost } from "@/services/default-requests"
import { useQueryClient } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

export default function IncomeCreateForm() {
    const form = useForm<InvoiceCreate>()
    const { type } = useSearch({ from: "/_main/bank" })
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create-income")
    const { store, remove } = useStore<number>("modal-type")

    const { mutate, isPending } = usePost(
        {
            onSuccess: () => {
                queryClient.removeQueries({
                    queryKey: [TRANSACTIONS + (type || "bank")],
                })
                remove()
                closeModal()
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    function handleSubmit(values: InvoiceCreate) {
        const formDats = new FormData()

        for (const [key, value] of Object.entries(values)) {
            if (value) {
                formDats.append(
                    key,
                    typeof value === "object" ? value : value.toString(),
                )
            }
        }

        formDats.append("type", store?.toString() ?? "")
        formDats.append("checkout_type", type || "bank")
        mutate(CREATE_INCOME_OTHER, formDats)
    }

    const { data: categories } = useGet<FinancialCategory[]>(
        FINANCIAL_CATEGORIES,
        {
            options: {
                enabled: true,
            },
        },
    )

    const options = useMemo<TabsOptionProps[]>(
        () => [
            {
                id: 1,
                name: "Tur bo'yicha",
                content: (
                    <div className="p-1">
                        <SelectField
                            label="Tur paket"
                            methods={form}
                            required
                            name="tour"
                            options={[]}
                            wrapperClassName="mb-3"
                        />

                        <FormCheckbox
                            methods={form}
                            name="is_initial_income"
                            label="Qaytim sifatida kiritish"
                        />
                    </div>
                ),
            },
            {
                id: 2,
                name: "Boshqa",
                content: (
                    <div className="p-1">
                        <SelectField
                            label="Kategoriya"
                            methods={form}
                            required
                            name="category"
                            options={categories}
                        />
                    </div>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [categories],
    )

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ParamAnimatedTabs paramName="income-type" options={options} />

            <div className="p-1 mt-2">
                <FormNumberInput
                    label="Summa"
                    methods={form}
                    required
                    name="amount"
                />

                <FormTextarea
                    label="Izoh"
                    methods={form}
                    name="comment"
                    wrapperClassName="mt-3"
                />

                <DropZone label="Chek" methods={form} name="file" required />
            </div>

            <FormAction className="p-1" loading={isPending} />
        </form>
    )
}
