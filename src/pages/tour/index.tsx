import { useParams } from "@tanstack/react-router"
import PackDetailHeader from "../pack-detail/pack-detail-header"
import TourCityRow from "./city/tour-row"
import TourGidRow from "./gid/tour-gid-row"
import TourTab from "./tour-tab"

export default function Tour() {
    const { pack } = useParams({ from: "/_main/packs/$pack/tour/$id" })

    return (
        <section className="p-3">
            <PackDetailHeader
                title="Tarif tavfsilotlari"
                backUrl={`/packs/${pack}`}
            />
            <div className="mt-3 bg-background p-3 rounded-md">
                <TourTab />
                <div className="p-3 bg-secondary rounded-sm">
                    <TourCityRow />
                </div>
                <div className="p-3 bg-secondary rounded-sm">
                    <TourGidRow />
                </div>
            </div>
        </section>
    )
}
