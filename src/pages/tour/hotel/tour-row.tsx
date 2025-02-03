import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<TourHotelItem>[] = [
        {
            flex: 0.1,
            header: "Kun",
        },
        {
            flex: 0.18,
            header: "Nomi",
        },
        {
            flex: 0.18,
            header: "Xona turi",
        },
        {
            flex: 0.18,
            header: "Soni",
        },
        {
            flex: 0.18,
            header: "Individual narxi",
        },
        {
            flex: 0.18,
            header: "Jami",
        },
    ]

    const data: TourHotelItem[] = [
        {
            id: 1,
            day: 1,
            data: [
                {
                    id: 1,
                    name: "Anor Plaza",
                    type: "Standart",
                    rooms: 4,
                    per_price: 500000,
                    total_price: 2000000,
                },
                {
                    id: 2,
                    name: "Anor Plaza",
                    type: "Biznes",
                    rooms: 2,
                    per_price: 1000000,
                    total_price: 2000000,
                },
            ],
        },
    ]

    return (
        <div className="flex flex-col gap-3">
            <TourTableHeader columns={columns} />
            {data?.map((item) => <TourCol key={item.id} {...item} />)}
        </div>
    )
}
