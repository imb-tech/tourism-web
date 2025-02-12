import { CITIES, DETAIL } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { groupByDay } from "../gid/tour-row"
import TourTableContainer from "../tour-table-container"
import TourTableHeader from "../tour-table-header"
import TourCol from "./tour-col"

export default function TourRow() {
    const columns: TableColumns<PlanListItemdetail>[] = [
        {
            header: "Kun",
        },
        {
            header: "Shahar",
            colSpan: 2,
        },
        {
            header: "Vaqt",
        },
        {
            header: "Class",
        },
        {
            header: "Turistlar soni",
        },
        {
            header: "Narxi",
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
    const url = DETAIL + `/plane/${id}`

    const { data: list, isFetching } = useGet<PlanListItem[] | undefined>(url, {
        options: {
            queryKey: [type],
        },
    })
    const { data: cities } = useGet<City[]>(CITIES, {
        params: {
            page_size: 100,
        },
    })

    const renderedList = useMemo(
        () =>
            groupByDay<
                PlanListItem,
                PlanListItemdetail,
                "day",
                "detail_data",
                PlanTableItem
            >(
                list?.map((el, i) => {
                    return {
                        ...el,
                        field_id: i + 1,
                        payment_type: el.payment_type ?? 0,
                    }
                }) || [],
                "day",
                "detail_data",
            ),
        [list],
    )

    return (
        <TourTableContainer loading={isFetching}>
            <TourTableHeader columns={columns} grid={"grid-cols-9"} />
            {renderedList?.map((item) => (
                <TourCol key={item.day} {...item} cities={cities || []} />
            ))}
        </TourTableContainer>
    )
}
