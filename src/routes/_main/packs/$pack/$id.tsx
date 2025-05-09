import Header from "@/components/header"
import Users from "@/pages/users"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/packs/$pack/$id")({
    component: RouteComponent,
})

function RouteComponent() {
    const { pack, id } = useParams({ from: "/_main/packs/$pack/$id" })
    return (
        <div>
            <Header
                links={[
                    { to: "/", label: "Tour packages" },
                    { label: `#${pack}`, to: `/packs/${pack}` },
                    { label: `#${id}` },
                ]}
            />
            <Users />
        </div>
    )
}
