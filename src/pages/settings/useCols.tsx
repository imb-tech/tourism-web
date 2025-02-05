import Star from "@/assets/images/star.png"
import Img from "@/components/custom/img"
import SeeInView from "@/components/ui/see-in-view"
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
            {
                accessorKey: "city.name",
                header: "Shahar",
            },
            {
                accessorKey: "star",
                header: "Darajasi",
                cell: ({ row }) => {
                    return (
                        <div className="flex items-center gap-1">
                            <span>{row.original.star}</span>
                            <img width={14} src={Star} alt="" />
                        </div>
                    )
                },
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

export const useFoodColumns = () =>
    useMemo<ColumnDef<Food>[]>(
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
                accessorKey: "image",
                header: "Rasmi",
                cell: ({ row }) => (
                    <SeeInView url={row.original.image}>
                        <Img
                            width={50}
                            height={50}
                            src={row.original.image}
                            alt=""
                        />
                    </SeeInView>
                ),
            },
        ],
        [],
    )

export const useCategoryColumns = () =>
    useMemo<ColumnDef<Category>[]>(
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

export const useRestaurantColumns = () =>
    useMemo<ColumnDef<Restaurant>[]>(
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
