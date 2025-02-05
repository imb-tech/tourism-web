import SelectField from "@/components/form/select-field"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

export default function TourCityCard({
    id,
    day,
    city,
    desciption,
}: TourCityItem) {
    const form = useForm<TourCityItem>({
        defaultValues: {
            id,
            city: city,
            desciption,
        },
    })
    const [isEditing, setIsEditing] = useState(false)
    // const { mutate } = usePatch()

    const isDirty = useMemo(
        () => form.formState.isDirty,
        [form.formState.isDirty],
    )

    function save() {
        setIsEditing(false)
        if (isDirty) {
            document.body.style.cursor = "wait"
            // mutate(CITIES + `/${id}`, form.getValues())
            setTimeout(() => {
                console.log(form.getValues())
                document.body.style.cursor = "default"
            }, 1000)
        }
    }

    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.3] text-primary">Day {day}</p>
            <div className="flex-[0.3] text-sm">
                <SelectField
                    isMulti
                    name="city"
                    methods={form}
                    className="!border-none"
                    wrapperClassName="!border-none w-auto"
                    onBlur={save}
                    classNames={{
                        control: () => "!border-none w-auto",
                        indicatorsContainer: () => "!hidden",
                    }}
                    options={[
                        {
                            id: 1,
                            name: city,
                        },
                        {
                            id: 2,
                            name: "Samarkand",
                        },
                    ]}
                />
            </div>
            <div
                className="flex-[0.4] text-sm outline-none focus:outline-none"
                contentEditable={isEditing}
                suppressContentEditableWarning
                suppressHydrationWarning
                onBlur={save}
                onDoubleClick={() => setIsEditing(true)}
            >
                {/* <FormTextarea
                    onBlur={save}
                    methods={form}
                    name="desciption"
                    className="border-none focus:border-none !ring-transparent min-h-12 max-w-full break-words "
                /> */}
                {desciption}
            </div>
        </div>
    )
}
