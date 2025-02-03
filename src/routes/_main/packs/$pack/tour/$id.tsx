import Header from "@/components/header"
import Tour from "@/pages/tour"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/packs/$pack/tour/$id")({
    component: RouteComponent,
})

function RouteComponent() {
    const { pack, id } = useParams({ from: "/_main/packs/$pack/tour/$id" })
    return (
        <div>
            <Header
                links={[
                    { to: "/", label: "Tur paketlar" },
                    { label: `#${pack}`, to: `/packs/${pack}` },
                    { label: `#${id}` },
                ]}
            />
            <Tour />
        </div>
    )
}
