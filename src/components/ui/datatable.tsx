import {
    ColumnDef,
    Row,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { usePersist } from "@/hooks/use-persist"
import { cn } from "@/lib/utils"
import { useLocation, useSearch } from "@tanstack/react-router"
import { ArrowDown, ArrowUp, Settings } from "lucide-react"
import TableActions from "../custom/table-actions"
import CursorPagination from "../param/cursor-pagination"
import ParamPagination, { PaginationProps } from "../param/pagination"
import Loader from "./loader"
import MultiSelect from "./multi-select"

interface CursorPaginationProps {
    next: string | null | undefined
    previous: string | null | undefined
    disabled?: boolean
    changePageSize?: boolean
    pageSizeParamName?: string
    paramName?: string
}

type DataTableProps<TData> = {
    data: TData[]
    columns: ColumnDef<TData>[]
    loading?: boolean
    className?: string
    selecteds_count?: boolean
    onRowClick?: (data: TData) => void
    disabled?: boolean
    setRowClassName?: (data: TData) => string
    setCellClassName?: (data: TData) => string
    paginationProps?: PaginationProps
    cursorPagination?: CursorPaginationProps
    viewAll?: boolean
    head?: React.ReactNode
    enableColumnVisibility?: boolean
    withActions?: boolean
    actionMenuMode?: boolean
    onEdit?: (data: Row<TData>) => void
    onDelete?: (data: Row<TData>) => void
    onUndo?: (data: Row<TData>) => void
    onView?: (data: Row<TData>) => void
    wrapperClassName?: string
    pageSizes?: number[]
}

export function DataTable<TData extends object>({
    data,
    columns,
    loading,
    className,
    onRowClick,
    disabled,
    setRowClassName,
    setCellClassName,
    totalPages,
    pageSize,
    pageSizeParamName,
    paramName,
    next,
    prev,
    cursorChangePageSize,
    viewAll,
    head,
    enableColumnVisibility,
    withActions,
    actionMenuMode = false,
    onEdit,
    onDelete,
    onUndo,
    onView,
    wrapperClassName,
    pageSizes,
}: Omit<DataTableProps<TData>, "paginationProps" | "cursorPagination"> & {
    totalPages?: number
    pageSize?: number
    next?: string | null | undefined
    prev?: string | null | undefined
    cursorChangePageSize?: boolean
    pageSizeParamName?: string
    paramName?: string
}) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility1, setColumnVisibility1] =
        React.useState<VisibilityState>({})
    const pathname = useLocation().pathname
    const { store: columnVisibility, setStore: setColumnVisibility } =
        usePersist<VisibilityState>(pathname)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const search: any = useSearch({ from: "__root__" })

    React.useEffect(() => {
        setColumnVisibility(columnVisibility1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columnVisibility1])

    const orderedColumns = React.useMemo(() => {
        if (withActions) {
            return [
                ...columns,
                {
                    header: " ",
                    accessorKey: "action",
                    cell: ({ row }) => (
                        <TableActions
                            menuMode={actionMenuMode}
                            onDelete={
                                onDelete ? () => onDelete?.(row) : undefined
                            }
                            onEdit={onEdit ? () => onEdit?.(row) : undefined}
                            onUndo={onUndo ? () => onUndo?.(row) : undefined}
                            onView={onView ? () => onView?.(row) : undefined}
                        />
                    ),
                },
            ]
        } else return columns
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const table = useReactTable({
        data: data || [],
        columns: orderedColumns,
        // getSubRows: (row:TData) => row,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility1,
        columnResizeMode: "onChange",
        state: {
            sorting,
            columnVisibility,
            pagination: {
                pageIndex:
                    search[paramName || "local_page"] ?
                        +search[paramName || "local_page"] - 1
                    :   0,
                pageSize:
                    search[pageSizeParamName || "local_page_size"] ?
                        +search[pageSizeParamName || "local_page_size"]
                    :   pageSize || 10,
            },
        },
        manualPagination: !!totalPages || !!next || viewAll,
    })

    return (
        <main className={cn("w-full rounded-md", wrapperClassName)}>
            {!!head && <div className="mb-3">{head}</div>}
            <div className="overflow-x-auto relative">
                {loading && (
                    <div className="absolute top-0 w-full h-full grid place-items-center bg-black/80 z-20">
                        <Loader variant="secondary" />
                    </div>
                )}
                <Table className={cn(`select-text`, className)}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup, i) => (
                            <TableRow key={headerGroup.id + "-" + i}>
                                {headerGroup.headers
                                    ?.slice(
                                        0,
                                        enableColumnVisibility ? -1 : undefined,
                                    )
                                    .map((header, j) => (
                                        <TableHead
                                            key={header.id + "-" + j}
                                            className={`
                                                ${
                                                    (
                                                        header.column.id ===
                                                        "action"
                                                    ) ?
                                                        "!w-20"
                                                    :   `!w-[${header.column.getSize()}px]`
                                                } bg-secondary`}
                                        >
                                            {header.isPlaceholder ?
                                                null
                                            : header.column.getCanSort() ?
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className="cursor-pointer flex items-center gap-1 select-none w-max"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ArrowUp
                                                                width={18}
                                                            />
                                                        ),
                                                        desc: (
                                                            <ArrowDown
                                                                width={18}
                                                            />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            :   flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )
                                            }
                                        </TableHead>
                                    ))}
                                {enableColumnVisibility && (
                                    <TableHead className={`w-20`}>
                                        <div className="flex justify-end">
                                            <MultiSelect
                                                label={
                                                    <Settings
                                                        width={20}
                                                        className="cursor-pointer text-primary"
                                                    />
                                                }
                                                options={table
                                                    .getAllLeafColumns()
                                                    ?.map((f) => ({
                                                        name: f.columnDef
                                                            .header as string,
                                                        id: f.getIsVisible(),
                                                        fnc: f.getToggleVisibilityHandler(),
                                                    }))
                                                    ?.slice(0, -1)}
                                            />
                                        </div>
                                    </TableHead>
                                )}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 ?
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id + "-" + i}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={cn(
                                        `hover:bg-secondary/50`,
                                        setRowClassName ?
                                            setRowClassName(row.original)
                                        :   "",
                                    )}
                                >
                                    {row.getVisibleCells().map((cell, j) => (
                                        <TableCell
                                            key={cell.id + "-" + j}
                                            onClick={() =>
                                                !notClick(cell.column.id) &&
                                                onRowClick?.(cell.row.original)
                                            }
                                            className={cn(
                                                onRowClick && "cursor-pointer",
                                                notClick(cell.column.id) &&
                                                    "cursor-default",
                                                setCellClassName ?
                                                    setCellClassName(
                                                        row.original,
                                                    )
                                                :   "",
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        :   <TableRow>
                                <TableCell
                                    colSpan={columns?.length}
                                    className="h-24 text-center"
                                >
                                    Mavjud emas
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    <TableFooter />
                </Table>
            </div>
            {!viewAll && (
                <div className="pt-4 mx-auto w-max">
                    {totalPages ?
                        <ParamPagination
                            disabled={disabled || loading}
                            totalPages={totalPages}
                            paramName={paramName}
                            pageSize={pageSize}
                            pageSizeParamName={pageSizeParamName}
                            page_sizes={pageSizes}
                        />
                    : next || prev ?
                        <CursorPagination
                            next={next}
                            previous={prev}
                            disabled={disabled || loading}
                            changePageSize={cursorChangePageSize}
                            paramName={paramName}
                            pageSizeParamName={pageSizeParamName}
                            page_sizes={pageSizes}
                        />
                    :   <ParamPagination
                            disabled={disabled || loading}
                            totalPages={table.getPageCount()}
                            pageSize={table.getState().pagination.pageSize}
                            paramName={paramName || "local_page"}
                            pageSizeParamName={
                                pageSizeParamName || "local_page_size"
                            }
                            page_sizes={pageSizes}
                        />
                    }
                </div>
            )}
        </main>
    )
}

function notClick(id: string) {
    return [
        "code",
        "phone_number",
        "Amallar",
        "Boshqarish",
        "Kirim",
        "action",
        "Chiqim",
    ].includes(id)
}
