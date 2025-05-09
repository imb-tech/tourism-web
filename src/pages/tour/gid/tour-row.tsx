import { DETAIL } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams, useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import TourTableContainer from "../tour-table-container"
import TourTableHeader from "../tour-table-header"
import TourGidCard from "./tour-col"

// eslint-disable-next-line react-refresh/only-export-components
export function groupByDay<
    T,
    D,
    DayKey extends keyof T,
    DetailKey extends keyof T,
    Item,
>(list: T[], key: DayKey, detailKey: DetailKey): Item[] {
    const days = new Map<number, { day: number; data: D[] }>()

    for (const item of list) {
        const dayValue = Number(item[key]) // Kalitni son ko‘rinishiga o'tkazamiz
        const detailData =
            item[detailKey] ? { ...(item[detailKey] as D), ...item } : undefined

        if (!days.has(dayValue)) {
            days.set(dayValue, {
                day: dayValue,
                data: detailData ? [detailData] : [],
            })
        } else if (detailData) {
            days.get(dayValue)!.data.push(detailData)
        }
    }

    return Array.from(days.values()) as Item[]
}

export default function TourGidRow() {
    const columns: TableColumns<TourGidItem>[] = [
        {
            header: "Day",
        },
        {
            header: "Firstname",
        },
        {
            header: "Phone",
        },
        {
            header: "Daily price",
        },
        {
            header: "Payment type",
        },
        {
            header: "Language",
        },
        {
            header: "Comment",
        },
    ]

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })

    const url = DETAIL + `/guide/${id}`

    const { data: list, isFetching } = useGet<TourGidResponse[] | undefined>(
        url,
        {
            options: {
                queryKey: [type],
            },
        },
    )

    const renderedList = useMemo(
        () =>
            groupByDay<
                TourGidResponse,
                TourGidDetailData,
                "day",
                "detail_data",
                TourGidItem
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
            <TourTableHeader columns={columns} grid="grid-cols-7" />
            {renderedList?.map((item) => (
                <TourGidCard key={item.day} {...item} id={item.id} />
            ))}
        </TourTableContainer>
    )
}
