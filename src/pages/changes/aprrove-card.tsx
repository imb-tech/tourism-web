import FlashIcon from "@/assets/images/flash-icon.png"
import { Button } from "@/components/ui/button"
import { CHANGE_DATA } from "@/constants/localstorage-keys"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import { useNavigate } from "@tanstack/react-router"
import { CircleCheckBig, CircleX, FileText } from "lucide-react"

export default function ApproveCard({
    manager_name,
    id,
    status,
    tour,
}: ChangeDocumentItem) {
    const { openModal } = useModal()
    const { openModal: confirmContractModal } = useModal("contract")
    const { setStore } = useStore<ChnagesSetStore | undefined>(CHANGE_DATA)

    function handleFileOpen() {
        setStore({ id, condition: 1 })
        confirmContractModal()
    }

    function handleApprove() {
        setStore({ id, condition: 1 })
        openModal()
    }
    function handelCancelChanges() {
        setStore({ id, condition: -1 })
        openModal()
    }

    const navigate = useNavigate()

    function handleNavigate() {
        if (status == 40) {
            navigate({
                to: "/cost",
            })
        } else {
            navigate({
                to: "/packs/$pack",
                params: {
                    pack: tour.toString(),
                },
            })
        }
    }

    return (
        <div className="flex items-center gap-3">
            <img src={FlashIcon} alt="" width={48} height={48} />
            <div className="flex flex-col flex-1">
                <p className="text-sm">Tur paketni tasdiqlash kutilmoqda</p>
                <p
                    className="text-sm text-black/40 cursor-pointer"
                    onClick={handleNavigate}
                >
                    <span className="text-primary">#{id}</span> tur paket{" "}
                    <span className="text-primary">{manager_name}</span>{" "}
                    tomonidan tayyorlandi
                </p>
            </div>
            <div className="flex items-center">
                {status === 20 && (
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={handleFileOpen}
                    >
                        <FileText size={18} className="text-primary" />
                    </Button>
                )}
                {[10, 40].includes(status) && (
                    <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={handleApprove}
                    >
                        <CircleCheckBig size={18} className="text-success" />
                    </Button>
                )}
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={handelCancelChanges}
                >
                    <CircleX size={18} className="text-destructive" />
                </Button>
            </div>
        </div>
    )
}
