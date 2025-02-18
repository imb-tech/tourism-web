import Img from "@/assets/images/drop-img.png"
import { cn } from "@/lib/utils"
import { useMemo, useRef } from "react"
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form"
import ErrorMessage from "../ui/error-message"
import { InputProps } from "../ui/input"

type IProps<IForm extends FieldValues> = {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    className?: string
    required?: boolean
    label?: string
    hideError?: boolean
}

export default function DropZone<IForm extends FieldValues>({
    className,
    name,
    methods,
    required = false,
    label,
    hideError,
}: IProps<IForm> & InputProps) {
    const dropzoneRef = useRef<HTMLLabelElement>(null)

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files[0]
        methods.clearErrors(name)
        methods.setValue(name, droppedFile as PathValue<IForm, Path<IForm>>)
    }

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.add("bg-gray-200")
        }
    }

    const {
        register,
        watch,
        formState: { errors },
    } = methods

    register(name, {
        required: {
            value: required,
            message: `${label}ni kiriting`,
        },
    })

    const handleDragLeave = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.remove(
                "bg-gray-200",
                "border",
                "border-primary",
                "border-dashed",
            )
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            methods.clearErrors(name)
            methods.setValue(name, file as PathValue<IForm, Path<IForm>>)
        }
    }

    const handleDragEnter = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.add(
                "border",
                "border-primary",
                "border-dashed",
            )
        }
    }

    const value = watch(name)

    const files = useMemo(() => (value ? [value as File] : []), [value])

    return (
        <fieldset className={className}>
            <label
                ref={dropzoneRef}
                className={cn(
                    "cursor-pointer mt-3 flex rounded-sm",
                    errors[name] ? "border border-destructive" : "",
                )}
                onDragEnter={handleDragEnter}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <img src={Img} />

                <input
                    type="file"
                    // name={name}
                    onChange={handleFileChange}
                    className="w-0 h-0 overflow-hidden"
                />
            </label>
            {!hideError && errors[name] && (
                <ErrorMessage>
                    {(errors[name]?.message as string) ||
                        errors.root?.[name]?.message}
                </ErrorMessage>
            )}

            <div className="mt-4">
                {files.length > 0 ?
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                <p className="text-green-600 text-xs">
                                    {index + 1}. {file?.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                :   ""}
            </div>
        </fieldset>
    )
}
