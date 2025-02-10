import { cn } from "@/lib/utils"

export default function TourCol({ day, data }: TourTransport1Item) {
    return (
        <div className="w-full grid grid-cols-7 bg-background rounded-sm px-3 py-1">
            <div className="flex flex-col justify-center">
                <p className="text-primary">Day {day}</p>
            </div>
            <div className="flex flex-col col-span-6">
                {data?.map((el, i) => (
                    <div
                        className={cn(
                            "min-w-full flex-1 py-2 px-1 grid grid-cols-6",
                            i > 0 && "border-t border-secondary",
                        )}
                        key={el.id}
                    >
                        <p className="font-light text-sm">{el.name}</p>
                        <p className="font-light text-sm">{el.size}</p>
                        <p className="font-light text-sm">{el.price}</p>
                        <p className="font-light text-sm">{el.driver}</p>
                        <p className="font-light text-sm">{el.driver_phone}</p>
                        <p className="font-light text-sm">{el.company}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
