import CustomTable from "@/components/custom/table"
import EditableBox from "@/components/form/editaable-box"
import SelectField from "@/components/form/select-field"
import { DETAIL } from "@/constants/api-endpoints"
import { usePost } from "@/services/default-requests"
import { useParams } from "@tanstack/react-router"
import { memo, useCallback } from "react"
import { useForm } from "react-hook-form"
import CustomTableCol from "../custome-table-col"

function TourCityCard(props: TourCityItem & { citiesList: City[] }) {
    const { day, desc, citiesList, cities, id } = props
    const { id: planId } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const form = useForm<TourCityItem>({
        defaultValues: {
            ...props,
            cities: cities || [],
        },
    })
    const { mutate } = usePost({
        onSuccess: (data: { id: number }) => {
            form.setValue("id", data.id)
        },
    })

    const formValues = form.watch()

    const save = useCallback(() => {
        console.log("=> ", formValues)
        mutate(DETAIL + "/city", {
            ...formValues,
            plan_id: Number(planId),
        })
    }, [formValues])

    return (
        <CustomTable grid={"grid-cols-3"}>
            <p className="text-primary flex items-center">Day {day}</p>
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
            <CustomTableCol>
                <EditableBox
                    methods={form}
                    name={"desc"}
                    onBlur={save}
                    dayId={id}
                >
                    {desc}
                </EditableBox>
            </CustomTableCol>
        </CustomTable>
    )
}

export default memo(TourCityCard)
