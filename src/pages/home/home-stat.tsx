import BankSign from "@/assets/images/bank-sign.png"
import UsdSign from "@/assets/images/usd-sign.png"

type Props = {
    type: "bank" | "cash"
}

export default function HomeStat({ type }: Props) {
    return (
        <div className="bg-background p-4 rounded-md flex flex-col gap-3">
            <div className="flex justify-between">
                <div>
                    <p className="text-black/40 font-light">
                        Balans {type === "bank" ? "bank" : "naqd"}
                    </p>
                    <span>10 000 000</span>
                </div>
                <img
                    src={type === "bank" ? BankSign : UsdSign}
                    className="min-w-[48px]"
                />
            </div>

            <div>
                <div>
                    <p className="text-black/40 font-light">
                        Shu oy sarflangan naqd
                    </p>
                    <span>10 000 000</span>
                </div>
            </div>

            <div>
                <div>
                    <p className="text-black/40 font-light">
                        Oy ohirigacha naqdda kutilayotgan tushum
                    </p>
                    <span>10 000 000</span>
                </div>
            </div>
        </div>
    )
}
