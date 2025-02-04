import Image from "@/components/custom/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { USER_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { formatPassportSerial } from "@/lib/format-passport-serial"
import { formatPhone } from "@/lib/format-phone"
import { Copy, Pencil, PhoneCall, Trash2 } from "lucide-react"
import { memo } from "react"

function UserCard(props: UserItem) {
    const { phone, photo, passcode, full_name } = props
    const { setStore } = useStore<UserItem>(USER_DATA)

    const { openModal: openDeleteModal } = useModal("delete")
    const { openModal } = useModal(USER_DATA)

    function handleEdit() {
        openModal()
    }

    function handleDelete() {
        setStore(props)
        openDeleteModal()
    }

    return (
        <Card className="w-full max-w-sm p-4 shadow-none">
            <CardHeader className="flex flex-row items-start justify-between">
                <Image
                    className="w-24 h-24 rounded-sm"
                    src={photo as unknown as string}
                />
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant={"destructive-muted"}
                        className="h-12 w-12 rounded-xl"
                        onClick={handleDelete}
                    >
                        <Trash2 size={20} className="font-light" />
                    </Button>
                    <Button
                        size="icon"
                        variant={"primary-muted"}
                        className="h-12 w-12 rounded-xl"
                        onClick={handleEdit}
                    >
                        <Pencil size={20} className="font-light" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-2">
                <p className="text-lg font-medium">{full_name}</p>
                <div className="flex items-center gap-1">
                    <Copy size={18} className="font-light text-primary" />
                    <span className="text-muted-foreground">
                        {formatPassportSerial(passcode)}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <PhoneCall size={18} className="font-light text-primary" />
                    <span className="text-muted-foreground">
                        {formatPhone(phone)}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

export default memo(UserCard, (prev, next) => prev.id === next.id)
