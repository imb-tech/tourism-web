import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { languages } from "@/lib/langs"
import { paymentTypes } from "@/lib/payment-types"
import { cn } from "@/lib/utils"
import useEditableRequest from "@/pages/tour/editable-request"
import { useParams } from "@tanstack/react-router"
import { useCallback } from "react"
import { useFieldArray, useForm } from "react-hook-form"

export default function TourGidCard({ day, data }: TourGidItem) {
    const { id: planId } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { save } = useEditableRequest<TourGidDetailData>()

    const form = useForm<TourGidItem>({
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
                        languages: item.languages ?? [],
                    },
                    "guide",
                    planId,
                )
            }
        },
        [fieldsValue, save, planId],
    )

    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.1] text-primary">Day {day}</p>
            <div className="flex-[0.9] flex flex-col">
                {fields?.map((field, i) => (
                    <div
                        className={cn(
                            "flex items-center min-w-full flex-1 py-2 px-1",
                            i > 0 && "border-t border-secondary",
                        )}
                        key={field.key}
                    >
                        <EditableBox
                            methods={form}
                            name={`data.${i}.full_name`}
                            className="flex-[0.11] font-light text-sm"
                            onBlur={handleSave}
                            dayId={field.field_id}
                        >
                            {field?.full_name}
                        </EditableBox>

                        <EditableBox
                            methods={form}
                            name={`data.${i}.phone`}
                            className="flex-[0.165] font-light text-sm"
                            onBlur={handleSave}
                            dayId={field.field_id}
                        >
                            {field?.phone}
                        </EditableBox>

                        <EditableBox
                            methods={form}
                            name={`data.${i}.price`}
                            className="flex-[0.115] font-light text-sm"
                            onBlur={handleSave}
                            dayId={field.field_id}
                            isNumber
                        >
                            {field?.price}
                        </EditableBox>

                        <div className="flex-[0.165] font-light text-xs">
                            <SelectField
                                name={`data.${i}.payment_type`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) =>
                                    handleSave({
                                        ...event,
                                        currentTarget: {
                                            ...event.currentTarget,
                                            textContent:
                                                field?.field_id.toString(),
                                        },
                                    })
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
                        </div>

                        <div className="flex-[0.165] font-light text-xs">
                            <SelectField
                                isMulti
                                name={`data.${i}.languages`}
                                methods={form}
                                className="!border-none"
                                wrapperClassName="!border-none w-auto"
                                onBlur={(event) =>
                                    handleSave({
                                        ...event,
                                        currentTarget: {
                                            ...event.currentTarget,
                                            textContent:
                                                field?.field_id.toString(),
                                        },
                                    })
                                }
                                optionLabelKey="name"
                                optionValueKey="code"
                                placeholder="Tanlang"
                                classNames={{
                                    control: () => "!border-none w-auto",
                                    indicatorsContainer: () => "!hidden",
                                }}
                                options={languages}
                            />
                        </div>

                        <EditableBox
                            methods={form}
                            name={`data.${i}.desc`}
                            className="flex-[0.115] font-light text-sm"
                            onBlur={handleSave}
                            dayId={field.id}
                        >
                            {field?.desc}
                        </EditableBox>
                    </div>
                ))}
            </div>
        </div>
    )
}
