import ErrorMessage from "@/components/ui/error-message"
import { Label } from "@/components/ui/label"
import { MultiCombobox } from "@/components/ui/multi-combobox"
import { cn } from "@/lib/utils"
import {
    Controller,
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"

export default function FormMultiCombobox<IForm extends FieldValues>({
    name,
    label,
    options,
    disabled,
    placeholder,
    methods,
    hideError = false,
    required = false,
    returnValue = "id",
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
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
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
                    <MultiCombobox
                        options={options}
                        values={field.value}
                        setValues={field.onChange}
                        label={placeholder || label || "Tanlang"}
                        disabled={field.disabled || disabled}
                        isError={!label && !!error}
                        returnValue={returnValue}
                        isWithImages
                        buttonClassName={"h-[64px] px-2"}
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
    options: { name: string | number; id: string | number }[] | undefined
    disabled?: boolean
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    hideError?: boolean
    returnValue?: "name" | "id"
    wrapperClassName?: ClassNameValue
    required?: boolean
}
