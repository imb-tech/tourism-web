import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourCityCard from "./tour-city-card"

export default function TourCityRow() {
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

    const data: TourCityItem[] = [
        {
            id: 1,
            day: 1,
            city: "Toshkent",
            desciption:
                "Upon arrival at Tashkent International Airport, you will be warmly welcomed with a special tradition",
        },
    ]

    return (
        <div className="flex flex-col gap-3">
            <TourTableHeader columns={columns} />
            {data?.map((item) => <TourCityCard key={item.id} {...item} />)}
        </div>
    )
}
