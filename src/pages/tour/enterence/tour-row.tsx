import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<EnterenceItem>[] = [
        {
            header: "Kun",
        },
        {
            header: "Nomi",
        },
        {
            header: "Turistlar",
        },
        {
            header: "Individual narxi",
        },
        {
            header: "Jami",
        },
    ]

    const data: EnterenceItem[] = [
        {
            id: 1,
            day: 1,
            data: [
                {
                    id: 1,
                    name: "Registon maydoni",
                    users: 4,
                    per_price: 420000,
                    total_price: 420000,
                },
                {
                    id: 2,
                    name: "Ichan qala",
                    users: 4,
                    per_price: 420000,
                    total_price: 420000,
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
