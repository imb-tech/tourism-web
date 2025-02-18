import Img from "@/assets/images/drop-img.png"
import FormAction from "@/components/custom/form-action"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import formatMoney from "@/lib/format-money"
import { usePost } from "@/services/default-requests"
import { useRef, useState } from "react"

export default function ApproveBankForm() {
    const { closeModal } = useModal("approve")
    const { store } = useStore<BankRequest>("bank-data")

    const [files, setFiles] = useState<File | null>(null)
    const dropzoneRef = useRef<HTMLLabelElement>(null)

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files[0]
        setFiles(droppedFile)
    }

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault() // Standard HTML dragover behavior is disabled
        if (dropzoneRef.current) {
            dropzoneRef.current.classList.add("bg-gray-200")
        }
    }

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
            setFiles(file)
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

    const { mutate, isPending } = usePost(
        {
            onSuccess() {
                closeModal()
            },
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    )

    function handleSubmit() {
        const formData = new FormData()
        if (files) {
            formData.append("invoice", files)
        }
        mutate("", files)
    }

    return (
        <form onSubmit={(e) => (e.preventDefault(), handleSubmit())}>
            <p>Tur paket: #{store?.tour_id}</p>
            <p>Summa: {formatMoney(store?.amount)}</p>

            <label
                ref={dropzoneRef}
                className={"cursor-pointer mt-3 flex rounded-sm"}
                onDragEnter={handleDragEnter}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <img src={Img} />

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-0 h-0 overflow-hidden"
                />
            </label>

            <div className="mt-4">
                {[files].length > 0 ?
                    <ul>
                        {[files].map((file, index) => (
                            <li key={index}>
                                <p className="text-green-600 text-xs">
                                    {index + 1}. {file?.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                :   ""}
            </div>

            <FormAction loading={isPending} />
        </form>
    )
}
