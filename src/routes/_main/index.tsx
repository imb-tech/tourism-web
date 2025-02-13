import Header from "@/components/header"
import HomeMain from "@/pages/home"
import { createFileRoute } from "@tanstack/react-router"

type Params = {
    cash_id?: number | undefined
}

export const Route = createFileRoute("/_main/")({
    component: RouteComponent,
    validateSearch: (
        search: Record<keyof Params, number | undefined>,
    ): Params => {
        return {
            cash_id: search.cash_id || undefined,
        }
    },
})

function RouteComponent() {
    return (
        <div>
            <Header links={[{ label: "Dashboard" }]} />
            <div className="p-3">
                <HomeMain />
            </div>
        </div>
    )
}
