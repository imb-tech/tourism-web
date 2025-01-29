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
import { DatePicker } from "../ui/date-picker"
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
    placeholder?: string
    required?: boolean
}

export default function FormDatePicker<IForm extends FieldValues>({
    methods,
    name,
    label,
    hideError = false,
    disabled,
    format,
    placeholder,
    required = false,
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
        <fieldset className="flex flex-col gap-1">
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
                    <DatePicker
                        date={field.value}
                        setDate={field.onChange}
                        format={format}
                        placeholder={placeholder || label}
                        disabled={field.disabled || disabled}
                        fullWidth
                        {...calendarProps}
                        defaultMonth={
                            field.value ?
                                new Date(
                                    field.value?.toString()?.replace("/", "-"),
                                )
                            :   new Date()
                        }
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
