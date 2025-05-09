import DateRangeProgress from "@/components/ui/date-range-progress"
import formatMoney from "@/lib/format-money"
import { ReactNode } from "@tanstack/react-router"
import { CellContext, ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { BadgeStatus } from "./status-badge"

export const useHomeColumn = () => {
    return useMemo<ColumnDef<HomeTableItem>[]>(
        () =>
            [
                {
                    header: "ID",
                    accessorKey: "tour_id",
                },
                {
                    header: "Manager",
                    accessorKey: "manager_name",
                },
                {
                    header: "Client",
                    accessorKey: "client",
                },
                {
                    header: "Dates",
                    accessorKey: "start",
                    cell: ({ row }: CellContext<HomeTableItem, ReactNode>) => {
                        return (
                            <DateRangeProgress
                                start={row.original.start}
                                end={row.original.end}
                            />
                        )
                    },
                },
                {
                    header: "Tourists count",
                    accessorKey: "tourists_count",
                },
                {
                    header: "Status",
                    accessorKey: "status",
                    cell: ({ row }: CellContext<HomeTableItem, ReactNode>) => {
                        return (
                            <BadgeStatus
                                status={row.original.status.toString()}
                            />
                        )
                    },
                },
                {
                    header: "Expected cost",
                    accessorKey: "expected_cost",
                    cell: ({ row }: CellContext<HomeTableItem, ReactNode>) => {
                        return formatMoney(row.original.expected_cost)
                    },
                },
                {
                    header: "Actual cost",
                    accessorKey: "actual_cost",
                    cell: ({ row }: CellContext<HomeTableItem, ReactNode>) => {
                        return formatMoney(row.original.actual_cost)
                    },
                },
                {
                    header: "Income",
                    accessorKey: "benefit",
                    cell: ({ row }: CellContext<HomeTableItem, ReactNode>) => {
                        return formatMoney(row.original.benefit, undefined, "%")
                    },
                },
                {
                    header: "Income",
                    accessorKey: "benefit",
                    cell: ({ row }: CellContext<HomeTableItem, ReactNode>) => {
                        return formatMoney(
                            Number(
                                (
                                    row.original.expected_cost *
                                    (1 + row.original.benefit / 100)
                                ).toFixed(2),
                            ) - row.original.expected_cost,
                        )
                    },
                },
            ]?.map((el) => ({ ...el, enableSorting: false })),
        [],
    )
}

export const useHomeNestedColumn = () => {
    return useMemo<ColumnDef<HomeNestedItem>[]>(
        () =>
            [
                {
                    header: "Day",
                    accessorKey: "day",
                },
                {
                    header: "Shaxar",
                    accessorKey: "cities",
                },
                {
                    header: "Gid",
                    accessorKey: "guide",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.guide)
                    },
                },
                {
                    header: "Hotel",
                    accessorKey: "hotel",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.hotel)
                    },
                },
                {
                    header: "Transport (shaxar)",
                    accessorKey: "trans_out",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.trans_out)
                    },
                },
                {
                    header: "Transport (ichki)",
                    accessorKey: "trans_in",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.trans_in)
                    },
                },
                {
                    header: "Tushlk",
                    accessorKey: "dinner",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.dinner)
                    },
                },
                {
                    header: "Ujen",
                    accessorKey: "lunch",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.lunch)
                    },
                },
                {
                    header: "Poyezd",
                    accessorKey: "train",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.train)
                    },
                },
                {
                    header: "Samalyot",
                    accessorKey: "plane",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.plane)
                    },
                },
                {
                    header: "Entrances",
                    accessorKey: "entrance",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.entrance)
                    },
                },
                {
                    header: "Boshqa xarajat",
                    accessorKey: "other",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.other)
                    },
                },
                {
                    header: "Total",
                    accessorKey: "total",
                    cell: ({ row }: CellContext<HomeNestedItem, ReactNode>) => {
                        return formatMoney(row.original.total)
                    },
                },
            ]?.map((el) => ({ ...el, enableSorting: false })),
        [],
    )
}
