import Down from "@/assets/images/down.png"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"
import { useStore } from "@/hooks/use-store"
import formatMoney from "@/lib/format-money"
import { CircleCheckBig, CircleX } from "lucide-react"

export default function BankRequest(props: BankRequest) {
    const { openModal } = useModal("approve")
    const { setStore } = useStore("bank-data")

    function handleApprove() {
        setStore(props)
        openModal()
    }

    function handelCancelChanges() {
        openModal()
    }

    return (
        <div className="flex items-center gap-3">
            <img src={Down} alt="" width={48} height={48} />
            <div className="flex flex-col flex-1">
                <p className="text-sm">{formatMoney(props.amount)}</p>
                <p className="text-sm text-black/40">
                    <span className="text-primary">#{props.tour_id}</span>{" "}
                    <span className="text-primary">{props.sender_id}</span> ga
                    pul berildi
                </p>
            </div>
            <div className="flex items-center">
                <Button size={"icon"} variant={"ghost"} onClick={handleApprove}>
                    <CircleCheckBig size={18} className="text-success" />
                </Button>
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
