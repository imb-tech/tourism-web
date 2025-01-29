import Phone from "@/components/custom/phone"
import { UZS_SIGN } from "@/constants/common"
import { ColumnDef } from "@tanstack/react-table"
import { formatDateTime } from "./format-date"
import { formatNumber } from "./format-number"
import { getCurrencySign } from "./get-currency-sign"
import { cn } from "./utils"

export const textColumn = <T,>(
    header: string,
    accessorKey: keyof T,
): ColumnDef<T> => ({
    header,
    accessorKey,
})

export const customColumn = <T,>(
    header: string,
    cell: (props: { row: { original: T } }) => JSX.Element,
): ColumnDef<T> => ({
    header,
    cell,
})

export const columnAction = <T,>(
    header: string,
    accessorKey: "action",
    cell: (props: { row: { original: T } }) => JSX.Element,
): ColumnDef<T> => ({
    header,
    accessorKey,
    cell,
})

type MoneyColumnProps = {
    header?: string
    currencyKey?: string
    className?: string
    suffix?: string
    isShowZero?: boolean
}
export const moneyColumn = <T,>(
    accessorKey: keyof T,
    {
        header = "Balans",
        className,
        currencyKey = "currency",
        suffix,
        isShowZero,
    }: MoneyColumnProps = {},
): ColumnDef<T> => ({
    accessorKey,
    header,
    cell: ({ row: { original } }) => {
        const balance = Number(original[accessorKey])
        // @ts-expect-error sdf
        const currency = original[currencyKey]

        const classN = cn(
            balance > 0 && "text-green-500",
            balance < 0 && "text-red-500",
        )
        if (!isShowZero && !balance) return ""
        return (
            <span className={cn(className || classN)}>
                {formatNumber(balance, { isShowZero })}{" "}
                {suffix ?? (getCurrencySign(currency) || UZS_SIGN)}
            </span>
        )
    },
})

export const phoneColumn = <T,>(
    accessor: keyof T,
    header = "Telefon",
): ColumnDef<T> => ({
    header,
    cell: ({ row }) => {
        const phone = row.original[accessor] as string
        return <Phone value={phone} />
    },
})

export const dateTimeColumn = <T,>(
    accessor: keyof T,
    header = "Sana",
): ColumnDef<T> => ({
    header,
    cell: ({ row }) => {
        const date = row.original[accessor] as string
        return formatDateTime(date)
    },
})
