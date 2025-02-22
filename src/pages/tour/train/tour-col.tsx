import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { DatePicker } from "@/components/ui/date-picker"
import { paymentTypes } from "@/lib/payment-types"
import { usePost } from "@/services/default-requests"
import { useCallback, useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"
import CustomTableRow from "../custome-table-row"
import useEditableRequest from "../editable-request"
import { getExpectedCost } from "../enterence/tour-col"
import { setFieldValue } from "../restoran2/tour-col"

type GetTimesPayload = {
    date: string | undefined
    dep: number | undefined
    des: number | undefined
    field_id: number
}

function TourCol({
    day,
    data,
    cities,
}: TrainTableItem & {
    cities: City[]
}) {
    const { save } = useEditableRequest()
    const [times, setTimes] = useState<Record<number, TrainTime[]>>({})

    const { mutate, isPending } = usePost({
        onSuccess(
            data: TrainTime[],
            { payload }: { payload: GetTimesPayload },
        ) {
            setTimes((prev) => ({
                ...prev,
                [payload.field_id]: data,
            }))
        },
    })

    function getTimes(
        date: string | undefined,
        dep: number | undefined,
        des: number | undefined,
        field_id: number,
    ) {
        mutate("tours/details/get-trains", {
            date,
            dep,
            des,
            field_id,
        })
    }

    const form = useForm<TrainTableItem>({
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
                    from_city: item.from_city_id ?? null,
                    to_city: item.to_city_id ?? null,
                    from_time: undefined,
                    to_time: undefined,
                })) as { id: number }
                form.reset(undefined, { keepValues: true })

                fieldsValue?.forEach((f, i) => {
                    if (f.field_id === fieldId) {
                        form.setValue(`data.${i}.id`, resp.id)
                    }
                })
            }
        },
        [fieldsValue, save],
    )

    const onBlur = useCallback(
        (event: React.FocusEvent<HTMLElement>, field_id: number) => {
            handleSave({
                ...event,
                currentTarget: {
                    ...event.currentTarget,
                    textContent: field_id.toString(),
                },
            })
        },
        [],
    )

    function handleCityChange(field_id: number) {
        const item = fieldsValue?.find((f) => f.field_id === field_id)
        if (item?.dep && item?.des && item?.date) {
            getTimes(item?.date, item?.dep, item?.des, field_id)
        }
    }

    useEffect(() => {
        if (Object.keys(times).length == 0) {
            const obj: Record<number, TrainTime[]> = {}
            fieldsValue?.forEach((f) => {
                if (f.times) {
                    obj[f.field_id] = [
                        {
                            times: f.times,
                            klasses: [
                                {
                                    klass: f.klass || "",
                                    price: Number(f.price),
                                    free_sets: 0,
                                },
                            ],
                        },
                    ]
                }
            })
            setTimes(obj)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <CustomTable grid="grid-cols-10">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-9">
                {fields?.map((el, i) => (
                    <CustomTableRow
                        grid="grid-cols-9"
                        in={i}
                        key={el.id}
                        rowId={el.id}
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
                                    handleCityChange(el.field_id)
                                }}
                            />
                        </CustomTableCol>
                        <CustomTableCol className="flex-row items-center justify-start gap-2 truncate pr-2 col-span-2">
                            <SelectField
                                name={`data.${i}.from_city_id`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto min-w-24"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                onChange={(v) => {
                                    const city = v as City
                                    form.setValue(
                                        `data.${i}.from_city_id`,
                                        city.id,
                                    )
                                    form.setValue(
                                        `data.${i}.dep`,
                                        city.train_code,
                                    )
                                    handleCityChange(el.field_id)
                                }}
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
                                onChange={(v) => {
                                    const city = v as City
                                    form.setValue(
                                        `data.${i}.to_city_id`,
                                        city.id,
                                    )
                                    form.setValue(
                                        `data.${i}.des`,
                                        city.train_code,
                                    )
                                    handleCityChange(el.field_id)
                                }}
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={cities}
                            />
                        </CustomTableCol>
                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.times`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                optionLabelKey="times"
                                optionValueKey="times"
                                placeholder="Tanlang"
                                isLoading={isPending}
                                loadingMessage={() => "Yuklanmoqda..."}
                                onMenuOpen={() => {
                                    const dep = cities?.find(
                                        (e) =>
                                            e.id ==
                                            form.watch(
                                                `data.${i}.from_city_id`,
                                            ),
                                    )?.train_code
                                    const des = cities?.find(
                                        (e) =>
                                            e.id ==
                                            form.watch(`data.${i}.to_city_id`),
                                    )?.train_code
                                    if (dep && des) {
                                        getTimes(
                                            form
                                                .watch(`data.${i}.date`)
                                                ?.toString(),
                                            dep,
                                            des,
                                            el.field_id,
                                        )
                                    }
                                }}
                                onChange={(v) => {
                                    const d = v as TrainTime
                                    form.setValue(`data.${i}.times`, d.times)
                                    form.setValue(`data.${i}.klass`, null)
                                }}
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={
                                    isPending ? [] : times[el.field_id] || []
                                }
                            />
                        </CustomTableCol>
                        <CustomTableCol>
                            <SelectField
                                name={`data.${i}.klass`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) => onBlur(event, el?.field_id)}
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                onChange={(v) => {
                                    const d = v as {
                                        id: string
                                        name: string
                                        price: string
                                    }
                                    form.setValue(`data.${i}.klass`, d.id)
                                    form.setValue(`data.${i}.price`, d.price)
                                    setFieldValue(
                                        `data.${i}.price`,
                                        d.price,
                                        el.key,
                                    )
                                }}
                                options={
                                    times[el.field_id]
                                        ?.find(
                                            (e) =>
                                                e.times ==
                                                form.watch(`data.${i}.times`),
                                        )
                                        ?.klasses?.map((e) => ({
                                            id: e.klass,
                                            name:
                                                e.free_sets ?
                                                    `${e.klass} - ${e.free_sets} ta joy`
                                                :   e.klass,
                                            price: e.price,
                                        })) || []
                                }
                            />
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
                                name={`data.${i}.tourists_count`}
                                onBlur={handleSave}
                                dayId={el.field_id}
                                fieldKey={el.key}
                            >
                                {el.tourists_count}
                            </EditableBox>
                        </CustomTableCol>

                        <CustomTableCol>
                            {getExpectedCost(
                                Number(fieldsValue[i].price),
                                fieldsValue[i].tourists_count,
                                el.expected_cost,
                            )}
                        </CustomTableCol>
                    </CustomTableRow>
                ))}
            </div>
        </CustomTable>
    )
}

export default TourCol
