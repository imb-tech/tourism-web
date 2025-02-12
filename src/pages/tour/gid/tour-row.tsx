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
>(list: T[], key: DayKey, detailKey: DetailKey) {
    const days: Record<
        string,
        {
            day: number
            data: D[]
        }
    > = {}
    list?.forEach((item) => {
        if (days[item[key] as string] && item[detailKey]) {
            days[item[key] as string].data.push({
                ...item[detailKey],
                ...item,
                [detailKey]: undefined,
            } as D)
        } else {
            days[item[key] as string] = {
                day: Number(item[key]),
                data:
                    item[detailKey] ?
                        [
                            {
                                ...item[detailKey],
                                ...item,
                                [detailKey]: undefined,
                            } as D,
                        ]
                    :   [],
            }
        }
    })
    return Object.values(days) as Item[]
}

export default function TourGidRow() {
    const columns: TableColumns<TourGidItem>[] = [
        {
            header: "Kun",
        },
        {
            header: "Ismi",
        },
        {
            header: "Telefon",
        },
        {
            header: "Kunlik narxi",
        },
        {
            header: "To'lov turi",
        },
        {
            header: "Tili",
        },
        {
            header: "Qo’shimcha ma’lumot",
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
