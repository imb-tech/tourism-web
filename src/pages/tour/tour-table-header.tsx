import { cn } from "@/lib/utils"
import { TableColumns } from "@/types/table"

export default function TourTableHeader<TData>({
    columns,
    grid,
}: {
    columns: TableColumns<TData>[]
    grid?: `grid-cols-${number}`
}) {
    return (
        <div className={cn("px-3 grid", grid)}>
            {columns?.map((column, index) => (
                <p key={index} className={`font-medium`}>
                    {column.header?.toString()}
                </p>
            ))}
        </div>
    )
}
