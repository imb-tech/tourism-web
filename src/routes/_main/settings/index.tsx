import Header from "@/components/header"
import Countries from "@/pages/settings/countries"
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
            <Countries />
        </div>
    )
}
