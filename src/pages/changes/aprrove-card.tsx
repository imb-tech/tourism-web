import FlashIcon from "@/assets/images/flash-icon.png"
import { Button } from "@/components/ui/button"
import { CircleCheckBig, CircleX, FileText } from "lucide-react"

export default function ApproveCard({ manager_name, id }: ChangeDocumentItem) {
    return (
        <div className="flex items-center gap-3">
            <img src={FlashIcon} alt="" width={48} height={48} />
            <div className="flex flex-col flex-1">
                <p className="text-sm">Tur paketni tasdiqlash kutilmoqda</p>
                <p className="text-sm text-black/40">
                    <span className="text-primary">#{id}</span> tur paket{" "}
                    <span className="text-primary">{manager_name}</span>{" "}
                    tomonidan tayyorlandi
                </p>
            </div>
            <div className="flex items-center">
                <Button size={"icon"} variant={"ghost"}>
                    <FileText size={18} className="text-primary" />
                </Button>
                <Button size={"icon"} variant={"ghost"}>
                    <CircleCheckBig size={18} className="text-success" />
                </Button>
                <Button size={"icon"} variant={"ghost"}>
                    <CircleX size={18} className="text-destructive" />
                </Button>
            </div>
        </div>
    )
}
