import { DETAIL, SELECTION } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import { groupByDay } from "../gid/tour-row"
import TourTableContainer from "../tour-table-container"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<Restaurant1Item>[] = [
        {
            header: "Kun",
        },
        {
            header: "Nomi",
        },
        {
            header: "Set",
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
    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const url = DETAIL + `/dinner/${id}`

    const { data: list, isLoading } = useGet<RestoranItem[] | undefined>(url)
    const { data: restaurants } = useGet<RestaurantByCityResponse | undefined>(
        SELECTION + `restaurant/${id}`,
    )

    const renderedList = useMemo<RestoranTableItem[]>(
        () =>
            groupByDay<
                RestoranItem,
                RestoranDetailData,
                "day",
                "detail_data",
                RestoranTableItem
            >(
                list?.map((el, i) => {
                    return { ...el, field_id: i + 1 }
                }) || [],
                "day",
                "detail_data",
            ),
        [list],
    )

    return (
        <TourTableContainer loading={isLoading}>
            <TourTableHeader columns={columns} grid={"grid-cols-6"} />
            {renderedList?.map((item) => (
                <TourCol
                    key={item.day}
                    {...item}
                    restaurants={restaurants?.[item.day] || []}
                />
            ))}
        </TourTableContainer>
    )
}
