import Header from "@/components/header"
import HomeMain from "@/pages/home"
import HomeFilter from "@/pages/home/home-filter"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <Header
                links={[{ label: "Dashboard" }]}
                rightRightChild={<HomeFilter />}
            />
            <div className="p-3">
                <HomeMain />
            </div>
        </div>
    )
}
