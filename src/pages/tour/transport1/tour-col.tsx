import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { paymentTypes } from "@/lib/payment-types"
import { useParams } from "@tanstack/react-router"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"
import useEditableRequest from "../editable-request"
import { setFieldValue } from "../restoran2/tour-col"

function TourCol({
    day,
    data,
    transports,
}: TransportTableItem & { transports: Transport[] }) {
    const { id: planId } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { save } = useEditableRequest()

    const form = useForm<TransportTableItem>({
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
                        transport: item.transport_id ?? null,
                    },
                    "trans_in",
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
        <CustomTable grid="grid-cols-8">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-7">
                {fields?.map((el, i) => (
                    <CustomTableRow grid="grid-cols-7" in={i} key={el.id}>
                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.transport_id`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onChange={(e) => {
                                    const tr = e as Transport
                                    form.setValue(
                                        `data.${i}.price`,
                                        Number(tr.price),
                                    )
                                    setFieldValue(
                                        `data.${i}.price`,
                                        Number(tr.price),
                                        el.key,
                                    )
                                    form.setValue(
                                        `data.${i}.size`,
                                        Number(tr.size),
                                    )
                                    setFieldValue(
                                        `data.${i}.size`,
                                        Number(tr.size),
                                        el.key,
                                    )
                                    form.setValue(
                                        `data.${i}.transport_id`,
                                        tr.id,
                                    )
                                }}
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                placeholder="Tanlangan"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={transports}
                            />
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                name={`data.${i}.size`}
                                onBlur={handleSave}
                                dayId={el.field_id}
                                fieldKey={el.key}
                            >
                                {el.size}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                name={`data.${i}.price`}
                                onBlur={handleSave}
                                dayId={el.field_id}
                                fieldKey={el.key}
                                isNumber
                            >
                                {el.price}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.payment_type`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) => onBlur(event, el?.field_id)}
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
                                name={`data.${i}.driver`}
                                onBlur={handleSave}
                                dayId={el.field_id}
                            >
                                {el.driver}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                name={`data.${i}.driver_phone`}
                                onBlur={handleSave}
                                dayId={el.field_id}
                            >
                                {el.driver_phone}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                name={`data.${i}.company_phone`}
                                onBlur={handleSave}
                                dayId={el.field_id}
                            >
                                {el.company_phone}
                            </EditableBox>
                        </CustomTableCol>
                    </CustomTableRow>
                ))}
            </div>
        </CustomTable>
    )
}

export default TourCol
