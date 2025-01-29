import { cn } from "@/lib/utils"
import {
    Controller,
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"
import { MonthPicker } from "../ui/month-picker"

export default function FormMonthPicker<IForm extends FieldValues>({
    name,
    label,
    disabled,
    placeholder,
    methods,
    hideError = false,
    required = false,
    wrapperClassName,
}: IProps<IForm>) {
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
        <fieldset
            className={cn("flex flex-col gap-1 w-full", wrapperClassName)}
        >
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
                    <MonthPicker
                        value={field.value}
                        setValue={field.onChange}
                        disabled={field.disabled || disabled}
                        placeholder={placeholder}
                        className="w-full"
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

interface IProps<IForm extends FieldValues> {
    label?: string
    placeholder?: string
    disabled?: boolean
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    hideError?: boolean
    wrapperClassName?: ClassNameValue
    required?: boolean
}
