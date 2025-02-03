import { TableColumns } from "@/types/table"

export default function TourTableHeader<TData>({
    columns,
}: {
    columns: TableColumns<TData>[]
}) {
    return (
        <div className="w-full flex items-center rounded-sm px-3">
            {columns?.map((column, index) => (
                <p key={index} className={`flex-[${column.flex}] font-medium`}>
                    {column.header?.toString()}
                </p>
            ))}
        </div>
    )
}
