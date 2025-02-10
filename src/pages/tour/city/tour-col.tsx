import CustomTable from "@/components/custom/table"
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
        <CustomTable cols={3}>
            <p className="text-primary">Day {day}</p>
            <div className="text-sm">
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
                className={cn("text-sm outline-none focus:outline-none")}
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
        </CustomTable>
    )
}

export default memo(TourCityCard)
