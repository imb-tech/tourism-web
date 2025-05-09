import { cn } from "@/lib/utils"
import { Paperclip, Trash2 } from "lucide-react"
import { useState, type ChangeEvent } from "react"
import { InputProps } from "../ui/input"

type Props = {
    wrapperClassName?: string
    ischecked?: Blob | null
    handleChange?: (v: Blob | null) => void
}

export default function FileInput({
    wrapperClassName,
    handleChange,
    name,
    ischecked,
    ...props
}: InputProps & Props) {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (e?.target?.files && e.target.files?.[0]) {
            setFile(e.target.files[0])
            handleChange?.(e.target.files[0])
        } else {
            handleChange?.(null)
        }
    }

    const handleDelete = () => {
        setFile(null)
        handleChange?.(null)
    }

    return (
        <div className={cn("w-auto max-w-xs", wrapperClassName)}>
            <label
                htmlFor={name}
                className="relative flex items-center justify-between px-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-sm cursor-pointer group"
            >
                <div className="flex items-center gap-2 text-xs">
                    <Paperclip className="w-4 h-4 text-gray-500" />
                    {/* eslint-disable-next-line @typescript-eslint/prefer-optional-chain */}
                    {file?.type || ischecked ?
                        <span className="text-green-500">
                            check.
                            {file ?
                                file.type?.split("/")[1]
                            :   String(ischecked).split(".").at(-1)}
                        </span>
                    :   <span className="text-gray-700">Upload invoice</span>}
                </div>

                {/* eslint-disable-next-line @typescript-eslint/prefer-optional-chain */}
                {(file?.type || ischecked) && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleDelete()
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
                <input
                    id={name}
                    type="file"
                    {...props}
                    value={undefined}
                    className={cn("sr-only", props.className)}
                    onChange={handleFileChange}
                />
            </label>
        </div>
    )
}
