import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<TourTransport2Item>[] = [
        {
            flex: 0.05,
            header: "Kun",
        },
        {
            flex: 0.12,
            header: "Transport turi",
        },
        {
            flex: 0.12,
            header: "Sig’imi",
        },
        {
            flex: 0.12,
            header: "Narxi",
        },
        {
            flex: 0.12,
            header: "Shahar",
        },
        {
            flex: 0.12,
            header: "Vaqt",
        },
        {
            flex: 0.12,
            header: "Haydovchi",
        },
        {
            flex: 0.12,
            header: "Haydovchi raqami",
        },
        {
            flex: 0.12,
            header: "Kompaniya raqami",
        },
    ]

    const data: TourTransport2Item[] = [
        {
            id: 1,
            day: 1,
            data: [
                {
                    id: 1,
                    name: "Yutong",
                    size: 32,
                    price: 420000,
                    from_city: "Toshkent",
                    to_city: "Samarqand",
                    from_time: "09:00",
                    to_time: "12:00",
                    driver: "Doniyor",
                    driver_phone: "+998931231277",
                    company: "+998998427979",
                },
                {
                    id: 2,
                    name: "Yutong",
                    size: 44,
                    price: 500000,
                    from_city: "Bukhara",
                    to_city: "Namangan",
                    from_time: "09:00",
                    to_time: "12:00",
                    driver: "Ahmadjohn",
                    driver_phone: "+998931231177",
                    company: "+998998427979",
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
