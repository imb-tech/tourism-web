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
                header: "Name",
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
                header: "Name",
            },
            {
                accessorKey: "image",
                header: "Photo",
                cell: ({ row }) => (
                    <SeeInView url={row.original?.image ?? ""}>
                        <Img
                            width={50}
                            height={50}
                            src={row.original?.image ?? ""}
                            alt=""
                            className="w-10 min-h-10 max-h-10 object-cover"
                        />
                    </SeeInView>
                ),
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
                header: "Name",
            },
            {
                accessorKey: "city.name",
                header: "City",
            },
            {
                accessorKey: "price",
                header: "Price",
            },
            {
                accessorKey: "image",
                header: "Image",
                cell: ({ row }) => (
                    <SeeInView url={row.original.image ?? ""}>
                        <Img
                            width={50}
                            height={50}
                            src={row.original.image ?? ""}
                            alt=""
                            className="w-16 min-h-16 max-h-16 object-cover"
                        />
                    </SeeInView>
                ),
            },
            {
                header: "Description",
                cell: ({ row }) => (
                    <div className="max-w-[100%] text-wrap">
                        <p>{row.original.desc}</p>
                    </div>
                ),
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
                header: "Name",
            },
            {
                accessorKey: "city.name",
                header: "City",
            },
            {
                accessorKey: "star",
                header: "Rate",
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
                header: "Name",
            },
            {
                accessorKey: "size",
                header: "Capacity",
            },
            {
                accessorKey: "price",
                header: "Price",
            },
            {
                accessorKey: "year",
                header: "Yili",
            },
            {
                accessorKey: "images",
                header: "Photos",
                cell: ({ row }) =>
                    row.original.images[0] ?
                        <SeeInView url={String(row.original.images[0].image)}>
                            <Img
                                width={50}
                                height={50}
                                src={String(row.original.images[0].image)}
                                alt=""
                                className="w-16 min-h-16 max-h-16 object-cover"
                            />
                        </SeeInView>
                    :   "Yo'q",
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
                header: "Name",
            },
            {
                accessorKey: "image",
                header: "Image",
                cell: ({ row }) => (
                    <SeeInView url={row.original.image}>
                        <Img
                            width={50}
                            height={50}
                            src={row.original.image}
                            alt=""
                            className="w-16 min-h-16 max-h-16 object-cover"
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
                header: "Name",
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
                header: "Name",
            },
            {
                accessorKey: "city.name",
                header: "City",
            },
        ],
        [],
    )
