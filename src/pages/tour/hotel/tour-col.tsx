import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import formatMoney from "@/lib/format-money"
import { useParams } from "@tanstack/react-router"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"
import useEditableRequest from "../editable-request"

export default function TourCol({ day, data, hotels }: HotelItem) {
    const { save } = useEditableRequest()
    const { id: planId } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const form = useForm<HotelItem>({
        defaultValues: {
            day,
            hotels,
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
        (event: React.FocusEvent<HTMLElement>) => {
            const item = fieldsValue?.find(
                (field) =>
                    field.field_id === Number(event.currentTarget.textContent),
            )

            if (item) {
                save(
                    {
                        ...item,
                        payment_type: item.payment_type ?? 0,
                        price: item.price || 0,
                        hotel: item.hotel_id,
                        room: item.room_id,
                    },
                    "hotel",
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
        <CustomTable cols={6}>
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-5">
                {fields?.map((el, i) => (
                    <CustomTableRow in={i} cols={5} key={el.id}>
                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.hotel_id`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                onValueChange={() =>
                                    form.resetField(`data.${i}.room_id`)
                                }
                                optionLabelKey="name"
                                optionValueKey="id"
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={hotels}
                            />
                        </CustomTableCol>

                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.room_id`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                optionLabelKey="name"
                                optionValueKey="id"
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={
                                    hotels?.find(
                                        (el) =>
                                            el.id ===
                                            form.watch(`data.${i}.hotel_id`),
                                    )?.rooms_dict || []
                                }
                            />
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                dayId={el.field_id}
                                name={`data.${i}.count`}
                                onBlur={handleSave}
                            >
                                {el?.count || "-"}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                dayId={el.field_id}
                                name={`data.${i}.price`}
                                onBlur={handleSave}
                                isNumber
                            >
                                {el?.price}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                editable={false}
                                methods={form}
                                dayId={el.field_id}
                                name={`data.${i}.payment_type`}
                                onBlur={handleSave}
                            >
                                {formatMoney(el?.expected_cost)}
                            </EditableBox>
                        </CustomTableCol>
                    </CustomTableRow>
                ))}
            </div>
        </CustomTable>
    )
}
