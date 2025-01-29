import { cn } from "@/lib/utils"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    wrapperClassName?: ClassNameValue
    hideError?: boolean
    required?: boolean
}

export default function FormTextarea<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    hideError = false,
    required = false,
    ...props
}: IProps<IForm> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const {
        register,
        formState: { errors },
    } = methods

    const reg = register(name, {
        required: {
            value: required,
            message: `${label}ni kiriting`,
        },
    })

    // to avoid this Warning: Cannot update a component (Component) while rendering a different component (FormTextarea). To locate the bad setState() call inside FormTextarea
    // useEffect(() => {
    //     methods.register(name)
    // }, [methods, name])

    return (
        <fieldset
            className={cn("flex flex-col gap-2 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(!!errors?.[name] && "text-destructive")}
                    required={required}
                >
                    {label}
                </Label>
            )}
            <Textarea
                placeholder={label}
                id={name}
                className={cn(
                    !!errors?.[name] && !label ?
                        "border-destructive focus:border-border !ring-destructive"
                    :   "",
                    className,
                )}
                {...reg}
                {...props}
            />
            {!hideError && errors[name] && (
                <ErrorMessage>
                    {(errors[name]?.message as string) ||
                        errors.root?.[name]?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}
