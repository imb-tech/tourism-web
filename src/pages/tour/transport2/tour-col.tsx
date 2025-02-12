import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import FormInput from "@/components/form/input"
import SelectField from "@/components/form/select-field"
import { paymentTypes } from "@/lib/payment-types"
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
    cities,
}: TransportTableItem & {
    transports: Transport[]
    cities: City[]
}) {
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
                const resp = (await save({
                    ...item,
                    payment_type: item.payment_type ?? 0,
                    transport: item.transport_id ?? null,
                    from_city: item.from_city_id ?? null,
                    to_city: item.to_city_id ?? null,
                    from_time: item.from_time ?? null,
                    to_time: item.to_time ?? null,
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
        <CustomTable grid="grid-cols-11">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-10">
                {fields?.map((el, i) => (
                    <CustomTableRow
                        grid="grid-cols-10"
                        in={i}
                        key={el.id}
                        rowId={el.id}
                        day={day}
                    >
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
                                placeholder="Tanlang"
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

                        <CustomTableCol className="flex-row items-center justify-start gap-2 truncate pr-2 col-span-2">
                            <SelectField
                                name={`data.${i}.from_city_id`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto min-w-24"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={cities}
                            />
                            <span>-</span>
                            <SelectField
                                name={`data.${i}.to_city_id`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto min-w-24"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={cities}
                            />
                        </CustomTableCol>

                        <CustomTableCol className="gap-2">
                            <EditableBox
                                methods={form}
                                name={`data.${i}.driver`}
                                onBlur={handleSave}
                                dayId={el.field_id}
                                className="w-auto"
                            >
                                <FormInput
                                    wrapperClassName="w-auto max-w-12"
                                    methods={form}
                                    type="time"
                                    className="p-0 m-0 border-none bg-transparent shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 max-w-12"
                                    name={`data.${i}.from_time`}
                                />
                                <span>-</span>
                                <FormInput
                                    wrapperClassName="w-auto max-w-12 ml-2"
                                    methods={form}
                                    type="time"
                                    className="p-0 m-0 border-none bg-transparent shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 max-w-12"
                                    name={`data.${i}.to_time`}
                                />
                            </EditableBox>
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
