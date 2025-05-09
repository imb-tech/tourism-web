import CustomTable from "@/components/custom/table"
import InitialDataBox from "@/components/elements/initial-data-box"
import { REAL_COST_DETAIL } from "@/constants/api-endpoints"
import CustomTableCol from "@/pages/tour/custome-table-col"
import { useGet } from "@/services/default-requests"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import CostTableHeader from "../cost-table-header"
import { generateCostItem } from "./lib"

function CostItem({ day, data }: CostGeneratedItem) {
    return (
        <CustomTable grid="grid-cols-3" className="py-3">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <form className="flex flex-col col-span-2">
                {data?.map((item) => (
                    <div className="grid grid-cols-2" key={item.id}>
                        <CustomTableCol>{item.cities_name}</CustomTableCol>
                        <CustomTableCol>{item.desc}</CustomTableCol>
                    </div>
                ))}
            </form>
        </CustomTable>
    )
}

export function CityList() {
    const { id } = useParams({ from: "/_main/cost/$id" })
    const { data, isLoading } = useGet<ICostItem[]>(
        REAL_COST_DETAIL + `/city/${id}`,
    )

    const list = useMemo(() => generateCostItem(data), [data])

    return (
        <div className="bg-secondary p-3 flex flex-col gap-2 rounded-md">
            <CostTableHeader
                grid="grid-cols-3"
                columns={["Day", "Shaxar", "Comment"]}
            />
            <InitialDataBox isLoading={isLoading} />
            {list?.map((item) => <CostItem key={item.day} {...item} />)}
        </div>
    )
}
