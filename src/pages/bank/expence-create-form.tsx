import FormAction from "@/components/custom/form-action"
import DropZone from "@/components/form/dropzone"
import FormNumberInput from "@/components/form/number-input"
import SelectField from "@/components/form/select-field"
import FormTextarea from "@/components/form/textarea"
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
import { useForm } from "react-hook-form"

export default function ExpenceCreateForm() {
    const form = useForm<InvoiceCreate>()
    const { type } = useSearch({ from: "/_main/bank" })
    const queryClient = useQueryClient()
    const { closeModal } = useModal("create-expence")
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

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-1 mt-2">
            <SelectField
                label="Category"
                methods={form}
                required
                name="category"
                className="mb-3"
                options={categories}
            />

            <FormNumberInput
                label="Summa"
                methods={form}
                required
                name="amount"
            />

            <FormTextarea
                label="Comment"
                methods={form}
                name="comment"
                wrapperClassName="mt-3"
            />

            <DropZone
                label="Invoice"
                methods={form}
                name="file"
                required={type === "bank"}
            />

            <FormAction className="p-1" loading={isPending} />
        </form>
    )
}
