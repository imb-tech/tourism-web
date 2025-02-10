import { cn } from "@/lib/utils"
import { TableColumns } from "@/types/table"

export default function TourTableHeader<TData>({
    columns,
}: {
    columns: TableColumns<TData>[]
}) {
    return (
        <div className={cn("px-3 grid", "grid-cols-" + columns.length)}>
            {columns?.map((column, index) => (
                <p key={index} className={`font-medium`}>
                    {column.header?.toString()}
                </p>
            ))}
        </div>
    )
}
