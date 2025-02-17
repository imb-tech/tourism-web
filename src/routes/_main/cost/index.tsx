import Header from "@/components/header"
import Layout from "@/components/layouts/layout"
import CostHome from "@/pages/cost/cost-home"
import PackFilters from "@/pages/packs/pack-filters"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/cost/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main>
            <Header
                links={[{ to: "/", label: "Tur paketlar" }]}
                rightRightChild={<PackFilters />}
            />
            <Layout>
                <CostHome />
            </Layout>
        </main>
    )
}
