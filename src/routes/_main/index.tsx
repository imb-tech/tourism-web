import HomeMain from "@/pages/home"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/")({
    component: RouteComponent,
})

function RouteComponent() {
    return <HomeMain />
}
