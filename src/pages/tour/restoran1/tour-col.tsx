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
import { setFieldValue } from "../restoran2/tour-col"

export default function TourCol({
    day,
    data,
    restaurants,
}: RestoranTableItem & { restaurants: Restaurant[] }) {
    const { save } = useEditableRequest()
    const { id: planId } = useParams({ from: "/_main/packs/$pack/tour/$id" })

    const form = useForm<RestoranTableItem>({
        defaultValues: {
            day,
            data: data?.map((el) => ({
                ...el,
                restaurant: el?.restaurant_id,
                set: el?.set_id,
            })),
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
                        tourists_count: item.tourists_count || 0,
                        restaurant: item?.restaurant || null,
                        restaurant_id: undefined,
                        set: item?.set || null,
                        set_id: undefined,
                    },
                    "dinner",
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
        <CustomTable grid="grid-cols-6">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-5">
                {fields?.map((el, i) => (
                    <CustomTableRow grid="grid-cols-5" in={i} key={el.id}>
                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.restaurant`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                onValueChange={() =>
                                    form.resetField(`data.${i}.set`)
                                }
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={restaurants}
                            />
                        </CustomTableCol>

                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.set`}
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
                                    const set = v as RestaurantSet
                                    if (set.id) {
                                        form.setValue(
                                            `data.${i}.price`,
                                            set.price,
                                        )
                                        setFieldValue(
                                            `data.${i}.price`,
                                            set.price,
                                        )
                                        form.setValue(`data.${i}.set`, set.id)
                                    } else form.resetField(`data.${i}.set`)
                                }}
                                options={
                                    restaurants?.find(
                                        (item) =>
                                            item.id ===
                                            form.watch(`data.${i}.restaurant`),
                                    )?.sets
                                }
                            />
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                dayId={el.field_id}
                                name={`data.${i}.tourists_count`}
                                onBlur={handleSave}
                            >
                                {el.tourists_count}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                methods={form}
                                dayId={el.field_id}
                                name={`data.${i}.price`}
                                onBlur={handleSave}
                            >
                                {formatMoney(el.price)}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            <EditableBox
                                editable={false}
                                methods={form}
                                dayId={el.field_id}
                                name={`data.${i}.expected_cost`}
                            >
                                {formatMoney(el.expected_cost)}
                            </EditableBox>
                        </CustomTableCol>
                    </CustomTableRow>
                ))}
            </div>
        </CustomTable>
    )
}
