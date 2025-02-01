import { cn } from "@/lib/utils"
import { memo } from "react"

type Props = {
    size: number
    finished: number
}

const Progress = ({ size, finished }: Props) => {
    return (
        <div className="flex gap-1 w-full">
            {Array(size)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-full p-1 rounded-md bg-secondary",
                            finished > i && "bg-primary",
                        )}
                    ></div>
                ))}
        </div>
    )
}

export default memo(Progress)
