import { UPLOAD_INVOICE } from "@/constants/api-endpoints"
import { usePatch } from "@/services/default-requests"
import { useCallback } from "react"
import { FieldValues, UseFormReturn } from "react-hook-form"

export default function useUpload<T extends FieldValues>(
    form: UseFormReturn<T>,
    day: number,
) {
    const { mutate } = usePatch(
        {
            onSuccess() {
                console.log("success")
            },
        },
        {
            headers: {
                "Content-Type": "multipart/from-data",
            },
        },
    )
    const values = useCallback(() => form.watch(), [form])

    const save = useCallback(
        (i: number, id: number) => {
            const data = values()?.[`day_${day}`]?.[i]
            const formData = new FormData()

            formData.append("real_cost", data.real_cost.toString() || "0")

            if (typeof data.invoice !== "string") {
                formData.append("invoice", data.invoice)
            }
            formData.append("id", id.toString())

            mutate(UPLOAD_INVOICE + `/${id}`, formData)
        },
        [values],
    )

    return {
        save,
    }
}
