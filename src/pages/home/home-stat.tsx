import BankSign from "@/assets/images/bank-sign.png"
import UsdSign from "@/assets/images/usd-sign.png"
import formatMoney from "@/lib/format-money"

type Props = {
    type: "bank" | "cash"
    balance: number
    expense: number
}

export default function HomeStat({ type, balance, expense }: Props) {
    const typeLabel = type === "bank" ? "Bank" : "Cash"
    return (
        <div className="bg-background p-4 rounded-md flex flex-col gap-3 ">
            <div className="flex justify-between">
                <div>
                    <p className="text-black/40 font-light">
                        {typeLabel} balance
                    </p>
                    <span>{formatMoney(balance)}</span>
                </div>
                <img
                    src={type === "bank" ? BankSign : UsdSign}
                    className="min-w-[48px]"
                />
            </div>

            <div>
                <div>
                    <p className="text-black/40 font-light">
                        {typeLabel} spent this month
                    </p>
                    <span>{formatMoney(expense)}</span>
                </div>
            </div>
        </div>
    )
}
