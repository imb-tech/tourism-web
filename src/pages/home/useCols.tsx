import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useHomeColumn = () => {
    return useMemo<ColumnDef<HomeTableItem>[]>(
        () =>
            [
                {
                    header: "ID",
                    accessorKey: "id",
                },
                {
                    header: "Manager",
                    accessorKey: "manager",
                },
                {
                    header: "Klient",
                    accessorKey: "client",
                },
                {
                    header: "Sana",
                    accessorKey: "from_date",
                },
                {
                    header: "Turistlar soni",
                    accessorKey: "tourists_count",
                },
                {
                    header: "Status",
                    accessorKey: "status",
                },
                {
                    header: "Expected cost",
                    accessorKey: "expected_cost",
                },
                {
                    header: "Actual cost",
                    accessorKey: "actual_cost",
                },
                {
                    header: "Tushum",
                    accessorKey: "income_present",
                },
                {
                    header: "Tushum",
                    accessorKey: "income",
                },
            ]?.map((el) => ({ ...el, enableSorting: false })),
        [],
    )
}

export const useHomeNestedColumn = () => {
    return useMemo<ColumnDef<HomeTableItem>[]>(
        () =>
            [
                {
                    header: "ID",
                    accessorKey: "id",
                },
                {
                    header: "Manager",
                    accessorKey: "manager",
                },
                {
                    header: "Klient",
                    accessorKey: "client",
                },
                {
                    header: "Sana",
                    accessorKey: "from_date",
                },
                {
                    header: "Turistlar soni",
                    accessorKey: "tourists_count",
                },
                {
                    header: "Status",
                    accessorKey: "status",
                },
                {
                    header: "Expected cost",
                    accessorKey: "expected_cost",
                },
                {
                    header: "Actual cost",
                    accessorKey: "actual_cost",
                },
                {
                    header: "Tushum",
                    accessorKey: "income_present",
                },
                {
                    header: "Tushum",
                    accessorKey: "income",
                },
            ]?.map((el) => ({ ...el, enableSorting: false })),
        [],
    )
}
