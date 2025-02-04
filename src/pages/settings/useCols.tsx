import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const useCountryColumns = () =>
    useMemo<ColumnDef<Country>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "name",
                header: "Nomi",
            },
        ],
        [],
    )

export const useCityColumns = () =>
    useMemo<ColumnDef<City>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "name",
                header: "Nomi",
            },
        ],
        [],
    )

export const useEnteranceColumns = () =>
    useMemo<ColumnDef<Enterance>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "name",
                header: "Nomi",
            },
            {
                accessorKey: "city.name",
                header: "Shahar",
            },
            {
                accessorKey: "price",
                header: "Narxi",
            },
        ],
        [],
    )

export const useHotelColumns = () =>
    useMemo<ColumnDef<Hotel>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "name",
                header: "Nomi",
            },
        ],
        [],
    )

export const useTransportColumns = () =>
    useMemo<ColumnDef<Transport>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "name",
                header: "Nomi",
            },
            {
                accessorKey: "size",
                header: "Sig’imi",
            },
            {
                accessorKey: "price",
                header: "Narxi",
            },
        ],
        [],
    )
