import { CATEGORIES, DETAIL } from "@/constants/api-endpoints"
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
            header: "Kategoriya",
        },
        {
            header: "Izoh",
        },
        {
            header: "Narxi",
        },
        {
            header: "To'lov turi",
        },
    ]

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })

    const url = DETAIL + `/other/${id}`

    const { data: list, isFetching } = useGet<OtherItem[] | undefined>(url, {
        options: {
            queryKey: [type],
        },
    })
    const { data: categories } = useGet<Category[] | undefined>(CATEGORIES)

    const renderedList = useMemo(
        () =>
            groupByDay<
                OtherItem,
                OtherData,
                "day",
                "detail_data",
                OtherTableItem
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
            <TourTableHeader columns={columns} grid={"grid-cols-5"} />
            {renderedList?.map((item) => (
                <TourCol key={item.day} {...item} places={categories || []} />
            ))}
        </TourTableContainer>
    )
}
