import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<TourTransport1Item>[] = [
        {
            flex: 0.1,
            header: "Kun",
        },
        {
            flex: 0.15,
            header: "Transport turi",
        },
        {
            flex: 0.15,
            header: "Sig’imi",
        },
        {
            flex: 0.15,
            header: "Narxi",
        },
        {
            flex: 0.15,
            header: "Haydovchi",
        },
        {
            flex: 0.15,
            header: "Haydovchi raqami",
        },
        {
            flex: 0.15,
            header: "Kompaniya raqami",
        },
    ]

    const data: TourTransport1Item[] = [
        {
            id: 1,
            day: 1,
            data: [
                {
                    id: 1,
                    name: "Yutong",
                    size: 32,
                    price: 420000,
                    driver: "Doniyor",
                    driver_phone: "+998931231177",
                    company: "+998998427979",
                },
                {
                    id: 2,
                    name: "Yutong",
                    size: 44,
                    price: 500000,
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
