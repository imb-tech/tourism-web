import formatMoney from "@/lib/format-money"
import { cn } from "@/lib/utils"

export default function TourGidCard({ day, data }: TourGidItem) {
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
                        <p className="flex-[0.11] font-light text-sm">
                            {el?.name}
                        </p>
                        <p className="flex-[0.165] font-light text-sm">
                            {el?.phone}
                        </p>
                        <p className="flex-[0.115] font-light text-sm">
                            {formatMoney(el?.price)}
                        </p>
                        <p className="flex-[0.11] font-light text-sm">
                            {el?.langs.join(", ")}
                        </p>
                        <p className="flex-[0.4] font-light text-sm">
                            {el?.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
