import Header from "@/components/header"
import PackDetail from "@/pages/pack-detail"
import PackDetailFilter from "@/pages/pack-detail/pack-detail-filter"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/packs/$pack/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { pack } = useParams({ from: "/_main/packs/$pack/" })
    return (
        <div>
            <Header
                links={[
                    { to: "/", label: "Tour packages" },
                    { label: `#${pack}` },
                ]}
                rightRightChild={<PackDetailFilter />}
            />
            <PackDetail />
        </div>
    )
}
