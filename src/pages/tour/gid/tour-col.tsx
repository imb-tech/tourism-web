import EditableBox from "@/components/form/editaable-box"
import FormInput from "@/components/form/input"
import formatMoney from "@/lib/format-money"
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
        (event: React.FocusEvent<HTMLDivElement>) => {
            const item = fieldsValue?.find(
                (field) => field.id === Number(event.currentTarget.textContent),
            )

            if (item) {
                save(item, "guide", planId)
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
                        {/* <div className="flex-[0.11] font-light text-sm">
                            <FormInput
                                methods={form}
                                name={`data.${i}.full_name`}
                                className="border-none ring-0 outline-none focus:ring-0 focus:border-none active:ring-0 active:border-none"
                            />
                        </div> */}
                        <EditableBox
                            methods={form}
                            name={`data.${i}.full_name`}
                            className="flex-[0.11] font-light text-sm"
                            onBlur={handleSave}
                            dayId={field.id}
                        >
                            {field?.full_name}
                        </EditableBox>
                        {/* <p className="flex-[0.11] font-light text-sm">
                            {field?.full_name}
                        </p> */}
                        <div className="flex-[0.165] font-light text-sm">
                            <FormInput
                                methods={form}
                                name={`data.${i}.phone`}
                                className="border-none ring-0 outline-none focus:ring-0 focus:border-none"
                            />
                        </div>
                        <p className="flex-[0.115] font-light text-sm">
                            {formatMoney(field?.price)}
                        </p>
                        <p className="flex-[0.115] font-light text-sm">
                            {field?.payment_type}
                        </p>
                        <p className="flex-[0.11] font-light text-sm">
                            {field?.languages?.join(", ")}
                        </p>
                        <p className="flex-[0.4] font-light text-sm">
                            {field?.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
