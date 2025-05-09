import Header from "@/components/header"
import Layout from "@/components/layouts/layout"
import RoleCreate from "@/pages/admin/role-create"
import { createFileRoute, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/admin/roles/$id")({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = useParams({ from: "/_main/admin/roles/$id" })
    return (
        <main>
            <Header
                links={[{ to: "/", label: "Edit role" }]}
                isSearch={false}
            />
            <Layout>
                <RoleCreate id={Number(id)} />
            </Layout>
        </main>
    )
}
