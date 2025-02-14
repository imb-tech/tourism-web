import InitialDataBox from "@/components/elements/initial-data-box"
import { TOUR } from "@/constants/api-endpoints"
import { useGet } from "@/services/default-requests"
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
        guide: () => import("@/pages/tour/gid/tour-row"),
        hotel: () => import("@/pages/tour/hotel/tour-row"),
        trans_in: () => import("@/pages/tour/transport1/tour-row"),
        trans_out: () => import("@/pages/tour/transport2/tour-row"),
        dinner: () => import("@/pages/tour/restoran1/tour-row"),
        lunch: () => import("@/pages/tour/restoran2/tour-row"),
        train: () => import("@/pages/tour/train/tour-row"),
        plane: () => import("@/pages/tour/plane/tour-row"),
        entrance: () => import("@/pages/tour/enterence/tour-row"),
        other: () => import("@/pages/tour/other/tour-row"),
    }

    const ComponentMain = useMemo(
        () => React.lazy(allowedTabs[type || "city"]),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [type],
    )

    const { data } = useGet<{ editable: false }>(TOUR + `/editable/${pack}`)
    console.log(data)

    return (
        <section className="p-3">
            <PackDetailHeader
                title="Tarif tavfsilotlari"
                backUrl={`/packs/${pack}`}
            />
            <div className="mt-3 bg-background p-3 rounded-md">
                <TourTab />
                <Suspense fallback={<InitialDataBox isLoading />}>
                    <div
                        style={{
                            pointerEvents: data?.editable ? "auto" : "none",
                        }}
                    >
                        <ComponentMain />
                    </div>
                </Suspense>
            </div>
        </section>
    )
}
