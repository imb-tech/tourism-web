import { cn } from "@/lib/utils"
import {
    Controller,
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import { CalendarProps } from "../ui/calendar"
import { DateRangePicker } from "../ui/date-range-picker"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    wrapperClassName?: ClassNameValue
    hideError?: boolean
    disabled?: boolean
    format?: string
    required?: boolean
}

export default function FormDateRangePicker<IForm extends FieldValues>({
    methods,
    name,
    label,
    hideError = false,
    required = false,
    disabled,
    format = "dd/MM/yyyy",
    wrapperClassName,
    ...calendarProps
}: IProps<IForm> & CalendarProps) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: required,
                message: `${label}ni tanlang`,
            },
        },
    })
    return (
        <fieldset className={cn("flex flex-col gap-1", wrapperClassName)}>
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(!!error && "text-destructive")}
                    required={required}
                >
                    {label}
                </Label>
            )}
            <Controller
                name={name}
                control={methods.control}
                render={() => (
                    <DateRangePicker
                        date={field.value}
                        setDate={field.onChange}
                        format={format}
                        placeholder={label}
                        disabled={field.disabled || disabled}
                        className="w-full"
                        {...calendarProps}
                    />
                )}
            />
            {!!error && !hideError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
