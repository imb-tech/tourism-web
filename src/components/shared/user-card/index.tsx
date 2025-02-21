import Image from "@/components/custom/image"
import { Button } from "@/components/ui/button"
import SeeInView from "@/components/ui/see-in-view"
import { USER_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { formatPassportSerial } from "@/lib/format-passport-serial"
import { formatPhone } from "@/lib/format-phone"
import { Copy, Pencil, PhoneCall, Trash2 } from "lucide-react"
import { memo } from "react"
import { toast } from "sonner"

function UserCard(props: UserItemProps) {
    const { phone, photo, passcode, full_name, is_leader } = props
    const { setStore } = useStore<UserItemProps>(USER_DATA)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal } = useModal()

    function handleEdit() {
        setStore(props)
        openModal()
    }

    function handleDelete() {
        setStore(props)
        openDeleteModal()
    }

    function handleCopy(type: "phone" | "pass") {
        navigator.clipboard.writeText(type === "pass" ? passcode : phone)
        toast.success(`${type === "pass" ? passcode : phone} nusxalandi`)
    }

    return (
        <div className="w-full max-w-sm p-2 shadow-none bg-background rounded-lg relative">
            <div className="flex items-stretch p-0 gap-2">
                <div className="w-48 h-48 object-cover">
                    <SeeInView url={photo}>
                        <Image className="w-48 h-48 rounded-sm" src={photo} />
                    </SeeInView>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                    <div className="p-0 flex flex-col gap-2">
                        <p className="text-lg font-medium">{full_name}</p>
                        <div
                            className="flex items-center gap-1"
                            onClick={() => handleCopy("pass")}
                        >
                            <Copy
                                size={16}
                                className="font-light text-primary"
                            />
                            <span className="text-muted-foreground text-sm cursor-pointer">
                                {formatPassportSerial(passcode)}
                            </span>
                        </div>
                        <div
                            className="flex items-center gap-1 cursor-pointer"
                            onClick={() => handleCopy("phone")}
                        >
                            <PhoneCall
                                size={16}
                                className="font-light text-primary"
                            />
                            <span className="text-muted-foreground text-sm">
                                {formatPhone(phone)}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="icon"
                            variant={"destructive-muted"}
                            className="h-10 w-10 rounded-xl"
                            onClick={handleDelete}
                        >
                            <Trash2 size={20} className="font-light" />
                        </Button>
                        <Button
                            size="icon"
                            variant={"primary-muted"}
                            className="h-10 w-10 rounded-xl"
                            onClick={handleEdit}
                        >
                            <Pencil size={20} className="font-light" />
                        </Button>
                    </div>
                </div>

                {is_leader && (
                    <span className="p-3 py-[1px] bg-primary absolute text-white right-0 bottom-0 rounded-lg rounded-bl-none rounded-tr-none">
                        Leader
                    </span>
                )}
            </div>
        </div>
    )
}

export default memo(UserCard, (prev, next) => prev.id === next.id)
