import compressImg from "@/lib/compress-img"
import { cn } from "@/lib/utils"
import { Options } from "browser-image-compression"
import { Upload } from "lucide-react"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { ClassNameValue } from "tailwind-merge"
import Image from "../custom/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import ErrorMessage from "../ui/error-message"
import SeeInView from "../ui/see-in-view"

export default function FormImageInput<IForm extends FieldValues>({
    name,
    label: labelName = "Rasm",
    disabled,
    methods,
    hideError = false,
    required = false,
    className,
    avatar,
    previewUrl,
    wrapperClassName,
    isCompressed = true,
    compressOptions,
    handleChange,
}: ImageInputProps<IForm>) {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: required,
                message: `${labelName}ni tanlang`,
            },
        },
    })

    async function handleOnchange(file: File) {
        if (handleChange) {
            handleChange(file)
        }
        if (isCompressed) {
            const compressedFile = await compressImg(file, compressOptions)
            field.onChange(compressedFile)
        } else {
            field.onChange(file)
        }
    }

    return (
        <div className={cn("relative", wrapperClassName)}>
            {avatar ?
                <Avatar className={`scale-150 mb-4 ${className}`}>
                    {field.value && (
                        <SeeInView
                            url={
                                typeof field.value === "string" ?
                                    field.value
                                :   field.value &&
                                    URL.createObjectURL(field.value)
                            }
                        >
                            <AvatarImage
                                src={
                                    typeof field.value === "string" ?
                                        field.value
                                    :   field.value &&
                                        URL.createObjectURL(field.value)
                                }
                                alt="Selected Image"
                                className="object-cover"
                            />
                        </SeeInView>
                    )}
                    <AvatarFallback>Img</AvatarFallback>
                </Avatar>
            :   <>
                    {field.value || previewUrl ?
                        <main
                            className={cn(
                                "cursor-pointer relative group",
                                className,
                            )}
                        >
                            <div className="rounded-lg overflow-hidden bg-gray-100 border h-[70px] w-[70px] object-cover">
                                <Image
                                    src={
                                        field.value ?
                                            typeof field.value === "string" ?
                                                field.value
                                            :   field.value &&
                                                URL.createObjectURL(field.value)

                                        :   previewUrl
                                    }
                                    alt="Profile"
                                    width={70}
                                    height={70}
                                    fill
                                    imgClassName="object-cover"
                                />
                                <label className="absolute inset-0 bg-black/60 text-white text-xs font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg transition-opacity">
                                    {labelName || "Tanlash"}
                                    <input
                                        type="file"
                                        id={name}
                                        accept="image/*"
                                        disabled={disabled || field.disabled}
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) {
                                                handleOnchange(file)
                                            }
                                        }}
                                        hidden
                                    />
                                </label>
                            </div>
                        </main>
                    :   <label
                            className={`${className} bg-secondary h-[70px] w-[70px] rounded-lg flex items-center justify-center`}
                        >
                            <Upload />
                            <input
                                type="file"
                                id={name}
                                accept="image/*"
                                disabled={disabled || field.disabled}
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        handleOnchange(file)
                                    }
                                }}
                                hidden
                            />
                        </label>
                    }
                </>
            }
            {!!error && !hideError && (
                <ErrorMessage className="text-center">
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </div>
    )
}

interface ImageInputProps<IForm extends FieldValues> {
    name: Path<IForm>
    label?: string
    disabled?: boolean
    required?: boolean
    methods: UseFormReturn<IForm>
    hideError?: boolean
    className?: ClassNameValue
    avatar?: boolean
    previewUrl?: undefined | string
    wrapperClassName?: ClassNameValue
    isCompressed?: boolean
    compressOptions?: Options
    handleChange?: (val: File) => void
}
