import { DETAIL, SELECTION } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { groupByDay } from "../gid/tour-row"
import TourTableContainer from "../tour-table-container"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<Restaurant1Item>[] = [
        {
            header: "Day",
        },
        {
            header: "Name",
        },
        {
            header: "Set",
        },
        {
            header: "Tourists",
        },
        {
            header: "PPP",
        },
        {
            header: "Payment type",
        },
        {
            header: "Total",
        },
    ]
    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })
    const url = DETAIL + `/dinner/${id}`

    const { data: list, isFetching } = useGet<RestoranItem[] | undefined>(url, {
        options: {
            queryKey: [type],
        },
    })
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
        <TourTableContainer loading={isFetching}>
            <TourTableHeader columns={columns} grid={"grid-cols-7"} />
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
