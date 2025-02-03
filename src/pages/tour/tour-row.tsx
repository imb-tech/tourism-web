import { TableProps } from "@/types/table"
import TourCityCard from "./city/tour-col"
import TourTableHeader from "./tour-table-header"

export default function TourCityRow<TData extends TourCityItem>({
    columns,
    data,
}: TableProps<TData>) {
    return (
        <div className="flex flex-col gap-3">
            <TourTableHeader columns={columns} />
            {data?.map((item) => <TourCityCard key={item.id} {...item} />)}
        </div>
    )
}
