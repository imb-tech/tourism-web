import { TableColumns } from "@/types/table"
import TourTableHeader from "../tour-table-header"
import TourGidCard from "./tour-gid-card"

export default function TourGidRow() {
    const columns: TableColumns<TourGidItem>[] = [
        {
            flex: 0.2,
            header: "Day",
        },
        {
            flex: 0.2,
            header: "Ismi",
        },
        {
            flex: 0.2,
            header: "Telefon",
        },
        {
            flex: 0.2,
            header: "Kunlik narxi",
        },
        {
            flex: 0.2,
            header: "Tili",
        },
        {
            flex: 0.2,
            header: "Qo’shimcha ma’lumot",
        },
    ]
    const data: TourGidItem[] = [
        {
            id: 1,
            day: 1,
            data: [
                {
                    id: 1,
                    name: "Jesica",
                    phone: "+998 99 999 99 99",
                    price: 500000,
                    langs: ["O'z", "Rus"],
                    description: "Description",
                },
            ],
        },
    ]

    return (
        <div className="flex flex-col gap-3">
            <TourTableHeader columns={columns} />
            {data?.map((item) => <TourGidCard key={item.id} {...item} />)}
        </div>
    )
}
