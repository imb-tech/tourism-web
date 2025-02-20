import Header from "@/components/header"
import Layout from "@/components/layouts/layout"
import RoleCreate from "@/pages/admin/role-create"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/admin/roles/create")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main>
            <Header
                links={[{ to: "/", label: "Rol yaratish" }]}
                isSearch={false}
            />
            <Layout>
                <RoleCreate />
            </Layout>
        </main>
    )
}
