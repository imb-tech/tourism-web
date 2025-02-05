import { CITIES, DETAIL } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams } from "@tanstack/react-router"
import TourTableHeader from "../tour-table-header"
import TourCityCard from "./tour-col"

export default function TourCityRow() {
    const { pack, id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const url = DETAIL + `/city/${pack}/${id}`

    const { data: list } = useGet<PlanCity[] | undefined>(url)
    const { data: cities } = useGet<City[]>(CITIES)

    const columns: TableColumns<TourCityItem>[] = [
        {
            flex: 0.3,
            header: "Kun",
        },
        {
            flex: 0.3,
            header: "Shahar",
        },
        {
            flex: 0.4,
            header: "Description",
        },
    ]

    return (
        <div className="flex flex-col gap-3">
            <TourTableHeader columns={columns} />
            {list?.map((item, ind) => (
                <TourCityCard key={ind} {...item} citiesList={cities || []} />
            ))}
        </div>
    )
}
