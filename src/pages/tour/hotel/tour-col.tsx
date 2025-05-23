import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { DatePicker } from "@/components/ui/date-picker"
import { TOUR } from "@/constants/api-endpoints"
import { paymentTypes } from "@/lib/payment-types"
import { useGet } from "@/services/default-requests"
import { useParams } from "@tanstack/react-router"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"
import useEditableRequest from "../editable-request"
import { getExpectedCost } from "../enterence/tour-col"
import filterHotelsByDate from "../lib"
import { setFieldValue } from "../restoran2/tour-col"

export default function TourCol({ day, data, hotels }: HotelItem) {
    const { save } = useEditableRequest()
    const form = useForm<HotelItem>({
        defaultValues: {
            day,
            hotels,
            data,
        },
    })
    const { pack } = useParams({ from: "/_main/packs/$pack/tour/$id" })

    const { data: detail } = useGet<PlanDetail>(
        TOUR + `/editable/${pack}/detail`,
        {
            options: {
                staleTime: Infinity,
                gcTime: Infinity,
                refetchOnMount: true,
            },
        },
    )

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
                    hotel: item.hotel_id,
                    room: item.room_id,
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

    const filteredHotels = useCallback(
        (date: string | null) => filterHotelsByDate(hotels, date),
        [fields?.map((el) => el.date)],
    )

    return (
        <CustomTable grid="grid-cols-8">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-7">
                {fields?.map((el, i) => (
                    <CustomTableRow
                        grid="grid-cols-7"
                        in={i}
                        key={el.id}
                        rowId={el?.id}
                        day={day}
                    >
                        <CustomTableCol className="-ml-4">
                            <DatePicker
                                className="!border-none w-auto shadow-none"
                                placeholder="Sana tanlang"
                                format="yyyy-MM-dd"
                                date={form.watch(`data.${i}.date`) || undefined}
                                setDate={(date) => {
                                    form.setValue(
                                        `data.${i}.date`,
                                        date?.toString() || null,
                                    )
                                }}
                                initialFocus
                                defaultMonth={
                                    detail?.start ?
                                        new Date(detail?.start)
                                    :   undefined
                                }
                            />
                        </CustomTableCol>
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
                                options={filteredHotels(
                                    form.watch(`data.${i}.date`),
                                )}
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
                                onChange={(v) => {
                                    const room = v as Room
                                    console.log(room)
                                    setFieldValue(
                                        `data.${i}.price`,
                                        room.seasons[0].price,
                                        el.key,
                                    )
                                    form.setValue(
                                        `data.${i}.price`,
                                        room.seasons[0].price,
                                    )
                                    if (room.id) {
                                        form.setValue(
                                            `data.${i}.room_id`,
                                            room.id,
                                        )
                                    }
                                }}
                                options={
                                    filteredHotels(
                                        form.watch(`data.${i}.date`) || null,
                                    )?.find(
                                        (el) =>
                                            el.id ===
                                            form.watch(`data.${i}.hotel_id`),
                                    )?.rooms || []
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
                                {el?.count}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                dayId={el.field_id}
                                name={`data.${i}.price`}
                                onBlur={handleSave}
                                fieldKey={el.key}
                                isNumber
                            >
                                {el.price}
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
                                {getExpectedCost(
                                    fieldsValue[i].price,
                                    fieldsValue[i].count,
                                    el.expected_cost,
                                )}
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
                    </CustomTableRow>
                ))}
            </div>
        </CustomTable>
    )
}
