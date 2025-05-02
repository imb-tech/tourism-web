import Down from "@/assets/images/down.png"
import Up from "@/assets/images/up.png"
import formatMoney from "@/lib/format-money"

type Props = {
    income: number
    expense: number
    expected_expense: number
}

export default function HomeBalance({
    income,
    expense,
    expected_expense,
}: Props) {
    return (
        <div className="bg-background p-4 rounded-md flex flex-col gap-3">
            <div className="grid grid-cols-2">
                <div className="flex gap-3 items-center">
                    <img
                        width={44}
                        src={Up}
                        className="min-w-[44px] max-h-[44px]"
                    />
                    <div>
                        <p className="text-black/40 font-light">Income</p>
                        <span>{formatMoney(income)}</span>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <img
                        width={44}
                        src={Down}
                        className="min-w-[44px] max-h-[44px]"
                    />
                    <div>
                        <p className="text-black/40 font-light">Expense</p>
                        <span>{formatMoney(expense)}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <img
                    width={44}
                    src={Down}
                    className="min-w-[44px] max-h-[44px]"
                />
                <div>
                    <p className="text-black/40 font-light">
                        Expected expenses by the end of the month
                    </p>
                    <span>{formatMoney(expected_expense)}</span>
                </div>
            </div>
        </div>
    )
}
