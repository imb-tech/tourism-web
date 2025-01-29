import { cn } from "@/lib/utils"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { PatternFormat, PatternFormatProps } from "react-number-format"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    formatOptions?: Intl.NumberFormatOptions
    wrapperClassName?: string
    hideError?: boolean
    required?: boolean
}

export default function PatternField<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    formatOptions,
    hideError = false,
    required = false,
    ...props
}: IProps<IForm> & PatternFormatProps) {
    const {
        field: { ref, onChange, ...field },
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: required,
                message: `${label}ni kiriting`,
            },
        },
    })

    return (
        <fieldset
            className={cn("flex gap-1 flex-col w-full", wrapperClassName)}
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
            <PatternFormat
                id={name}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                    error &&
                        !label &&
                        "border-destructive focus:border-border !ring-destructive",
                )}
                onValueChange={(val) => {
                    onChange(val.value)
                }}
                getInputRef={ref}
                placeholder={label}
                {...field}
                {...props}
            />
            {!!error && !hideError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
