import { CITIES, DETAIL, TRANSPORTS } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import { groupByDay } from "../gid/tour-row"
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
            header: "To'lov turi",
        },
        {
            header: "Shahar",
            colSpan: 2,
        },
        {
            header: "Vaqt",
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

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })
    const url = DETAIL + `/trans_out/${id}`

    const { data: list, isFetching } = useGet<TransportListItem[] | undefined>(
        url,
        {
            options: {
                queryKey: [type],
            },
        },
    )
    const { data: transportsData } = useGet<ListResponse<Transport>>(
        TRANSPORTS,
        {
            params: {
                page_size: 100,
            },
        },
    )

    const { data: cities } = useGet<City[]>(CITIES, {
        params: {
            page_size: 100,
        },
    })

    const renderedList = useMemo(
        () =>
            groupByDay<
                TransportListItem,
                TransportListItem["detail_data"],
                "day",
                "detail_data",
                TransportTableItem
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
            <TourTableHeader columns={columns} grid={"grid-cols-11"} />
            {renderedList?.map((item) => (
                <TourCol
                    key={item.day}
                    {...item}
                    transports={transportsData?.results || []}
                    cities={cities || []}
                />
            ))}
        </TourTableContainer>
    )
}
