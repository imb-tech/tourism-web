import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<OtherItem>[] = [
        {
            flex: 0.25,
            header: "Kun",
        },
        {
            flex: 0.25,
            header: "Nomi",
        },
        {
            flex: 0.25,
            header: "Turistlar",
        },
        {
            flex: 0.25,
            header: "Individual narxi",
        },
    ]

    const data: OtherItem[] = [
        {
            id: 1,
            day: 1,
            data: [
                {
                    id: 1,
                    category: "Registon maydoni",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    price: 420000,
                },
                {
                    id: 2,
                    category: "Ichan qala",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    price: 420000,
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
