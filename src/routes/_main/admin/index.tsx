import Header from "@/components/header"
import Layout from "@/components/layouts/layout"
import AdminPage from "@/pages/admin"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main/admin/")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main>
            <Header links={[{ to: "/", label: "Admin" }]} isSearch={false} />
            <Layout>
                <AdminPage />
            </Layout>
        </main>
    )
}
