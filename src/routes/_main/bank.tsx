import Header from "@/components/header"
import BankHome from "@/pages/bank"
import HomeFilter from "@/pages/changes/changes-filter"
import { createFileRoute } from "@tanstack/react-router"

type Params = {
    type: string | undefined
}

export const Route = createFileRoute("/_main/bank")({
    component: RouteComponent,
    validateSearch: (
        search: Record<keyof Params, string | undefined>,
    ): Params => {
        return {
            type: search.type || undefined,
        }
    },
})

function RouteComponent() {
    return (
        <div>
            <Header
                links={[{ label: "Kassa" }]}
                rightRightChild={<HomeFilter />}
            />
            <div className="p-3">
                <BankHome />
            </div>
        </div>
    )
}
