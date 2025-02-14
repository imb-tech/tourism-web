import Header from "@/components/header"
import HomeDocument from "@/pages/home/home-document"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/document/$plan/$day")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <Header links={[{ label: "Dashboard" }]} />
            <div className="p-3">
                <HomeDocument />
            </div>
        </div>
    )
}
