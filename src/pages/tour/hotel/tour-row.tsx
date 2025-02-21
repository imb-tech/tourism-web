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
    const columns: TableColumns<HotelItem>[] = [
        {
            header: "Kun",
        },
        {
            header: "Sana",
        },
        {
            header: "Nomi",
        },
        {
            header: "Xona turi",
        },
        {
            header: "Soni",
        },
        {
            header: "Individual narxi",
        },
        {
            header: "Jami",
        },
        {
            header: "To'lov turi",
        },
    ]

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })

    const url = DETAIL + `/hotel/${id}`

    const { data: list, isFetching } = useGet<HotelItemResponse[] | undefined>(
        url,
        {
            options: {
                queryKey: [type],
            },
        },
    )
    const { data: hotels } = useGet<HotelByCityResponse | undefined>(
        SELECTION + `hotel/${id}`,
    )

    const renderedList = useMemo<HotelItem[]>(
        () =>
            groupByDay<
                HotelItemResponse,
                HotelDetailData,
                "day",
                "detail_data",
                HotelItem
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
            <TourTableHeader columns={columns} grid={"grid-cols-8"} />
            {renderedList?.map((item) => (
                <TourCol
                    key={item.day}
                    day={item.day}
                    data={item.data?.map((el) => ({
                        ...el,
                        field_id: el.field_id,
                    }))}
                    id={item.id}
                    hotels={hotels?.[item.day] || []}
                />
            ))}
        </TourTableContainer>
    )
}
