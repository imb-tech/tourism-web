import { DETAIL } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
import { TableColumns } from "@/types/table"
import { useParams } from "@tanstack/react-router"
import { useMemo } from "react"
import TourTableHeader from "../tour-table-header"
import TourGidCard from "./tour-col"

// eslint-disable-next-line react-refresh/only-export-components
export function groupByDay<
    T,
    D,
    DayKey extends keyof T,
    DetailKey extends keyof T,
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
    return Object.values(days)
}

export default function TourGidRow() {
    const columns: TableColumns<TourGidItem>[] = [
        {
            flex: 0.1,
            header: "Kun",
        },
        {
            flex: 0.15,
            header: "Ismi",
        },
        {
            flex: 0.15,
            header: "Telefon",
        },
        {
            flex: 0.15,
            header: "Kunlik narxi",
        },
        {
            flex: 0.15,
            header: "To'lov turi",
        },
        {
            flex: 0.15,
            header: "Tili",
        },
        {
            flex: 0.15,
            header: "Qo’shimcha ma’lumot",
        },
    ]

    const { id } = useParams({ from: "/_main/packs/$pack/tour/$id" })

    const url = DETAIL + `/guide/${id}`

    const { data: list } = useGet<TourGidResponse[] | undefined>(url)

    const renderedList = useMemo(
        () =>
            groupByDay<
                TourGidResponse,
                TourGidDetailData,
                "day",
                "detail_data"
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
        <div className="flex flex-col gap-3">
            <TourTableHeader columns={columns} />
            {renderedList?.map((item) => (
                <TourGidCard key={item.day} id={item.day} {...item} />
            ))}
        </div>
    )
}
