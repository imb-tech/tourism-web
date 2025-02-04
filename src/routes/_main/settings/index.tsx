import Header from "@/components/header"
import Settings from "@/pages/settings/index"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/settings/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <Header
                links={[{ to: "/", label: "Asosiy" }, { label: "Sozlamalar" }]}
            />
            <Settings />
        </div>
    )
}
