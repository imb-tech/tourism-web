import Header from "@/components/header"
import ChangesMain from "@/pages/changes"
import HomeFilter from "@/pages/changes/changes-filter"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/changes")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <Header
                links={[{ label: "Top Manager" }]}
                rightRightChild={<HomeFilter />}
            />
            <div className="p-3">
                <ChangesMain />
            </div>
        </div>
    )
}
