import { TableColumns } from "@/types/table"
import TourTableContainer from "../tour-table-container"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<TourTransport1Item>[] = [
        {
            header: "Kun",
        },
        {
            header: "Transport turi",
        },
        {
            header: "Sig’imi",
        },
        {
            header: "Narxi",
        },
        {
            header: "Haydovchi",
        },
        {
            header: "Haydovchi raqami",
        },
        {
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
        <TourTableContainer loading={false}>
            <TourTableHeader columns={columns} />
            {data?.map((item) => <TourCol key={item.id} {...item} />)}
        </TourTableContainer>
    )
}
