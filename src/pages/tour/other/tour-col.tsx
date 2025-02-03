import { cn } from "@/lib/utils"

export default function TourCol({ day, data }: OtherItem) {
    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.25] text-primary">Day {day}</p>
            <div className="flex-[0.75] flex flex-col">
                {data?.map((el, i) => (
                    <div
                        className={cn(
                            "flex items-center min-w-full flex-1 py-2 px-1 gap-2",
                            i > 0 && "border-t border-secondary",
                        )}
                        key={el.id}
                    >
                        <p className="flex-[0.333] font-light text-sm">
                            {el.category}
                        </p>
                        <p className="flex-[0.333] font-light text-sm">
                            {el.description}
                        </p>
                        <p className="flex-[0.333] font-light text-sm">
                            {el.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
