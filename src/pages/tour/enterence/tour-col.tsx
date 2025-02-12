import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { paymentTypes } from "@/lib/payment-types"
import useEditableRequest from "@/pages/tour/editable-request"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"

export default function TourGidCard({
    day,
    data,
    places,
}: EnteranceTableItem & { places: Enterance[] }) {
    const { save } = useEditableRequest<EnteranceListItemdetail>()

    const form = useForm<EnteranceTableItem>({
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
                const resp = (await save({
                    ...item,
                    payment_type: item.payment_type ?? 0,
                    price: item.price || 0,
                    entrance: item.entrance_id,
                })) as { id: number }
                fieldsValue?.forEach((f, i) => {
                    if (f.field_id === fieldId) {
                        form.setValue(`data.${i}.id`, resp.id)
                    }
                })
            }
        },
        [fieldsValue, save, form],
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
        <CustomTable grid="grid-cols-6">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-5">
                {fields?.map((field, i) => (
                    <CustomTableRow
                        grid="grid-cols-5"
                        in={i}
                        key={field.key}
                        rowId={field?.id}
                        day={day}
                    >
                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.entrance_id`}
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
                                name={`data.${i}.tourist_count`}
                                onBlur={handleSave}
                                dayId={field.field_id}
                            >
                                {field?.tourist_count}
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

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                name={`data.${i}.expected_cost`}
                                onBlur={handleSave}
                                dayId={field.id}
                            >
                                {field?.expected_cost}
                            </EditableBox>
                        </CustomTableCol>
                    </CustomTableRow>
                ))}
            </div>
        </CustomTable>
    )
}
