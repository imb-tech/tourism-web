import Down from "@/assets/images/down.png"
import Up from "@/assets/images/up.png"

export default function HomeBalance() {
    return (
        <div className="bg-background p-4 rounded-md flex flex-col gap-3">
            <div className="flex gap-3 items-center">
                <img
                    width={44}
                    src={Up}
                    className="min-w-[44px] max-h-[44px]"
                />
                <div>
                    <p className="text-black/40 font-light">Tushum</p>
                    <span>10 000 000</span>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <img
                    width={44}
                    src={Down}
                    className="min-w-[44px] max-h-[44px]"
                />
                <div>
                    <p className="text-black/40 font-light">Xarajat</p>
                    <span>10 000 000</span>
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
                        Oy ohirigacha kutilayotgan xarajat
                    </p>
                    <span>10 000 000</span>
                </div>
            </div>
        </div>
    )
}
