import { SERVER_DATE_FORMAT } from "@/constants/date"
import { cn } from "@/lib/utils"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { format as formatter } from "date-fns"
import { X } from "lucide-react"
import { useEffect } from "react"
import { CalendarProps } from "../ui/calendar"
import { DatePicker } from "../ui/date-picker"

interface IProps {
    name?: string
    format?: string
    className?: string
    date?: Date | undefined
    setDate?: (date: Date | undefined) => void
    disabled?: boolean
    paramName?: string
    defaultValue?: Date | string
    placeholder?: string
}

export default function ParamDatePicker({
    format = SERVER_DATE_FORMAT,
    className,
    paramName = "date",
    defaultValue,
    disabled,
    date,
    name,
    setDate,
    fromYear = 1960,
    toYear = new Date().getFullYear(),
    placeholder,
    ...props
}: IProps & CalendarProps) {
    const navigate = useNavigate()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const search: any = useSearch({ from: "__root__" }) as Record<
        string,
        string | undefined
    >
    const handleOnChange = (date: string | Date | null | undefined) => {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: date ? formatter(date, format) : undefined,
                },
            })
            return new Date()
        }
        return new Date()
    }

    function reset() {
        if (!disabled) {
            navigate({
                search: {
                    ...search,
                    [paramName]: undefined,
                },
            })
        }
    }

    useEffect(() => {
        navigate({ search: { ...search, [paramName]: defaultValue } })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            className={cn(
                "relative flex items-center justify-between w-auto",
                className,
            )}
        >
            <DatePicker
                date={search?.[paramName]}
                disabled={disabled}
                onDayClick={handleOnChange}
                fromYear={fromYear}
                placeholder={placeholder || "Select a date"}
                toYear={toYear}
                format={format}
                {...props}
                className={cn(
                    className,
                    search?.[paramName] && !disabled && "pr-8",
                )}
            />
            {search?.[paramName] && !disabled && (
                <X
                    onClick={reset}
                    size={16}
                    className="text-destructive absolute right-2 cursor-pointer"
                />
            )}
        </div>
    )
}
