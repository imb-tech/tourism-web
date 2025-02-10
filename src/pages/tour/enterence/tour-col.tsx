import { cn } from "@/lib/utils"

export default function TourCol({ day, data }: EnterenceItem) {
    return (
        <div className="w-full grid grid-cols-3 items-center bg-background rounded-sm px-3 py-1">
            <p className="text-primary">Day {day}</p>
            {data?.map((el, i) => (
                <div
                    className={cn(
                        "flex items-center min-w-full flex-1 py-2 px-1",
                        i > 0 && "border-t border-secondary",
                    )}
                    key={el.id}
                >
                    <p className="flex-[0.25] font-light text-sm">{el.name}</p>
                    <p className="flex-[0.25] font-light text-sm">{el.users}</p>
                    <p className="flex-[0.25] font-light text-sm">
                        {el.per_price}
                    </p>
                    <p className="flex-[0.25] font-light text-sm">
                        {el.total_price}
                    </p>
                </div>
            ))}
        </div>
    )
}
