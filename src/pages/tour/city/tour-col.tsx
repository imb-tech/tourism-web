import SelectField from "@/components/form/select-field"
import { DETAIL } from "@/constants/api-endpoints"
import { cn } from "@/lib/utils"
import { usePost } from "@/services/default-requests"
import { useParams } from "@tanstack/react-router"
import { memo, useState } from "react"
import { useForm } from "react-hook-form"

function TourCityCard(props: TourCityItem & { citiesList: City[] }) {
    const { day, desc, citiesList, cities } = props
    const { id: planId } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const form = useForm<TourCityItem>({
        defaultValues: {
            ...props,
            cities: cities || [],
        },
    })
    const [isEditing, setIsEditing] = useState(false)
    const { mutate } = usePost({
        onSuccess: () => {
            document.body.style.cursor = "default"
        },
    })

    function save() {
        setIsEditing(false)
        document.body.style.cursor = "wait"
        mutate(DETAIL + "/city", {
            ...form.getValues(),
            plan_id: Number(planId),
        })
    }

    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.3] text-primary">Day {day}</p>
            <div className="flex-[0.3] text-sm">
                <SelectField
                    isMulti
                    name="cities"
                    methods={form}
                    className="!border-none"
                    wrapperClassName="!border-none w-auto"
                    onBlur={save}
                    classNames={{
                        control: () => "!border-none w-auto",
                        indicatorsContainer: () => "!hidden",
                    }}
                    options={citiesList}
                />
            </div>
            <div
                className={cn(
                    "flex-[0.4] text-sm outline-none focus:outline-none",
                )}
                contentEditable={isEditing}
                suppressContentEditableWarning
                suppressHydrationWarning
                onBlur={save}
                onDoubleClick={() => setIsEditing(true)}
                onInput={async (v) => {
                    await form.setValue(
                        "desc",
                        v.currentTarget.textContent?.toString() || "",
                    )
                }}
            >
                {desc || "-"}
            </div>
        </div>
    )
}

export default memo(TourCityCard)
