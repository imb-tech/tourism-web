import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
// import { GET_ME } from "@/constants/api-endpoints"
// import { getRequest } from "@/services/default-requests"
// import { GetMe } from "@/types/common"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Menu } from "lucide-react"

export const Route = createFileRoute("/_main")({
    component: RouteComponent,
    // beforeLoad: async ({ location }) => {
    //     const access_token = getAccessToken()
    //     if (!access_token) {
    //         throw redirect({
    //             to: "/login",
    //             search: {
    //                 redirect: location.href,
    //             },
    //         })
    //     }
    // },
    // loader: async ({ context: { queryClient, setState } }) => {
    //     const data: GetMe = await queryClient.ensureQueryData({
    //         queryKey: [GET_ME],
    //         queryFn: () => getRequest(GET_ME),
    //         initialData: {} as GetMe,
    //     })
    //     const permissions = data.permissions
    //     if (Array.isArray(permissions) && permissions.length > 0) {
    //         if (setState) {
    //             setState((prev) => ({ ...prev, permissions }))
    //         }
    //     } else {
    //         throw notFound()
    //     }
    // },
    validateSearch: (params: { from?: string; to?: string; search?: string }) =>
        params,
})

function RouteComponent() {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar className="shadow-none border-none bg-background"  />
            <SidebarInset className="bg-primary-foreground overflow-auto">
                <SidebarTrigger
                    variant={"default"}
                    className="md:hidden fixed bottom-16 right-5 rounded-full w-10 h-9 z-50"
                >
                    <Menu className="text-white" />
                </SidebarTrigger>

                <div className="relative min-h-svh max-h-svh overflow-y-auto">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
