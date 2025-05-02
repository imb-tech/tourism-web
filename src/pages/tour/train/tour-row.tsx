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
    const columns: TableColumns<TrainItem>[] = [
        {
            header: "Day",
        },
        {
            header: "Date",
        },
        {
            header: "City",
            colSpan: 2,
        },
        {
            header: "Time",
        },
        {
            header: "Class",
        },
        {
            header: "Price",
        },
        {
            header: "Payment type",
        },
        {
            header: "Number of tourists",
        },
        {
            header: "Total",
        },
    ]

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })
    const url = DETAIL + `/train/${id}`

    const { data: list, isFetching } = useGet<TrainItem[] | undefined>(url, {
        options: {
            queryKey: [type],
        },
    })

    const { data: cities } = useGet<City[]>(CITIES, {
        params: {
            page_size: 100,
            train_code__isnull: false,
        },
    })

    const renderedList = useMemo(
        () =>
            groupByDay<
                TrainItem,
                TrainDetailData,
                "day",
                "detail_data",
                TrainTableItem
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
            <TourTableHeader columns={columns} grid={"grid-cols-10"} />
            {renderedList?.map((item) => (
                <TourCol key={item.day} {...item} cities={cities || []} />
            ))}
        </TourTableContainer>
    )
}
