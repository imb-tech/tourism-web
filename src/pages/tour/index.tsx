import InitialDataBox from "@/components/elements/initial-data-box"
import { useParams, useSearch } from "@tanstack/react-router"
import React, { Suspense, useMemo } from "react"
import PackDetailHeader from "../pack-detail/pack-detail-header"
import TourTab from "./tour-tab"

export default function Tour() {
    const { pack } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    const { type } = useSearch({ from: "/_main/packs/$pack/tour/$id" })

    const allowedTabs: Record<
        packTab,
        () => Promise<{ default: React.ComponentType }>
    > = {
        city: () => import("@/pages/tour/city/tour-row"),
        gid: () => import("@/pages/tour/gid/tour-row"),
        hotel: () => import("@/pages/tour/hotel/tour-row"),
        transport1: () => import("@/pages/tour/transport1/tour-row"),
        transport2: () => import("@/pages/tour/transport2/tour-row"),
        restoran1: () => import("@/pages/tour/restoran1/tour-row"),
        restoran2: () => import("@/pages/tour/restoran2/tour-row"),
        train: () => import("@/pages/tour/train/tour-row"),
        plane: () => import("@/pages/tour/plane/tour-row"),
        enterence: () => import("@/pages/tour/enterence/tour-row"),
        other: () => import("@/pages/tour/other/tour-row"),
    }

    const ComponentMain = useMemo(
        () => React.lazy(allowedTabs[type || "city"]),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [type],
    )

    return (
        <section className="p-3">
            <PackDetailHeader
                title="Tarif tavfsilotlari"
                backUrl={`/packs/${pack}`}
            />
            <div className="mt-3 bg-background p-3 rounded-md">
                <TourTab />
                <Suspense fallback={<InitialDataBox isLoading />}>
                    <div>
                        <ComponentMain />
                    </div>
                </Suspense>
            </div>
        </section>
    )
}
