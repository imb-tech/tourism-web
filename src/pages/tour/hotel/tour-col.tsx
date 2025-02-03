import formatMoney from "@/lib/format-money"
import { cn } from "@/lib/utils"

export default function TourCol({ day, data }: TourHotelItem) {
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
                        <p className="flex-[0.25] font-light text-sm">
                            {el?.name}
                        </p>
                        <p className="flex-[0.25] font-light text-sm">
                            {el?.type}
                        </p>
                        <p className="flex-[0.25] font-light text-sm">
                            {el?.rooms}
                        </p>
                        <p className="flex-[0.25] font-light text-sm">
                            {formatMoney(el?.per_price)}
                        </p>
                        <p className="flex-[0.25] font-light text-sm">
                            {formatMoney(el?.total_price)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
