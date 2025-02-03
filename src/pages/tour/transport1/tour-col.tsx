import { cn } from "@/lib/utils"

export default function TourCol({ day, data }: TourTransport1Item) {
    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.1] text-primary">Day {day}</p>
            <div className="flex-[0.9] flex flex-col">
                {data?.map((el, i) => (
                    <div
                        className={cn(
                            "flex items-center min-w-full flex-1 py-2 px-1",
                            i > 0 && "border-t border-secondary",
                        )}
                        key={el.id}
                    >
                        <p className="flex-[0.166] font-light text-sm">
                            {el.name}
                        </p>
                        <p className="flex-[0.166] font-light text-sm">
                            {el.size}
                        </p>
                        <p className="flex-[0.166] font-light text-sm">
                            {el.price}
                        </p>
                        <p className="flex-[0.166] font-light text-sm">
                            {el.driver}
                        </p>
                        <p className="flex-[0.166] font-light text-sm">
                            {el.driver_phone}
                        </p>
                        <p className="flex-[0.166] font-light text-sm">
                            {el.company}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
