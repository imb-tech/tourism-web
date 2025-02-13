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

import TableActions from "@/components/custom/table-actions"
import CursorPagination from "@/components/param/cursor-pagination"
import ParamPagination, { PaginationProps } from "@/components/param/pagination"
import { Button } from "@/components/ui/button"
import Loader from "@/components/ui/loader"
import MultiSelect from "@/components/ui/multi-select"
import { usePersist } from "@/hooks/use-persist"
import { cn } from "@/lib/utils"
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router"
import { ArrowDown, ArrowUp, Eye, Settings } from "lucide-react"

interface CursorPaginationProps {
    next: string | null | undefined
    previous: string | null | undefined
    disabled?: boolean
    changePageSize?: boolean
    pageSizeParamName?: string
    paramName?: string
}

type HomeNestedTableProps<TData> = {
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
    grid: `grid-cols-${number}`
    isRowClick?: boolean
}

export default function HomeNestedTable<TData extends object>({
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
    grid,
}: Omit<HomeNestedTableProps<TData>, "paginationProps" | "cursorPagination"> & {
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
    const navigate = useNavigate()

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleCollapse(item: any) {
        if (!item) {
            navigate({
                to: "/",
                search: {
                    cash_id:
                        Number(search.cash_id) == item.id ? undefined : item.id,
                },
            })
        }
    }

    return (
        <main className={cn("w-full bg-background", wrapperClassName)}>
            {!!head && <div className="mb-3">{head}</div>}
            <div className="overflow-x-auto relative pt-3">
                {loading && (
                    <div className="absolute top-0 w-full h-full grid place-items-center z-20">
                        <Loader variant="secondary" />
                    </div>
                )}
                <div className={cn(`select-text`, className)}>
                    <div>
                        {table.getHeaderGroups().map((headerGroup, i) => (
                            <div
                                key={headerGroup.id + "-" + i}
                                className={cn("grid px-2 pb-4 relative", grid)}
                            >
                                {headerGroup.headers
                                    ?.slice(
                                        0,
                                        enableColumnVisibility ? undefined : (
                                            undefined
                                        ),
                                    )
                                    .map((header, j) => (
                                        <div
                                            key={header.id + "-" + j}
                                            className={cn(
                                                `
                                                ${
                                                    (
                                                        header.column.id ===
                                                        "action"
                                                    ) ?
                                                        "!w-20"
                                                    :   `!w-[${header.column.getSize()}px]`
                                                } text-xs text-primary`,
                                                j == 0 ? "pl-2" : "",
                                            )}
                                        >
                                            {header.isPlaceholder ?
                                                null
                                            : header.column.getCanSort() ?
                                                <div
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className={cn(
                                                        "cursor-pointer flex items-center gap-1 select-none w-max",
                                                        "font-medium text-xs",
                                                    )}
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
                                        </div>
                                    ))}
                                {enableColumnVisibility && (
                                    <div className={`w-20 absolute right-3`}>
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
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div>
                        {table.getRowModel().rows?.length > 0 ?
                            table.getRowModel().rows.map((row, i) => (
                                <div
                                    key={row.id + "-" + i}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className={cn(
                                        `relative px-2 hover:bg-background cursor-pointer grid border-l border-secondary hover:border-primary transition-all duration-100`,
                                        setRowClassName ?
                                            setRowClassName(row.original)
                                        :   "",
                                        grid,
                                    )}
                                    onClick={() => handleCollapse(row.original)}
                                >
                                    {row.getVisibleCells().map((cell, j) => (
                                        <div
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
                                                "py-3",
                                                j === 0 && "pl-2",
                                            )}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </div>
                                    ))}

                                    <Button
                                        size={"icon"}
                                        variant={"ghost"}
                                        className={cn(
                                            "absolute right-2 top-2 h-7 w-7 transition-all duration-150 ease-linear",
                                        )}
                                    >
                                        <Eye
                                            className="text-primary"
                                            size={16}
                                        />
                                    </Button>
                                </div>
                            ))
                        :   <div className={cn("grid", grid)}>
                                <div className="h-24 text-center col-span-full">
                                    Mavjud emas
                                </div>
                            </div>
                        }
                    </div>
                </div>
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
