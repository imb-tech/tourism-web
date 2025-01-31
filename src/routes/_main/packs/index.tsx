import Header from "@/components/header"
import Layout from "@/components/layouts/layout"
import Packs from "@/pages/packs"
import PackFilters from "@/pages/packs/pack-filters"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/packs/")({
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
                <Packs />
            </Layout>
        </main>
    )
}
