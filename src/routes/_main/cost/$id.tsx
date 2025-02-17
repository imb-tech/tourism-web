import Header from "@/components/header"
import CostMain from "@/pages/cost/cost-main"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/cost/$id")({
    component: RouteComponent,
    validateSearch: (params: { type?: packTab }) => params,
})

function RouteComponent() {
    const { id } = useParams({ from: "/_main/cost/$id" })
    return (
        <div>
            <Header
                links={[
                    { to: "/cost", label: "Real xarajat" },
                    { label: `#${id}` },
                ]}
            />
            <CostMain />
        </div>
    )
}
