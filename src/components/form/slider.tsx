import { cn } from "@/lib/utils"
import {
    Controller,
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"

export default function FormSlider<IForm extends FieldValues>({
    name,
    label,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    methods,
    hideError = false,
    required = false,
}: SliderProps<IForm>) {
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
        <fieldset className="w-full">
            <Controller
                name={name}
                control={methods.control}
                render={() => (
                    <div className={label ? "flex flex-col gap-3" : ""}>
                        {label && (
                            <Label
                                htmlFor={name}
                                className={cn(!!error && "text-destructive")}
                                required={required}
                            >
                                {label}
                            </Label>
                        )}
                        <Slider
                            min={min}
                            max={max}
                            step={step}
                            value={[field.value || min]}
                            onValueChange={(val) => field.onChange(val?.[0])}
                            disabled={disabled}
                        />
                    </div>
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

interface SliderProps<IForm extends FieldValues> {
    label?: string
    min?: number
    max?: number
    step?: number
    disabled?: boolean
    required?: boolean
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    hideError?: boolean
}
