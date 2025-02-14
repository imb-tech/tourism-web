import React from "react"

interface DateRangeProgressProps {
    start: string
    end: string
}

const DateRangeProgress: React.FC<DateRangeProgressProps> = ({
    start,
    end,
}) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const today = new Date()

    const totalDays =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const elapsedDays =
        (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const progress = Math.max(0, Math.min(100, (elapsedDays / totalDays) * 100))

    return (
        <div className="w-full">
            <div className="text-xs text-gray-700 mb-1">
                {startDate.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "short",
                })}{" "}
                -{" "}
                {endDate.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "short",
                })}
            </div>
            <div className="relative w-full h-1.5 bg-gray-200 rounded-full">
                <div
                    className="h-1.5 bg-blue-500 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    )
}

export default DateRangeProgress
