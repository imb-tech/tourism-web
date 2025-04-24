import { DETAIL, NEW_ENTERANCES } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { groupByDay } from "../gid/tour-row"
import TourTableContainer from "../tour-table-container"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<EnteranceListItem>[] = [
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
            header: "To'lov turi",
        },
        {
            header: "Jami",
        },
    ]

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })

    const url = DETAIL + `/entrance/${id}`

    const { data: list, isFetching } = useGet<EnteranceListItem[] | undefined>(
        url,
        {
            options: {
                queryKey: [type],
            },
        },
    )
    const { data: enterances } = useGet<Record<string, Enterance[]>>(
        NEW_ENTERANCES + `/${id}`,
    )

    const renderedList = useMemo(
        () =>
            groupByDay<
                EnteranceListItem,
                EnteranceListItemdetail,
                "day",
                "detail_data",
                EnteranceTableItem
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
            <TourTableHeader columns={columns} grid={"grid-cols-6"} />
            {renderedList?.map((item) => (
                <TourCol
                    key={item.day}
                    {...item}
                    places={enterances?.[item.day] || []}
                />
            ))}
        </TourTableContainer>
    )
}
