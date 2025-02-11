import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { paymentTypes } from "@/lib/payment-types"
import useEditableRequest from "@/pages/tour/editable-request"
import { useParams } from "@tanstack/react-router"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"

export default function TourGidCard({
    day,
    data,
    places,
}: OtherTableItem & { places: Category[] }) {
    const { id: planId } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { save } = useEditableRequest<OtherData>()

    const form = useForm<OtherTableItem>({
        defaultValues: {
            day,
            data,
        },
    })
    const { fields } = useFieldArray({
        control: form.control,
        name: "data",
        keyName: "key",
    })

    const fieldsValue = form.watch("data")

    const handleSave = useCallback(
        async (event: React.FocusEvent<HTMLElement>) => {
            const fieldId = Number(event.currentTarget.textContent)
            const item = fieldsValue?.find(
                (field) => field.field_id === fieldId,
            )

            if (item) {
                const resp = (await save(
                    {
                        ...item,
                        payment_type: item.payment_type ?? 0,
                        price: item.price || 0,
                        category: item.category_id,
                    },
                    "other",
                    planId,
                )) as { id: number }
                fieldsValue?.forEach((f, i) => {
                    if (f.field_id === fieldId) {
                        form.setValue(`data.${i}.id`, resp.id)
                    }
                })
            }
        },
        [fieldsValue, save, planId, form],
    )

    function onBlur(event: React.FocusEvent<HTMLElement>, field_id: number) {
        handleSave({
            ...event,
            currentTarget: {
                ...event.currentTarget,
                textContent: field_id.toString(),
            },
        })
    }

    return (
        <CustomTable grid="grid-cols-5">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-4">
                {fields?.map((field, i) => (
                    <CustomTableRow grid="grid-cols-4" in={i} key={field.key}>
                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.category_id`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) =>
                                    onBlur(event, field?.field_id)
                                }
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={places}
                            />
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                name={`data.${i}.desc`}
                                onBlur={handleSave}
                                dayId={field.field_id}
                            >
                                {field?.desc}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                name={`data.${i}.price`}
                                onBlur={handleSave}
                                dayId={field.field_id}
                                isNumber
                            >
                                {field?.price}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.payment_type`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) =>
                                    onBlur(event, field?.field_id)
                                }
                                optionLabelKey="name"
                                optionValueKey="value"
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={paymentTypes}
                            />
                        </CustomTableCol>
                    </CustomTableRow>
                ))}
            </div>
        </CustomTable>
    )
}
