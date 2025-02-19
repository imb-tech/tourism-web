import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import { Button } from "@/components/ui/button"
import { CRITERIES } from "@/constants/api-endpoints"
import useEditableRequest from "@/pages/tour/editable-request"
import { useGet } from "@/services/default-requests"
import { useParams } from "@tanstack/react-router"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"

export default function ExclusionForm() {
    const { save, duplicate, creating } = useEditableRequest<Inclusion>()

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })

    const { data } = useGet<Inclusion[] | undefined>(CRITERIES, {
        params: {
            plan_id: Number(id),
            type: "exclusion",
        },
    })

    const form = useForm<InclusionForm>({
        values: {
            data: data || [],
        },
    })
    const { fields } = useFieldArray({
        control: form.control,
        name: "data",
        keyName: "key",
    })

    const fieldsValue = form.watch("data")

    function handleAdd() {
        duplicate("exclusion")
    }

    const handleSave = useCallback(
        async (event: React.FocusEvent<HTMLElement>) => {
            const fieldId = Number(event.currentTarget.textContent)
            const item = fieldsValue?.find((field) => field.id === fieldId)

            if (item) {
                const resp = (await save({
                    ...item,
                })) as { id: number }
                fieldsValue?.forEach((f, i) => {
                    if (f.id === fieldId) {
                        form.setValue(`data.${i}.id`, resp.id)
                    }
                })
            }
        },
        [fieldsValue, save, form],
    )

    return (
        <div>
            <p className="text-xl">Tur paket ichiga olmaydigan xususiyatlar</p>
            <CustomTable grid="grid-cols-1" className="p-0 mt-3">
                <div className="flex flex-col">
                    {fields?.map((field, i) => (
                        <CustomTableRow
                            grid="grid-cols-1"
                            in={i}
                            key={field.key}
                            rowId={field?.id ?? 0}
                            day={"exclusion"}
                        >
                            <CustomTableCol className="flex-row justify-normal items-center gap-3 py-3">
                                {i + 1}.
                                <EditableBox
                                    className="flex-1"
                                    methods={form}
                                    name={`data.${i}.text`}
                                    onBlur={handleSave}
                                    dayId={field.id ?? 0}
                                >
                                    {field?.text}
                                </EditableBox>
                            </CustomTableCol>
                        </CustomTableRow>
                    ))}
                    <Button onClick={handleAdd} loading={creating}>
                        Qo'shish
                    </Button>
                </div>
            </CustomTable>
        </div>
    )
}
