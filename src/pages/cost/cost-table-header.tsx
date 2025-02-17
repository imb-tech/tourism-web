import { cn } from "@/lib/utils"

export default function CostTableHeader({
    columns,
    grid,
}: {
    columns: string[]
    grid?: `grid-cols-${number}`
}) {
    return (
        <div className={cn("px-3 grid gap-2", grid)}>
            {columns?.map((column, index) => (
                <p key={index} className={cn(`font-medium text-xs`)}>
                    {column}
                </p>
            ))}
        </div>
    )
}
