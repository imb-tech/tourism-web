import { cn } from "@/lib/utils"

export default function TourCol({ day, data }: TourTransport2Item) {
    return (
        <div className="w-full flex items-center bg-background rounded-sm px-3 py-1">
            <p className="flex-[0.05] text-primary">Day {day}</p>
            <div className="flex-[0.95] flex flex-col">
                {data?.map((el, i) => (
                    <div
                        className={cn(
                            "flex items-center min-w-full flex-1 py-2 px-1",
                            i > 0 && "border-t border-secondary",
                        )}
                        key={el.id}
                    >
                        <p className="flex-[0.15] font-light text-sm">
                            {el.name}
                        </p>
                        <p className="flex-[0.15] font-light text-sm">
                            {el.size}
                        </p>
                        <p className="flex-[0.15] font-light text-sm">
                            {el.price}
                        </p>
                        <p className="flex-[0.15] font-light text-sm">
                            {el.from_city} - {el.to_city}
                        </p>
                        <p className="flex-[0.15] font-light text-sm">
                            {el.from_time} - {el.to_time}
                        </p>
                        <p className="flex-[0.15] font-light text-sm">
                            {el.driver}
                        </p>
                        <p className="flex-[0.15] font-light text-sm">
                            {el.driver_phone}
                        </p>
                        <p className="flex-[0.15] font-light text-sm">
                            {el.company}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
