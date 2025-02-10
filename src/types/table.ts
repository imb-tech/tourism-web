import { ColumnDef, Row } from "@tanstack/react-table"

export type TableColumns<TData> = ColumnDef<TData> & { flex?: number }

export type TableProps<TData> = {
    data: TData[]
    columns: TableColumns<TData>[]
    loading?: boolean
    className?: string
    onEdit?: (data: Row<TData>) => void
    onDelete?: (data: Row<TData>) => void
    onUndo?: (data: Row<TData>) => void
    onView?: (data: Row<TData>) => void
}
