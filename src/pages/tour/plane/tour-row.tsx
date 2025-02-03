import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<TrainItem>[] = [
        {
            flex: 0.1,
            header: "Kun",
        },
        {
            flex: 0.15,
            header: "Shaxar",
        },
        {
            flex: 0.15,
            header: "Vaqt",
        },
        {
            flex: 0.15,
            header: "Class",
        },
        {
            flex: 0.15,
            header: "Soni",
        },
        {
            flex: 0.15,
            header: "Individual narxi",
        },
        {
            flex: 0.15,
            header: "Jami",
        },
    ]

    const data: TrainItem[] = [
        {
            id: 1,
            day: 1,
            data: [
                {
                    id: 1,
                    from_city: "Tashkent",
                    to_city: "Nukus",
                    from_time: "09:00",
                    to_time: "17:00",
                    class: "Ekonom",
                    users: 2,
                    price: 420000,
                    total_price: 840000,
                },
                {
                    id: 2,
                    from_city: "Qarshi",
                    to_city: "Xiva",
                    from_time: "09:00",
                    to_time: "17:00",
                    class: "Ekonom",
                    users: 2,
                    price: 420000,
                    total_price: 840000,
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
