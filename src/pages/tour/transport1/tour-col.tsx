import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { useParams } from "@tanstack/react-router"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"
import useEditableRequest from "../editable-request"

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
    const controlledFields = fields.map((field, i) => ({
        ...field,
        ...fieldsValue[i],
    }))

    const handleSave = useCallback(
        (event: React.FocusEvent<HTMLElement>) => {
            const item = fieldsValue?.find(
                (field) =>
                    field.day === Number(event.currentTarget.textContent),
            )

            if (item) {
                save(
                    {
                        ...item,
                        payment_type: item.payment_type ?? 0,
                        transport: item.transport_id ?? null,
                    },
                    "trans_in",
                    planId,
                )
            }
        },
        [fieldsValue, save, planId],
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
        <CustomTable cols={7}>
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-6">
                {controlledFields?.map((el, i) => (
                    <CustomTableRow cols={6} in={i} key={el.id}>
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
                                    form.setValue(
                                        `data.${i}.size`,
                                        Number(tr.size),
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
                                isNumber
                            >
                                {el.price}
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
