import PackDetailHeader from "../pack-detail/pack-detail-header"
import CostTab from "./cost-tab"

export default function CostMain() {
    return (
        <section className="p-3">
            <PackDetailHeader title="Real xarajatlar" backUrl={`/cost`} />
            <div className="mt-3 bg-background p-3 rounded-md">
                <CostTab />
            </div>
        </section>
    )
}
